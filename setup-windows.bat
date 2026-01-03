@echo off
echo ========================================
echo   KAROBA WELLNESS TRAVEL - SETUP
echo ========================================
echo.

echo 1. Verificando configuracion...
node setup-check.js

echo.
echo 2. Instalando dependencias de API...
cd packages\api
call npm install

echo.
echo 3. Inicializando base de datos...
call npm run init-db

echo.
echo 4. Iniciando servidor API...
echo Presiona Ctrl+C para detener el servidor
call npm run dev

pause