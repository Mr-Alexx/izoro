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
import { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Button, message } from 'antd';
import { createPermission, eidtPermission, getPermissions, createApiRoute, getApiRoutes } from '@/services/user';
import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Access, useAccess } from 'umi';

const PermissionTable: React.FC = () => {
  const [visible, updateVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Partial<UserApi.PermissionItem> | undefined>();
  const actionRef = useRef<ActionType>();
  // const [form] = Form.useForm();
  const formRef = useRef<FormInstance>();
  const access = useAccess();

  const columns: ProColumns<UserApi.PermissionItem>[] = [
    {
      title: '序号',
      width: 50,
      key: 'index',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '权限名称',
      width: 160,
      key: 'name',
      align: 'center',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '权限编码',
      key: 'code',
      dataIndex: 'code',
      valueType: 'text',
    },
    {
      title: '绑定路由',
      key: 'route_name',
      dataIndex: 'route_name',
      valueType: 'text',
    },
    {
      title: '路由id',
      width: 100,
      key: 'route_id',
      dataIndex: 'route_id',
      align: 'center',
      search: false,
    },
    {
      title: '排序',
      width: 80,
      key: 'order',
      dataIndex: 'order',
      align: 'center',
      search: false,
    },
    {
      title: '操作',
      key: 'option',
      width: 80,
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Access key="edit" accessible={access.system.permission.edit}>
          <a
            onClick={() => {
              setCurrentRow(row);
              updateVisible(true);
            }}>
            编辑
          </a>
        </Access>,
      ],
    },
  ];

  /**
   * @description 创建/编辑权限
   */
  const submit = async (value: UserApi.EditPermissionParams) => {
    const params = {
      ...value,
      order: Number(value.order),
      status: Number(value.status),
    };

    let route_id: number;
    await createApiRoute({ route: value.route as string, status: 1 });
    try {
      // 1. 通过路由地址创建路由
      // 2. 无论成功或者失败，都过该路由地址查询列表接口（精准匹配），拿到第一条信息的id，保存
      let data: UserApi.ApiRouteItem[];
      const res = await getApiRoutes({ route: value.route });
      // eslint-disable-next-line prefer-const
      data = res.data;
      route_id = data[0]?.id;
      console.log('路由id：', route_id);

      let msg = '新增权限成功';
      if (!currentRow?.id) {
        await createPermission({ ...params, route_id });
      } else {
        await eidtPermission({
          ...params,
          route_id,
          // @ts-ignore
          id: currentRow?.id,
        });
        msg = '编辑权限成功';
      }
      message.success(msg);
      updateVisible(false);
      actionRef.current?.reload();
      return true;
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  return (
    <PageContainer>
      <ProTable<UserApi.PermissionItem>
        actionRef={actionRef}
        headerTitle="权限列表"
        columns={columns}
        rowKey="id"
        request={getPermissions}
        toolbar={{
          actions: [
            <Access key="create" accessible={access.system.permission.create}>
              <Button
                type="primary"
                // disabled={!menu?.id}
                onClick={() => {
                  setCurrentRow(undefined);
                  updateVisible(true);
                }}>
                新增权限
              </Button>
            </Access>,
          ],
        }}
        options={{
          fullScreen: false,
          reload: true,
          setting: false,
          density: true,
        }}
      />

      <ModalForm
        width={500}
        formRef={formRef}
        modalProps={{
          destroyOnClose: true,
        }}
        title={`${!currentRow ? '新建权限' : `编辑权限 - ${currentRow?.name}`}`}
        visible={visible}
        onVisibleChange={updateVisible}
        initialValues={{
          name: currentRow?.name,
          code: currentRow?.code,
          route: currentRow?.route_name,
          route_id: currentRow?.route_id,
          order: currentRow?.order || 1,
          status: currentRow?.status === undefined ? 1 : currentRow?.status,
          // pid: menu?.id,
        }}
        onFinish={submit}
        labelCol={{ span: 5 }}
        layout="horizontal"
        // submitter={{
        //   render: (props, defaultDoms) => {
        //     return [
        //       <Button
        //         key="extra-reset"
        //         onClick={() => {
        //           props.reset();
        //         }}
        //         type="text"
        //         danger>
        //         重置
        //       </Button>,
        //       ...defaultDoms,
        //     ];
        //   },
        // }}
      >
        <ProFormText name="name" label="权限名称" key="name" rules={[{ required: true }]} />
        <ProFormText name="code" label="权限编码" key="code" rules={[{ required: true }]} />
        <ProFormText name="route" label="路由地址" key="route" />
        <ProFormDigit name="route_id" label="路由id" key="route_id" placeholder="由路由地址创建或者查找获得" />
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
      </ModalForm>
    </PageContainer>
  );
};

export default PermissionTable;
