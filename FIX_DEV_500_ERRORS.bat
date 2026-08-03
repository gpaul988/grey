#!/usr/bin/env cmd
@echo off
REM Fix for 500 errors on all pages during npm run dev
REM This clears cache and restarts the dev server cleanly

echo.
echo ════════════════════════════════════════════════════════════════
echo FIX: 500 Errors on All Pages During npm run dev
echo ════════════════════════════════════════════════════════════════
echo.

cd /d c:\Users\graha\Documents\GitHub\grey

echo [1/3] Killing any running dev servers...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo ✅ Done
echo.

echo [2/3] Clearing cache and build artifacts...
rmdir /s /q .next >nul 2>&1
rmdir /s /q .turbo >nul 2>&1
echo ✅ Done
echo.

echo [3/3] Restarting dev server (npm run dev)...
echo.
echo Server should start at: http://localhost:3000
echo Press CTRL+C to stop
echo.

npm run dev
