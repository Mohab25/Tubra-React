# !/bin/bash
clear
echo "automating git process"
git branch -d main 
git branch main
git checkout main
git push origin main
git checkout master
git branch -d main
echo "end successfully !"
 
