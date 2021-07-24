import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';

import { Button, Modal, Row, Col } from 'antd';
import { debounce } from 'lodash';
import { Link } from 'umi';
import { getPageSettings, updatePageSettings } from '@/services/setting';
import type { TableListItem, TableListPagination } from './data';
import { getMasterModuleList } from '@/services/product';

import TableToolBar from '@/components/TableToolBar';

const MasterModuleList: FC = () => {
  // 预览弹框
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
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
      title: '#',
      dataIndex: 'index',
      valueType: 'index',
      width: 80,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
    },
    {
      title: '母版',
      dataIndex: 'master_mask',
      key: 'master_mask',
      width: 120,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 120,
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
        <a
          key="1"
          onClick={() => {
            setCreateModalVisible(true);
          }}>
          编辑
        </a>,
        // cate=2 编辑 cate=1新增
        <a
          key="2"
          onClick={() => {
            setIsModalVisible(true);
          }}>
          预览
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
        columns={columns}
        request={getMasterModuleList}
        headerTitle="母版"
        scroll={{ x: 1300 }}
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="template"
            onClick={() => {
              setCreateModalVisible(true);
            }}>
            添加母版模板
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
      <Modal
        title="模块详情"
        footer={null}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
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
          <Col md={24} lg={12}>
            <ProFormText
              name="name"
              label="名称"
              placeholder="请输入"
              rules={[{ required: true, message: '名称不能为空' }]}
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

export default MasterModuleList;
