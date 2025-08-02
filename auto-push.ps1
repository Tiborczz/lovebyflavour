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
    git push origin main
    
    Write-Host "✅ Changes pushed successfully!" -ForegroundColor Green
    Write-Host "📝 Files updated:" -ForegroundColor Yellow
    $changes | ForEach-Object { Write-Host "  - $_" -ForegroundColor White }
} else {
    Write-Host "ℹ️  No changes to commit." -ForegroundColor Blue
}

# Keep window open
Read-Host "Press Enter to continue"