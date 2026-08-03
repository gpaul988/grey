@echo off
REM Grey InfoTech — Production Deployment Commands (Windows)
REM Run these commands exactly as shown

setlocal enabledelayedexpansion

:PHASE1
cls
echo.
echo ════════════════════════════════════════════════════════════════
echo PHASE 1: LOCAL DEPLOYMENT TEST (Windows)
echo ════════════════════════════════════════════════════════════════
echo.

REM Step 1: Navigate to project
cd /d c:\Users\graha\Documents\GitHub\grey
if errorlevel 1 (
    echo ERROR: Cannot navigate to project directory
    pause
    exit /b 1
)

REM Step 2: Run validation first
echo [1/6] Running pre-deployment validation...
node validate-production.js
if errorlevel 1 (
    echo.
    echo ERROR: Validation failed. Fix issues before proceeding.
    pause
    exit /b 1
)

REM Step 3: Install dependencies
echo.
echo [2/6] Installing dependencies...
call npm ci
if errorlevel 1 (
    echo ERROR: npm ci failed
    pause
    exit /b 1
)

REM Step 4: Bootstrap database
echo.
echo [3/6] Creating MySQL schema...
call npm run bootstrap:db:mysql
if errorlevel 1 (
    echo ERROR: Database bootstrap failed
    echo.
    echo Troubleshooting:
    echo - Verify MySQL is running
    echo - Check DB credentials in .env.local
    echo - Verify database exists: greyinf1_Grey_InfoTech
    pause
    exit /b 1
)

REM Step 5: Seed admin accounts
echo.
echo [4/6] Seeding admin accounts...
call npm run seed
if errorlevel 1 (
    echo ERROR: Database seed failed
    echo.
    echo Troubleshooting:
    echo - Check SEED_*_PASSWORD values in .env.local
    echo - Verify database connection
    pause
    exit /b 1
)

REM Step 6: Build production bundle
echo.
echo [5/6] Building production bundle...
call npm run build
if errorlevel 1 (
    echo ERROR: Production build failed
    pause
    exit /b 1
)

REM Step 7: Start production server
echo.
echo [6/6] Starting production server...
echo.
echo ════════════════════════════════════════════════════════════════
echo ✅ READY TO TEST
echo ════════════════════════════════════════════════════════════════
echo.
echo Open your browser and test:
echo   Homepage:  http://localhost:3000
echo   Admin:     http://localhost:3000/admin/login
echo   Email:     graham@greyinfotech.com.ng
echo   Password:  !Uriel2Sobiribo3,
echo.
echo Press CTRL+C to stop the server and proceed to cPanel deployment.
echo.
call npm run start

:PHASE2
cls
echo.
echo ════════════════════════════════════════════════════════════════
echo PHASE 2: CPANEL PRODUCTION DEPLOYMENT
echo ════════════════════════════════════════════════════════════════
echo.
echo INSTRUCTIONS FOR CPANEL DEPLOYMENT:
echo.
echo 1. Log in to cPanel: https://greyinfotech.com.ng:2083
echo.
echo 2. Create Node.js App:
echo    - Go to "Setup Node.js App" (Software section)
echo    - Click "Create Application"
echo    - Application root: /home/greyinf1/public_html/grey
echo    - Startup file: server.js
echo    - Node.js version: 20.x LTS
echo    - Click Create
echo.
echo 3. Set Environment Variables:
echo    - Click "Edit Environment Variables"
echo    - Copy ALL variables from .env.local (11 sections)
echo    - Save
echo.
echo 4. Deploy Code (choose one):
echo    - Via Git: git clone https://github.com/gpaul988/grey.git
echo    - Via FTP: Upload .next/, Admin/, app/, components/, etc.
echo.
echo 5. SSH Commands (run via SSH):
echo    ssh greyinf1@greyinfotech.com.ng
echo    cd /home/greyinf1/public_html/grey
echo    source nodevenv/public_html/grey/20/bin/activate
echo    npm ci
echo    npm run build
echo    npm run bootstrap:db:mysql
echo    npm run seed
echo.
echo 6. Restart App in cPanel:
echo    - Go to "Setup Node.js App"
echo    - Click "Restart"
echo    - Wait 10 seconds
echo.
echo 7. Monitor Logs:
echo    tail -f tmp/stderr.log
echo    (Should show "[server] Ready on http://localhost:PORT")
echo.
echo 8. Test on Production Domain:
echo    https://greyinfotech.com.ng
echo.
echo ════════════════════════════════════════════════════════════════
echo For detailed instructions, see: FINAL_DEPLOYMENT_GUIDE.md
echo ════════════════════════════════════════════════════════════════
echo.
pause

:PHASE3
cls
echo.
echo ════════════════════════════════════════════════════════════════
echo PHASE 3: PRODUCTION VERIFICATION
echo ════════════════════════════════════════════════════════════════
echo.
echo When deployment is complete, verify these tests in browser:
echo.
echo TEST 1: HOMEPAGE
echo   URL: https://greyinfotech.com.ng
echo   Expected: Page loads, images visible, no console errors
echo.
echo TEST 2: ADMIN LOGIN
echo   URL: https://greyinfotech.com.ng/admin/login
echo   Email: graham@greyinfotech.com.ng
echo   Password: !Uriel2Sobiribo3,
echo   Expected: Login succeeds, redirected to dashboard
echo.
echo TEST 3: SETTINGS ^ SMTP
echo   Navigate to: Admin -^> Settings
echo   Click: Test Email
echo   Expected: Test email sent to logged-in user
echo.
echo TEST 4: CONTACT FORM
echo   URL: https://greyinfotech.com.ng
echo   Fill and submit contact form
echo   Expected: No errors, email sent to hello@greyinfotech.com.ng
echo.
echo TEST 5: TAWK CHAT
echo   Homepage should show chat widget (bottom-right corner)
echo   DevTools Network tab: filter "tawk"
echo   Expected: embed.tawk.to requests return 200 OK
echo.
echo ════════════════════════════════════════════════════════════════
echo ✅ ALL TESTS PASSED = PRODUCTION READY
echo ════════════════════════════════════════════════════════════════
echo.
pause

:TROUBLESHOOTING
cls
echo.
echo ════════════════════════════════════════════════════════════════
echo TROUBLESHOOTING
echo ════════════════════════════════════════════════════════════════
echo.
echo IF npm ci FAILS:
echo   - Delete node_modules folder
echo   - Delete package-lock.json
echo   - Run: npm install
echo.
echo IF npm run bootstrap:db:mysql FAILS:
echo   - Check MySQL is running
echo   - Verify credentials in .env.local:
echo     DB_HOST=127.0.0.1
echo     DB_USER=greyinf1_greyinfotech
echo     DB_PASS=1@Uriel2$Sobiribo2,&
echo     DB_NAME=greyinf1_Grey_InfoTech
echo   - Test connection: mysql -h 127.0.0.1 -u greyinf1_greyinfotech -p
echo.
echo IF npm run build FAILS:
echo   - Increase Node heap: node --max-old-space-size=4096 node_modules/.bin/next build
echo   - Check for TypeScript errors: npx tsc --noEmit
echo.
echo IF npm run start FAILS:
echo   - Check logs for errors
echo   - Verify all environment variables are set
echo   - Ensure port 3000 is available
echo.
echo IF PRODUCTION DEPLOYMENT FAILS:
echo   - Check cPanel Node.js App logs: tail -f tmp/stderr.log
echo   - Verify environment variables in cPanel match .env.local
echo   - Check database connection: verify DB_HOST, DB_USER, DB_PASS
echo.
echo For more details, see: FINAL_DEPLOYMENT_GUIDE.md
echo.
pause

exit /b 0
