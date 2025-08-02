@echo off
echo 🔄 Auto-pushing changes to git...

REM Add all changes
git add .

REM Check if there are any changes to commit
git diff --cached --quiet
if %errorlevel% neq 0 (
    REM Get current timestamp
    for /f "tokens=1-4 delims=/ " %%i in ('date /t') do set mydate=%%i-%%j-%%k
    for /f "tokens=1-2 delims=:" %%i in ('time /t') do set mytime=%%i:%%j
    
    git commit -m "Auto-update: %mydate% %mytime%"
    
    REM Push to main branch
    git push origin main
    if %errorlevel% equ 0 (
        echo ✅ Changes pushed successfully!
        echo 🚀 Vercel will auto-deploy your changes!
    ) else (
        echo ❌ Push failed! Check your internet connection.
    )
) else (
    echo ℹ️  No changes to commit. Working tree is clean.
    echo 💡 This means all your changes are already saved in git!
)

echo.
echo Press any key to continue...
pause >nul