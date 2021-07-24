// 二次封装ProTable，主要是统一基础配置
import type { ActionType, ColumnsState, ListToolBarProps, ProTableProps } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import type { ParamsType } from '@ant-design/pro-provider';
import styles from './index.less';
import type { SearchConfig } from '@ant-design/pro-table/lib/components/Form/FormRender';
import type { ToolBarOptions } from '@/components/TableToolBar';
import TableToolBar from '@/components/TableToolBar';
import type { OptionConfig } from '@ant-design/pro-table/lib/components/ToolBar';

// 改造proTable的类型，增加一些配置
type SearchConfigExtra = SearchConfig & {
  syncToUrl?: boolean; // 搜索的时候
  syncToInitialValues?: boolean; // 是否重置到初始设置的值
};
type OptionConfigExtra = OptionConfig & ToolBarOptions;

const AppTable = <T extends Record<string, any>, U extends ParamsType = {}, ValueType = 'text'>(
  props: ProTableProps<T, U, ValueType> & {
    defaultClassName?: string;
    search?: SearchConfigExtra | false; // 由于pro component文档没有补全这两个参数，这里封装的时候补全了
    options?: OptionConfigExtra | false; // 增加自定义工具栏配置
    toolbar?: ListToolBarProps & {
      position?: 'top'; // 当表格有tab和工具栏时，设置为top时，将tab和工具栏上下位置互换
    };
  },
) => {
  const {
    rowKey,
    columns,
    sticky,
    options,
    pagination,
    search,
    columnsStateMap,
    toolbar,
    toolBarRender,
    onColumnsStateChange,
  } = props;
  // 合并 pagination 默认配置与用户设置
  let newPagination;
  if (pagination === false) {
    newPagination = pagination;
  } else {
    newPagination = {
      showSizeChanger: true,
      pageSize: 50,
      showQuickJumper: true,
      position: ['bottomRight'], // 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
      ...pagination,
    };
  }

  // 合并 search 默认配置与用户设置
  let newSearch;
  if (search === false) {
    newSearch = search;
  } else {
    newSearch = {
      syncToUrl: true, // 搜索的时候
      syncToInitialValues: false, // 是否重置到初始设置的值
      // @ts-ignore
      ...search,
    };
  }

  // 合并 options 默认配置与用户设置
  let newOptions;
  if (options === false) {
    newOptions = options;
  } else {
    newOptions = {
      fullScreen: true,
      reload: true,
      setting: true,
      density: true,
      // @ts-ignore
      ...options,
    };
  }

  // 自定义列统一设置
  const [newColumnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  const changeColumnsStateMap = (map: Record<string, ColumnsState>) => {
    if (onColumnsStateChange) {
      onColumnsStateChange(map);
      return;
    }
    // 即时响应
    setColumnsStateMap(map);
    // 存储更新，采用debounce，防止触发多个请求
    // saveCustomColumns();
  };
  useEffect(() => {
    // 初始化自定义列
    if (columnsStateMap) {
      setColumnsStateMap(columnsStateMap);
    }
    // getPageSettings('role').then((data: Record<string, any>) => {
    //   setColumnsStateMap(data);
    // });
  }, []);

  return (
    <ProTable<T, U, ValueType>
      // 自定义tab和工具栏上下位置
      className={toolbar?.position ? styles[`app-table-toolbar--${toolbar?.position}`] : ''}
      {...props}
      rowKey={rowKey || 'id'}
      sticky={sticky === undefined ? true : sticky}
      // @ts-ignore
      pagination={newPagination}
      search={newSearch}
      toolbar={toolbar}
      options={newOptions}
      // 自定义列设置
      columnsStateMap={newColumnsStateMap}
      onColumnsStateChange={changeColumnsStateMap}
      // 自定义工具栏
      // @ts-ignore
      toolBarRender={(
        action: ActionType | undefined,
        rows: {
          selectedRowKeys?: (string | number)[];
          selectedRows?: T[];
        },
      ) => {
        if (toolBarRender === false) {
          return null;
        }
        let tools: ReactNode[];
        if (typeof toolBarRender === 'function') {
          tools = toolBarRender(action, rows);
        } else {
          tools = [];
        }
        const toolsOption: ToolBarOptions = {};
        if (options) {
          // @ts-ignore
          const { download, mark } = options;
          if (download) {
            toolsOption.download = download;
          }
          if (mark) {
            toolsOption.mark = mark;
          }
        }
        if (Object.keys(toolsOption).length > 0) {
          return [
            ...tools,
            <TableToolBar
              options={toolsOption}
              columns={columns?.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))}
            />,
          ];
        }
        return tools;
      }}
    />
  );
};

export default AppTable;
