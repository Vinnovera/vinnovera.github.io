#!/bin/sh
echo "## Clearing deploy folder"
rm -rf deploy

echo "## Clone repository"
git clone https://github.com/Vinnovera/vinnovera.github.io.git deploy

echo "## Building website"
gulp build

echo "## Copying build dir to deploy dir"
cp -R build/* deploy

echo "## Deploying branch to Github Pages "
cd deploy
git add -A

echo "## Commiting"
git commit -m "Update"

echo "## Pushing generated website"
git push origin master

echo "## Github Pages deploy complete"

echo "## Clean-up"
rm -rf deploy