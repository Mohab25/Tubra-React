# !/bin/bash
clear
echo "automating git process"
git branch main
git checkout main
git push origin main
git checkout master
git branch -d main
echo "commit end successfully !"
echo "input pull message title"
read title
echo "input pull comment"
read comment
$ curl -v -u Mohab25:cf5596a1fd293eba2ba3dde38497c2333ecd97f3 -H "Content-Type:application/json" -X POST https://api.github.com/repos/Mohab25/Tubra-React/pulls -d '{"title":'$title', "body":'$comment', "head": "main", "base": "master"}'

echo "end making pull request"
