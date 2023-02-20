## 最新最快得 react 脚手架

> 基于 Vite2、React17、React Router V6、Typescript、Eslint、Prettier 等库，是一个开箱即用得 react 项目脚手架，助您快速开发 react 项目

### 功能列表

- [x] axios 请求封装
- [x] eslint+prettier 代码检查
- [x] husky+lint-staged+cz...提交代码检查
- [x] stylelint css 样式风格检查
- [x] react-router v6 react 路由 v6 版本
- [x] less
- [x] lodash
- [x] antd
- [ ] zustand
- [ ] router封装

### 快速使用

**1.安装依赖**

```
pnpm install
```

**2.本地开发**

```
pnpm dev
```

**3.打包上线**

```
pnpm build
```

### 注意:由于使用`vite，rollup`打包目前不支持`jsx、tsx`以下图片引入写法：

静态图片：

```tsx
// 不生效
<img src="../assets/images/test.png" />
```

```tsx
// 生效
import testPng from '../assets/images/test.png'
;<img src={testPng} />
```

动态图片：

```tsx
import { getImageUrl } from '@/utils'
;<img src={getImageUrl('product/move.svg')} />
```

### mock 模拟数据

根目录下得 mock 文件夹下添加需要模拟数据的 ts 文件，参考`mock/test.ts`即可

### 部署在非根目录

修改`.env.production`中的`VITE_ROUTER_BASE`

```bash
# 路由子目录，根据部署得目录添加
VITE_ROUTER_BASE=/test/
```

```nginx
# nginx
location /test {
    try_files $uri $uri /test/index.html;
}
```

### 修改提交流程

```javascript
// 普通修改
git add .
yarn cz
git push

// 版本迭代
npm run release
git push origin --tags
```

### 前缀规范如下：

- feat: 新功能（feature）
- fix: 修补 bug
- docs: 文档（documentation）
- style: 格式（不影响代码运行的变动）
- refactor: 重构（即不是新增功能，也不是修改 bug 的代码变动）
- perf: 性能优化
- test: 增加测试
- build: 编译相关的修改（例如 webpack, npm, gulp 等）
- ci: CI 相关的修改（例如 Travis, Circle 等）
- chore: 构建过程或辅助工具的变动
- revert: 回滚上一次 commit

commit 示例：

```
feat: 新增后台管理页面
```

开发者如果对以上规范不熟悉，可以使用辅助工具代替 git commit 进行提交。
有以下两种方式：

直接运行 <code>npm run commit</code> 代替 <code>git commit</code>
全局安装 <code>cz</code> 后运行 <code>git cz</code> 代替 <code>git commit</code>

```
yarn add global commitizen
yarn add global cz-conventional-changelog
```

参考链接：
[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
[Commit types](https://github.com/commitizen/conventional-commit-types)

### 其他

#### 参考文档：

**vite:**

https://cn.vitejs.dev/guide/

**react-router v6:**

https://reactrouter.com/docs/en/v6

https://juejin.cn/post/7025418839454122015

https://juejin.cn/post/6844904096059621389

### Ant Design of React
Following the Ant Design specification, we developed a React UI library antd that contains a set of high quality components and demos for building rich, interactive user interfaces.


### ✨ Features
🌈 Enterprise-class UI designed for web applications.
📦 A set of high-quality React components out of the box.
🛡 Written in TypeScript with predictable static types.
⚙️ Whole package of design resources and development tools.
🌍 Internationalization support for dozens of languages.
🎨 Powerful theme customization in every detail.

Dropped support of IE8 after antd@2.0. Dropped support of React 15 and IE9/10 after antd@4.0. Dropped support of IE after antd@5.0.

### Version
Stable: npm package
You can subscribe to this feed for new version notifications: https://github.com/ant-design/ant-design/releases.atom

**tea-component:**

https://qcloudimg.tencentcs.com/tea/index.html#/component/

https://github.com/tea-design/tea-component
