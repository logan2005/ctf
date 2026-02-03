@echo off
echo ========================================
echo   CyberQuest CTF - Netlify Deployment
echo ========================================
echo.

echo Checking if Netlify CLI is installed...
where netlify >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Netlify CLI not found!
    echo.
    echo Installing Netlify CLI...
    npm install -g netlify-cli
    echo.
)

echo.
echo ========================================
echo   Deployment Options
echo ========================================
echo.
echo 1. Deploy to production (recommended)
echo 2. Deploy preview (test first)
echo 3. Login to Netlify
echo 4. Check deployment status
echo 5. Open Netlify dashboard
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo Deploying to production...
    netlify deploy --prod
) else if "%choice%"=="2" (
    echo.
    echo Deploying preview...
    netlify deploy
) else if "%choice%"=="3" (
    echo.
    echo Opening Netlify login...
    netlify login
) else if "%choice%"=="4" (
    echo.
    echo Checking status...
    netlify status
) else if "%choice%"=="5" (
    echo.
    echo Opening dashboard...
    netlify open
) else (
    echo Invalid choice!
)

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
pause
