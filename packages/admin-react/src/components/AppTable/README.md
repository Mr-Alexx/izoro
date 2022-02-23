---
group:
  title: 业务组件
  path: /business
---

# Table 表格

> 基于[ProTable](https://procomponents.ant.design/components/table)封装的表格，增加了一些常用配置，统一风格。  
> 基本使用请参考[ProTable](https://procomponents.ant.design/components/table)的文档

> 另有性能接近于 antd table 的组件，[XRender](https://x-render.gitee.io/table-render/demo)

## 参数

基本参数请对照[ProTable](https://procomponents.ant.design/components/table#protable)文档。

额外参考如下：
| 参数 | 说明 | 类型 | 默认值 |
| --------------- | ---------------------------------- | ---------------------------- | ------ |
| value | 输入框的值 | `string` | - |
| onChange | 值修改后触发 | `(value?: string) => void` | - |
| onSearch | 查询后触发 | `(value?: string) => void` | - |
| options | 选项菜单的的列表 | `{label,value}[]` | - |
| defaultVisible | 输入框默认是否显示，只有第一次生效 | `boolean` | - |
| visible | 输入框是否显示 | `boolean` | - |
| onVisibleChange | 输入框显示隐藏的回调函数 | `(visible: boolean) => void` | - |
