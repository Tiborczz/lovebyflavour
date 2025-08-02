@echo off
echo Auto-pushing changes to git...

REM Add all changes
git add .

REM Check if there are any changes to commit
git diff --cached --quiet
if %errorlevel% neq 0 (
    REM Commit with timestamp
    for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
    set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
    set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
    set "datestamp=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"
    
    git commit -m "Auto-update: %datestamp%"
    
    REM Push to main branch
    git push origin main
    
    echo ✅ Changes pushed successfully!
) else (
    echo ℹ️  No changes to commit.
)

pause