# EVA & COCOS 's 2d benchmark

[在线地址](https://iTgo-lyq.github.io/2d-benchmark)

## 运行

导入 cocos 项目 `/workspace/cocos` 到 cocos creator

构建项目至 `/public/cocos` 目录下

启动项目

```
npm install
npm start
```

## Assets 资源

cocos 使用 OSS 资源，
BASE_URL 定义于  `/workspace/cocos/assets/scripts/ChangeScene.ts`

eva 在开发环境使用本地资源，构建后使用 OSS 资源，
BASE_URL 定义于 `/workspace/eva/src/util.ts`