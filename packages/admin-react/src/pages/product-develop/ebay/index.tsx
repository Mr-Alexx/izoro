/**
 * @format
 * @description 账号管理页
 */

import type { FC } from 'react';
import { Space, Button, Menu, Dropdown, Avatar, Badge, Select } from 'antd';

import type { TableListItem, TableListPagination } from './data';
import type { ColumnsState, ProColumns } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
// import { PlusOutlined } from '@ant-design/icons';
import { fetchList } from './service';
import { useEffect, useState } from 'react';
import { getPageSettings, updatePageSettings } from '@/services/setting';
import { debounce } from 'lodash';
import { Link, history } from 'umi';
import TableToolBar from '@/components/TableToolBar';

// DatePicker 设置为中文
import 'moment/locale/zh-cn';

const { Option } = Select;

/**
 * @description hooks形式的函数式组件
 * @see https://juejin.cn/post/6944863057000529933
 */

const Ebay: FC = () => {
  // 控制 存储列触发时机
  const [canSave, setCanSave] = useState(false);

  // 批量操作
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  // 表头数据（列）
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '商品图', // 标题
      width: 100, // 宽度
      dataIndex: 'avatar', // 对应键
      key: 'avatar', // 自定义列匹配用
      align: 'center',
      search: false, // 是否在搜索表单显示
      render: (_, row) => {
        // 自定义渲染
        return (
          <Space size={10}>
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size={40} src={row.avatar}>
              Q
            </Avatar>
          </Space>
        );
      },
    },
    {
      title: 'SPU',
      width: 100,
      dataIndex: 'spu',
      key: 'spu',
      align: 'center',
    },
    {
      title: 'SKU：属性',
      width: 100,
      ellipsis: true,
      dataIndex: 'sku',
      key: 'sku',
      align: 'center',
      search: false,
    },
    {
      title: 'SKU',
      width: 100,
      dataIndex: 'sku',
      hideInTable: true,
    },
    {
      title: '标题',
      width: 150,
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      search: false,
    },
    {
      title: '商品标题',
      width: 150,
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '竞品item id',
      width: 150,
      dataIndex: 'item_id',
      key: 'item_id',
      align: 'center',
    },

    {
      title: '卖家',
      width: 150,
      dataIndex: 'seller',
      key: 'seller',
      align: 'center',
    },
    {
      title: '对手销量',
      width: 150,
      dataIndex: 'rival_sales',
      key: 'rival_sales',
      align: 'center',
      search: false,
    },
    {
      title: '对手销售额',
      width: 150,
      dataIndex: 'rival_sales_money',
      key: 'rival_sales_money',
      align: 'center',
      search: false,
    },
    {
      title: '产品中文名',
      width: 150,
      dataIndex: 'product_chinese_name',
      key: 'product_chinese_name',
      align: 'center',
    },
    {
      title: '毛利率',
      width: 150,
      dataIndex: 'gross_profit_rate',
      key: 'gross_profit_rate',
      align: 'center',
      search: false,
    },
    {
      title: '首次采购量',
      width: 150,
      dataIndex: 'initial_purchase_quantity',
      key: 'initial_purchase_quantity',
      align: 'center',
      search: false,
    },
    {
      title: '供应商名称',
      width: 150,
      dataIndex: 'supplier_name',
      key: 'supplier_name',
      align: 'center',
      search: false,
    },
    {
      title: 'ERP产品分类',
      width: 150,
      dataIndex: 'erp_product_classification',
      key: 'erp_product_classification',
      align: 'center',
      valueType: 'select',
      search: false,
    },
    {
      title: '平台分类ID一',
      width: 150,
      dataIndex: 'platform_category_id1',
      key: 'platform_category_id1',
      align: 'center',
    },
    {
      title: '平台分类ID二',
      width: 150,
      dataIndex: 'platform_category_id2',
      key: 'platform_category_id2',
      align: 'center',
      search: false,
    },
    {
      title: '关键词',
      width: 150,
      dataIndex: 'keyword',
      key: 'keyword',
      align: 'center',
    },
    {
      title: '产品开发人',
      width: 150,
      dataIndex: 'product_developer',
      key: 'product_developer',
      align: 'center',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '张三',
            value: '1',
          },
          {
            label: '李四',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '线索提供人',
      width: 150,
      dataIndex: 'product_lead_provider',
      key: 'product_lead_provider',
      align: 'center',
      valueType: 'select',
      search: false,
      // fieldProps: {
      //   options: [
      //     {
      //       label: '张三',
      //       value: '1',
      //     },
      //     {
      //       label: '李四',
      //       value: '2',
      //     },
      //   ],
      //   showSearch: true,
      //   allowClear: true,
      // },
    },
    {
      title: '询价人',
      width: 150,
      dataIndex: 'inquirer',
      key: 'inquirer',
      align: 'center',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '张三',
            value: '1',
          },
          {
            label: '李四',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '销售人',
      width: 150,
      dataIndex: 'salesman',
      key: 'salesman',
      align: 'center',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '张三',
            value: '1',
          },
          {
            label: '李四',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '箱规数量',
      width: 150,
      dataIndex: 'tank_gauge_number',
      key: 'tank_gauge_number',
      align: 'center',
      search: false,
    },
    {
      title: '开发邮资',
      width: 150,
      dataIndex: 'development_postage',
      key: 'development_postage',
      align: 'center',
    },
    {
      title: 'ERP商品分类',
      width: 150,
      dataIndex: 'erp_category',
      key: 'erp_category',
      align: 'center',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '0',
          },
          {
            label: '家庭&玩具',
            value: '1',
          },
          {
            label: '手表&配件类',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '状态',
      width: 150,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      search: false,
    },
    {
      title: '审批状态',
      width: 150,
      dataIndex: 'approval_flow_state',
      key: 'approval_flow_state',
      align: 'center',
      valueType: 'select',
      hideInTable: true,
      fieldProps: {
        options: [
          {
            label: '张三',
            value: '1',
          },
          {
            label: '李四',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: 'eBay首页同款最低售价',
      width: 150,
      dataIndex: 'minimum_selling_price',
      key: 'minimum_selling_price',
      align: 'center',
    },

    {
      title: '产品开发号',
      width: 100,
      dataIndex: 'product_development_no',
      key: 'product_development_no',
      align: 'center',
      search: false,
    },
    {
      title: '备货单',
      width: 150,
      dataIndex: 'picking_list',
      key: 'picking_list',
      align: 'center',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '0',
          },
          {
            label: '是',
            value: '1',
          },
          {
            label: '否',
            value: '2',
          },
        ],
        allowClear: true,
      },
    },
    {
      title: '国家',
      width: 150,
      dataIndex: 'country',
      key: 'country',
      align: 'center',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '澳大利亚',
            value: '1',
          },
          {
            label: '德国',
            value: '2',
          },
          {
            label: '英国',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '商品开发号',
      width: 150,
      dataIndex: 'development_num',
      key: 'development_num',
      align: 'center',
    },
    {
      title: '初审时间',
      width: 150,
      dataIndex: 'first_time',
      key: 'first_time',
      align: 'center',
      search: false,
    },
    {
      title: '初审时间',
      width: 150,
      dataIndex: 'first_time',
      key: 'first_time',
      align: 'center',
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
      title: '复审时间',
      width: 150,
      dataIndex: 'review_time',
      key: 'review_time',
      align: 'center',
      valueType: 'dateRange',
      search: false,
    },
    {
      title: '复审时间',
      width: 150,
      dataIndex: 'review_time',
      key: 'review_time',
      align: 'center',
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
      title: '创建时间',
      width: 150,
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      search: false,
    },
    {
      title: '创建时间',
      width: 150,
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
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
      width: 140,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Link key="view" to={`/product-develop/check-goods?id=${row.id}&platform=ebay`}>
          查看
        </Link>,
        <Link key="edit" to={`/product-develop/ebay/create?id=${row.id}&cate=2`}>
          更多
        </Link>,
      ],
    },
  ];

  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});

  // 更新自定义列，3秒内只触发一次
  const saveCustomColumns = debounce(() => {
    updatePageSettings({ data: columnsStateMap });
  }, 3000);

  const renderBadge = (count: number, active = false) => {
    return (
      <Badge
        count={count}
        style={{
          marginTop: -2,
          marginLeft: 4,
          color: active ? '#1890FF' : '#999',
          backgroundColor: active ? '#E6F7FF' : '#eee',
        }}
      />
    );
  };

  const [activekey, setActiveKey] = useState<string>('tab1');

  // 初始化自定义列
  useEffect(() => {
    getPageSettings('ebay').then((data: Record<string, any>) => {
      setColumnsStateMap(data);
    });
  }, []);

  // 更新自定义列
  useEffect(() => {
    if (canSave) {
      saveCustomColumns();
    }
  }, [canSave, columnsStateMap, saveCustomColumns]);

  const handleMenuClick = (e: any) => {
    history.push({
      pathname: e.key,
    });
  };
  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        sticky
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <TableToolBar
            options={{ download: false, mark: true }}
            columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))}
          />,
        ]}
        toolbar={{
          title: 'Ebay商品开发',
          multipleLine: true,
          tabs: {
            activeKey: activekey,
            items: [
              {
                key: 'tab1',
                tab: '全部',
              },
              {
                key: 'tab2',
                tab: '新单',
              },
              {
                key: 'tab3',
                tab: '已确认',
              },
            ],
            onChange: key => {
              setActiveKey(key as string);
            },
          },
        }}
        columns={columns}
        request={fetchList}
        options={{ fullScreen: true, reload: true, setting: true, density: true }}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={map => {
          // 即时响应
          setColumnsStateMap(map);
          // 存储更新，采用debounce，防止触发多个请求
          setCanSave(true);
          // saveCustomColumns()
        }}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}>
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }>
          {/* <Button onClick={async () => { setSelectedRows([]);}}>批量删除</Button> */}
          <Button>确认备货</Button>
          <Button>7天TP数量</Button>
          <Button>30天TP数量</Button>
          <Button>批量打开销售数据</Button>
          <Button>批量打开关键词</Button>
          <Button>批量打开itemID</Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default Ebay;
