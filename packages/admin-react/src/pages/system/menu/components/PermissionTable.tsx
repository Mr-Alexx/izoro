/**
 * @description 权限列表
 */
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { PermissionProps, ActionSelectList } from '../data';
import { useEffect, useRef, useState } from 'react';
import { Button, Popconfirm, Tooltip, Modal, message, Form, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { AutoComplete } from 'antd';
import { createPermission, eidtPermission, getApiRoutes, getPermissions } from '@/services/users';
import ProForm, { ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Select } from 'antd';

const actionList: ActionSelectList[] = [
  { key: 'add', label: '新增', value: '新增' },
  { key: 'del', label: '删除', value: '删除' },
  { key: 'edit', label: '修改', value: '修改' },
  { key: 'list', label: '查看列表', value: '查看列表' },
  { key: 'detail', label: '查看详情', value: '查看详情' },
];

const PermissionTable: React.FC<PermissionProps> = props => {
  const { menu } = props;
  const [tableListDataSource, setTableListDataSource] = useState<USERS_API.PermissionItem[]>([]);
  const [visible, updateVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Partial<USERS_API.PermissionItem> | undefined>();
  const [routeOptions, setRouteOptions] = useState<Record<string, any>>();
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const columns: ProColumns<USERS_API.PermissionItem>[] = [
    {
      title: '序号',
      width: 50,
      key: 'index',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '权限名称',
      width: 120,
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '权限编码',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: '排序',
      width: 50,
      key: 'order',
      dataIndex: 'order',
    },
    {
      title: '操作',
      key: 'option',
      width: 80,
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Tooltip key="view" title="编辑">
          <Button
            type="text"
            size="small"
            className="success"
            onClick={() => {
              setCurrentRow(row);
              updateVisible(true);
            }}>
            <EditOutlined />
          </Button>
        </Tooltip>,
        <Popconfirm
          key="delete"
          onConfirm={() => {
            message.info('删除权限');
          }}
          title="确定删除该权限吗？">
          <Button type="text" size="small" className="danger">
            <DeleteOutlined />
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  useEffect(() => {
    if (menu?.id) {
      actionRef.current?.reload();
    }
  }, [menu]);

  /**
   * @description 创建/编辑权限
   */
  const submit = async (value: USERS_API.EditPermissionParams) => {
    const params = {
      ...value,
      order: Number(value.order),
      status: Number(value.status),
      menu_id: menu?.id,
    };
    try {
      let msg = '新增权限成功';
      if (!value.id) {
        await createPermission(params);
      } else {
        await eidtPermission({
          ...params,
          // @ts-ignore
          id: currentRow?.id,
        });
        msg = '编辑权限成功';
      }
      message.success(msg);
      updateVisible(false);
      actionRef.current?.reload();
    } catch (err) {
      console.error(err);
    }
    return true;
  };

  return (
    <>
      <ProTable<USERS_API.PermissionItem>
        actionRef={actionRef}
        headerTitle={`所属菜单：${menu?.name || '未选择'}`}
        columns={columns}
        rowKey="id"
        // @ts-ignore
        request={async params => {
          if (!menu?.id) {
            return { total: 0, data: null };
          }
          return await getPermissions({ ...params, menu_id: menu?.id });
        }}
        toolbar={{
          actions: [
            <Button
              key="list"
              type="primary"
              disabled={!menu?.id}
              onClick={() => {
                setCurrentRow(undefined);
                updateVisible(true);
              }}>
              新建权限
            </Button>,
          ],
        }}
        search={false}
      />

      <Modal
        destroyOnClose
        footer={false}
        title={`${menu?.name}：${!currentRow ? '新建权限' : `编辑权限 - ${currentRow?.name}`}`}
        visible={visible}
        onCancel={() => updateVisible(false)}>
        <ProForm
          className="modal-form"
          labelCol={{ span: 5 }}
          layout="horizontal"
          onFinish={submit}
          form={form}
          initialValues={{
            name: currentRow?.name,
            code: currentRow?.code,
            route_id: currentRow?.route_id,
            order: currentRow?.order || 1,
            status: currentRow?.status || 1,
            pid: menu?.id,
          }}>
          <ProForm.Item name="name" label="权限名称" key="name" rules={[{ required: true }]}>
            <AutoComplete
              options={actionList}
              onChange={value => {
                const key = actionList.filter(v => v.value === value)[0]?.key;
                if (!key) {
                  return;
                }
                form.setFieldsValue({ code: `${menu?.menu_code}:${key}` });
              }}
            />
          </ProForm.Item>
          {/* <ProFormText name="name" label="权限名称" key="name" rules={[{ required: true }]} /> */}
          <ProFormText name="code" label="权限编码" key="code" rules={[{ required: true }]} />
          <ProFormDigit name="route_id" label="路由id" key="route_id" rules={[{ required: true }]} />
          <ProFormSelect
            name="status"
            label="状态"
            key="status"
            rules={[{ required: true }]}
            options={[
              { value: 0, label: '禁用' },
              { value: 1, label: '启用' },
            ]}
          />
          <ProFormDigit name="order" label="排序" key="order" />
        </ProForm>
      </Modal>
    </>
  );
};

export default PermissionTable;
