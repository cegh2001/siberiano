@echo off
setlocal

if defined ENGRAM_PATH (
  if exist "%ENGRAM_PATH%" (
    "%ENGRAM_PATH%" mcp
    exit /b %ERRORLEVEL%
  )
)

for /f "delims=" %%I in ('where engram.exe 2^>nul') do (
  "%%~fI" mcp
  exit /b %ERRORLEVEL%
)

for /f "delims=" %%I in ('where engram 2^>nul') do (
  "%%~fI" mcp
  exit /b %ERRORLEVEL%
)

for %%I in (
  "%USERPROFILE%\bin\engram.exe"
  "C:\Users\Lenovo\bin\engram.exe"
  "C:\Users\shoto\bin\engram.exe"
  "%LOCALAPPDATA%\Programs\Engram\engram.exe"
  "%ProgramFiles%\Engram\engram.exe"
  "%ProgramFiles(x86)%\Engram\engram.exe"
) do (
  if exist "%%~I" (
    "%%~I" mcp
    exit /b %ERRORLEVEL%
  )
)

echo Engram executable not found. Set ENGRAM_PATH or add Engram to PATH.
exit /b 1