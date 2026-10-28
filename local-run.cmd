@REM run as Administrator
@echo off

set DOWNLOADS_DIR=%USERPROFILE%\Downloads

set NODE_DIR=%DOWNLOADS_DIR%\node-v24.11.0-win-x64


set PATH=^
%NODE_DIR%\node-v24.11.0-win-x64;

@REM npm run-script build
npm install -g npm &&^
npm i &&^
npm run-script dev
