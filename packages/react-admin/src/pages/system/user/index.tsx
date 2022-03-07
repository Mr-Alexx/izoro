/**
 * @description 账号管理页
 */

import type { FC } from 'react';
import type { FormInstance } from 'antd';
import { Button, message, Tag, Row, Col } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProForm, { ProFormText, ProFormSelect, ModalForm } from '@ant-design/pro-form';
import { getUsers, createUser, editUser, userBindRoles, getRoles } from '@/services/users';
import { useState, useRef } from 'react';
// import { getPageSettings, updatePageSettings } from '@/services/setting';
// import { debounce } from 'lodash';
import { ACTIONS } from '@/constants';
import { Access, useAccess, useRequest } from 'umi';

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
 * @description hooks形式的函数式组件
 * @see https://juejin.cn/post/6944863057000529933
 */
const User: FC = () => {
  // 角色枚举数据
  // const [valueEnum, setValueEnum] = useState<RoleListItem | any>();
  // const [roleList, setRoleList] = useState<RoleListItem | any>();

  // 角色列表
  const [roleList, setRoleList] = useState<any[]>();

  // 当前操作行
  const [currentRow, setCurrentRow] = useState<USERS_API.UserInfo | undefined>();

  // 当前操作状态
  const [actionType, setActionType] = useState<number>(ACTIONS.view);

  // 查看/编辑/新增表单弹窗
  const [modalVisible, updateModalVisible] = useState<boolean>(false);
  const [modalVisible2, updateModalVisible2] = useState<boolean>(false);

  // 表单弹窗标题
  const [modalTitle, setModalTitle] = useState<string>('新增账号');

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
   * @param {number} len 位数，默认8
   * 组合规则：首字母大写 + 一位特殊字符 + 1位数字 + 特殊字符外的随机串
   */
  const randomPassword = (len: number = 8): void => {
    const wordsLenth = WORDS.slice(0, 63).length;
    const UpperCase = WORDS.slice(26, 52);
    const number = WORDS.slice(53, 62);
    const chart = WORDS.slice(63);
    let password = '';
    // for (let i = 0; i < len; i += 1) {
    //   const index = Math.floor(Math.random() * wordsLenth);
    //   password += WORDS[index];
    // }
    password += UpperCase[Math.floor(Math.random() * UpperCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += chart[Math.floor(Math.random() * chart.length)];
    for (let i = 0, length = len - 3; i < length; i += 1) {
      const index = Math.floor(Math.random() * wordsLenth);
      password += WORDS[index];
    }
    formRef.current?.setFieldsValue({ password });
    console.log(password);
  };

  /**
   * @description 编辑/添加账号
   */
  const submit = async (value: Partial<USERS_API.UserInfo & { role_ids: number[] }>): Promise<boolean> => {
    const params = {
      ...value,
      status: Number(value.status),
    };
    let msg: string = '';
    try {
      if (actionType === ACTIONS.add) {
        // @ts-ignore
        await createUser({
          ...params,
          leader_user_id: 0, // 上级，暂时不作选择
          tag: 1, // 标签，暂时不知道作用
        });
        msg = '新增账号成功!';
      } else {
        await editUser({ ...currentRow, ...params });
        msg = `账号 ${currentRow?.account} 编辑成功`;
      }
      // 绑定角色
      // await userBindRoles({ user_id: Number(id || currentRow?.id), role_ids: value.role_ids || [] });
      message.success(msg);
      updateModalVisible(false);
      // 刷新列表
      actionRef.current?.reload();
      return true;
    } catch (err) {
      console.error(err);
      // message.error(err.message);
    }
    return false;
  };

  /**
   * @description 绑定角色
   */
  const grantRoles = async (value: USERS_API.UserInfo & { role_ids: number[] }) => {
    try {
      await userBindRoles({ user_id: Number(currentRow?.id), role_ids: value.role_ids || [] });
      message.success('绑定角色成功！');
      updateModalVisible2(false);
      actionRef.current?.reload();
    } catch (err) {
      console.error(err);
      message.error(err.message);
    }
  };

  // 表头数据（列）
  const columns: ProColumns<USERS_API.UserInfo>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      align: 'center',
      valueType: 'index',
    },
    // {
    //   title: '头像', // 标题
    //   width: 100, // 宽度
    //   dataIndex: 'avatar', // 对应键
    //   key: 'avatar', // 自定义列匹配用
    //   align: 'center',
    //   search: false, // 是否在搜索表单显示
    //   render: (_, row) => {
    //     // 自定义渲染
    //     return (
    //       <Space size={10}>
    //         <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size={40} src={row.avatar}>
    //           Q
    //         </Avatar>
    //       </Space>
    //     );
    //   },
    // },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
      align: 'center',
    },
    // {
    //   title: '姓名',
    //   ellipsis: true,
    //   dataIndex: 'real_name',
    //   key: 'real_name',
    //   align: 'center',
    //   valueType: 'text',
    //   search: false,
    // },
    {
      title: '昵称',
      ellipsis: true,
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center',
      search: false,
    },
    {
      title: '邮箱',
      ellipsis: true,
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      search: false,
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
      search: false,
      // valueType: 'select',
      align: 'center',
      // fieldProps: {
      //   options: roleList,
      //   multiple: true,
      // },
      render: (_, row) => {
        if (!row.roles) {
          return null;
        }
        return row.roles?.map(v => (
          <Tag key={v.id} color="processing">
            {v.name}
          </Tag>
        ));
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      valueEnum: statusEnum,
      valueType: 'select',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: '操作',
      width: 140,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Access key="edit" accessible={access.system.user.edit}>
          <a
            onClick={() => {
              setCurrentRow(row);
              setModalTitle(`编辑账号 - ${row.account}`);
              setActionType(ACTIONS.edit);
              updateModalVisible(true);
            }}>
            编辑
          </a>
        </Access>,
        <Access key="edit" accessible={access.system.user.edit}>
          <a
            onClick={() => {
              setCurrentRow(row);
              setModalTitle(`授权角色 - ${row.account}`);
              updateModalVisible2(true);
            }}>
            授权
          </a>
        </Access>,
      ],
    },
  ];

  useRequest(() => getRoles({ current: 1, pageSize: 500 }), {
    onSuccess: res => {
      setRoleList(res.map(item => ({ value: item.id, label: item.name })));
    },
  });

  return (
    <PageContainer>
      <ProTable<USERS_API.UserInfo, APP.TablePagination>
        actionRef={actionRef}
        sticky
        headerTitle="账号列表"
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Access key="primary" accessible={access.system.user.create}>
            <Button
              type="primary"
              onClick={() => {
                setCurrentRow(undefined);
                setModalTitle('新增账号');
                setActionType(ACTIONS.add);
                updateModalVisible(true);
              }}>
              新增账号
            </Button>
          </Access>,
        ]}
        columns={columns}
        request={getUsers}
        options={{
          fullScreen: true,
          reload: true,
          setting: true,
          density: true,
        }}
      />

      {/* 查看、编辑、新增角色 */}
      <ModalForm
        formRef={formRef}
        modalProps={{
          destroyOnClose: true,
        }}
        title={modalTitle}
        width="500px"
        visible={modalVisible}
        onVisibleChange={updateModalVisible}
        initialValues={{
          account: currentRow?.account,
          email: currentRow?.email,
          real_name: currentRow?.real_name,
          nickname: currentRow?.nickname,
          status: `${currentRow?.status || 1}`,
          roles: currentRow?.roles?.map(v => v.id),
        }}
        onFinish={submit}
        labelCol={{ span: 4 }}
        layout="horizontal">
        {/* 账号可手动填写也可以自动生成 */}
        <ProFormText
          name="account"
          label="账号"
          placeholder="请输入账号"
          rules={[
            { required: true, message: '账号必填' },
            { min: 4, max: 8, message: '长度介于4 ~ 8个字符' },
          ]}></ProFormText>

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
                <Button type="primary" style={{ float: 'right' }} onClick={() => randomPassword()}>
                  随机密码
                </Button>
              </Col>
            </Row>
          </ProForm.Item>
        )}

        {/* <ProFormText
          name="real_name"
          label="姓名"
          placeholder="请输入姓名"
          rules={[{ required: true, message: '姓名必填' }]}
        /> */}
        {/* 邮箱改为非必填 */}
        <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" />
        {/* 昵称改为非必填 */}
        <ProFormText name="nickname" label="昵称" placeholder="请输入昵称" />
        <ProFormSelect
          name="status"
          label="状态"
          placeholder="请选择账号状态"
          key="status"
          options={statusList}
          allowClear={false}
          rules={[{ required: true }]}
        />
        <ProFormSelect
          name="roles"
          label="绑定角色"
          showSearch
          mode="multiple"
          placeholder="请选择角色"
          options={roleList}
          rules={[{ required: true }]}
        />
      </ModalForm>

      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        title={modalTitle}
        visible={modalVisible2}
        onVisibleChange={updateModalVisible2}
        initialValues={{
          role_ids: currentRow?.roles?.map(v => v.id),
        }}
        onFinish={grantRoles}
        layout="horizontal">
        <ProFormSelect
          name="role_ids"
          label="绑定角色"
          showSearch
          mode="multiple"
          placeholder="请选择角色"
          options={roleList}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default User;
