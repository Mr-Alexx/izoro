/**
 * @description 角色管理页
 */

import type { FC } from 'react';
import { Button, FormInstance, message, Space } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useState, useRef } from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import MenuTree from './components/MenuTree';
import { getRoles, addRole, editRole, grantRole, getRoleMenu, deleteRole } from '@/services/role';
import { ACTIONS, STATUS_OPTIONS } from '@/constants';
import { Access, useAccess } from 'umi';
import { STATUS_ENUM } from '@/constants';
import AppPageContainer from '@/components/AppPageContainer';
import AppTable from '@/components/AppTable';
import ConfirmButton from '@/components/Button/ConfirmButton';
import TooltipButton from '@/components/Button/TooltipButton';

/**
 * @description hooks形式的函数式组件
 * @see https://juejin.cn/post/6944863057000529933
 */
const User: FC = () => {
  const [currentRow, setCurrentRow] = useState<RoleApi.Role>(); // 当前操作行
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();

  const formRef = useRef<FormInstance>();
  const actionRef = useRef<ActionType>(); // 表格dom引用
  const access = useAccess();

  const columns: ProColumns<RoleApi.Role>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      align: 'center',
      valueType: 'index',
    },
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '描述',
      dataIndex: 'description',
      align: 'center',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      valueEnum: STATUS_ENUM,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: '操作',
      width: 80,
      align: 'center',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => {
        return (
          <Space size={5}>
            <Access key="edit" accessible={access.system.role.edit}>
              <TooltipButton iconType="edit" title="编辑角色" onClick={() => handleAction(ACTIONS.edit, row)} />
            </Access>

            <Access key="del" accessible={access.system.role.edit}>
              <ConfirmButton
                type="delete"
                title={`确定要删除角色 ${row.name} 吗？`}
                onConfirm={() => handleAction(ACTIONS.del, row)}
              />
            </Access>

            {/* <Access key="shouquan" accessible={access.system.role.grandMenuPermission}>
              <a onClick={() => openDrawer(row)}>授权</a>
            </Access> */}
          </Space>
        );
      },
    },
  ];

  // const formatData = (
  //   data: UserApi.MenuItem[],
  //   permissionInfo: UserApi.MenuPermissionInfo,
  // ): UserApi.MenuPermissionInfo => {
  //   data.forEach(item => {
  //     if (!item.checked) {
  //       return;
  //     }
  //     const obj: Record<string | number, string> = {};
  //     obj[item.id] = item.permissions
  //       ? item.permissions
  //           .filter(v => !!v.checked)
  //           .map(v => v.id)
  //           .join(',')
  //       : '0';
  //     // eslint-disable-next-line
  //     permissionInfo.push(obj);

  //     if (Array.isArray(item.children) && item.children.length > 0) {
  //       formatData(item.children, permissionInfo);
  //     }
  //   });
  //   return permissionInfo;
  // };
  // /**
  //  * @description 菜单授权确认
  //  */
  // const editPermissions = async (data: UserApi.MenuItem[]): Promise<void> => {
  //   // console.log(data);
  //   toggleDrawerConfirmLoading(true);
  //   // 将数据格式化成授权接口参数形式
  //   const formatParams: UserApi.MenuPermissionInfo = [];
  //   const permissionInfo = formatData(data, formatParams);

  //   try {
  //     await grantRole({ role_id: currentRow?.id as number, permission_info: permissionInfo });
  //     closeDrawer();
  //     message.success(`角色：${currentRow?.name} 授权成功`);
  //   } catch (err) {
  //     console.error(err);
  //     message.error(`角色：${currentRow?.name} 授权失败`);
  //   }
  //   toggleDrawerConfirmLoading(false);
  // };

  /**
   * 处理操作
   * @param {ACTIONS} action 操作
   * @param {CategoryApi.Category} record 行记录
   * @return {void | boolean} boolean用于popconfirm异步关闭
   */
  const handleAction = (action: ACTIONS, record?: RoleApi.Role): void | boolean => {
    switch (action) {
      case ACTIONS.add:
        formRef.current?.resetFields();
      case ACTIONS.edit:
        record && formRef.current?.setFieldsValue({ ...record });
        setTitle(record?.id ? `编辑角色 - ${record?.name}` : '新增角色');
        setVisible(true);
        break;
      case ACTIONS.del:
        deleteRole(record?.id as number).then(tip => message.success(tip));
        break;
    }
  };

  /**
   * @description 编辑/添加角色
   */
  const submit = async (formVal: RoleApi.RoleEditDto): Promise<boolean> => {
    try {
      formVal.id ? await editRole(formVal) : await addRole(formVal);
      message.success(`${formVal.id ? '编辑' : '新增'}成功！`);
      actionRef.current?.reload();
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  };

  return (
    <AppPageContainer>
      <AppTable<RoleApi.Role>
        actionRef={actionRef}
        toolbar={{
          actions: [
            <Access key="key" accessible={access.system.role.create}>
              <Button type="primary" onClick={() => handleAction(ACTIONS.add)}>
                新增角色
              </Button>
            </Access>,
          ],
        }}
        columns={columns}
        request={getRoles}
      />

      {/* 查看、编辑、新增角色表单 */}
      <ModalForm
        formRef={formRef}
        title={title}
        visible={visible}
        onVisibleChange={setVisible}
        width={500}
        layout="horizontal"
        onFinish={submit}
        labelCol={{ flex: '100px' }}
        wrapperCol={{ flex: 1 }}>
        <ProFormText name="name" label="角色名称" rules={[{ required: true, message: '角色必填' }]} />
        <ProFormTextArea name="description" label="角色描述" />
        <ProFormSelect
          name="status"
          label="状态"
          key="status"
          options={STATUS_OPTIONS}
          initialValue={1}
          rules={[{ required: true, message: '角色状态必选' }]}
        />
      </ModalForm>

      {/* 菜单授权 */}
      {/* {actionType === 10 && (
        <MenuTree
          role={currentRow}
          confirmLoading={drawerConfirmLoading}
          visible={drawerVisible}
          onClose={closeDrawer}
          onOk={editPermissions}
          request={getRoleMenu}
        />
      )} */}
    </AppPageContainer>
  );
};

export default User;
