# deploy.ps1
# Build the project
npm run build
if ($LASTEXITCODE -ne 0) { 
    Write-Host "Build failed!" -ForegroundColor Red
    exit $LASTEXITCODE 
}

# Create a temp directory for the built files
$tempDir = New-Item -ItemType Directory -Path "$env:TEMP\diamant-deploy" -Force
Copy-Item -Path "dist\*" -Destination $tempDir -Recurse -Force

# Store the current branch name
$currentBranch = git rev-parse --abbrev-ref HEAD

# Check if gh-pages branch exists, if not create it
$branches = git branch --list gh-pages
if (-not $branches) {
    git checkout -b gh-pages
}
else {
    git checkout gh-pages
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Could not switch to gh-pages!" -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

# Remove old files but keep .git
Get-ChildItem -Exclude .git | Remove-Item -Recurse -Force

# Copy files from temp directory to the root
Copy-Item -Path "$tempDir\*" -Destination "." -Recurse -Force

# Ensure .nojekyll exists
if (-not (Test-Path ".nojekyll")) {
    New-Item -ItemType File -Name ".nojekyll" -Force
}

# Commit and push
git add .
git commit -m "deploy: responsive layout and header fixes $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push origin gh-pages --force

# Switch back to the original branch
git checkout $currentBranch

# Cleanup
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "Deployment successful!" -ForegroundColor Green
