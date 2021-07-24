import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { Button, Radio, Select, TreeSelect, Menu, Dropdown } from 'antd';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { debounce } from 'lodash';

// DatePicker 设置为中文
import 'moment/locale/zh-cn';

import { getPageSettings, updatePageSettings } from '@/services/setting';

import { DownOutlined } from '@ant-design/icons';

import type { TableListItem, TableListPagination } from './data';
import { Link } from 'umi';
import TableToolBar from '@/components/TableToolBar';

import { getEbayProductList } from '@/services/product';

const { Option, OptGroup } = Select;

const EbayScheduleBindIndex: FC = () => {
  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);

  const handleMenuClick = (e: any) => {
    console.log(e);
  };
  // 上架下拉菜单
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">美国</Menu.Item>
      <Menu.Item key="2">加拿大</Menu.Item>
      <Menu.Item key="3">英国</Menu.Item>
    </Menu>
  );
  // 更新自定义列
  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  // 更新自定义列，3秒内只触发一次
  const saveCustomColumns = debounce(() => {
    updatePageSettings({ data: columnsStateMap });
  }, 3000);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      width: 80,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '产品编辑人员',
      width: 100,
      dataIndex: 'product_editor',
      key: 'product_editor',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '罗燕梅',
            value: '1',
          },
          {
            label: '严胜娇',
            value: '2',
          },
          {
            label: '黄期芳',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '图片',
      width: 80,
      dataIndex: 'avatar',
      key: 'avatar',
      valueType: 'image',
      search: false,
    },
    {
      title: 'SPU',
      width: 100,
      dataIndex: 'spu',
      key: 'spu',
    },
    {
      title: 'SKU',
      width: 100,
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: '站点',
      width: 120,
      dataIndex: 'site',
      key: 'site',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '澳大利亚',
            value: '1',
          },
          {
            label: '美国',
            value: '2',
          },
          {
            label: '英国',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '店铺',
      width: 140,
      dataIndex: 'shop',
      key: 'shop',
      valueType: 'select',
      renderFormItem: (_, { defaultRender }) => {
        return (
          <Select key="searchSelect" showSearch placeholder="请选择" allowClear mode="multiple">
            {
              <>
                <OptGroup label="ebay">
                  <Option key="1" value="fashion.lady.club">
                    fashion.lady.club
                  </Option>
                  <Option key="2" value="gifts_mall2011">
                    gifts_mall2011
                  </Option>
                  <Option key="3" value="ebuy*pulse">
                    ebuy*pulse
                  </Option>
                </OptGroup>
              </>
            }
          </Select>
        );
      },
      render: (_, record) => (
        <div>
          {record.shop.map(item => (
            <div key={item}>{item}</div>
          ))}
        </div>
      ),
    },
    {
      title: '产品名称',
      width: 180,
      dataIndex: 'product_name',
      key: 'product_name',
      ellipsis: true,
    },

    {
      title: '标题',
      width: 140,
      dataIndex: 'title',
      key: 'title',
      search: false,
    },
    {
      title: '状态',
      width: 140,
      dataIndex: 'state',
      key: 'state',
      valueType: 'select',
      renderFormItem: (_, { defaultRender }) => {
        return (
          <Select key="searchSelect" showSearch placeholder="请选择" allowClear mode="multiple">
            {
              <>
                <OptGroup label="ebay">
                  <Option key="1" value="">
                    请选择
                  </Option>
                  <Option key="2" value="正常">
                    正常
                  </Option>
                  <Option key="3" value="作废">
                    作废
                  </Option>
                </OptGroup>
              </>
            }
          </Select>
        );
      },
    },
    {
      title: '产品创建时间',
      width: 160,
      dataIndex: 'product_creation_time',
      key: 'product_creation_time',
      search: false,
    },
    {
      title: '产品创建时间',
      width: 160,
      dataIndex: 'product_creation_time',
      key: 'product_creation_time',
      hideInTable: true,
      valueType: 'dateRange',
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
      title: '自动补货规则名称',
      width: 140,
      dataIndex: 'automatic_replenishment_rule',
      key: 'automatic_replenishment_rule',
      search: false,
    },
    {
      title: '产品人员',
      width: 140,
      search: false,
      render: (_, record) => (
        <div>
          <div>提供人:{record.provider}</div>
          <div>询价人:{record.inquirer}</div>
          <div>销售人:{record.salesman}</div>
        </div>
      ),
    },
    {
      title: '对手信息',
      width: 140,
      key: 'competitor_info',
      search: false,
      render: (_, record) => (
        <div>
          <div>卖家：{record.seller}</div>
          <div>ItemID:{record.item_id}</div>
          <div>销量:{record.sales_volume}</div>
          <div>销售额:{record.sales_volume_money}</div>
        </div>
      ),
    },
    {
      title: 'ebay首页同款最低售价',
      width: 160,
      dataIndex: ' ebay_same_lowest_price',
      key: 'ebay_same_lowest_price',
      search: false,
    },
    {
      title: '关键词',
      width: 140,
      dataIndex: ' keywords',
      key: 'keywords',
    },
    {
      title: '卖家',
      width: 140,
      dataIndex: ' seller',
      key: 'seller',
      hideInTable: true,
    },
    {
      title: 'Item ID',
      width: 140,
      dataIndex: 'item_id',
      key: 'item_id',
      hideInTable: true,
    },
    {
      title: '美工人',
      width: 140,
      dataIndex: 'art_designer',
      key: 'art_designer',
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '罗燕梅',
            value: '1',
          },
          {
            label: '严胜娇',
            value: '2',
          },
          {
            label: '曾海',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '编辑人',
      width: 140,
      dataIndex: 'editor',
      key: 'editor',
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '罗燕梅',
            value: '1',
          },
          {
            label: '严胜娇',
            value: '2',
          },
          {
            label: '曾海',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '提供人',
      width: 140,
      dataIndex: 'provider',
      key: 'provider',
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '罗燕梅',
            value: '1',
          },
          {
            label: '严胜娇',
            value: '2',
          },
          {
            label: '曾海',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '询价人',
      width: 140,
      dataIndex: 'inquirer',
      key: 'inquirer',
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '罗燕梅',
            value: '1',
          },
          {
            label: '严胜娇',
            value: '2',
          },
          {
            label: '曾海',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '销售人',
      width: 140,
      dataIndex: 'salesman',
      key: 'salesman',
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '罗燕梅',
            value: '1',
          },
          {
            label: '严胜娇',
            value: '2',
          },
          {
            label: '曾海',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: 'ERP产品分类',
      width: 140,
      dataIndex: 'erp_product_classification',
      key: 'erp_product_classification',
      search: false,
    },
    {
      title: '产品分类',
      width: 140,
      dataIndex: 'product_classification',
      key: 'product_classification',
      hideInTable: true,
      renderFormItem: (_, { defaultRender }) => {
        return (
          <TreeSelect
            treeData={[
              {
                title: '玩具&游戏',
                value: '1',
                children: [{ title: '遥控玩具', value: '1-1', children: [{ title: '遥控飞机', value: '1-1-1' }] }],
              },
            ]}
          />
        );
      },
    },
    {
      title: '首次采购量',
      width: 140,
      dataIndex: 'initial_purchase_quantity',
      key: 'initial_purchase_quantity',
      search: false,
    },
    {
      title: '平台分类ID一',
      width: 140,
      dataIndex: 'platform_classification1',
      key: 'platform_classification1',
      search: false,
    },
    {
      title: '操作',
      width: 160,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row, index, action) => [
        <Link to="/shelf/ebay/product-list/create" key="1">
          编辑
        </Link>,
        <Dropdown key="2" overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            上架
            <DownOutlined />
          </a>
        </Dropdown>,
      ],
    },
  ];
  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <ProTable<TableListItem, TableListPagination>
        sticky
        headerTitle="上架计划"
        rowKey="id"
        request={getEbayProductList}
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Link to="/shelf/ebay/product-list/create">
            <Button type="primary">产品新增</Button>
          </Link>,
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
        ]}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={map => {
          // 即时响应
          setColumnsStateMap(map);
          // 存储更新，采用debounce，防止触发多个请求
          saveCustomColumns();
        }}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        columns={columns}
        options={{
          fullScreen: true,
          reload: true,
          setting: true,
          density: true,
        }}
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
            <Button key="1">复制到产品</Button>
            <Button key="2">作废</Button>
          </>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default EbayScheduleBindIndex;
