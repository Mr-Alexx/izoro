import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, Modal, message } from 'antd';
import { debounce } from 'lodash';
import { Link } from 'umi';
import TableToolBar from '@/components/TableToolBar';
import { getPageSettings, updatePageSettings } from '@/services/setting';
import type { TableListItem } from './data';
import type { TableListPagination } from './data';
import { getMasterTemplateUpload } from '@/services/product';

import styles from './index.less';

const TemplateComponent: FC = () => {
  const [modalVisit, setModalVisit] = useState<boolean>(false);
  const [editModalVisit, setEditModalVisit] = useState<boolean>(false);
  const [editModalTitle, setEditModalTitle] = useState<string>('新增模版组件');
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
        <a
          key="1"
          onClick={() => {
            setModalVisit(true);
          }}>
          查看
        </a>,
        // cate=2 编辑 cate=1新增
        <a
          key="2"
          onClick={() => {
            setEditModalTitle('编辑模版组件: 旧系统顶部图片');
            setEditModalVisit(true);
          }}>
          编辑
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
        request={getMasterTemplateUpload}
        headerTitle="模板组件"
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="master"
            onClick={() => {
              setEditModalTitle('新增模版组件');
              setEditModalVisit(true);
            }}>
            添加模板组件
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
        title="组件标签"
        visible={modalVisit}
        onCancel={() => {
          setModalVisit(false);
        }}>
        组件标签
      </Modal>
      <ModalForm
        title={editModalTitle}
        visible={editModalVisit}
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
        layout="horizontal"
        className={styles.form}
        onVisibleChange={setEditModalVisit}>
        <ProFormText name="name" label="名称" placeholder="请输入" />
        <ProFormText name="component_label" label="组件标签" placeholder="请输入" />
      </ModalForm>
    </PageContainer>
  );
};

export default TemplateComponent;
