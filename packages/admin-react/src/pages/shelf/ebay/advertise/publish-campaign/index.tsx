import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Select, Form, message, Row, Col } from 'antd';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { debounce } from 'lodash';

import type { TableListItem, TableListPagination } from './data';
import { Link, history } from 'umi';
import TableToolBar from '@/components/TableToolBar';

import { getEbayPublishList } from '@/services/product';
// DatePicker 设置为中文
import 'moment/locale/zh-cn';

import styles from './index.less';

const { Option, OptGroup } = Select;

const PublishList: FC = () => {
  const [activekey, setActiveKey] = useState<React.Key>('1');
  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);

  const [modalVisit, setModalVisit] = useState(false);

  useEffect(() => {
    const { query = {} } = history.location;
    console.log(query);
  }, [activekey]);
  const columns: ProColumns<TableListItem>[] = [
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
      title: '广告系列名',
      width: 120,
      dataIndex: 'advertising_series_name',
      key: 'advertising_series_name',
    },
    {
      title: '费率(1-100)',
      width: 120,
      dataIndex: 'rate',
      key: 'rate',
      search: false,
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
            label: '德国',
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
      title: '开始时间(北京)',
      width: 120,
      dataIndex: 'start_time',
      key: 'start_time',
      search: false,
    },
    {
      title: '开始时间(北京)',
      width: 120,
      dataIndex: 'start_time',
      key: 'start_time',
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
      title: '结束时间(北京)',
      width: 120,
      dataIndex: 'end_time',
      key: 'end_time',
      search: false,
    },
    {
      title: '结束时间(北京)',
      width: 120,
      dataIndex: 'end_time',
      key: 'end_time',
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
      render: (_, row, index, action) => [<a key="1">查看</a>],
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
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <TableToolBar
            options={{ download: false, mark: true }}
            columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))}
          />,
        ]}
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
      <ModalForm
        title="编辑 Publish Ebay Ad:"
        visible={modalVisit}
        width="85%"
        layout="horizontal"
        className={styles.form}
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
        onVisibleChange={setModalVisit}>
        <Row gutter={20}>
          <Col lg={12} md={24}>
            <ProFormText name="recommended_rates" label="建议费率" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="rate" label="费率" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <Form.Item label="状态"></Form.Item>
          </Col>
        </Row>
      </ModalForm>
    </PageContainer>
  );
};

export default PublishList;
