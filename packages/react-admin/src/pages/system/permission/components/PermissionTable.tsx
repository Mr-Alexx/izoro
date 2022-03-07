/**
 * @description 权限列表
 * 说明：
 * 因为后台将权限和路由分离的关系，具体操作需要先添加路由（api地址）
 * 再拿到路由地址的id，然后再添加权限，把id路由
 * 以上会在前端操作会比较麻烦，为了简化操作，采取如下措施：
 * 1. 去掉路由绑定操作，直接添加权限，在添加的时候输入路由地址
 * 2. 保存前，先调用新增路由接口，
 * 2.1 如果新增成功，则调用查询接口，查找该记录，拿到id
 * 2.2 否则，调用查询接口，查找该记录，拿到id
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
        headerTitle="权限管理"
        columns={columns}
        rowKey="id"
        request={getPermissions}
        toolbar={{
          actions: [
            <Button
              key="list"
              type="primary"
              // disabled={!menu?.id}
              onClick={() => {
                setCurrentRow(undefined);
                updateVisible(true);
              }}>
              新增权限
            </Button>,
          ],
        }}
        search={false}
        options={{
          fullScreen: false,
          reload: true,
          setting: false,
          density: true,
        }}
      />

      <Modal
        destroyOnClose
        footer={false}
        title={`${!currentRow ? '新建权限' : `编辑权限 - ${currentRow?.name}`}`}
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
            // pid: menu?.id,
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
          <ProFormText name="route_url" label="路由地址" key="route_url" rules={[{ required: true }]} />
          <ProFormDigit name="route_id" label="路由id" key="route_id" />
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
