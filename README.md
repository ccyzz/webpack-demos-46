# 02

```bash
# npm install --save-dev webpack webpack-cli
yarn add -D webpack webpack-cli
```

为了保证多人协作的时候版本统一，我们最好把 webpack 装到你的项目中。

- win10
- 输入默认英文
- win7 用户
- 安装软件的时候尽量使用默认安装目录
  + 即便修改也不要改到带有中文的目录中
  + 还有带有空格的目录


1. 使用 yarn

2. 把 webpack 安装到项目中

```bash
# npm install --save-dev webpack webpack-cli
yarn add -D webpack webpack-cli
```

3. 配置 `npm scripts` 打包命令

```json
"scripts": {
  "build": "webpack src/index.js"
}
```

4. 执行打包命令

```bash
# npm run build
# npm start | yarn start
yarn run build
```
