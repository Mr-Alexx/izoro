import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Select, message, Row, Col, Form } from 'antd';
import { ModalForm } from '@ant-design/pro-form';

import type { TableListItem, TableListPagination } from './data';
import TableToolBar from '@/components/TableToolBar';

import { getPublishPushList } from '@/services/product';
import styles from './index.less';

const { Option, OptGroup } = Select;

const PublishPush: FC = () => {
  const [modalVisit, setModalVisit] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '#',
      width: 60,
      valueType: 'index',
      key: 'index',
    },
    {
      title: '推送时间',
      width: 120,
      dataIndex: 'push_at',
      key: 'push_at',
      search: false,
    },
    {
      title: '推送时间',
      width: 120,
      dataIndex: 'push_at',
      key: 'push_at',
      hideInTable: true,
      valueType: 'dateRange',
    },
    {
      title: '店铺名',
      width: 120,
      dataIndex: 'shop_name',
      key: 'shop_name',
      valueType: 'select',
      renderFormItem: (_, { defaultRender }) => {
        return (
          <Select key="searchSelect" showSearch placeholder="请选择" allowClear mode="multiple">
            {
              <OptGroup label="ebay">
                <Option key="1" value="alien-wolf">
                  alien-wolf
                </Option>
                <Option key="2" value="verruecktefabrik">
                  verruecktefabrik
                </Option>
                <Option key="3" value="e-onlinebuy">
                  e-onlinebuy
                </Option>
              </OptGroup>
            }
          </Select>
        );
      },
    },
    {
      title: '站点',
      width: 100,
      dataIndex: 'site',
      key: 'site',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '',
          },
          {
            label: '澳大利亚',
            value: '2',
          },
          {
            label: '美国',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: 'Item ID',
      width: 120,
      dataIndex: 'item_id',
      key: 'item_id',
    },
    {
      title: '推送状态',
      width: 120,
      dataIndex: 'push_status',
      key: 'push_status',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '',
          },
          {
            label: '失败',
            value: '2',
          },
          {
            label: '成功',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '错误信息',
      width: 120,
      dataIndex: 'err_msg',
      key: 'err_msg',
      ellipsis: true,
      search: false,
    },
    {
      title: '标题',
      width: 350,
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row, index, action) => [
        <a
          key="1"
          onClick={() => {
            setModalVisit(true);
          }}>
          查看
        </a>,
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
        search={{
          labelWidth: 120,
        }}
        request={getPublishPushList}
        toolBarRender={() => [
          <TableToolBar
            options={{ download: false, mark: true }}
            columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))}
          />,
        ]}
        scroll={{ x: 1300 }}
        columns={columns}
        options={{
          fullScreen: true,
          reload: true,
          setting: true,
          density: true,
        }}
      />
      <ModalForm
        title="编辑 Publish Ebay Ad:"
        visible={modalVisit}
        width="85%"
        layout="horizontal"
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
        className={styles.form}
        onVisibleChange={setModalVisit}>
        <Row gutter={20}>
          <Col lg={12} md={24}>
            <Form.Item label="推送时间">2021-06-19 09:59:11</Form.Item>
          </Col>
          <Col lg={12} md={24}>
            <Form.Item label="店铺名">angels*diary</Form.Item>
          </Col>
          <Col lg={12} md={24}>
            <Form.Item label="站点">澳大利亚</Form.Item>
          </Col>
          <Col lg={12} md={24}>
            <Form.Item label="Item ID">363440529827</Form.Item>
          </Col>
          <Col lg={12} md={24}>
            <Form.Item label="推送状态">成功</Form.Item>
          </Col>
          <Col lg={12} md={24}>
            <Form.Item label="错误信息"></Form.Item>
          </Col>
          <Col lg={12} md={24}>
            <Form.Item label="标题">
              6/10X Stainless Steel Dumpling Maker DIY Pie Ravioli Dough Kitchen Pastry Mould
            </Form.Item>
          </Col>
        </Row>
      </ModalForm>
    </PageContainer>
  );
};

export default PublishPush;
