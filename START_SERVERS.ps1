# TVMS Server Startup Script
# Run this with: .\START_SERVERS.ps1

Write-Host "🚀 Starting TVMS Servers..." -ForegroundColor Cyan
Write-Host ""

# Kill existing node processes
Write-Host "🔄 Stopping existing Node.js processes..." -ForegroundColor Yellow
taskkill /F /IM node.exe 2>$null | Out-Null
Start-Sleep -Seconds 2

# Clear environment variables
Remove-Item Env:MONGO_URI -ErrorAction SilentlyContinue
Remove-Item Env:PORT -ErrorAction SilentlyContinue

# Get the script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start Backend
Write-Host "🔧 Starting Backend Server (Port 3002)..." -ForegroundColor Green
$BackendPath = Join-Path $ScriptDir "backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BackendPath'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 5

# Start Frontend
Write-Host "🎨 Starting Frontend Server (Port 3000)..." -ForegroundColor Green
$FrontendPath = Join-Path $ScriptDir "frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$FrontendPath'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         ✅ TVMS SERVERS STARTING!             ║" -ForegroundColor Cyan
Write-Host "╠═══════════════════════════════════════════════╣" -ForegroundColor Cyan
Write-Host "║                                               ║" -ForegroundColor Cyan
Write-Host "║  Backend:  http://localhost:3002              ║" -ForegroundColor White
Write-Host "║  Frontend: http://localhost:3000              ║" -ForegroundColor White
Write-Host "║  Network:  http://192.168.1.106:3000          ║" -ForegroundColor Yellow
Write-Host "║                                               ║" -ForegroundColor Cyan
Write-Host "║  Admin Login:                                 ║" -ForegroundColor White
Write-Host "║    Email: admin@test.com                      ║" -ForegroundColor Gray
Write-Host "║    Pass:  admin123                            ║" -ForegroundColor Gray
Write-Host "║                                               ║" -ForegroundColor Cyan
Write-Host "║  TV Display (on any device):                  ║" -ForegroundColor White
Write-Host "║    http://192.168.1.106:3000/display/TV001    ║" -ForegroundColor Yellow
Write-Host "║                                               ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏳ Wait 10-15 seconds for servers to fully start..." -ForegroundColor Yellow
Write-Host "📋 Check the backend window for 'DataBase Connected'" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")







