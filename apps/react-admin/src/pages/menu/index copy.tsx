/**
 * @description 菜单、权限列表
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Tooltip, Modal, Popconfirm, message, Cascader, Tag } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import type { IconItem, MenuListProps } from './data';
import ProForm, { ProFormSelect, ProFormText, ProFormDigit } from '@ant-design/pro-form';
import styles from './index.less';
import PermissionTable from './components/PermissionTable';
import { ACTIONS } from '@/constants';
import { getMenus, createMenu, editMenu } from '@/services/user';
import { PageContainer } from '@ant-design/pro-layout';

const menuListDataSource: UserApi.MenuItem[] = [];

// 模拟菜单数据
for (let i = 1; i < 20; i += 1) {
  menuListDataSource.push({
    id: i,
    name: `菜单-${i}`,
    icon: '',
    url: `/menu/menu${i}`,
    status: 1,
    sort: 1,
    pid: 0,
  });
}
// 菜单图标列表
const iconList: IconItem[] = [
  { value: '1', label: 'xx' },
  { value: '2', label: '55' },
  { value: '3', label: 'dx' },
  { value: '4', label: 'xxx' },
];

// @ts-ignore
const MenuList: React.ForwardedRef = (props: MenuListProps) => {
  const { onChange } = props;
  // const [expandedRows, seEexpandedRows] = useState<number[] | undefined>();

  const [currentRow, setCurrentRow] = useState<Partial<UserApi.MenuItem> | undefined>();
  const [visible, updateVisible] = useState(false);
  const [actionType, setActionType] = useState<number>(ACTIONS.view);
  const actionRef = useRef<ActionType>();

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

  const handleAction = (type: number, row: Partial<UserApi.MenuItem> | undefined) => {
    setActionType(type);
    setCurrentRow(row);
    updateVisible(true);
  };
  /**
   * @description 新增/编辑菜单
   */
  const submitMenu = async (value: UserApi.MenuItem) => {
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
    } catch (err) {
      // message.error(err);
    }
    return true;
  };

  const columns: ProColumns<UserApi.MenuItem>[] = [
    {
      title: '菜单名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '图标',
      key: 'icon',
      width: 80,
      dataIndex: 'icon',
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
    },
    {
      title: '权限',
      key: 'permissions',
      dataIndex: 'permissions',
      render: (_, row) => {
        row.permissions = [
          { id: 1, name: 'menu:add' },
          { id: 2, name: 'menu:edit' },
        ];
        if (!row.permissions) {
          return null;
        }
        return row.permissions.map(v => {
          return <Tag key={v.id}>{v.name}</Tag>;
        });
      },
    },
    {
      title: '组件路径',
      key: 'component',
      dataIndex: 'component',
      width: 200,
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'option1',
      dataIndex: 'option',
      width: 110,
      fixed: 'right',
      render: (_, row) => {
        return [
          <Tooltip key="view" title="查看">
            <Button type="text" size="small" className="success" onClick={() => handleAction(ACTIONS.view, row)}>
              <EyeOutlined />
            </Button>
          </Tooltip>,
          <Tooltip key="edit" title="修改">
            <Button type="text" size="small" onClick={() => handleAction(ACTIONS.edit, row)} className="cyan">
              <EditOutlined />
            </Button>
          </Tooltip>,
          <Tooltip key="add" title="新增">
            <Button
              type="text"
              size="small"
              onClick={() => handleAction(ACTIONS.add, { pid: row?.id, name: row?.name })}
              className="primary">
              <PlusOutlined />
            </Button>
          </Tooltip>,
          // <Popconfirm key="delete" onConfirm={() => handleAction(ACTIONS.del, row)} title="确定删除该菜单吗？">
          //   <Button type="text" size="small" className="danger">
          //     <DeleteOutlined />
          //   </Button>
          // </Popconfirm>,
        ];
      },
    },
  ];

  return (
    <div>
      <ProTable<UserApi.MenuItem>
        actionRef={actionRef}
        scroll={{ x: 900 }}
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
            <Button key="list" type="primary" onClick={() => handleAction(ACTIONS.add, undefined)}>
              新建菜单
            </Button>,
          ],
        }}
        // options={false}
        pagination={false}
        search={false}
        onRow={row => {
          return {
            onClick: () => {
              if (!row?.id || row?.node_type === 1 || row?.node_type === 3 || row?.id === currentRow?.id) {
                return;
              }
              if (row?.id) {
                onChange(row);
              }
            },
          };
        }}
      />
      {/* 查看、编辑、新增菜单弹窗 */}
      <Modal title={title} footer={false} destroyOnClose visible={visible} onCancel={() => updateVisible(false)}>
        <ProForm
          className="modal-form"
          labelCol={{ span: 5 }}
          layout="horizontal"
          // @ts-ignore
          submitter={actionType !== ACTIONS.view}
          onFinish={submitMenu}
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
          }}>
          <ProFormSelect
            readonly={disabled}
            name="node_type"
            label="node_type"
            placeholder="请选择菜单类型"
            key="node_type"
            options={[
              { value: 1, label: '目录' },
              { value: 2, label: '页面' },
              { value: 3, label: '按钮' },
            ]}
          />
          <ProFormText
            readonly={disabled}
            name="name"
            label="name"
            rules={[{ required: true, message: 'name必填' }]}
            placeholder="菜单名称，如 系统管理"
          />
          <ProFormText readonly={disabled} name="menu_code" label="menu_code" placeholder="菜单标识，如 system" />
          <ProFormText
            readonly={disabled}
            name="path"
            label="path"
            rules={[{ required: true, message: 'path必填' }]}
            placeholder="路由地址，如 /system"
          />
          <ProFormText
            readonly={disabled}
            name="component"
            label="component"
            placeholder="组件路径，如 ./system/index"
          />
          <ProFormSelect readonly={disabled} name="icon" label="icon" placeholder="请选择菜单图标" options={iconList} />
          <ProFormSelect
            readonly={disabled}
            name="status"
            label="status"
            placeholder="请选择角色状态"
            rules={[{ required: true, message: '请选择状态' }]}
            key="status"
            options={[
              { value: 0, label: '禁用' },
              { value: 1, label: '启用' },
            ]}
          />
          <ProFormDigit
            readonly={disabled}
            name="sort"
            label="sort"
            rules={[{ required: true, message: '请填写排序' }]}
          />
          <ProFormDigit readonly={disabled} name="pid" label="parent" />
        </ProForm>
      </Modal>
    </div>
  );
};

const Menu: React.FC = () => {
  const [currentRow, setCurrentRow] = useState<Partial<UserApi.MenuItem> | undefined>();

  const handleMenuRowClick = async (row: UserApi.MenuItem) => {
    setCurrentRow(row);
  };

  return (
    <PageContainer>
      <ProCard split="vertical" className="menu-wrapper">
        <ProCard colSpan={16} ghost style={{ height: '100%', overflowY: 'auto' }}>
          <MenuList onChange={handleMenuRowClick} />
        </ProCard>
        <ProCard colSpan={8} ghost style={{ height: '100%', overflowY: 'auto' }}>
          <PermissionTable menu={currentRow} />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Menu;
