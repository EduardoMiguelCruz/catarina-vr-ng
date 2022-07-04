@ECHO off
cd %~dp0
git checkout -b gh-pages
git push origin gh-pages
npm install -g angular-cli-ghpages
ng build --configuration production --base-href https://EduardoMiguelCruz.github.io/catarina-ar-ng/
ngh --dir=dist/catarina-vr-angular
pause