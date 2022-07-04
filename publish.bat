@ECHO off
cd %~dp0
cd dist/catarina-vr-angular
git init
git remote add origin https://github.com/EduardoMiguelCruz/catarina-ar.git
git pull origin master
git add .
git commit -m "new version"
git push -u origin master
pause