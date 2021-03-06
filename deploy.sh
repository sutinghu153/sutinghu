# 确保脚本抛出遇到的错误
#set -e

# 生成静态文件
yarn docs:build

# 进入生成的文件夹，这里是默认的路径，可以自定义

cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo www.dglgd.com > CNAME

git init
git add -A
git commit -m 'deplosy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:<BranchName>
git push -f git@github.com:sutinghu153/sutinghu.git master:blogs

#cd -

# 最后发布的时候执行 bash deploy.sh
yarn docs:build
cd docs/.vuepress/dist
echo www.dglgd.com > CNAME
git init
git add -A
git commit -m 'deplosy'
git push -f git@github.com:sutinghu153/sutinghu.git master:blogs