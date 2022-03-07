---
nav:
  title: 组件
group:
  title: 业务组件
  path: /business
---

# Editor 富文本编辑器

基于`Tinymce`封装的富文本编辑器

## 说明

> 该组件基于`Tinymce`进行封装，固定版本为`5.9.1`，其中`powerpaste`插件功能由于需要官网注册 appId，故使用本地版本（PoJie 版）。  
> 插件目录 `/public/plugins/tinymce_5.9.1/tinymce.min.js`
> 详细配置见 [Tinymce 文档](https://www.tiny.cloud/docs/demo/full-featured/)。

## 问题

1. 非会员版，无法使用拖拽图片到编辑器等功能
   解决：使用 PoJie 版，[PoJie 方法详见](https://github.com/9kg/tinymce_powerpaste)

## 代码演示

### 基本使用

<!-- <code src="./index.tsx" title="基础使用"></code> -->

```jsx
import React from 'react';
import Editor from '@/components/Editor';

export default () => (
  <div>
    <Editor initialValue="<p>这是一段测试的初值</p>" height={300} />
  </div>
);
```

### 在 ProForm 中使用

测试

```jsx
import React from 'react';
import ProForm from '@ant-design/pro-form';
import { ProFormEditor } from '@/components/ProFormItem';

export default () => (
  <ProForm>
    <ProFormEditor
      fieldProps={{
        initialValue: 'ProForm中使用，测试初始文本',
        height: 300,
      }}
    />
  </ProForm>
);
```

<API src="./index.tsx"></API>
