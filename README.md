# 介绍
使用electron和flask构建的windows桌面程序

# 安装

1.本项目需要使用[nodeJs](https://nodejs.org/zh-cn),按照官网说明或者其他博客安装nodeJs,确保在windows命令行（推荐powershell）下命令`node -v`和`npm -v`能得到正确输出。本项目使用的node版本为18.15.0,npm版本为9.5.0。

```
npm install electron --save-dev

npm install electron-builder --save-dev

```
2.安装[python](https://www.python.org/),本项目python版本为3.10.9,并执行`pip3 install pipenv`安装虚拟环境和依赖管理工具,安装完成后执行`pipenv shell`和`pipenv install`即可。


# 使用

`npm run build-python`将python打包为exe文件。
`npm run build-electron`打包整个项目。