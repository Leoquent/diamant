# deploy.ps1
npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$tempDir = New-Item -ItemType Directory -Path "$env:TEMP\diamant-deploy" -Force
Copy-Item -Path "dist\*" -Destination $tempDir -Recurse -Force

git checkout gh-pages
if ($LASTEXITCODE -ne 0) { 
    git checkout -b gh-pages
}

# Remove old files but keep .git
Get-ChildItem -Exclude .git | Remove-Item -Recurse -Force
Copy-Item -Path "$tempDir\*" -Destination "." -Recurse -Force
if (-not (Test-Path ".nojekyll")) {
    New-Item -ItemType File -Name ".nojekyll" -Force
}

git add .
git commit -m "deploy: responsive layout and header fixes"
git push origin gh-pages
git checkout main
Remove-Item -Path $tempDir -Recurse -Force
