/**
 * @description 菜单、权限列表
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Button, message, Tag, Row, Col } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, { ProFormSelect, ProFormText, ProFormDigit, DrawerForm, ProFormRadio } from '@ant-design/pro-form';
import { ACTIONS, MENU_ICON_LIST } from '@/constants';
import { getMenus, createMenu, editMenu, getPermissions, bindPermission } from '@/services/users';
import { PageContainer } from '@ant-design/pro-layout';
import { Access, useAccess, useRequest } from 'umi';
import Iconfont from '@/components/Iconfont';

// @ts-ignore
const Menu: React.ForwardedRef = () => {
  // const [expandedRows, seEexpandedRows] = useState<number[] | undefined>();

  const [currentRow, setCurrentRow] = useState<Partial<USERS_API.MenuItem> | undefined>();
  const [visible, updateVisible] = useState(false);
  const [actionType, setActionType] = useState<number>(ACTIONS.view);
  const actionRef = useRef<ActionType>();
  const [permissionList, setPermissionList] = useState<any[]>([]);
  const [isPage, setIsPage] = useState<boolean>();
  const [currentIcon, setCurrentIcon] = useState<string | undefined>();
  const access = useAccess();

  const formRef = useRef<FormInstance>();

  const title = useMemo(() => {
    let modalTitle = '';
    console.log(currentRow);
    switch (actionType) {
      case ACTIONS.edit:
        modalTitle = `编辑 - ${currentRow?.name}`;
        break;
      case ACTIONS.add:
        modalTitle = `新增 - ${!currentRow?.name ? '根菜单' : `${currentRow.name}-子菜单`}`;
        break;
      default:
        modalTitle = `查看 - ${currentRow?.name}`;
        break;
    }
    return modalTitle;
  }, [actionType, currentRow]);

  const disabled = useMemo(() => {
    return actionType === ACTIONS.view;
  }, [actionType]);

  // 初始化权限列表（返回所有），绑定权限用
  useRequest(() => getPermissions(), {
    onSuccess: data => {
      setPermissionList(data);
    },
  });

  const handleAction = (type: number, row: Partial<USERS_API.MenuItem> | undefined) => {
    setActionType(type);
    setCurrentRow(row);
    setCurrentIcon(row?.icon);
    setIsPage(row?.node_type === 2);
    updateVisible(true);
  };
  /**
   * @description 新增/编辑菜单
   */
  const submitMenu = async (value: USERS_API.MenuItem) => {
    try {
      let msg = '新增成功';
      const id = currentRow?.id;
      if (!id) {
        await createMenu({
          ...value,
          pid: Number(value?.pid || 0),
          sort: Number(value?.sort),
        });
      } else {
        // 绑定权限（菜单下有子菜单不允许绑定，后台设定问题，这次要做过滤）
        // if (!currentRow?.children) {
        //   await bindPermission({ permissions: value.permissions, id: currentRow?.id as number });
        // }

        await editMenu({
          ...value,
          pid: Number(value?.pid || 0),
          // @ts-ignore
          id: currentRow?.id,
          sort: Number(value?.sort),
        });
        msg = '修改成功';
      }
      updateVisible(false);
      message.success(msg);
      // onAction();
      actionRef.current?.reload();
      return true;
    } catch (err) {
      // message.error(err);
      console.error(err);
      return false;
    }
  };

  const columns: ProColumns<USERS_API.MenuItem>[] = [
    {
      title: '菜单名称',
      key: 'name',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: '图标',
      key: 'icon',
      width: 80,
      dataIndex: 'icon',
      align: 'center',
      render: (_, row) => {
        if (!row?.icon) {
          return null;
        }
        return <Iconfont style={{ fontSize: 20 }} type={row?.icon} />;
      },
    },
    {
      title: '状态',
      key: 'status1',
      dataIndex: 'status',
      width: 80,
      valueEnum: {
        0: {
          text: '禁用',
          status: 'Error',
        },
        1: {
          text: '启用',
          status: 'Processing',
        },
      },
    },
    {
      title: '路由地址',
      key: 'path',
      dataIndex: 'path',
      width: 160,
      ellipsis: true,
    },
    {
      title: '组件路径',
      key: 'component',
      dataIndex: 'component',
      width: 200,
    },
    {
      title: '权限',
      key: 'permissions',
      dataIndex: 'permissions',
      render: (_, row) => {
        if (!row.permissions) {
          return null;
        }
        return row.permissions.map(v => {
          return (
            <Tag color="blue" key={v} style={{ marginTop: 3, marginBottom: 3 }}>
              {permissionList.find(item => item.value === v)?.label}
            </Tag>
          );
        });
      },
    },
    {
      title: '操作',
      key: 'option1',
      dataIndex: 'option',
      valueType: 'option',
      width: 180,
      fixed: 'right',
      render: (_, row) => {
        return [
          <Access key="view" accessible={access.system.user.view}>
            <a onClick={() => handleAction(ACTIONS.view, row)}>查看</a>
          </Access>,
          <Access key="edit" accessible={access.system.user.edit}>
            <a onClick={() => handleAction(ACTIONS.edit, row)}>编辑</a>
          </Access>,
          <Access key="add" accessible={access.system.user.create}>
            <a onClick={() => handleAction(ACTIONS.add, { pid: row?.id, name: row?.name })}>新建子菜单</a>
          </Access>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<USERS_API.MenuItem>
        sticky
        actionRef={actionRef}
        scroll={{ x: 1300 }}
        // expandable={{
        //   defaultExpandedRowKeys: expandedRows,
        // }}
        columns={columns}
        // @ts-ignore
        request={async () => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          // console.log(params, sorter, filter);
          const data = await getMenus();
          // @ts-ignore
          // seEexpandedRows(data.map(v => v.id));
          return {
            data,
            success: true,
          };
        }}
        rowKey="id"
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
      />
      {/* 查看、编辑、新增菜单弹窗 */}
      <DrawerForm
        formRef={formRef}
        title={title}
        drawerProps={{
          forceRender: true,
          destroyOnClose: true,
        }}
        visible={visible}
        onVisibleChange={updateVisible}
        onFinish={submitMenu}
        layout="horizontal"
        labelCol={{ span: 5 }}
        initialValues={{
          name: currentRow?.name,
          menu_code: currentRow?.menu_code,
          path: currentRow?.path,
          component: currentRow?.component,
          icon: currentRow?.icon,
          sort: currentRow?.sort || 1,
          status: currentRow?.status || 1,
          node_type: currentRow?.node_type || 1,
          pid: currentRow?.pid || 0,
          permissions: currentRow?.permissions,
        }}
        submitter={{
          submitButtonProps: {
            style: {
              display: actionType === ACTIONS.view ? 'none' : 'inherit',
            },
          },
        }}>
        <ProFormRadio.Group
          disabled={!!currentRow?.id}
          name="node_type"
          label="菜单类型"
          options={[
            { value: 1, label: '一级菜单' },
            { value: 2, label: '子菜单' },
            // { value: 3, label: '按钮' },
          ]}
          fieldProps={{
            onChange: e => {
              setIsPage(e.target.value === 2);
            },
          }}
        />
        <ProFormText
          readonly={disabled}
          label="菜单名称"
          name="name"
          rules={[{ required: true }]}
          placeholder="name，如 系统管理"
        />
        <ProFormText
          readonly={disabled}
          label="菜单标识"
          name="menu_code"
          placeholder="menu_code，填写英文名称即可，如 system"
        />
        <ProFormText
          readonly={disabled}
          name="path"
          label="路由地址"
          placeholder="path，如 /system"
          rules={[{ required: true }]}
        />
        <ProFormText readonly={disabled} label="组件路径" name="component" placeholder="component，如 ./system/index" />
        {/* 一级菜单才让加icon */}
        {currentRow?.pid === 0 && (
          <ProForm.Item label="菜单图标" style={{ marginBottom: 0 }}>
            <Row gutter={10}>
              <Col span={22}>
                <ProFormSelect
                  readonly={disabled}
                  name="icon"
                  placeholder="icon"
                  options={MENU_ICON_LIST.map(icon => ({ value: icon, label: icon }))}
                  fieldProps={{
                    onChange: value => setCurrentIcon(value),
                    // @ts-ignore
                    optionItemRender(item) {
                      return (
                        <div key={item.value}>
                          <Iconfont type={item.value} /> {item.label}
                        </div>
                      );
                    },
                  }}
                />
              </Col>
              <Col span={2}>
                {currentIcon && <Iconfont style={{ fontSize: 20, marginTop: 5 }} type={currentIcon} />}
              </Col>
            </Row>
          </ProForm.Item>
        )}
        {/* <div>
          <div>{currentIcon && <Iconfont type={currentIcon} />}</div>
          <ProFormSelect
            readonly={disabled}
            label="菜单图标"
            name="icon"
            placeholder="icon"
            options={MENU_ICON_LIST.map(icon => ({ value: icon, label: icon }))}
            fieldProps={{
              onChange: value => setCurrentIcon(value),
              // @ts-ignore
              optionItemRender(item) {
                return (
                  <div key={item.value}>
                    <Iconfont type={item.value} /> {item.label}
                  </div>
                );
              },
            }}
          />
        </div> */}
        <ProFormSelect
          readonly={disabled}
          name="status"
          label="菜单状态"
          placeholder="status"
          rules={[{ required: true, message: '请选择状态' }]}
          key="status"
          allowClear={false}
          options={[
            { value: 0, label: '禁用' },
            { value: 1, label: '启用' },
          ]}
        />
        <ProFormSelect
          readonly={disabled}
          name="permissions"
          label="绑定权限"
          showSearch
          mode="multiple"
          placeholder="请选择权限"
          options={permissionList}
        />
        {isPage && <ProFormDigit readonly={disabled} name="pid" label="上级菜单" />}
        <ProFormDigit
          readonly={disabled}
          name="sort"
          label="排序"
          rules={[{ required: true, message: '请填写排序' }]}
        />
      </DrawerForm>
    </PageContainer>
  );
};

export default Menu;
