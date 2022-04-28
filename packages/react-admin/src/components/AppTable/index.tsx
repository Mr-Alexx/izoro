/**
 * @description 二次封装ProTable，统一基础配置
 * @author 潜
 */
import type { ActionType, ListToolBarProps, ProColumns, ProTableProps } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import type { ParamsType } from '@ant-design/pro-provider';
import styles from './index.less';
import type { SearchConfig } from '@ant-design/pro-table/lib/components/Form/FormRender';
import type { ToolBarOptions } from './TableToolBar';
import TableToolBar from './TableToolBar';
import type { OptionConfig } from '@ant-design/pro-table/lib/components/ToolBar';
import { RouteContext } from '@ant-design/pro-layout';
import type { TablePaginationConfig } from 'antd';
import { Button, Dropdown, Menu, Space } from 'antd';
import classNames from 'classnames';

// @ts-ignore
import shortid from 'shortid';
// const shortid = require('shortid');

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
      position?: 'top' | 'bottom'; // 当表格有tab和工具栏时，设置为top时，将tab和工具栏上下位置互换
    };
    footerToolBar?: {
      onCancel?: () => void;
      extra?: React.ReactNode;
      content?: ReactNode[]; // React.ReactNode |
    };
    /** 数据取值的键，如果是false，则直接返回data，如果有值则返回data[dataKey] */
    dataKey?: string | false; // 数据取值，如果是false，则直接返回data，如果有值则返回data[dataKey]
  },
) => {
  const {
    actionRef,
    rowKey,
    columns,
    sticky,
    options,
    pagination,
    search,
    columnsState,
    toolbar,
    toolBarRender,
    // tableAlertRender,
    // tableAlertOptionRender,
    footerToolBar,
    rowSelection,
    scroll,
    request,
    dataKey,
  } = props;
  const selectedRows = useRef<ProColumns<T, ValueType>[]>();

  // 合并 pagination 默认配置与用户设置
  let newPagination: false | TablePaginationConfig | undefined;
  if (pagination === false) {
    newPagination = pagination;
  } else {
    newPagination = {
      showSizeChanger: true,
      pageSize: 30,
      showQuickJumper: true,
      position: ['bottomLeft'], // 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
      pageSizeOptions: ['10', '20', '30', '40', '50', '100', '200'],
      ...pagination,
    };
  }

  // 合并 search 默认配置与用户设置
  let newSearch: false | SearchConfig | undefined;
  if (search === false) {
    newSearch = search;
  } else {
    newSearch = {
      syncToUrl: true, // 搜索的时候
      syncToInitialValues: false, // 是否重置到初始设置的值
      defaultColsNumber: 12, // 默认显示列数，按照默认一行4个来说，可以显示3行
      // @ts-ignore
      ...search,
    };
  }

  // 合并 options 默认配置与用户设置
  let newOptions: false | OptionConfig | undefined;
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

  // 统一toolbar配置
  // @ts-ignore
  let newToolBarRender;
  if (toolBarRender === false) {
    newToolBarRender = false;
  } else {
    newToolBarRender = (
      action: ActionType | undefined,
      rows: {
        selectedRowKeys?: (string | number)[];
        selectedRows?: T[];
      },
    ) => {
      let tools: ReactNode[];
      if (typeof toolBarRender === 'function') {
        tools = toolBarRender(action, rows);
      } else {
        tools = [''];
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
            key="toolbar"
            options={toolsOption}
            columns={columns?.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))}
          />,
        ];
      }
      return tools;
    };
  }

  const position: string = toolbar?.position || 'top';

  return (
    <RouteContext.Consumer>
      {({ isMobile, collapsed }) => {
        return (
          <ProTable<T, U, ValueType>
            actionRef={actionRef}
            // 自定义tab和工具栏上下位置
            className={classNames(
              position ? styles[`app-table-toolbar--${position}`] : '',
              styles['app-table'],
              collapsed ? styles['app-table--collapsed'] : '',
            )}
            style={{ marginBottom: selectedRows.current && selectedRows.current.length > 0 ? 48 : 0 }}
            {...props}
            rowKey={rowKey || 'id'}
            sticky={
              sticky === undefined
                ? {
                    offsetHeader: 48,
                    offsetScroll: selectedRows.current && selectedRows.current.length > 0 ? 48 : 0,
                  }
                : sticky
            }
            scroll={scroll ?? { x: 1300 }}
            pagination={newPagination}
            search={newSearch}
            toolbar={toolbar}
            options={newOptions}
            // 自定义列设置
            // columnsStateMap={newColumnsStateMap}
            // onColumnsStateChange={changeColumnsStateMap}
            // 自定义多选提示
            // tableAlertRender={tableAlertRender || false}
            tableAlertOptionRender={({ selectedRowKeys, selectedRows: _selectedRows }) => {
              const selectedLenth = selectedRowKeys.length;
              selectedRows.current = _selectedRows;
              return (
                <div className={styles['row-selection-action-content']}>
                  <a
                    style={{ marginRight: 15 }}
                    onClick={
                      // @ts-ignore
                      actionRef?.current?.clearSelected
                    }>
                    取消选择
                  </a>
                  <div style={{ display: selectedLenth > 0 ? '' : 'none' }}>
                    {!isMobile && (
                      <Space direction="horizontal" size={5}>
                        {footerToolBar?.content}
                      </Space>
                    )}

                    {isMobile && Array.isArray(footerToolBar?.content) && (
                      <Dropdown
                        overlay={() => (
                          <Menu>
                            {footerToolBar?.content?.map(item => (
                              <Menu.Item key={`${shortid.generate()}`}>{item}</Menu.Item>
                            ))}
                          </Menu>
                        )}
                        trigger={['click']}
                        placement="topCenter">
                        <Button>更多操作</Button>
                      </Dropdown>
                    )}
                  </div>
                </div>
              );
            }}
            rowSelection={
              rowSelection
                ? {
                    ...rowSelection,
                    alwaysShowAlert: selectedRows.current && selectedRows.current.length > 0,
                  }
                : false
            }
            // 自定义工具栏
            // @ts-ignore
            toolBarRender={newToolBarRender}
            // 封装请求，增加排序配置，格式化响应
            request={
              request
                ? async (params, sorter, filter) => {
                    // 格式化排序未 字段名 desc/asc,字段名 desc/asc
                    let order: string | undefined;
                    const sorterArr = Object.entries(sorter);
                    if (sorterArr.length > 0) {
                      order = sorterArr.map(item => `${item[0]} ${item[1] === 'descend' ? 'desc' : 'asc'}`).join(',');
                    }
                    try {
                      const data = await request(
                        {
                          ...params,
                          order,
                        },
                        sorter,
                        filter,
                      );
                      if (!data) {
                        throw new Error();
                      }
                      return {
                        total: !data ? 0 : dataKey === false ? data?.length : data.total,
                        data: !data ? [] : dataKey === false ? data : dataKey ? data[dataKey] : data.list || data.data,
                      };
                    } catch (err) {
                      return {
                        total: 0,
                        data: [],
                      };
                    }
                  }
                : undefined
            }
            // 自定义列 配置 https://procomponents.ant.design/components/table/#columnsstatetype
            columnsState={{
              // onChange: value => console.log('[a]', value),
              // 持久化的key，保持唯一性，默认使用页面的url
              // 有个问题：页面内使用多个Table时，需要自定义key
              persistenceKey: columnsState?.persistenceKey || location.pathname,
              // 持久化到localStorage
              persistenceType: columnsState?.persistenceType || 'localStorage',
            }}
          />
        );
      }}
    </RouteContext.Consumer>
  );
};

export default AppTable;
