# run_all.ps1

Write-Host "Starting EDU-JOB Full Stack..." -ForegroundColor Green

# Start Backend
Write-Host "Starting Backend on Port 8000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .\venv\Scripts\activate; uvicorn app.main:app --reload"

# Start Frontend
Write-Host "Starting Frontend on Port 5173..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "Both services are starting in new windows." -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173"
Write-Host "Backend API: http://127.0.0.1:8000/docs"
