rm -rf out
gulp
cd out
git init
git add --all
git commit -m "deploy"
git push --force https://github.com/axelhzf/js-training-doc.git master:gh-pages