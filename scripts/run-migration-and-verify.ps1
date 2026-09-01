<#
PowerShell helper: Run orders.json -> DB migration and basic verification.
Requires:
 - Node 20 in PATH (npx & node available)
 - npm dependencies installed (npm ci)

This script will:
 1. Backup Admin\data\grey.db -> Admin\data\grey.db.bak
 2. Backup Admin\data\orders.json -> Admin\data\orders.json.bak
 3. Run migration script: npx tsx scripts\migrate-orders-to-db.ts
 4. Verify DB counts and sample rows using node (better-sqlite3)
 5. Print summary and locations of backups

Run from repository root in PowerShell (Admin privileges not required):
  .\scripts\run-migration-and-verify.ps1

#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
# normalize to repo root
Push-Location $PSScriptRoot\.. | Out-Null

$dbPath = Join-Path -Path (Get-Location) -ChildPath 'Admin\data\grey.db'
$ordersPath = Join-Path -Path (Get-Location) -ChildPath 'Admin\data\orders.json'

function Backup-File($path) {
    if (Test-Path $path) {
        $bak = "$path.bak.$((Get-Date -UFormat %s))"
        Copy-Item -Path $path -Destination $bak -Force
        Write-Host "Backed up $path -> $bak"
        return $bak
    } else {
        Write-Host "No file to backup: $path"
        return $null
    }
}

Write-Host "Preparing migration: backing up files..."
$dbBak = Backup-File $dbPath
$ordersBak = Backup-File $ordersPath

# Check Node
try {
    $nodeVer = (node -v) -replace "v",""
    Write-Host "Node found: $nodeVer"
} catch {
    Write-Host "Node not found in PATH. Ensure Node 20.x is installed and active (nvm)." -ForegroundColor Red
    Pop-Location | Out-Null
    exit 2
}

# Ensure dependencies installed
if (-not (Test-Path "node_modules")) {
    Write-Host "node_modules not found — running npm ci (this may take a while)..."
    npm ci
}

# Run migration
Write-Host "Running migration script..."
try {
    npx tsx scripts\migrate-orders-to-db.ts | Tee-Object -Variable migrOut
    Write-Host "Migration script completed. Output:"
    $migrOut | ForEach-Object { Write-Host "  $_" }
} catch {
    Write-Host "Migration failed: $_" -ForegroundColor Red
    if ($dbBak) { Copy-Item -Path $dbBak -Destination $dbPath -Force; Write-Host "Restored DB from backup" }
    Pop-Location | Out-Null
    exit 3
}

# Basic verification using node + better-sqlite3
Write-Host "Verifying DB counts and sample rows..."
$verifyScript = @'
const Database = require('better-sqlite3');
const db = new Database(process.argv[1], { readonly: true });
function q(sql) { try { return db.prepare(sql).get(); } catch(e) { return e.message; } }
function qa(sql) { try { return db.prepare(sql).all(); } catch(e) { return e.message; } }
console.log('store_orders_count:', q("SELECT COUNT(*) AS c FROM store_orders").c);
console.log('store_order_items_count:', q("SELECT COUNT(*) AS c FROM store_order_items").c);
console.log('sample_orders:', qa("SELECT order_number, total, created_at FROM store_orders ORDER BY created_at DESC LIMIT 5"));
console.log('sample_items:', qa("SELECT order_id, product_id, quantity, price FROM store_order_items ORDER BY id DESC LIMIT 8"));
db.close();
'@

try {
    node -e $verifyScript -- $dbPath | ForEach-Object { Write-Host "  $_" }
} catch {
    Write-Host "Verification script failed: $_" -ForegroundColor Yellow
    Write-Host "You can run sqlite3 CLI or inspect DB manually: Admin\data\grey.db"
}

Write-Host "Migration & verification completed. Backups (if created):"
if ($dbBak) { Write-Host " - DB backup: $dbBak" }
if ($ordersBak) { Write-Host " - Orders backup: $ordersBak" }

Pop-Location | Out-Null
Write-Host "Done."