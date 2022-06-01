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
import { useEffect, useRef, useState } from 'react';
import { AutoComplete, FormInstance, Space } from 'antd';
import { Button, message } from 'antd';
import { getPermissions, addPermission, editPermission, deletePermission } from '@/services/permission';
import ProForm, { ModalForm, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Access, useAccess, useModel } from 'umi';
import { ACTIONS, STATUS_ENUM } from '@/constants';
import AppTable from '@/components/AppTable';
import TooltipButton from '@/components/Button/TooltipButton';
import ConfirmButton from '@/components/Button/ConfirmButton';

const PermissionTable: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const access = useAccess();
  const { permissions, initPermissions } = useModel('mapListModel');

  useEffect(() => {
    initPermissions();
  }, []);

  const columns: ProColumns<PermissionApi.Permission>[] = [
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '权限名称',
      align: 'center',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '权限编码',
      dataIndex: 'code',
      valueType: 'text',
    },
    {
      title: '状态',
      width: 80,
      align: 'center',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
    },
    {
      title: '排序',
      width: 80,
      dataIndex: 'order',
      align: 'center',
      search: false,
    },
    {
      title: '操作',
      width: 80,
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => (
        <Space size={5}>
          <TooltipButton iconType="edit" title="编辑权限" onClick={() => handleAction(ACTIONS.edit, row)} />
          <ConfirmButton iconType="delete" title="删除权限" onConfirm={() => handleAction(ACTIONS.del, row)} />
        </Space>
      ),
    },
  ];

  /**
   * 处理操作
   * @param {ACTIONS} action 操作
   * @param {CategoryApi.Category} record 行记录
   * @return {void | boolean} boolean用于popconfirm异步关闭
   */
  const handleAction = (action: ACTIONS, record?: PermissionApi.Permission): void | boolean => {
    switch (action) {
      case ACTIONS.add:
        formRef.current?.resetFields();
      case ACTIONS.edit:
        setTitle(record?.id ? `编辑权限 - ${record?.name}` : '新增权限');
        formRef.current?.setFieldsValue({ ...record });
        setVisible(true);
        break;
      case ACTIONS.del:
        deletePermission(record?.id as number).then(tip => message.success(tip));
        actionRef.current?.reload();
        break;
    }
  };

  /**
   * @description 新增/编辑菜单
   */
  const submit = async (formVal: PermissionApi.Permission) => {
    try {
      formVal.id ? await editPermission(formVal) : await addPermission(formVal);
      message.success(`${formVal.id ? '编辑' : '新增'}成功！`);
      actionRef.current?.reload();
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  };

  return (
    <PageContainer>
      <AppTable<PermissionApi.Permission>
        actionRef={actionRef}
        columns={columns}
        request={getPermissions}
        toolbar={{
          actions: [
            <Access key="create" accessible={access.system.permission.create}>
              <Button key="list" type="primary" onClick={() => handleAction(ACTIONS.add, undefined)}>
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
          forceRender: true,
        }}
        title={title}
        visible={visible}
        onVisibleChange={setVisible}
        onFinish={submit}
        labelCol={{ flex: '100px' }}
        wrapperCol={{ flex: '1' }}
        layout="horizontal">
        <ProFormDigit hidden name="id" />
        <ProForm.Item name="name" label="权限名称" rules={[{ required: true }]}>
          <AutoComplete
            options={permissions?.map((item: APP.Option) => ({
              label: `${item.label} (${item.value})`,
              value: item.label,
            }))}
            onSelect={(value: string) => {
              formRef.current?.setFieldsValue({
                code: permissions?.find(item => item.label === value)?.value,
              });
            }}
          />
        </ProForm.Item>
        <ProForm.Item name="code" label="权限编码" rules={[{ required: true }]}>
          <AutoComplete
            options={permissions?.map((item: APP.Option) => ({
              label: `${item.value} (${item.label})`,
              value: item.value,
            }))}
            onSelect={(value: string) => {
              formRef.current?.setFieldsValue({
                name: permissions?.find(item => item.value === value)?.label,
              });
            }}
          />
        </ProForm.Item>
        <ProFormRadio.Group
          name="status"
          label="状态"
          initialValue={1}
          options={[
            { value: 1, label: '正常' },
            { value: 0, label: '废弃' },
          ]}
        />
        <ProFormDigit name="sort" label="排序" key="order" />
      </ModalForm>
    </PageContainer>
  );
};

export default PermissionTable;
