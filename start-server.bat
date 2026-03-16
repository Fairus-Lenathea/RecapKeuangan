@echo off
echo ========================================
echo   Starting Local Server for Testing
echo ========================================
echo.

REM Check if http-server is installed
where http-server >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Installing http-server...
    call npm install -g http-server
)

echo [OK] Starting server on http://localhost:8080
echo [INFO] Press Ctrl+C to stop the server
echo.

REM Start the server
start http://localhost:8080
http-server -p 8080
