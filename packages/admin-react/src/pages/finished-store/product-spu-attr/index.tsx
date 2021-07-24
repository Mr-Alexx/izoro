import type { FC } from 'react';
import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Select } from 'antd';
import { debounce } from 'lodash';
import { getPageSettings, updatePageSettings } from '@/services/setting';

import TableToolBar from '@/components/TableToolBar';

import type { TableListItem, TableListPagination } from './data';

import { getProductSpuAttr } from '@/services/product';

const { Option } = Select;

const ProductSpuAttr: FC = () => {
  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  // 更新自定义列，3秒内只触发一次
  const saveCustomColumns = debounce(() => {
    updatePageSettings({ data: columnsStateMap });
  }, 3000);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '#',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: '200',
    },
    {
      title: '语言',
      dataIndex: 'language',
      key: 'language',
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '汉语',
            value: '1',
          },
          {
            label: '英语',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
      // renderFormItem: (_, { defaultRender }) => {
      //   return (
      //     <Select key="searchSelect" showSearch placeholder="请选择" allowClear>
      //       {
      //         <>
      //           <Option key="1" value="汉语">
      //             汉语
      //           </Option>
      //           <Option key="2" value="英语">
      //             英语
      //           </Option>
      //         </>
      //       }
      //     </Select>
      //   );
      // },
    },
    {
      title: '关联中文名',
      dataIndex: 'chinese_name',
      key: 'chinese_name',
      width: '200',
      search: false,
    },
  ];
  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        sticky
        headerTitle="SPU管理"
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
        ]}
        columns={columns}
        request={getProductSpuAttr}
        options={{
          fullScreen: true,
          reload: true,
          setting: true,
          density: true,
        }}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={map => {
          // 即时响应
          setColumnsStateMap(map);
          // 存储更新，采用debounce，防止触发多个请求
          saveCustomColumns();
        }}
      />
    </PageContainer>
  );
};
export default ProductSpuAttr;
