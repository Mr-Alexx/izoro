import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { Button, Radio, Select, Row, Col, message } from 'antd';
import { ModalForm, ProFormSelect, ProFormText, DrawerForm } from '@ant-design/pro-form';
import { debounce } from 'lodash';

import type { TableListItem, EditItem, TableListPagination } from './data';
import { Link } from 'umi';
import TableToolBar from '@/components/TableToolBar';
import { getPageSettings, updatePageSettings } from '@/services/setting';
import { getEbaySchedule } from '@/services/product';

import styles from './index.less';

const { Option } = Select;

const EbayScheduleBindIndex: FC = () => {
  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);
  // 批量操作单选按钮
  const [radioBtnValue, setRadioBtnValue] = useState<string>('');
  // 新增计划弹窗
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [editDrawVisible, setEditDrawVisible] = useState<boolean>(false);

  const [currentRow, setCurrentRow] = useState<Partial<EditItem> | undefined>();
  // 更新自定义列
  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  // 更新自定义列，3秒内只触发一次
  const saveCustomColumns = debounce(() => {
    updatePageSettings({ data: columnsStateMap });
  }, 3000);
  // @ts-ignore
  const handleMenuClick = key => {
    switch (key) {
      case 'shi':
        console.log('是');
        break;
      case 'confirm':
        console.log('确认');
        break;
      case 'delete':
        console.log('删除');
        break;
      default:
        console.log('是');
        break;
    }
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      width: 80,
      dataIndex: 'id',
      key: 'id',
      search: false,
    },
    {
      title: '捆绑号',
      width: 100,
      dataIndex: 'bound_num',
      key: 'bound_num',
    },
    {
      title: '产品名称',
      width: 200,
      dataIndex: 'product_name',
      key: 'product_name',
      ellipsis: true,
    },
    {
      title: '捆绑人',
      width: 100,
      dataIndex: 'bind_people',
      key: 'bind_people',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '罗燕梅',
            value: '1',
          },
          {
            label: '严盛娇',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: 'SKU',
      width: 100,
      dataIndex: 'sku',
      key: 'sku',
      search: false,
    },
    {
      title: '优化时间',
      width: 160,
      dataIndex: 'optimization_time',
      key: 'optimization_time',
      search: false,
    },
    {
      title: '优化时间',
      width: 140,
      dataIndex: 'optimization_time',
      key: 'optimization_time',
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
      title: '国家（中文）',
      width: 140,
      dataIndex: 'country',
      key: 'country',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '澳大利亚',
            value: '1',
          },
          {
            label: '英国',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '店铺名称',
      width: 140,
      dataIndex: 'shop_name',
      key: 'shop_name',
      search: false,
    },
    {
      title: '类型',
      width: 80,
      dataIndex: 'type',
      key: 'type',
      search: false,
      //   valueType: 'select',
      //   renderFormItem: (_, { defaultRender }) => {
      //     return (
      //       <Select key="searchSelect" showSearch placeholder="请选择" allowClear>
      //         {
      //           <>
      //             <Option key="1" value="">
      //               请选择
      //             </Option>
      //             <Option key="2" value="存量">
      //               存量
      //             </Option>
      //             <Option key="3" value="新品">
      //               新品
      //             </Option>
      //           </>
      //         }
      //       </Select>
      //     );
      //   },
    },
    {
      title: '海外仓可用天数',
      width: 140,
      dataIndex: 'overseas_warehouse_available_days',
      key: 'overseas_warehouse_available_days',
      search: false,
    },
    {
      title: '完成时间',
      width: 160,
      dataIndex: 'finish_at',
      key: 'finish_at',
      search: false,
    },
    {
      title: '是否按时完成',
      width: 140,
      dataIndex: 'is_finish_on_time',
      key: 'is_finish_on_time',
      search: false,
    },
    {
      title: '计划状态',
      width: 140,
      dataIndex: 'plan_state',
      key: 'plan_state',
      search: false,
    },
    {
      title: '创建人',
      width: 140,
      dataIndex: 'creater',
      key: 'creater',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '',
          },
          {
            label: '罗燕梅',
            value: '2',
          },
          {
            label: '严胜娇',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '创建时间',
      width: 160,
      dataIndex: 'created_at',
      key: 'created_at',
      search: false,
    },
    {
      title: '创建时间',
      width: 140,
      dataIndex: 'created_at',
      key: 'created_at',
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
      title: '更新时间',
      width: 160,
      dataIndex: 'updated_at',
      key: 'updated_at',
      search: false,
    },
    {
      title: '操作',
      width: 120,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row, index, action) => [
        <Link to="/shelf/ebay/schedule/bind-view" key="1">
          查看
        </Link>,
        // <Link to="/shelf/ebay/schedule/bind-update" key="2">
        //   编辑
        // </Link>,
        <a
          onClick={() => {
            setCurrentRow(row);
            setEditDrawVisible(true);
          }}>
          编辑
        </a>,
        <TableDropdown
          key="more"
          onSelect={handleMenuClick}
          menus={[
            { key: 'shi', name: '是' },
            { key: 'confirm', name: '确认' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];
  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <ProTable<TableListItem, TableListPagination>
        sticky
        headerTitle="上架计划"
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={getEbaySchedule}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          // <Link to="/shelf/ebay/schedule/bind-create">
          //   <Button type="primary">新增计划（捆绑号）</Button>
          // </Link>,
          <Button
            type="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
            key="1">
            新增计划（捆绑号）
          </Button>,

          <Link to="/shelf/ebay/schedule/index" key="2">
            <Button type="primary">上架计划</Button>
          </Link>,
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
        ]}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={map => {
          // 即时响应
          setColumnsStateMap(map);
          // 存储更新，采用debounce，防止触发多个请求
          saveCustomColumns();
        }}
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
      {selectedRows?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}>
                {selectedRows.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }>
          <Radio.Group
            onChange={(e: any) => {
              setRadioBtnValue(e.target.value);
            }}
            value={radioBtnValue}>
            <Radio.Button value="1">批量修改优化时间</Radio.Button>
            <Radio.Button value="2">批量确认</Radio.Button>
            <Radio.Button value="3">批量删除</Radio.Button>
          </Radio.Group>
        </FooterToolbar>
      )}
      <ModalForm
        title="新增计划"
        width={900}
        visible={createModalVisible}
        onVisibleChange={setCreateModalVisible}
        onFinish={async value => {
          console.log(value);
        }}
        modalProps={{
          destroyOnClose: true,
        }}
        className={styles.form}
        layout="horizontal">
        <Row gutter={20}>
          <Col lg={12} md={24}>
            <ProFormText name="bound_num" label="捆绑号" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="spu" label="Spu" placeholder="请输入" />
          </Col>
          <Col lg={24} md={24}>
            <ProFormText name="sku" label="SKU" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText
              name="shelf_shop"
              label="上架店铺"
              placeholder="请输入"
              rules={[{ required: true, message: '上架店铺不能为空' }]}
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText
              name="optimization_time"
              label="优化时间"
              placeholder="请输入"
              rules={[{ required: true, message: '优化时间不能为空' }]}
            />
          </Col>
        </Row>
      </ModalForm>
      {/* 编辑 */}
      <DrawerForm
        title="编辑"
        drawerProps={{
          forceRender: true,
          destroyOnClose: true,
          placement: 'right',
        }}
        visible={editDrawVisible}
        onVisibleChange={setEditDrawVisible}
        layout="horizontal"
        className={styles.form}
        onFinish={async values => {
          console.log(values.name);
          message.success('提交成功');
          // 不返回不会关闭弹框
          return true;
        }}
        initialValues={{
          bound_num: currentRow?.bound_num,
          country: currentRow?.country,
          shelf_shop: currentRow?.shelf_shop,
          optimization_time: currentRow?.optimization_time,
          product_name: currentRow?.product_name,
          bind_people: currentRow?.bind_people,
          keyword: currentRow?.keyword,
          overseas_warehouse_available_days: currentRow?.overseas_warehouse_available_days,
          type: currentRow?.type,
        }}>
        <Row gutter={20}>
          <Col lg={12} md={24}>
            <ProFormText name="bound_num" label="捆绑号" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormSelect
              name="country"
              label="国家"
              showSearch
              options={[
                {
                  value: '1',
                  label: '澳大利亚',
                },
                {
                  value: '2',
                  label: '德国',
                },
                {
                  value: '3',
                  label: '英国',
                },
              ]}
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText
              name="shelf_shop"
              label="上架店铺"
              placeholder="请输入"
              rules={[{ required: true, message: '上架店铺不能为空' }]}
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText
              name="optimization_time"
              label="优化时间"
              placeholder="请输入"
              rules={[{ required: true, message: '优化时间不能为空' }]}
            />
          </Col>
          <Col lg={24} md={24} className={styles.col}>
            12345
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="product_name" label="产品名称" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="bind_people" label="绑定人" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="keyword" label="关键词" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="overseas_warehouse_available_days" label="海外仓可用天数" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="type" label="类型" placeholder="请输入" />
          </Col>
        </Row>
      </DrawerForm>
    </PageContainer>
  );
};

export default EbayScheduleBindIndex;
