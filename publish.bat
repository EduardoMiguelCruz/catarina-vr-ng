@ECHO off
cd %~dp0
@REM npm install -g angular-cli-ghpages
ng build --configuration production --base-href https://EduardoMiguelCruz.github.io/catarina-vr-ng/
ngh --dir=dist/catarina-vr-ng
pause