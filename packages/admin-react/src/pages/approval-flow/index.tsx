/**
 * @description 审批流管理列表
 * 2021-07-19 新增需求
 * 1. 审批流引入版本概念，每次修改都会生成一个新的版本
 * 2. 新增审批流的时候才能选择审批流状态，修改不可以（怕生成新版本）
 * 3. 审批流列表，增加切换状态功能，增加切换所有审批流状态功能
 */

import type { FC } from 'react';
import { Button, Popconfirm, Tooltip } from 'antd';
import type { ColumnsState, ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useState, useRef } from 'react';
import { Access, useAccess, Link } from 'umi';
import tableData, { workList, modelList } from './test';
import AppTable from '../../components/AppTable/index';
import AppPageContainer from '@/components/AppPageContainer';

/**
 * @description hooks形式的函数式组件
 * @see https://juejin.cn/post/6944863057000529933
 */
const User: FC = () => {
  // 当前操作行
  const [currentRow, setCurrentRow] = useState<USERS_API.ApiRouteItem | undefined>();
  const [visible, setVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const access = useAccess();

  const statusEnum = {
    0: {
      text: '禁用',
      status: 'Error',
    },
    1: {
      text: '正常',
      status: 'Processing',
    },
  };

  /**
   * @description 修改审批流的状态
   * @param {USERS_API.ApiRouteItem} row 当前行
   * @param {number} type 修改类型，0或不传是修改当前审批流，1是修改所有版本
   */
  const changeStatus = (row: USERS_API.ApiRouteItem, type?: number) => {
    console.log(row, type);
  };

  // 表头数据（列）
  const columns: ProColumns<USERS_API.ApiRouteItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
      align: 'center',
      search: false,
    },
    {
      title: '审批流名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '业务类型',
      dataIndex: 'work_id',
      width: 120,
      key: 'work_id',
      align: 'center',
      valueType: 'select',
      fieldProps: {
        options: workList,
      },
    },
    {
      title: '数据模型',
      dataIndex: 'model',
      width: 120,
      key: 'model',
      search: false,
      align: 'center',
      valueType: 'select',
      fieldProps: {
        options: modelList,
      },
    },
    {
      title: '前端路由',
      dataIndex: 'front_route',
      key: 'front_route',
      align: 'center',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      valueEnum: statusEnum,
      valueType: 'select',
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      search: false,
    },
    // {
    //   title: '创建时间',
    //   dataIndex: 'created_at',
    //   key: 'created_at',
    //   valueType: 'dateTime',
    //   align: 'center',
    //   search: false,
    // },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: '操作',
      width: 220,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Access key="edit" accessible={access.system.route.edit}>
          <Popconfirm
            title={`是否${row.status === 1 ? '禁用' : '启用'}当前审批流？`}
            onConfirm={() => changeStatus(row)}>
            <Button style={{ padding: 0, marginRight: 10 }} type="link">
              {row.status === 1 ? '禁用' : '启用'}
            </Button>
          </Popconfirm>
          <Popconfirm
            title={`是否${row.status === 1 ? '禁用' : '启用'}所有版本审批流？`}
            onConfirm={() => changeStatus(row, 1)}>
            <Button style={{ padding: 0, marginRight: 10 }} type="link">
              {row.status === 1 ? '禁用' : '启用'}所有版本
            </Button>
          </Popconfirm>
          <Button style={{ padding: 0, marginRight: 10 }} type="link" onClick={() => setVisible(true)}>
            历史
          </Button>
          <Link to={`/approval-flow/edit/${row.id}`}>编辑</Link>
        </Access>,
      ],
    },
  ];

  return (
    <>
      <AppPageContainer>
        <AppTable<USERS_API.ApiRouteItem>
          actionRef={actionRef}
          sticky
          headerTitle="审批流管理"
          rowKey="id"
          search={{
            labelWidth: 120,
          }}
          scroll={{ x: 1400 }}
          toolBarRender={() => [
            <Access key="primary" accessible={access.system.route.create}>
              <Link className="ant-btn ant-btn-primary" to="/approval-flow/create">
                新增审批流
              </Link>
            </Access>,
            // <CustomColumn />,
          ]}
          columns={columns}
          dataSource={tableData}
          // request={getApiRoutes}
        />
      </AppPageContainer>
    </>
  );
};

export default User;
