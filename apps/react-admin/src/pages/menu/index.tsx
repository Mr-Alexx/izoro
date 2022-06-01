/**
 * @description 菜单、权限列表
 */
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FormInstance, Space } from 'antd';
import { Button, message, Tag } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormDigit,
  DrawerForm,
  ProFormRadio,
  ProFormTreeSelect,
  ProFormDependency,
} from '@ant-design/pro-form';
import { ACTIONS, MENU_ICON_LIST } from '@/constants';
import Iconfont from '@/components/Iconfont';
import AppTable from '@/components/AppTable';
import { Access, useAccess } from 'umi';
import { getMenus, addMenu, editMenu, deleteMenu } from '@/services/menu';
import TooltipButton from '@/components/Button/TooltipButton';
import ConfirmButton from '@/components/Button/ConfirmButton';
import { getPermissions } from '@/services/permission';

const Menu: FC = () => {
  const [menus, setMenus] = useState<Partial<MenuApi.Menu>[]>();
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [permissions, setPermissions] = useState<PermissionApi.Permission[]>();
  const access = useAccess();
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    getPermissions({ current: 1, pageSize: 1000 }).then(data => {
      setPermissions(data.data);
    });
  }, []);

  /**
   * 处理操作
   * @param {ACTIONS} action 操作
   * @param {CategoryApi.Category} record 行记录
   * @return {void | boolean} boolean用于popconfirm异步关闭
   */
  const handleAction = (action: ACTIONS, record?: MenuApi.Menu): void | boolean => {
    switch (action) {
      case ACTIONS.add:
        formRef.current?.resetFields();
      case ACTIONS.edit:
        setTitle(record?.id ? `编辑菜单 - ${record?.name}` : '新增菜单');
        formRef.current?.setFieldsValue({ ...record, permissions: record?.permissions?.map((item: any) => item.id) });
        setVisible(true);
        break;
      case ACTIONS.del:
        deleteMenu(record?.id as number).then(tip => message.success(tip));
        actionRef.current?.reload();
        break;
    }
  };

  /**
   * @description 新增/编辑菜单
   */
  const submitMenu = async (formVal: MenuApi.Menu) => {
    try {
      formVal.id ? await editMenu(formVal) : await addMenu(formVal);
      message.success(`${formVal.id ? '编辑' : '新增'}成功！`);
      actionRef.current?.reload();
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  };

  const columns: ProColumns<MenuApi.Menu>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      width: 200,
      renderText: (text, row) => (
        <Space size={5}>
          {row.icon && <Iconfont style={{ fontSize: 16 }} type={row?.icon} />}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      width: 160,
      ellipsis: true,
    },
    // {
    //   title: '组件路径',
    //   dataIndex: 'component',
    //   width: 200,
    // },
    {
      title: '绑定权限',
      dataIndex: 'permissions',
      render: (_, row) => {
        if (!row.permissions) {
          return null;
        }
        return row.permissions.map((item: any) => {
          return (
            <Tag color="processing" key={item.id} style={{ marginTop: 3, marginBottom: 3 }}>
              {item.name}
            </Tag>
          );
        });
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: 100,
      fixed: 'right',
      render: (_, row) => {
        return (
          <Space size={5}>
            <TooltipButton
              iconType="add"
              title="新增子菜单"
              onClick={() => handleAction(ACTIONS.add, { pid: row?.id } as MenuApi.Menu)}
            />
            <TooltipButton iconType="edit" title="编辑菜单" onClick={() => handleAction(ACTIONS.edit, row)} />
            <ConfirmButton iconType="delete" title="删除菜单" onConfirm={() => handleAction(ACTIONS.del, row)} />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <AppTable<MenuApi.Menu>
        headerTitle="菜单列表"
        actionRef={actionRef}
        columns={columns}
        // @ts-ignore
        request={getMenus}
        dataKey={false}
        toolbar={{
          actions: [
            <Access accessible={access.system.user.create}>
              <Button key="list" type="primary" onClick={() => handleAction(ACTIONS.add, undefined)}>
                新建菜单
              </Button>
            </Access>,
          ],
        }}
        pagination={false}
        search={false}
        onLoad={dataSource => setMenus([{ id: 0, name: '请选择' }, ...dataSource])}
      />
      {/* 查看、编辑、新增菜单弹窗 */}
      <DrawerForm
        formRef={formRef}
        title={title}
        drawerProps={{
          forceRender: true,
          // destroyOnClose: true,
        }}
        visible={visible}
        onVisibleChange={setVisible}
        onFinish={submitMenu}
        layout="horizontal"
        labelCol={{ flex: '100px' }}
        wrapperCol={{ flex: '1' }}>
        <ProFormDigit hidden name="id" />
        <ProFormTreeSelect
          name="pid"
          label="上级菜单"
          placeholder="请选择"
          fieldProps={{
            allowClear: true,
            fieldNames: {
              value: 'id',
              label: 'name',
              children: 'children',
            },
            // @ts-ignore
            options: menus,
          }}
        />
        <ProFormText label="菜单名称" name="name" rules={[{ required: true }]} />

        <ProFormText name="path" label="路由地址" rules={[{ required: true }]} />
        <ProFormText label="组件路径" name="component" />
        <ProFormRadio.Group
          name="hide_in_menu"
          label="隐藏菜单"
          initialValue={0}
          options={[
            { value: 0, label: '否' },
            { value: 1, label: '是' },
          ]}
        />
        <ProForm.Item label="菜单图标" style={{ marginBottom: 0 }}>
          <ProFormSelect
            name="icon"
            options={MENU_ICON_LIST.map(icon => ({ value: icon, label: icon }))}
            fieldProps={{
              showSearch: true,
              optionItemRender(item) {
                return (
                  <div key={item.value}>
                    <Iconfont type={item.value} /> {item.label}
                  </div>
                );
              },
              suffixIcon: (
                <ProFormDependency name={['icon']}>
                  {({ icon }) => icon && <Iconfont style={{ fontSize: 20, marginTop: 5 }} type={icon} />}
                </ProFormDependency>
              ),
            }}
          />
        </ProForm.Item>

        <ProFormSelect
          name="permissions"
          label="绑定权限"
          showSearch
          mode="multiple"
          options={permissions?.map(item => ({ value: item.id, label: item.name }))}
        />

        <ProFormRadio.Group
          name="status"
          label="菜单状态"
          rules={[{ required: true }]}
          initialValue={1}
          options={[
            { value: 1, label: '启用' },
            { value: 0, label: '禁用' },
          ]}
        />
        <ProFormDigit name="sort" label="排序" />
      </DrawerForm>
    </>
  );
};

export default Menu;
