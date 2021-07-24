import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { Button, Modal, message } from 'antd';
import { debounce } from 'lodash';
import { Link } from 'umi';
import TableToolBar from '@/components/TableToolBar';
import { getPageSettings, updatePageSettings } from '@/services/setting';
import type { TableListItem, TableListPagination } from './data';
import { getTemplateContentVersion } from '@/services/product';
import styles from './index.less';

const TemplateContentVersion: FC = () => {
  // 编辑弹框
  const [editModalVisit, setEditModalVisit] = useState<boolean>(false);
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
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      width: 150,
    },
    {
      title: '模板名称',
      dataIndex: 'template_name',
      key: 'template_name',
      width: 150,
    },
    {
      title: '语言',
      dataIndex: 'language',
      key: 'language',
      width: 150,
    },
    {
      title: '创建人',
      dataIndex: 'creater',
      key: 'creater',
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 150,
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
        <Link key="1" to={`/finished-store/template-module/template-content-version/view?id=${row.id}`}>
          查看
        </Link>,
        <a
          key="2"
          onClick={() => {
            setEditModalVisit(true);
          }}>
          编辑
        </a>,
      ],
    },
  ];
  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <ProTable<TableListItem, TableListPagination>
        sticky
        rowKey="id"
        columns={columns}
        request={getTemplateContentVersion}
        headerTitle="模板组件"
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="master"
            onClick={() => {
              setEditModalVisit(true);
            }}>
            添加内容版本
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
        title="编辑版本内容"
        visible={editModalVisit}
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
        layout="horizontal"
        className={styles.form}
        onVisibleChange={setEditModalVisit}>
        <ProFormSelect
          name="select1"
          label="上传模板"
          showSearch
          options={[
            {
              label: '请选择',
              value: '',
            },
            {
              label: '仿旧系统上架模板',
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
        <ProFormSelect
          name="select2"
          label="语言"
          showSearch
          options={[
            {
              label: '请选择',
              value: '',
            },
            {
              label: '汉语',
              value: '1',
            },
            {
              label: '英语',
              value: '2',
            },
          ]}
          placeholder=""
          rules={[{ required: true, message: '请选择' }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default TemplateContentVersion;
