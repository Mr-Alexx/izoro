import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Button, Select, message } from 'antd';
import { debounce } from 'lodash';
import { Link } from 'umi';
import TableToolBar from '@/components/TableToolBar';
import { getPageSettings, updatePageSettings } from '@/services/setting';
import type { TableListItem, TableListPagination } from './data';
import { getTemplateUpload } from '@/services/product';

import styles from './index.less';

// DatePicker 设置为中文
import 'moment/locale/zh-cn';

const { Option, OptGroup } = Select;

const TemplateUpload: FC = () => {
  // 编辑弹框
  const [modalVisit, setModalVisit] = useState<boolean>(false);
  //   编辑当前行数据
  const [currentRow, setCurrentRow] = useState<Partial<TableListItem> | undefined>();
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
      title: '母版',
      dataIndex: 'master_mask',
      key: 'master_mask',
      width: 150,
      search: false,
    },
    {
      title: '模版名称',
      dataIndex: 'template_name',
      key: 'template_name',
      width: 120,
    },
    {
      title: '店铺',
      dataIndex: 'store',
      key: 'store',
      width: 120,
      valueType: 'select',
      renderFormItem: (_, { defaultRender }) => {
        return (
          <Select key="searchSelect" showSearch placeholder="请选择" allowClear mode="multiple">
            {
              <>
                <OptGroup label="ebay">
                  <Option key="1" value="fashion_club">
                    fashion_club
                  </Option>
                </OptGroup>
                <OptGroup label="amazon">
                  <Option key="2" value="gifts_mall2011">
                    gifts_mall2011
                  </Option>
                </OptGroup>
              </>
            }
          </Select>
        );
      },
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
      title: '操作',
      width: 200,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Link key="1" to={`/finished-store/template-module/template-upload/view?id=${row.id}`}>
          查看
        </Link>,
        // cate=2 编辑 cate=1新增
        <a
          key="2"
          onClick={() => {
            setCurrentRow(row);
            setModalVisit(true);
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
        request={getTemplateUpload}
        headerTitle="母版"
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="template"
            onClick={() => {
              setModalVisit(true);
            }}>
            添加上架模板
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
        title="新建表单"
        visible={modalVisit}
        modalProps={{
          destroyOnClose: true,
        }}
        initialValues={{
          template_name: currentRow?.template_name,
          master_template: currentRow?.master_mask,
        }}
        onFinish={async () => {
          await new Promise(resolve => {
            setTimeout(() => {
              resolve(true);
            }, 2000);
          });
          message.success('提交成功');
          return true;
        }}
        layout="horizontal"
        onVisibleChange={setModalVisit}
        className={styles.form}>
        <ProFormText name="template_name" label="模版名称" placeholder="请输入" />
        <ProFormSelect
          name="master_template"
          label="母版"
          placeholder="请选择"
          showSearch
          allowClear
          options={[
            {
              value: '',
              label: '请选择',
            },
            {
              value: '旧系统模板',
              label: '旧系统模板',
            },
            {
              value: 'tp',
              label: 'tp',
            },
          ]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default TemplateUpload;
