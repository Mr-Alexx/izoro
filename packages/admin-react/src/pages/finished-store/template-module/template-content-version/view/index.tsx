import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { Button, Descriptions, message, Card, Form, Row, Col } from 'antd';
import { debounce } from 'lodash';
import { Link } from 'umi';
import TableToolBar from '@/components/TableToolBar';
import { getPageSettings, updatePageSettings } from '@/services/setting';
import type { TableListItem, TableListPagination } from './data';
import { getTemplateContentVersion } from '@/services/product';
import styles from './index.less';

const dataSource: TableListItem[] = [
  {
    version: '00000001',
    component: '旧系统顶部图片',
    creater: '汪莹超',
    created_at: '2019-09-21 15:43:39',
    updated_at: '2021-03-26 14:58:44',
  },
];

// 仿旧系统上架模版
const BasicInfo: FC = () => {
  return (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="版本">00000001</Descriptions.Item>
          <Descriptions.Item label="模版名称">仿旧系统上架模版</Descriptions.Item>
          <Descriptions.Item label="语言">英语</Descriptions.Item>
          <Descriptions.Item label="创建人">汪莹超</Descriptions.Item>
          <Descriptions.Item label="创建时间">2021-05-25 18:55:20</Descriptions.Item>
          <Descriptions.Item label="更新时间">2021-05-25 18:55:20</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );
};

const TemplateContentView: FC = () => {
  // 编辑弹框
  const [viewModalVisit, setViewModalVisit] = useState<boolean>(false);
  // 更新自定义列
  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  // 更新自定义列，3秒内只触发一次
  const saveCustomColumns = debounce(() => {
    updatePageSettings({ data: columnsStateMap });
  }, 3000);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '版本号',
      dataIndex: 'version',
      key: 'version',
      width: 120,
    },
    {
      title: '组件',
      dataIndex: 'component',
      key: 'component',
      width: 150,
    },
    {
      title: '创建人',
      dataIndex: 'creater',
      key: 'creater',
      width: 120,
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
        <a
          key="1"
          onClick={() => {
            setViewModalVisit(true);
          }}>
          预览
        </a>,
        // cate=2 编辑 cate=1新增
        <Link key="2" to={`/finished-store/template-module/template-content-version/content-update?id=${row.version}`}>
          编辑
        </Link>,
      ],
    },
  ];
  return (
    <PageContainer
      title={`仿旧系统上架模版`}
      extra={
        <RouteContext.Consumer>
          {/* @ts-ignore */}
          {({ location }) => {
            return (
              <Link to={`/finished-store/product-store/create-product-spu?id=${location.query.id}`}>
                <Button type="primary">编辑SPU产品</Button>
              </Link>
            );
          }}
        </RouteContext.Consumer>
      }
      content={<BasicInfo />}>
      <Card style={{ marginTop: 20 }} title="模版模块内容">
        <ProTable<TableListItem, TableListPagination>
          sticky
          rowKey="version"
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 1300 }}
          search={false}
          toolBarRender={() => [
            <TableToolBar
              columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))}
            />,
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
      </Card>
      <ModalForm title="内容详情" visible={viewModalVisit} onVisibleChange={setViewModalVisit}>
        图片
      </ModalForm>
    </PageContainer>
  );
};

export default TemplateContentView;
