<h1 align="center">常用命令</h1>

本文总结了各种技术栈常用的命令。为什么要记录和总结，因为命令是记不过来的。

## Linux

```ls```简介的方式查看当前文件夹下所有的文件名

```ll```查看当前文件夹下所有的文件及详情

```mkdir```创建一个文件夹

```ps -ef | grep xxxx```查看某程序进程是否存在

## Git

```git clone url ```将项目clone到本地

```git clone -b branch url```clone指定分支的项目到本地

```git status```查看当前git 管理的项目是否存在修改、提交的文件

```git commit -a -m 'xxx'```将文件提交到本地暂存区

```git pull```拉取远程分支的项目

```git push```将暂存区的项目版本推送到远程仓库

```git branch```查看当前项目下的所有分支

```git branch branchName```新建一个分支

```git checkout branchName```选择项目分支

```git log```一般的查看提交日志的方式

```git log --decorate --graphe --oneline --all```查看项目所有分支的提交情况 

## Maven

```mvn dependency:tree``` 查看项目中所有的依赖

```mvn dependency:list``` 通过树的方式查看项目中所有的依赖

