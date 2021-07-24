/**
 * @description 接口通用 参数/结果 类型
 */
declare namespace API {
  // 列表查询通用参数
  type ListQueryParams = {
    current?: number; // 默认antd的配置，需要做转换 => page
    pageSize?: number; // 默认antd的配置，需要做转换 => page_num
  };
  // 通用列表结果类型
  type ListRes = {
    total: number; // 总条数
    page: number; // 页码
    page_num: number; // 每页条数
    data: any[];
  };

  // 通用结果
  type AnyRes = any;

  // 通用列表项参数
  type TableItem = {
    id: number; // id
    created_at: string; // 创建时间
    updated_at: string; // 更新时间
  };

  // 通用列表项响应 -- 改版
  type Item = {
    id: number;
    create_time: string;
    update_time: string;
  };

  // 通用编辑参数
  type EditParams = {
    id: number | string;
  };
  // 通用删除参数
  type DeleteParams = {
    id: number | string;
  };
}
