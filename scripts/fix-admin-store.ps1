<#
PowerShell remediation script for admin + store setup.
Usage:
  - Run from project root: .\scripts\fix-admin-store.ps1
  - Optionally pass seed passwords as parameters:
      -SeedSuper 'p' -SeedAdmin 'p' -SeedManager 'p' -SeedStaff 'p'
  - If parameters are not provided the script will prompt interactively.

This script will:
  - Verify Node/npm
  - Install dependencies (npm ci --omit=dev)
  - Attempt to rebuild better-sqlite3
  - Run the DB seed (Admin/db/seed.ts) with tsx
  - Build Next.js if needed
  - Start the server (node server.js)
  - Verify Admin/data/grey.db exists and print a checklist

NOTE: This script does not persist secrets to disk. Enter passwords when prompted.
#>
[CmdletBinding()]
param(
    [string]$SeedSuper,
    [string]$SeedAdmin,
    [string]$SeedManager,
    [string]$SeedStaff
)

function Write-ErrExit($msg) {
    Write-Host "ERROR: $msg" -ForegroundColor Red
    exit 1
}

# Move to project root (one level up from script)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location (Join-Path $scriptDir '..')

Write-Host "Working directory: $(Get-Location)"

# 1) Node & npm
try {
    $node = & node -v 2>$null
    $npm = & npm -v 2>$null
} catch {
    $node = $null; $npm = $null
}
if (-not $node -or -not $npm) {
    Write-ErrExit "Node and/or npm not found in PATH. Install Node >= 18 and ensure 'node' and 'npm' are available."
}
Write-Host "Node: $node  npm: $npm"

# 2) Install dependencies
Write-Host "Installing production dependencies (npm ci --omit=dev)..."
$install = & npm ci --omit=dev
if ($LASTEXITCODE -ne 0) {
    Write-Host "npm ci failed with exit code $LASTEXITCODE; attempting npm install --omit=dev as fallback..."
    & npm install --omit=dev
    if ($LASTEXITCODE -ne 0) { Write-ErrExit 'Dependency install failed.' }
}
Write-Host "Dependencies installed."

# 3) Rebuild better-sqlite3 (best-effort)
Write-Host "Attempting to rebuild better-sqlite3 from source (if necessary)..."
& npm rebuild better-sqlite3 --build-from-source
if ($LASTEXITCODE -ne 0) {
    Write-Host "Rebuild failed or not needed. If sessions fail, run: npm rebuild better-sqlite3 --build-from-source" -ForegroundColor Yellow
} else {
    Write-Host "better-sqlite3 rebuild succeeded." -ForegroundColor Green
}

# 4) Determine tsx runner
$tsxLocal = Join-Path "node_modules" ".bin\tsx"
$useNpx = $false
if (Test-Path $tsxLocal) { $tsxRunner = $tsxLocal } else { $tsxRunner = 'npx tsx'; $useNpx = $true }
Write-Host "Using tsx runner: $tsxRunner"

# 5) Collect seed passwords
function Prompt-SecureStringAsPlain([string]$prompt) {
    $s = Read-Host -AsSecureString $prompt
    $bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($s)
    try { [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr) } finally { [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
}

if (-not $SeedSuper) { $SeedSuper = Prompt-SecureStringAsPlain 'SEED_SUPERADMIN_PASSWORD (input hidden):' }
if (-not $SeedAdmin) { $SeedAdmin = Prompt-SecureStringAsPlain 'SEED_ADMIN_PASSWORD (input hidden):' }
if (-not $SeedManager) { $SeedManager = Prompt-SecureStringAsPlain 'SEED_MANAGER_PASSWORD (input hidden):' }
if (-not $SeedStaff) { $SeedStaff = Prompt-SecureStringAsPlain 'SEED_STAFF_PASSWORD (input hidden):' }

# 6) Run seed
Write-Host "Running DB seed (this will create admin users + store data)."
$env:SEED_SUPERADMIN_PASSWORD = $SeedSuper
$env:SEED_ADMIN_PASSWORD = $SeedAdmin
$env:SEED_MANAGER_PASSWORD = $SeedManager
$env:SEED_STAFF_PASSWORD = $SeedStaff

$seedCmd = if ($useNpx) { "npx tsx Admin\\db\\seed.ts" } else { "node $tsxRunner Admin\\db\\seed.ts" }
# Prefer executing tsx directly, but the local .bin is a shim on Windows; call it via & when path provided
if (-not $useNpx) {
    # path to .ps1 shim is node_modules\.bin\tsx.ps1 in Windows; invoking the shim will call node
    try {
        & $tsxLocal 'Admin\db\seed.ts'
        if ($LASTEXITCODE -ne 0) { Write-Host "Seed script returned exit code $LASTEXITCODE" -ForegroundColor Yellow }
    } catch {
        Write-Host "Failed to invoke local tsx. Attempting npx tsx..." -ForegroundColor Yellow
        & npx tsx Admin\db\seed.ts
    }
} else {
    & npx tsx Admin\db\seed.ts
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "Seed command finished with non-zero exit. Check output above." -ForegroundColor Yellow
} else {
    Write-Host "Seed completed (watch for 'SEED COMPLETE' in output)." -ForegroundColor Green
}

# 7) Verify DB file
$dbFile = Join-Path 'Admin' 'data\grey.db'
if (Test-Path $dbFile) {
    $size = (Get-Item $dbFile).Length
    Write-Host "DB file exists: $dbFile (size: $size bytes)" -ForegroundColor Green
} else {
    Write-Host "DB file not found at $dbFile" -ForegroundColor Red
}

# 8) Next.js build (if .next missing)
$nextBuild = Test-Path '.next' -PathType Container
if (-not $nextBuild) {
    Write-Host ".next build missing — running Next build (may take several minutes)."
    $nextBin = Join-Path 'node_modules' '.bin\next'
    if (Test-Path $nextBin) {
        $env:NODE_OPTIONS='--max-old-space-size=4096'
        & $nextBin build --webpack
        if ($LASTEXITCODE -ne 0) { Write-Host "Next build failed." -ForegroundColor Red } else { Write-Host "Next build succeeded." -ForegroundColor Green }
    } else {
        Write-Host "next binary not found; run npm install and try again." -ForegroundColor Red
    }
} else {
    Write-Host ".next build already present — skipping build." -ForegroundColor Cyan
}

# 9) Start server (best-effort)
Write-Host "Starting server.js (will run in foreground). Use Ctrl+C to stop."
Write-Host "If you want to run it detached, open a separate session and run: node server.js" -ForegroundColor Cyan
try {
    & node server.js
} catch {
    Write-Host "Failed to start server via node server.js. Ensure 'node' is available and server.js is present." -ForegroundColor Red
}

# End
Write-Host "Script finished. Review the output for any errors." -ForegroundColor Green
exit 0
