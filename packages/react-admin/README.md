# 天枢系统

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).

## React Ant-Design-Pro 学习路线

1. React

- [官方文档](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/getting-started.html)
- 注意一个特殊的东西（vue3 里也用到），[React Hook](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/hooks-intro.html)
-

2. Ant Design

- [Ant-Design 文档](https://ant.design/docs/react/introduce-cn)
- [Ant-Design-Pro 文档-v5 版](https://beta-pro.ant.design/docs/getting-started-cn)
- [ProComponents 文档](https://procomponents.ant.design/docs/intro)，Ant-Design-Pro 会大量使用里面的布局组件。

3. Typescript

- [Typescript 中文文档](https://www.tslang.cn/docs/handbook/basic-types.html)
- [Typescript 视频教程](https://www.bilibili.com/video/BV1Ba4y1H77E?p=13&t=1240)

## 各路插件说明

### 定制列拖动实现，使用 dnd 插件

[react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

## vscode 自动格式化项目配置

配置参考：  
[VSCode-Prettier 和 ESLint 如何和气共处](https://www.shangmayuan.com/a/7ab1a006a0764bbb87488ffa.html)  
[AntDesignPro 中台项目迁移 Typescript，接入 Eslint+Prettier 代码格式化](https://blog.csdn.net/xgangzai/article/details/106435557)

### vscode 配置

1. 安装 `Prettier - Code formatter` 拓展
2. 安装 `Eslint` 拓展
3. 有全局设置和本地设置，建议使用本地配置

- 全局配置会影响所有 vscode 项目，直接设置 vscode，将下面的代码复制到`settings.json`内
- 本地配置，在项目内新建 `.vscode`目录，目录下新建 `settings.json`文件，将下面的代码复制进去，就只会格式化当前项目了。

```json
{
  // ...其它配置

  // 使用项目的eslint配置文件 + .prettier自动格式化代码
  "files.autoSave": "off",
  "eslint.options": {
    "extensions": [".js", ".vue", ".ts", ".tsx"]
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.enable": true, //是否开启vscode的eslint

  "editor.formatOnSave": true,
  "eslint.validate": [
    //确定校验准则
    "javascript",
    "javascriptreact",
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ]
}
```

### 项目配置

`eslint + prettier` 组合格式化 `ts`、`js` 等文件  
`stylelint` 格式化 `css`、`less`、`scss`文件

1. 根目录下新建 `.eslintrc.js`文件 ，配置如下

```js
// 这里采用umijs的默认eslint配置，外加个人配置的rules
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-console': 'off', // 是否允许console
    'no-nested-ternary': 'off', // 是否允许三目运算
    'object-curly-spacing': ['error', 'always'], // 对象前后保留空格
    'space-before-function-paren': [2, 'always'], // 强制在函数名与(间有空格
  },
};
```

2. 根目录下新建 `.prettierrc.js` 文件，配置如下

```js
module.exports = {
  parser: 'babel', // // 格式化的解析器，默认是babylon,会自动根据输入文件推断，不用更改设置
  printWidth: 80, // 超过最大值换行
  semi: true, // 始终加分号
  singleQuote: true, // js字符串使用单引号
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  trailingComma: 'all', // 对象末尾始终保留逗号，方便添加新行
  bracketSpacing: true, // 对象前后保留空格
  jsxBracketSameLine: true, // 在jsx中把'>' 是否单独放一行
  arrowParens: 'avoid', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 'bracketSpacing': true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  requirePragma: false, // 若为true，文件顶部加了 /*** @prettier */或/*** @format */的文件才会被格式化
  insertPragma: false, // 当requirePragma参数为true时,此参数为true将向文件顶部添加 /** @format*/
  tabWidth: 2, // 缩进字符
  useTabs: false, // 使用tab缩进
  endOfLine: 'auto',
  embeddedLanguageFormatting: 'auto', // 是否格式化嵌入到JS中的html标记的代码段或者Markdown语法 auto-格式化 off-不格式化
  proseWrap: 'never', // // 有效选项[always|never|preserve]。当Markdown文本超过printWidth时,是否换行,always-换行 never-不换行 preserve保持原样
};
```

3. 根目录下新增 `.stylelintrc.js` 文件，配置如下

```js
// 这里采用umijs默认的stylelint配置
const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
};
```

## 审批流

[vue 仿钉钉审批流](https://stavinli.gitee.io/workflow/#/approval/setting)  
[仿钉钉后台审批流程](https://github.com/SNFocus/approvalFlow)
[react-jsplumb-flow](https://github.com/wsyxl365/react-jsplumb-flow)  
[reaflow](https://reaflow.dev/?path=/story/docs-introduction--page)

## 状态管理

[如何在 React Hooks 项目中进行状态管理？](https://zhuanlan.zhihu.com/p/76109006)

## 代码问题复现工具

[codesandbox](https://codesandbox.io/)

## JWT 采用前端续期的问题

`refreshAfter`: 该时间后可刷新  
`accessExpire`: 该时间后过期  
一般来说 `refreshAfter` 是 `accessExpire` 的一半

1. 用户登录后，保存 token 到 cookie，写入过期时间
2. 用户操作（有调用接口即为操作）后，先判断 token 时候在可刷新时间范围内（ refreshAfter < 可刷时间 < accessExpire ）

- 如果在可刷新范围，调用刷新 token 接口，重新设置 token
- 否则

  - 如果 < refreshAfter，则不做操作
  - 如果 > accessExpire，则 token 过期，强制退出登录

## 关于接口设计

### 传参设计

- `post` 接口，统一使用 json 格式传参，`Content-Type` 默认为 `application/json`
- `get` 接口，统一使用 query 形式

### 响应设计

默认响应

```json
// 列表响应
{
  "code": 0, // 响应码，0成功，1失败
  "msg": "成功", // 错误/成功消息
  "response": {
    // 数据主题
    "total": 1,
    "list": ["x"]
  }
}
```

## Antd Issues

[Table defaultExpandAllRows={true}不展开问题](https://github.com/ant-design/ant-design/issues/4145)

## 部署

[Antd pro v5 部署](https://beta-pro.ant.design/docs/deploy-cn)

### 线上部署 + mock 形式

1. 项目配置
   采用 browserHistory 形式，即路由如：/system/user。  
   需要在 `confit.ts` 内配置

```typescript
export default defineConfig {
  // ...
  exportStatic: {},
}
```

此配置会在打包时为每个路由生成 `index.html` 文件，在页面刷新时可以找到该资源。  
如果不配置，则刷新时页面会 404，因为找不到该目录资源

2. nginx 配置

```php
server {
    listen 80;
    server_name local.test.com;
    # gzip config
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    root /Users/qian/Desktop/work/tiantuo/operation-system-frontend/dist;

    location / {
        # 用于配合 browserHistory使用
        try_files $uri $uri/ /index.html;

        # 如果有资源，建议使用 https + http2，配合按需加载可以获得更好的体验
        # rewrite ^/(.*)$ https://preview.pro.ant.design/$1 permanent;

    }
    location /api {
        # proxy_pass https://ant-design-pro.netlify.com;
        proxy_pass http://localhost:8001;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   X-Real-IP         $remote_addr;
    }
}
```

3. 启动

```cmd
cd 项目目录
npm i umi-serve -D
npm run mock
```

## 审批流设计

### 框架选型

阿里的[antv-x6](https://x6.antv.vision/)

### 后端数据格式

```js
var data = {
  name: '审批流名称',
  code: 'xxx', // 唯一编码，编辑时带上 (不允许修改)
  id: 2, // ID,编辑时带上
  work_id: 1, // 业务ID （不允许修改）
  model: 'purchaseModel', // 模型（不允许修改）
  front_route: '/xx', // 前端路由
  status: 1, // 状态：0 禁用，1 启用
  nodes: [
    // 后端需要的数据
    {
      id: 1, // 节点ID(不请求后端，那可以前端先生成)
      type: 1, // 节点类型（1 条件节点， 2 执行节点， 3 结束节点， 4 开始节点）
      approver_type: 1, // 审批人类型：1  指定人员， 2 角色， 3 上级审核
      approver_ids: [13, 15], // 审批人ID集合，根据类型，可能是用户ID，角色ID，或者0（上级审核）
      business_status: 2, // 审核状态（每个节点需要绑定一个对应的审核状态，以便业务识别）
      condition: {
        type: 1, // 条件类型：1 表达式， 2 方法调用
        expression: [
          // 表达式，针对表达式类型
          {
            field: 'warehouse_id', // 字段名称
            comparer: '>', // 比较符号
            value: 3, // 用于比较的值
            next_node: 5, // 下一节点ID
          },
          // ...多个表达式
        ],
        call: {
          // 方法调用，针对方法调用类型
          rpc: 'purchaseRpc', // 业务RPC
          method: 'confirmPurchase', // 方法名
          result: [
            // 返回值
            {
              res: 1, // 返回值为1
              next_node: 7, // 下一节点ID
            },
            // ...其它返回值
          ],
        },
      },
      action: [
        // 执行内容，针对执行节点
        {
          rpc: 'purchaseRpc', // 业务RPC
          method: 'confirmPurchase', // 方法名
          button_name: '确认', // 按钮名称
          button_id: 11, // 按钮ID（生成唯一标识即可）
          next_node: 7, // 下一节点ID
        },
        // ...其它操作
      ],
    },
  ],
  frontend: '', // 前端需要保存的数据，json串放一个字符串中
};
```
