---
nav:
  title: 组件
group:
  title: 业务组件
  path: /business
---

# OSS 上传组件

OSS 上传组件包含多个组件，都是基于`ali-oss sdk`和`ant upload`封装的组件。

## 组件设计说明

<!-- ### 图片重复识别

MD5 形式，[参考地址](http://forsigner.com/browser-md5-file/)，暂时没有加此功能，有需要再加 -->

### 文件命名

1. 图片需求单

```js
// 文件名
const path = `${需求单id}/${sku}/${原文件名称}`;
```

2. 通用图片上传

```js
// 文件名
const defaultFileName = `${原文件名}-${唯一id}.${后缀}`;
// 如果有自定义文件名，使用自定义文件名
const path = fileName || `${当前日期(YYYY - MM - DD)}/images/${defaultFileName}`;
```

### OSS 图片上传进度条

[Antd Upload](https://ant.design/components/upload-cn/)
[Custom Request](https://github.com/react-component/upload#customrequest)  
[参考文章](https://www.crazyming.com/note/2306/)

## 单图上传

### 基础使用

```tsx
import React from 'react';
import SingleImageUpload from '@/components/OSS/SingleImageUpload';

export default () => (
  <div>
    <SingleImageUpload width={120} height={120} onChange={(url: string) => console.log(url)} />
  </div>
);
```

### 增加自定义提示

```tsx
import React from 'react';
import SingleImageUpload from '@/components/OSS/SingleImageUpload';

export default () => (
  <div>
    <SingleImageUpload tips="这是自定义提示文本" />
  </div>
);
```

## 多图上传

### 基础使用

```tsx
import React from 'react';
import MultipleImageUpload from '@/components/OSS/MultipleImageUpload';

export default () => (
  <div>
    <MultipleImageUpload onChange={(urls: string[]) => console.log(urls)} />
  </div>
);
```

### 限制总数/大小

限制总数为 10 张，大小为 1MB

```tsx
import React from 'react';
import MultipleImageUpload from '@/components/OSS/MultipleImageUpload';

export default () => (
  <div>
    <MultipleImageUpload maxCount={10} limit={1} onChange={(urls: string[]) => console.log(urls)} />
  </div>
);
```

### 在 ProForm 中使用

```tsx
import React from 'react';
import ProForm from '@ant-design/pro-form';
import { ProFormMultipleImageUpload } from '@/components/ProFormItem';

export default () => (
  <ProForm>
    <ProFormMultipleImageUpload label="多图上传" name="test2" />
  </ProForm>
);
```

## 参数

单图上传参数
<API src="./SingleImageUpload/index.tsx" export='["ApiProps"]' hideTitle/>

<hr/>

多图上传参数
<API src="./MultipleImageUpload/index.tsx" export='["ApiProps"]' hideTitle/>
