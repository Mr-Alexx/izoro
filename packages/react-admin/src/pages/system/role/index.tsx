/**
 * @description 角色管理页
 */

import type { FC } from 'react';
import { Button, message } from 'antd';
import type { TableListPagination } from './data';
import type { ColumnsState, ProColumns, ActionType } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useState, useRef } from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
// import { getPageSettings, updatePageSettings } from '@/services/setting';
// import { debounce } from 'lodash';
import MenuTree from './components/MenuTree';
import { getRoles, createRole, editRole, grantRole, getRoleMenu } from '@/services/user';
import { ACTIONS } from '@/constants';
import { Access, useAccess } from 'umi';

/**
 * @description hooks形式的函数式组件
 * @see https://juejin.cn/post/6944863057000529933
 */
const User: FC = () => {
  /* ========== 状态管理 ========== */
  const [currentRow, setCurrentRow] = useState<Partial<UserApi.RoleInfo> | undefined>(); // 当前操作行
  const [actionType, setActionType] = useState<number>(ACTIONS.view); // 当前操作状态
  const [modalVisible, updateModalVisible] = useState<boolean>(false); // 查看/编辑/新增表单弹窗
  const [modalTitle, setModalTitle] = useState<string>('查看角色'); // 表单弹窗标题
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({}); // 自定义列设置
  // const preColumnStateMap = useRef<Record<string, ColumnsState>>(columnsStateMap); // 最新列数据，存储用
  const [drawerVisible, toggleDrawerVisible] = useState(false); // 授权菜单drawer
  const [drawerConfirmLoading, toggleDrawerConfirmLoading] = useState(false); // 授权菜单确认按钮loading

  /* ========== Ref =========== */
  const actionRef = useRef<ActionType>(); // 表格dom引用
  const access = useAccess();

  /* ========== 其它变量 ========== */
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

  /* ========== 工具函数 ========== */

  /* ========== 事件处理 ========== */
  /**
   * @description 查看/编辑/新增角色
   * @param {string} type
   * @param {Partial<UserApi.RoleInfo>} row
   */
  const handleModalOpen = (type: number, row: Partial<UserApi.RoleInfo>) => {
    const title =
      type === ACTIONS.view ? `查看角色 - ${row.name}` : type === ACTIONS.edit ? `编辑角色 - ${row.name}` : '新增角色';

    setCurrentRow(row);
    setModalTitle(title);
    setActionType(type);
    updateModalVisible(true);
  };

  // const handleModalClose = () => {
  //   setCurrentRow(undefined);
  //   updateModalVisible(false);
  // };
  /**
   * @description 关闭授权菜单
   */
  const closeDrawer = (): void => {
    toggleDrawerVisible(false);
  };
  /**
   * @description 打开授权菜单
   * @param { UserApi.RoleInfo } row
   */
  const openDrawer = (row: UserApi.RoleInfo): void => {
    setCurrentRow(row);
    setActionType(10);
    toggleDrawerVisible(true);
  };
  const formatData = (
    data: UserApi.MenuItem[],
    permissionInfo: UserApi.MenuPermissionInfo,
  ): UserApi.MenuPermissionInfo => {
    data.forEach(item => {
      if (!item.checked) {
        return;
      }
      const obj: Record<string | number, string> = {};
      obj[item.id] = item.permissions
        ? item.permissions
            .filter(v => !!v.checked)
            .map(v => v.id)
            .join(',')
        : '0';
      // eslint-disable-next-line
      permissionInfo.push(obj);

      if (Array.isArray(item.children) && item.children.length > 0) {
        formatData(item.children, permissionInfo);
      }
    });
    return permissionInfo;
  };
  /**
   * @description 菜单授权确认
   */
  const editPermissions = async (data: UserApi.MenuItem[]): Promise<void> => {
    // console.log(data);
    toggleDrawerConfirmLoading(true);
    // 将数据格式化成授权接口参数形式
    const formatParams: UserApi.MenuPermissionInfo = [];
    const permissionInfo = formatData(data, formatParams);

    try {
      await grantRole({ role_id: currentRow?.id as number, permission_info: permissionInfo });
      closeDrawer();
      message.success(`角色：${currentRow?.name} 授权成功`);
    } catch (err) {
      console.error(err);
      message.error(`角色：${currentRow?.name} 授权失败`);
    }
    toggleDrawerConfirmLoading(false);
  };

  // const saveCustomColumns = debounce(() => {
  //   updatePageSettings({ data: columnsStateMap });
  // }, 3000);

  /**
   * @description 新增/编辑角色
   */
  const submit = async (value: Partial<UserApi.RoleInfo>) => {
    if (actionType === ACTIONS.view) {
      return true;
    }
    let { name, status, description } = value;
    status = Number(status);
    name = name || '';
    description = description || '';
    let msg: string = '新增成功';

    try {
      if (actionType === ACTIONS.add) {
        await createRole({ name, status, description });
      } else {
        // @ts-ignore
        await editRole({ id: currentRow?.id, name, status, description });
        msg = '编辑成功';
      }
      message.success(msg);
      // 刷新列表
      actionRef.current?.reload();
      return true;
    } catch (err) {
      message.error(`操作失败，失败原因：${err}`);
      console.error(err);
    }
    return false;
  };

  /* ========== 副作用 ========== */
  // useEffect(() => {
  //   // 初始化自定义列
  //   getPageSettings('role').then((data: Record<string, any>) => {
  //     setColumnsStateMap(data);
  //   });
  // }, []);

  /* ========== 表头配置 ========== */
  const columns: ProColumns<UserApi.RoleInfo>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      align: 'center',
      valueType: 'index',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      valueEnum: statusEnum,
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
      width: 180,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Access key="edit" accessible={access.system.role.edit}>
          <a onClick={() => handleModalOpen(ACTIONS.edit, row)}>编辑</a>
        </Access>,
        <Access key="shouquan" accessible={access.system.role.grandMenuPermission}>
          <a onClick={() => openDrawer(row)}>授权</a>
        </Access>,
        // <Popconfirm
        //   key="deletePop"
        //   title="确定删除该角色吗？"
        //   placement="bottomLeft"
        //   onConfirm={async () => {
        //     return new Promise(resolve => {
        //       setTimeout(() => {
        //         message.warning('接口暂时不支持删除！');
        //         resolve();
        //       }, 1500);
        //     });
        //   }}
        //   onCancel={() => {}}>
        //   <a href="#" key="delete">
        //     删除
        //   </a>
        // </Popconfirm>,
      ],
    },
  ];

  /* ========== UI ========== */
  return (
    <>
      <PageContainer>
        <ProTable<UserApi.RoleInfo, TableListPagination>
          actionRef={actionRef}
          sticky
          headerTitle="角色列表"
          rowKey="id"
          // search={false}
          scroll={{ x: 1300 }}
          toolbar={{
            // search: {
            //   placeholder: '请输入角色名',
            //   onSearch: (value: string) => {
            //     console.log(actionRef.current);
            //   },
            // },
            // filter: <Select value="" options={[{ label: '全部', value: '' }, ...statusList]}></Select>,
            actions: [
              <Access key="key" accessible={access.system.role.create}>
                <Button type="primary" onClick={() => handleModalOpen(ACTIONS.add, {})}>
                  新增角色
                </Button>
              </Access>,
            ],
          }}
          columns={columns}
          request={getRoles}
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
      </PageContainer>

      {/* 查看、编辑、新增角色表单 */}
      <ModalForm
        title={modalTitle}
        visible={modalVisible}
        width={500}
        onVisibleChange={updateModalVisible}
        modalProps={{
          destroyOnClose: true,
        }}
        initialValues={{
          name: currentRow?.name,
          description: currentRow?.description,
          status: `${currentRow?.status || 1}`,
        }}
        layout="horizontal"
        onFinish={submit}
        labelCol={{ span: 4 }}>
        <ProFormText
          name="name"
          label="角色名称"
          rules={[{ required: true, message: '角色必填' }]}
          placeholder="请输入角色"
        />
        <ProFormTextArea name="description" label="角色描述" placeholder="请输入角色描述" />
        <ProFormSelect name="status" label="状态" placeholder="请选择角色状态" key="status" options={statusList} />
      </ModalForm>

      {/* 菜单授权 */}
      {actionType === 10 && (
        <MenuTree
          role={currentRow}
          confirmLoading={drawerConfirmLoading}
          visible={drawerVisible}
          onClose={closeDrawer}
          onOk={editPermissions}
          request={getRoleMenu}
        />
      )}
    </>
  );
};

export default User;
