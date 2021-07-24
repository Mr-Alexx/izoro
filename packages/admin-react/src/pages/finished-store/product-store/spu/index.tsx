/**
 * @description spu管理页
 */

import type { FC } from 'react';
import { Space, Popconfirm, Tag, Button, message, Row, Col } from 'antd';
import type { TableListItem, TableListPagination, RoleListItem } from './data';
import type { ColumnsState, ProColumns, ActionType } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

import { fetchSpu } from './service';
import { useEffect, useState, useRef } from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { getPageSettings, updatePageSettings } from '@/services/setting';
import { debounce } from 'lodash';

import TableToolBar from '@/components/TableToolBar';

import { history, Link } from 'umi';

/**
 * @description hooks形式的函数式组件
 * @see https://juejin.cn/post/6944863057000529933
 */
const SPU: FC = () => {
  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);
  // 当前操作行
  const [currentRow, setCurrentRow] = useState<TableListItem | undefined>();

  // 预览弹窗
  const [previewModalVisible, updatePreviewModalVisible] = useState<boolean>(false);

  // 编辑弹窗
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  // @ts-ignore
  const handleMenuClick = key => {
    // const { key } = props;
    switch (key) {
      case 'detail':
        // console.log('打印');
        history.push(`/finished-store/product-store/product-attr-detail`);
        break;
      case 'view':
        updatePreviewModalVisible(true);
        break;
      default:
        history.push(`/finished-store/product-store/product-attr-detail`);
        break;
    }
    console.log(key);
  };
  // 表头数据（列）
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      align: 'center',
      valueType: 'index',
    },
    {
      title: 'ID', // 标题
      width: 100, // 宽度
      dataIndex: 'id', // 对应键
      key: 'id', // 自定义列匹配用
      search: false, // 是否在搜索表单显示
    },
    {
      title: 'SPU',
      dataIndex: 'spu',
      key: 'spu',
      valueType: 'text',
    },
    {
      title: '产品名称',
      // ellipsis: true,
      dataIndex: 'product_name',
      key: 'product_name',
      valueType: 'text',
    },
    {
      title: '产品来源',
      width: 100,
      // ellipsis: true,
      dataIndex: 'product_source',
      key: 'product_source',
      search: false,
    },
    {
      title: '一级分类',
      dataIndex: 'first_category',
      key: 'first_category',
      search: false,
    },
    {
      title: '二级分类',
      dataIndex: 'second_category',
      key: 'second_category',
      search: false,
    },
    {
      title: '三级分类',
      dataIndex: 'third_category',
      key: 'third_category',
      search: false,
    },
    {
      title: '操作',
      width: 240,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row, index, action) => [
        <Link key="1" to={`/finished-store/product-store/view-product-spu?id=${row.id}`}>
          查看
        </Link>,
        // cate 1为新增商品，2为编辑商品
        <a
          key="2"
          onClick={() => {
            console.log(row);
            setCurrentRow(row);
            setEditModalVisible(true);
          }}>
          编辑
        </a>,
        <TableDropdown
          key="more"
          onSelect={handleMenuClick}
          menus={[
            { key: 'detail', name: '详情列表' },
            { key: 'view', name: '预览' },
          ]}
        />,
        // <Link key="3" to={`/finished-store/product-store/product-attr-detail`}>
        //   详情列表
        // </Link>,
        // <a
        //   key="5"
        //   onClick={() => {
        //     updatePreviewModalVisible(true);
        //   }}>
        //   预览
        // </a>,
      ],
    },
  ];

  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  // 更新自定义列，3秒内只触发一次
  const saveCustomColumns = debounce(() => {
    updatePageSettings({ data: columnsStateMap });
  }, 3000);

  // 初始化自定义列
  useEffect(() => {
    getPageSettings('account').then((data: Record<string, any>) => {
      setColumnsStateMap(data);
    });
  }, []);

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        actionRef={actionRef}
        sticky
        headerTitle="SPU管理"
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCurrentRow(undefined);
              setEditModalVisible(true);
            }}>
            新增SPU产品
          </Button>,
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
          // <CustomColumn />,
        ]}
        columns={columns}
        request={fetchSpu}
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
      <ModalForm
        title="预览"
        width="80%"
        visible={previewModalVisible}
        onVisibleChange={updatePreviewModalVisible}
        onFinish={async value => {
          console.log(value);
        }}></ModalForm>
      <ModalForm
        title="编辑"
        width={900}
        visible={editModalVisible}
        onVisibleChange={setEditModalVisible}
        onFinish={async value => {
          console.log(value);
        }}
        modalProps={{
          destroyOnClose: true,
        }}
        initialValues={{
          product_name: currentRow?.product_name,
          product_source: currentRow?.product_source,
        }}
        labelCol={{ span: 7 }}
        layout="horizontal">
        <Row gutter={20}>
          <Col lg={12} md={24}>
            <ProFormText
              name="product_name"
              label="产品名称"
              rules={[{ required: true, message: '产品名称不能为空' }]}
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormSelect
              name="product_source"
              label="产品来源"
              showSearch
              options={[
                {
                  label: '请选择',
                  value: '',
                },
                {
                  label: '虚拟款',
                  value: '1',
                },
                {
                  label: '现货款',
                  value: '2',
                },
                {
                  label: '打版款',
                  value: '3',
                },
              ]}
              placeholder=""
              rules={[{ required: true, message: '请选择' }]}
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormSelect
              name="property"
              label="属性"
              showSearch
              mode="multiple"
              options={[
                {
                  label: '内存',
                  value: '1',
                },
                {
                  label: '颜色',
                  value: '2',
                },
                {
                  label: '地图',
                  value: '3',
                },
              ]}
              placeholder=""
              rules={[{ required: true, message: '请选择' }]}
            />
          </Col>
        </Row>
      </ModalForm>
    </PageContainer>
  );
};

export default SPU;
