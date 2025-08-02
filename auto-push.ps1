# PowerShell Auto-Push Script
Write-Host "🔄 Auto-pushing changes to git..." -ForegroundColor Cyan

# Add all changes
git add .

# Check if there are any changes to commit
$changes = git diff --cached --name-only
if ($changes) {
    # Create timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    # Commit with timestamp
    git commit -m "Auto-update: $timestamp"
    
    # Push to main branch
    $pushResult = git push origin main 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Changes pushed successfully!" -ForegroundColor Green
        Write-Host "📝 Files updated:" -ForegroundColor Yellow
        $changes | ForEach-Object { Write-Host "  - $_" -ForegroundColor White }
        Write-Host "🚀 Vercel will auto-deploy your changes!" -ForegroundColor Magenta
    } else {
        Write-Host "❌ Push failed:" -ForegroundColor Red
        Write-Host $pushResult -ForegroundColor Red
    }
} else {
    Write-Host "ℹ️  No changes to commit. Working tree is clean." -ForegroundColor Blue
    Write-Host "💡 This means all your changes are already saved in git!" -ForegroundColor Green
}

# Keep window open
Read-Host "Press Enter to continue"