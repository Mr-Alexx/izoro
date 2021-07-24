import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Row, Col } from 'antd';
import { debounce } from 'lodash';
import { Link } from 'umi';
import TableToolBar from '@/components/TableToolBar';
import { getPageSettings, updatePageSettings } from '@/services/setting';
import type { TableListItem } from './data';
import type { TableListPagination } from './data';
import { getMasterTemplateUpload } from '@/services/product';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';

import styles from './index.less';

const MasterTemplateUpload: FC = () => {
  // 更新自定义列
  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  // 更新自定义列，3秒内只触发一次
  const saveCustomColumns = debounce(() => {
    updatePageSettings({ data: columnsStateMap });
  }, 3000);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      search: false,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      search: false,
    },
    {
      title: '创建人',
      dataIndex: 'creater',
      key: 'creater',
      width: 120,
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      key: 'created_at',
      width: 120,
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
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 120,
      search: false,
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
        <Link key="1" to={`/finished-store/template-module/master-template-upload/view?id=${row.id}`}>
          查看
        </Link>,
        // cate=2 编辑 cate=1新增
        <Link key="2" to={`/finished-store/template-module/master-template-upload/create?id=${row.id}&cate=2`}>
          编辑
        </Link>,
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
        columns={columns}
        request={getMasterTemplateUpload}
        headerTitle="母版"
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Link to="/finished-store/template-module/master-template-upload/create">
            <Button type="primary" key="master">
              新增母版
            </Button>
          </Link>,
          <Button
            type="primary"
            key="template"
            onClick={() => {
              setCreateModalVisible(true);
            }}>
            新增母版模板
          </Button>,
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
        ]}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={map => {
          // 即时响应
          setColumnsStateMap(map);
          // 存储更新，采用debounce，防止触发多个请求
          saveCustomColumns();
        }}
        options={{ fullScreen: true, reload: true, setting: true, density: true }}
      />
      <ModalForm
        title="编辑"
        width={900}
        visible={createModalVisible}
        onVisibleChange={setCreateModalVisible}
        onFinish={async value => {
          console.log(value);
        }}
        modalProps={{
          destroyOnClose: true,
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
          <Col md={24} lg={12}>
            <ProFormSelect
              name="master"
              label="母版"
              showSearch
              options={[
                {
                  label: '请选择',
                  value: '',
                },
                {
                  label: '旧系统模板',
                  value: '1',
                },
                {
                  label: 'tp',
                  value: '2',
                },
              ]}
              placeholder=""
              rules={[{ required: true, message: '请选择' }]}
            />
          </Col>
          <Col md={24} lg={12}>
            <ProFormText
              name="label"
              label="标签"
              placeholder="请输入"
              rules={[{ required: true, message: '标签不能为空' }]}
            />
          </Col>
        </Row>
      </ModalForm>
    </PageContainer>
  );
};

export default MasterTemplateUpload;
