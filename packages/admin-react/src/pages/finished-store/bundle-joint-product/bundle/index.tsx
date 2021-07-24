import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Select, Dropdown, Menu, Row, Col } from 'antd';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { debounce } from 'lodash';
import { getPageSettings, updatePageSettings } from '@/services/setting';

import { fetchList } from './service';

import type { TableListItem, TableListPagination } from './data';
import { history } from 'umi';

const { Option } = Select;

const BundleProduct: FC = () => {
  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  // 更新自定义列，3秒内只触发一次
  const saveCustomColumns = debounce(() => {
    updatePageSettings({ data: columnsStateMap });
  }, 3000);

  // 添加sku关联提醒弹窗
  const [modalVisible, updateModalVisible] = useState<boolean>(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '#',
      dataIndex: 'index',
      width: 80,
      align: 'center',
      valueType: 'index',
    },
    {
      title: '捆绑号', // 标题
      width: 100, // 宽度
      dataIndex: 'bundle', // 对应键
      key: 'bundle', // 自定义列匹配用
    },
    {
      title: '捆绑名称',
      width: 300,
      dataIndex: 'bundle_name',
      key: 'bundle_name',
    },
    {
      title: 'SKU',
      width: 100,
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: '备注',
      width: 200,
      dataIndex: 'remark',
      key: 'remark',
      search: false,
      ellipsis: true,
    },
    {
      title: '状态',
      width: 100,
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '产品部',
            value: '1',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '创建部门',
      width: 120,
      dataIndex: 'create_department',
      key: 'create_department',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '产品部',
            value: '1',
          },
          {
            label: '销售部',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '创建人',
      width: 120,
      dataIndex: 'creater',
      key: 'creater',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '罗燕梅(kelly)',
            value: '1',
          },
          {
            label: '林超(Fansure)',
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
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'dateRange',
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      dataIndex: 'option',
      key: 'option1',
      valueType: 'option',
      fixed: 'right',
      render: (_, row, index, action) => [
        <Dropdown.Button
          key="btns"
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={() => {
                  history.push({
                    pathname: `/finished-store/bundle-joint-product/view-product-bundle?id=${row.bundle}`,
                  });
                }}>
                查看
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  history.push({
                    pathname: '/finished-store/bundle-joint-product/create-bundle-product',
                  });
                }}>
                克隆捆绑
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  updateModalVisible(true);
                }}>
                添加SKU关联提醒
              </Menu.Item>
            </Menu>
          }>
          Actions
        </Dropdown.Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
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
              history.push({
                pathname: '/finished-store/bundle-joint-product/create-bundle-product',
              });
            }}>
            新增捆绑信息
          </Button>,
          <Button type="primary" key="remark">
            列备注
          </Button>,
          // <CustomColumn />,
        ]}
        columns={columns}
        request={fetchList}
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
      <ModalForm
        title="选择业务线"
        width="80%"
        layout="horizontal"
        visible={modalVisible}
        onVisibleChange={updateModalVisible}
        onFinish={async value => {
          console.log(value);
          updateModalVisible(false);
        }}>
        <Row gutter={20}>
          <Col lg={12} md={24}>
            <ProFormSelect
              options={[
                {
                  value: 'amazon',
                  label: 'amazon',
                },
                {
                  value: 'ebay',
                  label: '盖章后ebay生效',
                },
              ]}
              name="service_line"
              label="业务线"
              allowClear
              showSearch
            />
          </Col>
        </Row>
      </ModalForm>
    </PageContainer>
  );
};

export default BundleProduct;
