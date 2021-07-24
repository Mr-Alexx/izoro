/**
 * @description 接口管理页
 */

import type { FC } from 'react';
import { Button, message, Modal } from 'antd';
import type { ColumnsState, ProColumns, ActionType } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { getApiRoutes, createApiRoute, editApiRoute } from '@/services/users';
import { useState, useRef } from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { ACTIONS } from '@/constants';
import { Access, useAccess } from 'umi';

/**
 * @description hooks形式的函数式组件
 * @see https://juejin.cn/post/6944863057000529933
 */
const User: FC = () => {
  // 当前操作行
  const [currentRow, setCurrentRow] = useState<USERS_API.ApiRouteItem | undefined>();

  // 当前操作状态
  const [actionType, setActionType] = useState<number>(ACTIONS.view);

  // 查看/编辑/新增表单弹窗
  const [modalVisible, updateModalVisible] = useState<boolean>(false);

  // 表单弹窗标题
  const [modalTitle, setModalTitle] = useState<string>('新增接口');

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

  const statusList = Object.keys(statusEnum).map(key => {
    return {
      value: key,
      label: statusEnum[key].text,
    };
  });

  /**
   * @description 编辑/添加接口
   */
  const submit = async (value: Partial<USERS_API.ApiRouteItem>): Promise<boolean> => {
    const params = {
      ...value,
      status: Number(value.status),
    };
    let msg: string = '';
    try {
      if (actionType === ACTIONS.add) {
        // @ts-ignore
        await createApiRoute({
          ...params,
          leader_user_id: 0, // 上级，暂时不作选择
          tag: 1, // 标签，暂时不知道作用
        });
        msg = '新增接口成功!';
      } else {
        await editApiRoute({ ...currentRow, ...params });
        msg = '编辑接口成功';
      }
      message.success(msg);
      updateModalVisible(false);
      // 刷新列表
      actionRef.current?.reload();
    } catch (err) {
      console.error(err);
      // message.error(err.message);
    }
    return true;
  };

  // 表头数据（列）
  const columns: ProColumns<USERS_API.ApiRouteItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      align: 'center',
      search: false,
    },
    {
      title: '路由地址',
      dataIndex: 'route',
      key: 'route',
      align: 'center',
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
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: '操作',
      width: 60,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Access key="edit" accessible={access.system.route.edit}>
          <a
            onClick={() => {
              setCurrentRow(row);
              setModalTitle(`编辑接口 - ${row.route}`);
              setActionType(ACTIONS.edit);
              updateModalVisible(true);
            }}>
            编辑
          </a>
        </Access>,
      ],
    },
  ];

  // 自定义列
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});

  return (
    <PageContainer>
      <ProTable<USERS_API.ApiRouteItem, APP.TablePagination>
        actionRef={actionRef}
        sticky
        headerTitle="接口管理"
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Access key="primary" accessible={access.system.route.create}>
            <Button
              type="primary"
              onClick={() => {
                setCurrentRow(undefined);
                setModalTitle('新增接口');
                setActionType(ACTIONS.add);
                updateModalVisible(true);
              }}>
              新增接口
            </Button>
          </Access>,
          // <CustomColumn />,
        ]}
        columns={columns}
        request={getApiRoutes}
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
          // saveCustomColumns();
        }}
      />

      {/* 查看、编辑、新增角色 */}
      <Modal
        destroyOnClose
        footer={false}
        title={modalTitle}
        width="500px"
        visible={modalVisible}
        onCancel={() => updateModalVisible(false)}>
        <ProForm
          className="modal-form"
          labelCol={{ span: 4 }}
          layout="horizontal"
          initialValues={{
            route: currentRow?.route,
            status: `${currentRow?.status || 1}`,
          }}
          onFinish={submit}>
          <ProFormText name="route" label="路由地址" rules={[{ required: true }]} />
          <ProFormSelect name="status" label="状态" key="status" options={statusList} />
        </ProForm>
      </Modal>
    </PageContainer>
  );
};

export default User;
