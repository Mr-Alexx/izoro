import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { useEffect, useRef, useState } from 'react';
import { AutoComplete, FormInstance, Space } from 'antd';
import { Button, message } from 'antd';
import { getPermissions, addPermission, editPermission, deletePermission } from '@/services/permission';
import ProForm, { ModalForm, ProFormDigit } from '@ant-design/pro-form';
import { Access, useAccess, useModel } from 'umi';
import { ACTIONS } from '@/constants';
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
      search: false,
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
    // {
    //   title: '状态',
    //   width: 80,
    //   align: 'center',
    //   dataIndex: 'status',
    //   valueType: 'select',
    //   valueEnum: STATUS_ENUM,
    // },
    {
      title: '操作',
      width: 80,
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => (
        <Space size={5}>
          <TooltipButton iconType="edit" title="编辑权限" onClick={() => handleAction(ACTIONS.edit, row)} />
          <ConfirmButton
            iconType="delete"
            title={`删除 ${row.name} 权限？`}
            onConfirm={() => handleAction(ACTIONS.del, row)}
          />
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
    <>
      <AppTable<PermissionApi.Permission>
        headerTitle="权限列表"
        actionRef={actionRef}
        columns={columns}
        request={getPermissions}
        scroll={{
          x: 600,
        }}
        toolbar={{
          actions: [
            <Access key="create" accessible={access.system.permission.create}>
              <Button key="list" type="primary" onClick={() => handleAction(ACTIONS.add, undefined)}>
                新增权限
              </Button>
            </Access>,
          ],
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
        <ProFormDigit name="status" initialValue={1} hidden />
        {/* <ProFormRadio.Group
          name="status"
          label="状态"
          initialValue={1}
          options={[
            { value: 1, label: '正常' },
            { value: 0, label: '废弃' },
          ]}
        /> */}
      </ModalForm>
    </>
  );
};

export default PermissionTable;
