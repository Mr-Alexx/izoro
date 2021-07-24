/**
 * @format
 * @description 账号管理页
 */

import type { FC } from 'react';
import { Space, Button, Avatar, Badge, Select, TreeSelect } from 'antd';
import type { TableListItem, TableListPagination } from './data';
import type { ColumnsState, ProColumns } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-form';

import { fetchList } from './service';
import { useEffect, useState } from 'react';
import { getPageSettings, updatePageSettings } from '@/services/setting';
import { debounce } from 'lodash';
import { Link, history } from 'umi';
import TableToolBar from '@/components/TableToolBar';

const { Option } = Select;
/**
 * @description hooks形式的函数式组件
 * @see https://juejin.cn/post/6944863057000529933
 */
const Amazon: FC = () => {
  // 查看/编辑/新增表单弹窗
  const [modalVisible, updateModalVisible] = useState<boolean>(false);

  // 导入spu表单弹窗
  const [spuModalVisible, updateSpuModalVisible] = useState<boolean>(false);

  // 批量操作
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const [activekey, setActiveKey] = useState<React.Key>('tab1');
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

  // 表头数据（列）
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '产品开发号',
      width: 150,
      dataIndex: 'product_development_no',
      key: 'product_development_no',
      align: 'center',
    },
    {
      title: 'SPU',
      width: 100,
      dataIndex: 'spu',
      key: 'spu',
      align: 'center',
    },
    {
      title: 'SKU',
      width: 100,
      ellipsis: true,
      dataIndex: 'sku',
      key: 'sku',
      align: 'center',
    },
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
      title: '产品名称',
      width: 150,
      dataIndex: 'product_name',
      key: 'product_name',
      align: 'center',
    },
    {
      title: '采购价',
      width: 150,
      dataIndex: 'purchase_price',
      key: 'purchase_price',
      align: 'center',
      search: false,
    },
    {
      title: '售价',
      width: 150,
      dataIndex: 'selling_price',
      key: 'selling_price',
      align: 'center',
      search: false,
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
      title: '竞品链接',
      width: 150,
      dataIndex: 'competing_goods_link',
      key: 'competing_goods_link',
      align: 'center',
      search: false,
    },
    {
      title: '竞品广告链接',
      width: 150,
      dataIndex: 'competing_goods_advert_link',
      key: 'competing_goods_advert_link',
      align: 'center',
      search: false,
    },
    {
      title: '供应商链接',
      width: 150,
      dataIndex: 'supplier_links',
      key: 'supplier_links',
      align: 'center',
      search: false,
    },
    {
      title: '产品分类',
      width: 150,
      dataIndex: 'product_category',
      key: 'product_category',
      align: 'center',
      valueType: 'select',
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
      title: '分类',
      width: 150,
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      search: false,
    },
    {
      title: '产品开发员',
      width: 150,
      dataIndex: 'product_developer',
      key: 'product_developer',
      align: 'center',
      search: false,
    },
    {
      title: '创建人',
      width: 150,
      dataIndex: 'creater',
      key: 'creater',
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
      title: '备注',
      width: 150,
      dataIndex: 'remark',
      key: 'remark',
      align: 'center',
      search: false,
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
        <Link key="view" to={`/product-develop/check-goods?id=${row.id}&platform=amazon`}>
          查看
        </Link>,
      ],
    },
  ];
  // 更新自定义列
  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  // 更新自定义列，3秒内只触发一次
  const saveCustomColumns = debounce(() => {
    updatePageSettings({ data: columnsStateMap });
  }, 3000);
  // 钩子函数，相当于vue的mounted
  // 如果需要只获取一次数据，则第二个参数需要传[]
  // 否则，页面每次变化都会触发该钩子内的方法

  // 初始化自定义列
  useEffect(() => {
    getPageSettings('amazon').then((data: Record<string, any>) => {
      setColumnsStateMap(data);
    });
  }, []);

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
          <Button
            key="primary"
            onClick={() => {
              updateSpuModalVisible(true);
            }}>
            导入SPU
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push({
                pathname: '/product-develop/amazon/create',
              });
            }}>
            开发新品
          </Button>,
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
          // <CustomColumn />,
        ]}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activekey,
            items: [
              {
                key: 'tab1',
                label: <span>草稿{renderBadge(99, activekey === 'tab1')}</span>,
              },
              {
                key: 'tab2',
                label: <span>已确认{renderBadge(30, activekey === 'tab2')}</span>,
              },
              {
                key: 'tab3',
                label: <span>完结{renderBadge(30, activekey === 'tab3')}</span>,
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
          saveCustomColumns();
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
        </FooterToolbar>
      )}
      {/* 导入spu弹窗 */}
      <ModalForm
        title="导入SPU"
        width="800px"
        visible={spuModalVisible}
        onVisibleChange={updateSpuModalVisible}
        onFinish={async value => {
          console.log(value);
          updateModalVisible(false);
        }}>
        <ProFormUploadButton extra="支持扩展名：.csv" label="spu文件" name="file" title="上传文件" />
      </ModalForm>
    </PageContainer>
  );
};

export default Amazon;
