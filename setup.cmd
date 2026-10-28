@REM run as Administrator
@echo off

set DOWNLOADS_DIR=%USERPROFILE%\Downloads

set SEVENZIP=C:\"Program Files"\7-Zip\7z.exe

@REM  set PYTHON_DIR=%DOWNLOADS_DIR%\python-3.10.8-amd64-portable
@REM  set PYTHON_EXE=%PYTHON_DIR%\python.exe

@REM  if not exist %PYTHON_EXE% (
@REM  cd /d "%TEMP%" &&^
@REM  %SystemRoot%\System32\curl.exe "https://github.com/dirkarnez/python-portable/releases/download/v3.10.8/python-3.10.8-amd64-portable.zip" -L -O  &&^
@REM  %SEVENZIP% x python-3.10.8-amd64-portable.zip -o"%PYTHON_DIR%" &&^
@REM  del python-3.10.8-amd64-portable.zip
@REM  )

@REM  if exist %PYTHON_EXE% (
@REM      echo python %PYTHON_EXE% found
@REM  ) else (
@REM      echo python %PYTHON_EXE% not found
@REM  )

set GIT_EXE=%DOWNLOADS_DIR%\PortableGit\bin\git.exe
if not exist %GIT_EXE% (
cd /d "%TEMP%" &&^
%SystemRoot%\System32\curl.exe "https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/PortableGit-2.42.0.2-64-bit.7z.exe" -L -O  &&^
PortableGit-2.42.0.2-64-bit.7z.exe -o%DOWNLOADS_DIR%\PortableGit -y &&^
del PortableGit-2.42.0.2-64-bit.7z.exe
)

if exist %GIT_EXE% (
    echo git %GIT_EXE% found
) else (
    echo git %GIT_EXE% not found
)

set NODE_DIR=%DOWNLOADS_DIR%\node-v24.11.0-win-x64
set NODE_EXE=%NODE_DIR%\node-v24.11.0-win-x64\node.exe
if not exist %NODE_EXE% (
cd /d "%TEMP%" &&^
%SystemRoot%\System32\curl.exe "https://nodejs.org/dist/v24.11.0/node-v24.11.0-win-x64.zip" -L -O  &&^
%SEVENZIP% x node-v24.11.0-win-x64.zip -o"%NODE_DIR%" &&^
del node-v24.11.0-win-x64.zip
)

if exist %NODE_EXE% (
    echo node %NODE_EXE% found
) else (
    echo node %NODE_EXE% not found
)



