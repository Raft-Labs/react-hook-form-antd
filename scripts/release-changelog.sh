BASE_PATH=$1


VERSION=$(jq -r '.version' $BASE_PATH/package.json)
VERSION=$(semver $VERSION)
echo "Release Version: $VERSION"

gitmoji-changelog update 
git add CHANGELOG.md 
VERSION=$(jq -r '.version' ${BASE_PATH}/package.json)
git commit -m ":truck: chore(stack): updated changelog (${VERSION})" 