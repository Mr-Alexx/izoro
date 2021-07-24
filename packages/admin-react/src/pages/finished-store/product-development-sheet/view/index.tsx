import type { FC } from 'react';
import { useState } from 'react';
import { PageContainer, FooterToolbar, RouteContext } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import { Card, Button, Row, Col, Form, Radio, Descriptions } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { debounce } from 'lodash';
import { Link } from 'umi';
import TableToolBar from '@/components/TableToolBar';

import { getPageSettings, updatePageSettings } from '@/services/setting';
import type { TableListItem, TableListPagination } from './data';

import styles from './index.less';
import { getProductDevelopmentView } from '@/services/product';

// 产品基础信息
const BasicInfo: FC = () => {
  return (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="SPU">P028072</Descriptions.Item>
          <Descriptions.Item label="状态">新单</Descriptions.Item>
          <Descriptions.Item label="来源">审核不通过</Descriptions.Item>
          <Descriptions.Item label="业务线">Fergobuy</Descriptions.Item>
          <Descriptions.Item label="跟进人">-</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );
};
const ProductDevelopmentView: FC = () => {
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  // 更新自定义列
  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  // 更新自定义列，3秒内只触发一次
  const saveCustomColumns = debounce(() => {
    updatePageSettings({ data: columnsStateMap });
  }, 3000);

  // 批量操作单选按钮
  const [radioBtnValue, setRadioBtnValue] = useState<string>('');
  // 添加1688链接弹框
  const [linkModalVisible, updateLinkModalVisible] = useState<boolean>(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: 120,
    },

    {
      title: '	主图',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 150,
      valueType: 'image',
    },
    {
      title: '名称',
      dataIndex: 'product_name',
      key: 'product_name',
      width: 150,
    },
    {
      title: '销售时间',
      dataIndex: 'sales_date',
      key: 'sales_date',
      width: 150,
    },
    {
      title: '销售价格',
      dataIndex: 'sales_price',
      key: 'sales_price',
      width: 150,
    },
    {
      title: '产品采购状态',
      dataIndex: 'purchase_status',
      key: 'purchase_status',
      width: 150,
    },
    {
      title: '销售量',
      dataIndex: 'sales_volume',
      key: 'sales_volume',
      width: 150,
    },
    {
      title: '是否有报价',
      dataIndex: 'is_quotation',
      key: 'is_quotation',
      width: 150,
    },
    {
      title: '属性名字',
      dataIndex: 'attribute_name',
      key: 'attribute_name',
      width: 120,
    },
    {
      title: '产品货源状态',
      dataIndex: 'source_status',
      key: 'source_status',
      width: 120,
    },
    {
      title: '1688链接',
      dataIndex: 'link_1688',
      key: 'link_1688',
      width: 200,
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
        <Link key="1" to={`/finished-store/product-development-sheet/add-quotation?id=${row.id}`}>
          添加报价
        </Link>,
        <Link
          key="2"
          to="#"
          onClick={() => {
            updateLinkModalVisible(true);
          }}>
          添加1688链接
        </Link>,
      ],
    },
  ];
  return (
    <PageContainer
      title={`产品报价开发:P028072`}
      extra={
        <RouteContext.Consumer>
          {/* @ts-ignore */}
          {(value: RouteContextType) => {
            return (
              <Link to={`/finished-store/product-development-sheet/index`}>
                <Button type="primary">返回</Button>
              </Link>
            );
          }}
        </RouteContext.Consumer>
      }
      content={<BasicInfo />}>
      <Card title="产品报价开发详情" style={{ marginTop: 20 }}>
        <ProTable<TableListItem, TableListPagination>
          sticky
          rowKey="id"
          columns={columns}
          request={getProductDevelopmentView}
          search={false}
          headerTitle="报价方案管理"
          scroll={{ x: 1300 }}
          toolBarRender={() => [
            <TableToolBar
              columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))}
            />,
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
            <Radio.Group
              onChange={(e: any) => {
                setRadioBtnValue(e.target.value);
              }}
              value={radioBtnValue}>
              <Radio.Button value="1">批量修改货源状态</Radio.Button>
              <Radio.Button value="2">批量添加报价</Radio.Button>
            </Radio.Group>
          </FooterToolbar>
        )}
      </Card>
      <Card title="日志" style={{ marginTop: 20 }}>
        <div className={styles.textCenter}>没有找到数据。</div>
      </Card>
      <ModalForm
        title="打印SKU条形码"
        width="80%"
        layout="horizontal"
        visible={linkModalVisible}
        onVisibleChange={updateLinkModalVisible}
        onFinish={async value => {
          console.log(value);
          updateLinkModalVisible(false);
        }}>
        <ProFormText allowClear name="link_1688" label="1688链接" />
      </ModalForm>
    </PageContainer>
  );
};

export default ProductDevelopmentView;
