@echo off

set SELF_DIR=%~dp0

cd %~dp0

IF "%APACHE_HOME%" == "" (
	echo "APACHE_HOMEが空です。"
	exit /b 1
) ELSE (
	mklink /d "%APACHE_HOME%\htdocs\js" "%SELF_DIR%\js"
	mklink /d "%APACHE_HOME%\htdocs\css" "%SELF_DIR%\css"
)

exit /b 0
