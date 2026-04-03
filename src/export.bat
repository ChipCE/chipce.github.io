@echo off
setlocal

cd /d "%~dp0"

if exist "..\assets" rmdir /s /q "..\assets"
if exist "..\fonts" rmdir /s /q "..\fonts"
if exist "..\img" rmdir /s /q "..\img"
if exist "..\index.html" del /q "..\index.html"
if exist "..\favicon.png" del /q "..\favicon.png"

call npm.cmd run build
if errorlevel 1 exit /b %errorlevel%

xcopy ".\dist\*" "..\" /e /i /y >nul
if errorlevel 1 exit /b %errorlevel%

endlocal
