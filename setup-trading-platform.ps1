# TradePro Setup Script
# Run this script to set up the Next.js trading platform

Write-Host "🚀 TradePro Trading Platform Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Backup old package.json
Write-Host "📦 Step 1: Backing up old configuration..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Move-Item -Path "package.json" -Destination "package-old.json" -Force
    Write-Host "✓ Old package.json backed up as package-old.json" -ForegroundColor Green
}

# Step 2: Use new Next.js package.json
Write-Host ""
Write-Host "📦 Step 2: Setting up Next.js configuration..." -ForegroundColor Yellow
if (Test-Path "package-next.json") {
    Move-Item -Path "package-next.json" -Destination "package.json" -Force
    Write-Host "✓ New package.json configured" -ForegroundColor Green
} else {
    Write-Host "✗ package-next.json not found!" -ForegroundColor Red
    exit 1
}

# Step 3: Install dependencies
Write-Host ""
Write-Host "📦 Step 3: Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 4: Show next steps
Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run development server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Open your browser:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Check the README for more info:" -ForegroundColor White
Write-Host "   TRADING_PLATFORM_README.md" -ForegroundColor Gray
Write-Host ""
Write-Host "Happy Trading! 🎯" -ForegroundColor Cyan
