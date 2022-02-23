---
group:
  title: 业务组件
  path: /business
---

# PageContainer 页面容器

基于 ProComponent [PageContainer](https://procomponents.ant.design/components/page-container)封装的组件，额外增加了一些配置，基础使用参考[PageContainer](https://procomponents.ant.design/components/page-container)文档。

## 基本使用

### 返回功能

```tsx
import React from 'react';
import AppPageContainer from '@/components/AppPageContainer';

export default (): React.FC => <AppPageContainer back>带返回按钮的页面容器</AppPageContainer>;
```

### 锚点功能

```tsx
import React from 'react';
import AppPageContainer from '@/components/AppPageContainer';
import { Card, Button } from 'antd';

export default (): React.FC => (
  <AppPageContainer
    back
    anchor={{
      list: ['基础信息', '图文信息', '商品规格', '物流信息'],
    }}
    extra={
      <div>
        <Button.Group>
          <Button>功能1</Button>
          <Button>功能2</Button>
        </Button.Group>
      </div>
    }>
    <Card id="基础信息">这是基础信息内容</Card>
    <Card id="图文信息">这是图文信息内容</Card>
    <Card id="商品规格">这是商品规格内容</Card>
    <Card id="物流信息">这是物流信息内容</Card>
  </AppPageContainer>
);
```

## 参数

基本参数请对照[PageContainer](https://procomponents.ant.design/components/page-container#api)。  
额外参数如下：
| 参数 | 说明 | 类型 | 默认值 |
| --------------- | ---------------------------------- | ---------------------------- | ------ |
| back | 返回 | `boolean` | false |
| anchor | 锚点列表 | `string[]` | - |
| footerAlign | 底部内容 x 轴对齐方式 | `'left' \| 'center' \| 'right'` | - |

<!-- | onBack | 自定义返回方法 |  -->
