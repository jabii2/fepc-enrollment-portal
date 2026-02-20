@echo off
echo Starting FEPC Enrollment Portal Backend Server...
echo.

cd /d "%~dp0src\backend"

REM Check if PHP is installed in XAMPP
if not exist "C:\xampp\php\php.exe" (
    echo ERROR: PHP not found in C:\xampp\php\
    echo Please make sure XAMPP is installed with PHP.
    pause
    exit /b 1
)

echo Starting PHP development server on http://localhost:8080
echo Press Ctrl+C to stop the server
echo.

C:\xampp\php\php.exe -S localhost:8080

pause
