import type { FC } from 'react';
import { useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { Button } from 'antd';
import { debounce } from 'lodash';
import { Link } from 'umi';
import moment from 'moment';
import 'moment/locale/zh-cn';

import TableToolBar from '@/components/TableToolBar';
import type { TableListItem, TableListPagination } from './data';

import { getPageSettings, updatePageSettings } from '@/services/setting';
import { getProductDevelopmentSheet } from '@/services/product';

moment.locale('zh-cn');

const ProductDevelopmentSheetList: FC = () => {
  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);
  // 更新自定义列
  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  // 更新自定义列，3秒内只触发一次
  const saveCustomColumns = debounce(() => {
    updatePageSettings({ data: columnsStateMap });
  }, 3000);

  // 批量操作单选按钮
  const [radioBtnValue, setRadioBtnValue] = useState<string>('');

  // 跟进人弹框
  const [printModalVisible, updatePrintModalVisible] = useState<boolean>(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: 120,
      hideInTable: true,
    },
    {
      title: 'SPU',
      dataIndex: 'spu',
      key: 'spu',
      width: 120,
    },
    {
      title: 'SPU名称',
      dataIndex: 'spu_name',
      key: 'spu_name',
      width: 200,
      search: false,
    },
    {
      title: '	首个SKU图片',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 140,
      valueType: 'image',
      search: false,
    },
    {
      title: '产品分类',
      dataIndex: 'category',
      key: 'category',
      width: 150,
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
    },
    {
      title: '产品采购状态',
      dataIndex: 'purchase_status',
      key: 'purchase_status',
      width: 150,
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      width: 150,
      search: false,
    },
    {
      title: '业务线',
      dataIndex: 'service_line',
      key: 'service_line',
      width: 150,
    },
    {
      title: '跟进人',
      dataIndex: 'follow_people',
      key: 'follow_people',
      width: 150,
    },
    {
      title: '总销售量',
      dataIndex: 'total_sales',
      key: 'total_sales',
      width: 120,
      search: false,
    },
    {
      title: 'Item信息',
      dataIndex: 'item_msg',
      key: 'item_msg',
      width: 120,
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      width: 150,
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: value => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 150,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      width: 150,
      dataIndex: 'updated_at',
      key: 'updated_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: value => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Link key="1" to={`/finished-store/product-development-sheet/view?id=${row.id}`}>
          查看
        </Link>,
        <Link
          key="2"
          to="#"
          onClick={() => {
            updatePrintModalVisible(true);
          }}>
          指派人员
        </Link>,
      ],
    },
  ];
  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}>
      <ProTable<TableListItem, TableListPagination>
        sticky
        rowKey="id"
        columns={columns}
        request={getProductDevelopmentSheet}
        search={{
          labelWidth: 120,
        }}
        headerTitle="报价方案管理"
        scroll={{ x: 1800 }}
        toolBarRender={() => [
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={map => {
          // 即时响应
          setColumnsStateMap(map);
          // 存储更新，采用debounce，防止触发多个请求
          // saveCustomColumns();
        }}
        options={{ fullScreen: true, reload: true, setting: true, density: true }}
      />
      {selectedRows?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}>
                {selectedRows.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }>
          <>
            <Button value="1">批量指派</Button>
            <Button value="2">批量打版</Button>
          </>
        </FooterToolbar>
      )}
      <ModalForm
        title="打印SKU条形码"
        width={800}
        layout="horizontal"
        visible={printModalVisible}
        onVisibleChange={updatePrintModalVisible}
        onFinish={async value => {
          console.log(value);
          updatePrintModalVisible(false);
        }}>
        <ProFormSelect
          showSearch
          mode="multiple"
          allowClear
          options={[
            {
              value: '1',
              label: '小红',
            },
            {
              value: '2',
              label: '小花',
            },
            {
              value: '3',
              label: '小绿',
            },
          ]}
          name="follow_people"
          label="跟进人"
        />
      </ModalForm>
    </PageContainer>
  );
};

export default ProductDevelopmentSheetList;
