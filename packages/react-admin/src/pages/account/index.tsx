/**
 * @description 账号管理页
 */

import { FormInstance, Tooltip } from 'antd';
import { Popconfirm } from 'antd';
import { Button, message, Tag, Row, Col, Modal } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, { ProFormText, ProFormSelect, ModalForm } from '@ant-design/pro-form';
import { getUsers, createUser, editUser, deleteUser } from '@/services/user';
import { useState, useRef } from 'react';
import { ACTIONS } from '@/constants';
import { Access, useAccess } from 'umi';
import AppPageContainer from '@/components/AppPageContainer';
import AppTable from '@/components/AppTable';
import { ProFormTree } from '@/components/ProFormItem';
import copy from 'copy-to-clipboard';
import { ProFormDigit } from '@ant-design/pro-form';
import { ClearOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import ConfirmButton from '@/components/Button/ConfirmButton';
import TooltipButton from '@/components/Button/TooltipButton';

const WORDS: string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '_',
  '-',
  '$',
  '%',
  '&',
  '@',
  '+',
  '!',
];

/**
 * @description 随机密码
 * @param {number} len 位数，默认8
 * 组合规则：首字母大写 + 一位特殊字符 + 1位数字 + 特殊字符外的随机串
 */
const randomPassword = (len: number = 8): string => {
  const wordsLenth = WORDS.slice(0, 63).length;
  const UpperCase = WORDS.slice(26, 52);
  const number = WORDS.slice(53, 62);
  const chart = WORDS.slice(63);
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

const UserPage = () => {
  const [currentRow, setCurrentRow] = useState<UserApi.User>();
  const [actionType, setActionType] = useState<number>(ACTIONS.view);
  const [visible, setVisible] = useState<boolean>(false);
  const [modalVisible2, updateModalVisible2] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();

  const formRef = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const access = useAccess();

  const statusEnum = {
    0: {
      text: '禁用',
      status: 'Error',
    },
    1: {
      text: '正常',
      status: 'Processing',
    },
  };

  const statusList = Object.keys(statusEnum).map(key => {
    return {
      value: key,
      label: statusEnum[key].text,
    };
  });

  /**
   * @description 随机密码
   */
  const handleRandomPassword = (): void => {
    const password = randomPassword();
    formRef.current?.setFieldsValue({ password });
  };

  /**
   * @description 编辑/添加账号
   */
  const submit = async (formVal: UserApi.UserEditDto): Promise<boolean> => {
    try {
      const data = formVal.id ? await editUser(formVal) : await createUser(formVal);
      console.log(data);
      message.success(`${formVal.id ? '编辑' : '新增'}成功！`);
      actionRef.current?.reload();
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  };

  /**
   * @description 绑定角色
   */
  const grantRoles = async (value: UserApi.User & { role_ids: number[] }) => {
    try {
      await userBindRoles({ user_id: Number(currentRow?.id), role_ids: value.role_ids || [] });
      message.success('绑定角色成功！');
      updateModalVisible2(false);
      actionRef.current?.reload();
    } catch (err) {
      console.error(err);
    }
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
      key: 'roles',
      search: false,
      // valueType: 'select',
      align: 'left',
      width: 140,
      // fieldProps: {
      //   options: roleList,
      //   multiple: true,
      // },
      renderText: (_, row) => {
        if (!row.roles) {
          return '-';
        }
        return (
          <>
            {row.roles?.map(v => (
              <Tag key={v.id} color="processing" style={{ marginBottom: 5 }}>
                {v.name}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      valueEnum: statusEnum,
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
      width: 160,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Access key="reset" accessible={access.system.user.edit}>
          {/* <Popconfirm
            placement="rightBottom"
            title={`确定要重置账号 ${row.account} 的密码吗？`}
            onConfirm={() => resetPassord(row)}>
            <Tooltip title="重置密码">
              <Button size="small" type="text">
                <ClearOutlined />
              </Button>
            </Tooltip>
          </Popconfirm> */}
          <ConfirmButton
            title={`确定要重置账号 ${row.account} 的密码吗？`}
            buttonProps={{
              icon: <ClearOutlined />,
            }}
            onConfirm={() => resetPassord(row)}
          />
        </Access>,
        <Access key="edit" accessible={access.system.user.edit}>
          {/* <Tooltip title="编辑账号">
            <Button size="small" type="text" onClick={() => handleAction(ACTIONS.edit, row)}>
              <EditFilled />
            </Button>
          </Tooltip> */}
          <TooltipButton iconType="edit" title="编辑账号" onClick={() => handleAction(ACTIONS.edit, row)} />
        </Access>,
        <Access key="del" accessible={access.system.user.edit}>
          <ConfirmButton
            type="delete"
            title={`确定要删除账号 ${row.account} 吗？`}
            onConfirm={() => handleAction(ACTIONS.del, row)}
          />
        </Access>,
      ],
    },
  ];

  /**
   * 处理操作
   * @param {ACTIONS} action 操作
   * @param {CategoryApi.Category} record 行记录
   * @return {void | boolean} boolean用于popconfirm异步关闭
   */
  const handleAction = (action: ACTIONS, record?: UserApi.User): void | boolean => {
    switch (action) {
      case ACTIONS.edit:
      case ACTIONS.add:
        formRef.current?.setFieldsValue({ ...record });
        setTitle(record?.id ? '新增账号' : `编辑账号 - ${record?.account}`);
        setVisible(true);
        break;
      case ACTIONS.del:
        deleteUser(record?.id as number).then(tip => message.success(tip));
        break;
    }
  };

  return (
    <AppPageContainer>
      <AppTable<UserApi.User>
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
        labelCol={{ span: 4 }}
        layout="horizontal">
        <ProFormDigit name="id" hidden />
        <ProFormText
          name="account"
          label="账号"
          rules={[
            { required: true, message: '账号必填' },
            { min: 4, max: 20, message: '长度介于4 ~ 20个字符' },
          ]}
        />
        {actionType === ACTIONS.add && (
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
                <ProFormText name="password" placeholder="请输入密码" />
              </Col>
              <Col span={6}>
                <Button type="primary" style={{ float: 'right' }} onClick={() => handleRandomPassword()}>
                  随机密码
                </Button>
              </Col>
            </Row>
          </ProForm.Item>
        )}
        <ProFormText name="nickname" label="昵称" placeholder="请输入昵称" />
        <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" />
        <ProFormSelect
          name="status"
          label="状态"
          placeholder="请选择账号状态"
          key="status"
          options={statusList}
          allowClear={false}
          initialValue={'1'}
          rules={[{ required: true }]}
        />
      </ModalForm>

      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        title={title}
        visible={modalVisible2}
        onVisibleChange={updateModalVisible2}
        initialValues={{
          role_ids: currentRow?.roles?.map(v => v.id),
        }}
        onFinish={grantRoles}
        layout="horizontal">
        <ProFormTree
          name="role_ids"
          label="绑定角色"
          placeholder="请选择角色"
          fieldProps={{
            // options: roles,
            multiple: true,
            showSearch: true,
            allowClear: true,
            // treeCheckable: true,
            treeDefaultExpandAll: true,
            fieldNames: {
              label: 'label',
              value: 'value',
              children: 'children',
            },
          }}
        />
      </ModalForm>
    </AppPageContainer>
  );
};

export default UserPage;
