---
group:
  title: 业务组件
  path: /business
---

# Logs 日志组件

## 基础使用

在详情页内使用

```tsx | pure
import React from 'react';
import Logs from '@/components/Logs';

export default (): React.FC => (
  <div>
    <Logs />
  </div>
);
```

## 在列表页等其它地方使用

需要传入路由和详情 id

```tsx | pure
import React from 'react';
import Logs from '@/components/Logs';

export default (): React.FC => (
  <div>
    <Logs route="/a" id={1} />
  </div>
);
```

## 参数

<API src="./index.tsx" hideTitle />
