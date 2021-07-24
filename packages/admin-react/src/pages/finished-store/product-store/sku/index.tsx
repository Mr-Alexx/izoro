import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { ColumnsState, ProColumns } from '@ant-design/pro-table';
import { TableDropdown } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-form';
import { Select, Button, Radio, Row, Col, Dropdown, Menu, MenuProps } from 'antd';
import type { TableListItem, TableListPagination } from './data';
import { fetchSpu } from './service';
import { getPageSettings, updatePageSettings } from '@/services/setting';
import { debounce } from 'lodash';
import { history, Link } from 'umi';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import styles from './index.less';
import TableToolBar from '@/components/TableToolBar';

const { Option } = Select;

// 批量操作

const SKU: FC = () => {
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  // 列备注弹框
  const [modalVisible, updateModalVisible] = useState<boolean>(false);
  // 特殊打印弹框
  const [printModalVisible, updatePrintModalVisible] = useState<boolean>(false);
  // 查看拍摄，查看设计
  const [productPictureModalVisible, updateProductPictureModalVisible] = useState<boolean>(false);

  // 批量操作单选按钮
  const [radioBtnValue, setRadioBtnValue] = useState<string>('');

  // 更新自定义列
  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  // 更新自定义列，3秒内只触发一次
  const saveCustomColumns = debounce(() => {
    updatePageSettings({ data: columnsStateMap });
  }, 3000);

  // @ts-ignore
  const handleMenuClick = props => {
    const { key } = props;
    switch (key) {
      case 'dayin':
        updatePrintModalVisible(true);
        break;
      case 'sheying':
        updateProductPictureModalVisible(true);
        break;
      default:
        updateProductPictureModalVisible(true);
        break;
    }
    console.log(key);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'SKU',
      width: 100,
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'SPU',
      width: 100,
      dataIndex: 'spu',
      key: 'spu',
    },
    {
      title: '名称',
      width: 300,
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: '主图',
      width: 100,
      dataIndex: 'avatar',
      key: 'avatar',
      search: false,
      valueType: 'image',
    },
    {
      title: '净值尺寸（开发）',
      width: 160,
      dataIndex: 'net_size',
      key: 'net_size',
      search: false,
    },
    {
      title: '含包装尺寸（开发）',
      width: 180,
      dataIndex: 'including_package_size',
      key: 'including_package_size',
      search: false,
    },
    {
      title: '包裹尺寸(cm)',
      dataIndex: 'package_size',
      key: 'package_size',
      search: false,
    },
    {
      title: '包裹重(g)',
      dataIndex: 'package_weighs',
      key: 'package_weighs',
      search: false,
    },
    {
      title: '尺寸是否确认',
      dataIndex: 'size_confirmed',
      key: 'size_confirmed',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'dateRange',
    },
    {
      title: '采购状态',
      dataIndex: 'purchasing_status',
      key: 'purchasing_status',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '新品',
            value: '1',
          },
          {
            label: '正常供货',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      width: 140,
      align: 'center',
      dataIndex: 'option',
      key: 'option1',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Link key="1" to={`/finished-store/product-store/view-product-sku?id=${row.id}`}>
          查看
        </Link>,
        <Link to="/finished-store/product-store/create-product-sku?cate=2" key="3">
          编辑
        </Link>,
        <TableDropdown
          key="more"
          onSelect={handleMenuClick}
          menus={[
            { key: 'dayin', name: '特殊打印' },
            { key: 'sheying', name: '查看拍摄' },
            { key: 'sheji', name: '查看设计' },
          ]}
        />,
        // <Dropdown
        //   key="more"
        //   overlay={
        //     <Menu onClick={handleMenuClick}>
        //       <Menu.Item key="dayin">特殊打印</Menu.Item>
        //       <Menu.Item key="sheying">查看拍摄</Menu.Item>
        //       <Menu.Item key="sheji">查看设计</Menu.Item>
        //     </Menu>
        //   }>
        //   <a>...</a>
        // </Dropdown>,
      ],
    },
  ];
  // 钩子函数，相当于vue的mounted
  // 如果需要只获取一次数据，则第二个参数需要传[]
  // 否则，页面每次变化都会触发该钩子内的方法

  // 初始化自定义列
  useEffect(() => {
    getPageSettings('inboundLabel').then((data: Record<string, any>) => {
      setColumnsStateMap(data);
    });
  }, []);

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        sticky
        rowKey="id"
        columns={columns}
        search={{
          labelWidth: 120,
        }}
        headerTitle="SKU管理"
        request={fetchSpu}
        scroll={{ x: 1800 }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push({
                pathname: '/finished-store/product-store/create-product-sku',
                query: {
                  cate: '1', // 1为新增商品，2为编辑商品
                },
              });
            }}>
            新增产品
          </Button>,
          <Button key="print">打印入库标签</Button>,
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
          <>
            <Button value="1">批量修改采购状态</Button>
            <Button value="2">批量修改货源状态</Button>
            <Button value="3">批量下载产品设计图片</Button>
            <Button value="4">批量修改销售状态</Button>
          </>
        </FooterToolbar>
      )}

      {/* 特殊打印 */}
      <ModalForm
        title="打印SKU条形码"
        width="80%"
        layout="horizontal"
        visible={printModalVisible}
        onVisibleChange={updatePrintModalVisible}
        onFinish={async value => {
          console.log(value);
          updatePrintModalVisible(false);
        }}
        className={styles.form}>
        <Row gutter={20}>
          <Col lg={12} md={24}>
            <ProFormText name="product_name" label="名称" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="sku" label="SKU" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormDigit label="打印数量" name="printing_number" min={1} />
          </Col>
        </Row>
      </ModalForm>
      <ModalForm
        title="查看产品图片"
        width="80%"
        layout="horizontal"
        visible={productPictureModalVisible}
        onVisibleChange={updateProductPictureModalVisible}
        onFinish={async value => {
          console.log(value);
          updateProductPictureModalVisible(false);
        }}>
        暂无图片
      </ModalForm>
    </PageContainer>
  );
};
export default SKU;
