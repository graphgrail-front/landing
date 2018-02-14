#!/bin/bash
set -e  # Exit with non-zero if anything fails

BUILD_BRANCH="master"

# Do not build a new version if it is a pull-request or commit not to BUILD_BRANCH
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
    echo "Not $BUILD_BRANCH, skipping deploy;"
    exit 0
fi

if [ "$TRAVIS_BRANCH" != "$BUILD_BRANCH" ]; then
    echo "Not $BUILD_BRANCH branch but $TRAVIS_BRANCH, skipping deploy;"
    exit 0
fi

FRONTEND_HEAD_COMMIT=`git rev-parse --verify --short HEAD`
FRONTEND_REPO=`git config remote.origin.url`
BACKEND_NAME="landing"
BACKEND_REPO="git@github.com:graphgrail-front/${BACKEND_NAME}.git"

echo "Prepare the key..."
# Encryption key is a key stored in travis itself
OUT_KEY="id_rsa"
echo "Trying to decrypt encoded key..."
openssl aes-256-cbc -k "$ENCRYPTION_KEY" -in deploy/id_rsa.enc -out $OUT_KEY -d -md sha256
chmod 600 $OUT_KEY
echo "Add decoded key to the ssh agent keystore"
eval `ssh-agent -s`
ssh-add $OUT_KEY

echo "Add backend repo as backend"
git add backend ${BACKEND_REPO}
popd

if ! [[ -z $(git status -s) ]] ; then
  echo "Pushing changes to the $BACKEND_REPO $BUILD_BRANCH branch"
  git push backend $BUILD_BRANCH
  echo "All done."
else
  echo "There are no changes in result build, so nothing to push forward. End here."
  exit 0
fi

