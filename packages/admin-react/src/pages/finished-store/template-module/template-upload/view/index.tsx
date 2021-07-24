import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Button, Descriptions, message, Card, Row, Col, Form, Modal } from 'antd';
import { debounce } from 'lodash';
import { Link } from 'umi';
import TableToolBar from '@/components/TableToolBar';
import { getPageSettings, updatePageSettings } from '@/services/setting';
import type { TableListItem, TableListPagination } from './data';
// import { getTemplateUpload } from '@/services/product';
import styles from './index.less';

const dataSource: TableListItem[] = [
  {
    id: 1,
    master_mask: '仿旧系统上架模版',
    template_name: '	顶部图片',
  },
  {
    id: 2,
    master_mask: '仿旧系统上架模版',
    template_name: '	顶部图片',
  },
];

// 仿旧系统上架模版信息
const BasicInfo: FC = () => {
  return (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="模版名称">仿旧系统上架模版</Descriptions.Item>
          <Descriptions.Item label="店铺">-</Descriptions.Item>
          <Descriptions.Item label="母版">旧系统模版</Descriptions.Item>
          <Descriptions.Item label="创建人">汪莹超</Descriptions.Item>
          <Descriptions.Item label="创建时间">2021-05-25 18:55:20</Descriptions.Item>
          <Descriptions.Item label="更新时间">2021-05-25 18:55:20</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );
};
const TemplateUploadView: FC = () => {
  // 查看弹框
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // 更新自定义列
  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  // 更新自定义列，3秒内只触发一次
  const saveCustomColumns = debounce(() => {
    updatePageSettings({ data: columnsStateMap });
  }, 3000);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '母版',
      dataIndex: 'master_mask',
      key: 'master_mask',
      width: 150,
      search: false,
    },
    {
      title: '母版板块',
      dataIndex: 'template_name',
      key: 'template_name',
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
            setIsModalVisible(true);
          }}>
          查看
        </a>,
        // cate=2 编辑 cate=1新增
        <Link key="2" to="/finished-store/template-module/template-upload/module-content-update">
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
              <Link to="/finished-store/template-module/template-upload/index">
                <Button>返回</Button>
              </Link>
            );
          }}
        </RouteContext.Consumer>
      }
      content={<BasicInfo />}>
      <Card style={{ marginTop: 20 }} title="模版模块内容">
        <ProTable<TableListItem, TableListPagination>
          sticky
          rowKey="id"
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
    </PageContainer>
  );
};

export default TemplateUploadView;
