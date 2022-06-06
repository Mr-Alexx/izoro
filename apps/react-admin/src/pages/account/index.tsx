/**
 * @description 账号管理页
 */

import type { FormInstance } from 'antd';
import { Button, message, Tag, Row, Col, Modal, Space } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, { ProFormText, ProFormSelect, ModalForm, ProFormDependency } from '@ant-design/pro-form';
import { getUsers, createUser, editUser, deleteUser } from '@/services/user';
import { useState, useRef, FC } from 'react';
import { ACTIONS, STATUS_ENUM, STATUS_OPTIONS } from '@/constants';
import { Access, useAccess } from 'umi';
import AppTable from '@/components/AppTable';
import copy from 'copy-to-clipboard';
import { ProFormDigit } from '@ant-design/pro-form';
import { ClearOutlined } from '@ant-design/icons';
import ConfirmButton from '@/components/Button/ConfirmButton';
import TooltipButton from '@/components/Button/TooltipButton';
import { getRoles } from '@/services/role';
import { useRequest } from 'umi';

const WORDS: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-$%&@+!';

/**
 * @description 随机密码
 * @param {number} len 位数，默认8
 * 组合规则：首字母大写 + 一位特殊字符 + 1位数字 + 特殊字符外的随机串
 */
const randomPassword = (len: number = 8): string => {
  const wordsLenth = WORDS.substring(0, 63).length;
  const UpperCase = WORDS.substring(26, 52);
  const number = WORDS.substring(53, 62);
  const chart = WORDS.substring(63);
  let password = '';

  password += UpperCase[Math.floor(Math.random() * UpperCase.length)];
  password += number[Math.floor(Math.random() * number.length)];
  password += chart[Math.floor(Math.random() * chart.length)];
  for (let i = 0, length = len - 3; i < length; i += 1) {
    const index = Math.floor(Math.random() * wordsLenth);
    password += WORDS[index];
  }
  return password;
};

const UserPage: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();

  const formRef = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const access = useAccess();

  const { data: roles } = useRequest(getRoles, {
    formatResult: (result: Api.ListRes) => result?.list?.map?.(item => ({ value: item.id, label: item.name })),
  });

  // 表头数据（列）
  const columns: ProColumns<UserApi.User>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
      align: 'center',
      search: false,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'image',
      align: 'center',
      width: 100,
      fieldProps: {
        width: 80,
        height: 80,
      },
    },
    {
      title: '账号',
      dataIndex: 'account',
      align: 'center',
      width: 120,
    },
    {
      title: '名称',
      dataIndex: 'nickname',
      align: 'center',
      valueType: 'text',
      width: 100,
    },
    {
      title: '角色',
      dataIndex: 'roles',
      align: 'left',
      width: 140,
      valueType: 'select',
      fieldProps: {
        options: roles,
        mode: 'multiple',
      },
      render: (_, row) => {
        if (!row.roles) {
          return '-';
        }
        return (
          <Space size={3}>
            {row.roles?.map?.((item: any) => (
              <Tag key={item.id} color="processing">
                {item.name}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      valueEnum: STATUS_ENUM,
      valueType: 'select',
      width: 80,
    },
    {
      title: '邮箱',
      ellipsis: true,
      dataIndex: 'email',
      align: 'center',
      search: false,
      width: 140,
    },
    {
      title: '电话',
      dataIndex: 'phone_number',
      align: 'center',
      search: false,
      width: 120,
    },
    {
      title: '最近登录时间',
      dataIndex: 'last_login_at',
      align: 'center',
      valueType: 'dateTime',
      search: false,
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      align: 'center',
      valueType: 'dateTime',
      search: false,
      width: 120,
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      align: 'center',
      valueType: 'dateTime',
      search: false,
      width: 120,
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => {
        return (
          <Space size={5}>
            <Access key="reset" accessible={access.system.user.edit}>
              <ConfirmButton
                title={`确定要重置账号 ${row.account} 的密码吗？`}
                tips="重置密码"
                buttonProps={{
                  icon: <ClearOutlined />,
                  style: { color: '#40a9ff' },
                }}
                onConfirm={() => resetPassord(row)}
              />
            </Access>

            <Access key="edit" accessible={access.system.user.edit}>
              <TooltipButton iconType="edit" title="编辑账号" onClick={() => handleAction(ACTIONS.edit, row)} />
            </Access>

            <Access key="del" accessible={access.system.user.edit}>
              <ConfirmButton
                iconType="delete"
                title={`确定要删除账号 ${row.account} 吗？`}
                onConfirm={() => handleAction(ACTIONS.del, row)}
              />
            </Access>
          </Space>
        );
      },
    },
  ];

  /**
   * @description 随机密码
   */
  const handleRandomPassword = (): void => {
    const password = randomPassword();
    formRef.current?.setFieldsValue({ password });
  };

  /**
   * @description 重置密码
   */
  const resetPassord = async (record: UserApi.User) => {
    try {
      const newPwd = randomPassword();
      await editUser({
        ...record,
        password: newPwd,
      });
      const modal = Modal.success({
        title: '密码重置成功',
        content: `账号 ${record.account} 密码已重置为 ${newPwd}`,
        okText: '复制密码',
        onOk: () => {
          copy(newPwd);
          message.success('复制成功！');
          modal.destroy();
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 处理操作
   * @param {ACTIONS} action 操作
   * @param {CategoryApi.Category} record 行记录
   * @return {void | boolean} boolean用于popconfirm异步关闭
   */
  const handleAction = (action: ACTIONS, record?: UserApi.User): void | boolean => {
    switch (action) {
      case ACTIONS.add:
        formRef.current?.resetFields();
      case ACTIONS.edit:
        record && formRef.current?.setFieldsValue({ ...record });
        setTitle(record?.id ? `编辑账号 - ${record?.account}` : '新增账号');
        setVisible(true);
        break;
      case ACTIONS.del:
        deleteUser(record?.id as number).then(tip => message.success(tip));
        break;
    }
  };

  /**
   * @description 编辑/添加账号
   */
  const submit = async (formVal: UserApi.UserEditDto): Promise<boolean> => {
    try {
      formVal.id ? await editUser(formVal) : await createUser(formVal);
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
      <AppTable<UserApi.User>
        headerTitle="账号列表"
        actionRef={actionRef}
        toolBarRender={() => [
          <Access key="primary" accessible={access.system.user.create}>
            <Button type="primary" onClick={() => handleAction(ACTIONS.add)}>
              新增账号
            </Button>
          </Access>,
        ]}
        columns={columns}
        // @ts-ignore
        request={getUsers}
      />

      {/* 编辑、新增账号 */}
      <ModalForm
        formRef={formRef}
        title={title}
        width="500px"
        visible={visible}
        onVisibleChange={setVisible}
        onFinish={submit}
        labelCol={{ flex: '100px' }}
        wrapperCol={{ flex: 1 }}
        layout="horizontal"
        autoFocusFirstInput>
        <ProFormDigit name="id" hidden />
        <ProFormText
          name="account"
          label="账号"
          rules={[
            { required: true, message: '账号必填' },
            { min: 4, max: 20, message: '长度介于4 ~ 20个字符' },
          ]}
        />
        <ProFormDependency name={['id']}>
          {({ id }) => {
            if (!!id) {
              return;
            }
            return (
              <ProForm.Item
                label="密码"
                name="password"
                style={{ marginBottom: 0 }}
                rules={[
                  { required: true, message: '密码必填' },
                  { min: 6, max: 24, message: '密码长度6-24' },
                ]}>
                <Row gutter={0}>
                  <Col span={18}>
                    <ProFormText name="password" />
                  </Col>
                  <Col span={6}>
                    <Button type="primary" style={{ float: 'right' }} onClick={() => handleRandomPassword()}>
                      随机密码
                    </Button>
                  </Col>
                </Row>
              </ProForm.Item>
            );
          }}
        </ProFormDependency>
        <ProFormText name="nickname" label="昵称" />
        <ProFormText name="email" label="邮箱" />
        <ProFormText name="phone_number" label="手机号码" />
        <ProFormSelect
          name="status"
          label="状态"
          key="status"
          options={STATUS_OPTIONS}
          allowClear={false}
          initialValue={1}
          rules={[{ required: true }]}
        />
        <ProFormSelect
          name="roles"
          label="绑定角色"
          mode="multiple"
          fieldProps={{
            options: roles,
            showSearch: true,
            allowClear: true,
          }}
        />
      </ModalForm>
    </>
  );
};

export default UserPage;
