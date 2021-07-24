import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { ColumnsState, ProColumns } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Select, Button, Row, Col } from 'antd';
import type { TableListItem, TableListPagination } from './data';
import { fetchList } from './service';
import { getPageSettings, updatePageSettings } from '@/services/setting';
import { debounce } from 'lodash';
import styles from './index.less';

const { Option } = Select;

// 批量操作

const InboundLabel: FC = () => {
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  // 查看/编辑/新增表单弹窗
  const [editLabelTitle, setEditLabelTitle] = useState<string>('新增入库标签');
  const [modalVisible, updateModalVisible] = useState<boolean>(false);
  const [labelModalVisible, updateLabelModalVisible] = useState<boolean>(false);
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
      width: 100,
      dataIndex: 'id',
      key: 'id',
      search: false,
    },
    {
      title: '处理状态',
      width: 100,
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '不限',
            value: '1',
          },
          {
            label: '未绑定',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '确认时间',
      width: 100,
      dataIndex: 'confirm_at',
      key: 'confirm_at',
      valueType: 'dateRange',
    },
    {
      title: '确认人',
      width: 100,
      dataIndex: 'confirm_people',
      key: 'confirm_people',
      search: false,
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
      title: '产品开发人',
      width: 100,
      dataIndex: 'product_developer',
      key: 'product_developer',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '小红',
            value: '1',
          },
          {
            label: '小明',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '产品名称',
      width: 300,
      dataIndex: 'product_name',
      key: 'product_name',
      search: false,
    },
    {
      title: '产品名称（英文）',
      width: 160,
      dataIndex: 'product_english_name',
      key: 'product_english_name',
      search: false,
    },
    {
      title: '关键词',
      width: 100,
      dataIndex: 'keyword',
      key: 'keyword',
      search: false,
    },
    {
      title: '品牌',
      width: 100,
      dataIndex: 'brand',
      key: 'brand',
      search: false,
    },
    {
      title: '型号',
      width: 100,
      dataIndex: 'model',
      key: 'model',
      search: false,
    },
    {
      title: '产品尺寸',
      width: 100,
      dataIndex: 'product_size',
      key: 'product_size',
      search: false,
    },
    {
      title: '供应商名称（英文）',
      width: 200,
      dataIndex: 'supplier_name_english',
      key: 'supplier_name_english',
      search: false,
    },
    {
      title: '供应商地址',
      width: 250,
      dataIndex: 'supplier_address',
      key: 'supplier_address',
      search: false,
    },
    {
      title: '产地',
      width: 100,
      dataIndex: 'origin_place',
      key: 'origin_place',
      search: false,
    },
    {
      title: '创建时间',
      width: 100,
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'dateRange',
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
        <Button type="primary" size="small" key="confirm">
          确认
        </Button>,
        <Button
          size="small"
          key="edit"
          onClick={() => {
            setEditLabelTitle('编辑入库标签');
            updateLabelModalVisible(true);
          }}>
          编辑
        </Button>,
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
        request={fetchList}
        scroll={{ x: 2300 }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setEditLabelTitle('新增入库标签');
              updateLabelModalVisible(true);
            }}>
            新增入库标签
          </Button>,
          <Button
            key="out"
            onClick={() => {
              updateModalVisible(true);
            }}>
            列备注
          </Button>,
          <Button key="out">下载</Button>,
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
          saveCustomColumns();
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
          <Button type="primary">批量下载</Button>
        </FooterToolbar>
      )}
      <ModalForm
        title="列备注"
        width="500px"
        visible={modalVisible}
        onVisibleChange={updateModalVisible}
        onFinish={async value => {
          console.log(value);
          updateModalVisible(false);
        }}>
        <ProFormText name="id" label="ID"></ProFormText>
        <ProFormText name="status" label="处理状态" />
        <ProFormText name="confirm_at" label="确认时间" />
        <ProFormText name="confirm_people" label="确认人" />
        <ProFormText name="avatar" label="主图" />
        <ProFormText name="sku" label="SKU" />
        <ProFormText name="spu" label="SPU" />
        <ProFormText name="product_developer" label="产品开发人" />
        <ProFormText name="product_name" label="产品名称" />
        <ProFormText name="product_english_name" label="产品名称（英文）" />
        <ProFormText name="keyword" label="关键词" />
        <ProFormText name="brand" label="品牌" />
        <ProFormText name="model" label="型号" />
        <ProFormText name="product_size" label="产品尺寸" />
        <ProFormText name="supplier_name_english" label="供应商名称（英文）" />
        <ProFormText name="supplier_address" label="供应商地址" />
        <ProFormText name="origin_place" label="产地" />
        <ProFormText name="created_at" label="创建时间" />
      </ModalForm>
      <ModalForm
        title={editLabelTitle}
        width="80%"
        visible={labelModalVisible}
        layout="horizontal"
        onVisibleChange={updateLabelModalVisible}
        onFinish={async value => {
          console.log(value);
          updateLabelModalVisible(false);
        }}
        className={styles.form}>
        {/* <ProForm.Group>
          <ProFormText name="sku" label="SKU" width="xl" />
          <ProFormText name="spu" label="SPU" width="xl" />
        </ProForm.Group> */}
        <Row gutter={20}>
          <Col lg={12} md={24}>
            <ProFormText name="add_sku" label="SKU" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="add_spu" label="SPU" disabled />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="product_name" label="Product Name" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="product_name1" label="产品名称" disabled />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="brand" label="Brand" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="brand1" label="品牌" disabled />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="model" label="Model" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="model1" label="型号" disabled />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="product_size" label="Size" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="product_size1" label="尺寸" disabled />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="manufacturer" label="Manufacturer" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="manufacturer1" label="供应商名称" disabled />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="supplier_address" label="Add" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="supplier_address1" label="供应商地址" disabled />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="origin_place" label="Country of Origin" />
          </Col>
        </Row>
      </ModalForm>
    </PageContainer>
  );
};
export default InboundLabel;
