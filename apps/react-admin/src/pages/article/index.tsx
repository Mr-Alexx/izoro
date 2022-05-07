/**
 * @description 文章管理页
 */

import type { FormInstance } from 'antd';
import { Button, message, Row, Col, Space } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, { ProFormText, ProFormSelect, ModalForm, ProFormDependency } from '@ant-design/pro-form';
import { useState, useRef, FC } from 'react';
import { ACTIONS, STATUS_ENUM, STATUS_OPTIONS } from '@/constants';
import { Access, useAccess } from 'umi';
import AppPageContainer from '@/components/AppPageContainer';
import AppTable from '@/components/AppTable';
import { ProFormDigit } from '@ant-design/pro-form';
import ConfirmButton from '@/components/Button/ConfirmButton';
import TooltipButton from '@/components/Button/TooltipButton';
import { getRoles } from '@/services/role';
import { useRequest } from 'umi';
import { addArticle, deleteArticle, editArticle, getArticles } from '@/services/article';
import { Link } from 'umi';

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
  const columns: ProColumns<ArticleApi.Article>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 140,
      align: 'center',
      search: false,
    },
    {
      title: '封面',
      dataIndex: 'cover',
      valueType: 'image',
      align: 'center',
      width: 100,
      search: false,
      fieldProps: {
        width: 80,
        height: 80,
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center',
      width: 200,
      ellipsis: true,
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
      title: '是否需要密码',
      dataIndex: 'is_need_password',
      width: 120,
      search: false,
      render: (_, row) => {
        return !row.is_need_password ? null : (
          <TooltipButton iconType="view" title="查看密码" onClick={() => viewPassword(row)} />
        );
      },
    },
    {
      title: '查看人数',
      dataIndex: 'views',
      width: 80,
      search: false,
      align: 'center',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: [],
        mode: 'multiple',
      },
    },
    {
      title: '发布时间',
      dataIndex: 'published_time',
      align: 'center',
      valueType: 'dateTime',
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
            <TooltipButton iconType="view" title="查看文章" onClick={() => handleAction(ACTIONS.view, row)} />

            <Access key="edit" accessible={access.system.user.edit}>
              <TooltipButton iconType="edit" title="编辑文章" onClick={() => handleAction(ACTIONS.edit, row)} />
            </Access>

            <Access key="del" accessible={access.system.user.edit}>
              <ConfirmButton
                type="delete"
                title={`确定要删除文章 ${row.title} 吗？`}
                onConfirm={() => handleAction(ACTIONS.del, row)}
              />
            </Access>
          </Space>
        );
      },
    },
  ];

  /**
   * 随机密码
   */
  const handleRandomPassword = (): void => {
    const password = randomPassword();
    formRef.current?.setFieldsValue({ password });
  };

  /**
   * 查看密码
   * @param {ArticleApi.Article} record
   */
  const viewPassword = (record: ArticleApi.Article) => {};

  /**
   * 处理操作
   * @param {ACTIONS} action 操作
   * @param {CategoryApi.Category} record 行记录
   * @return {void | boolean} boolean用于popconfirm异步关闭
   */
  const handleAction = (action: ACTIONS, record?: ArticleApi.Article): void | boolean => {
    switch (action) {
      case ACTIONS.view:
        window.open(`https://www.izoro.top/post/${record?.id}`);
        break;
      case ACTIONS.add:
        formRef.current?.resetFields();
      case ACTIONS.edit:
        record && formRef.current?.setFieldsValue({ ...record });
        setTitle(record?.id ? `编辑文章 - ${record?.title}` : '新增文章');
        setVisible(true);
        break;
      case ACTIONS.del:
        deleteArticle(record?.id as number).then(tip => message.success(tip));
        break;
    }
  };

  /**
   * @description 编辑/添加文章
   */
  const submit = async (formVal: ArticleApi.ArticleEditDto): Promise<boolean> => {
    try {
      formVal.id ? await editArticle(formVal) : await addArticle(formVal);
      message.success(`${formVal.id ? '编辑' : '新增'}成功！`);
      actionRef.current?.reload();
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  };

  return (
    <AppPageContainer>
      <AppTable<ArticleApi.Article>
        actionRef={actionRef}
        toolBarRender={() => [
          <Access key="primary" accessible={access.system.user.create}>
            <Link to="/article/add">
              {/* onClick={() => handleAction(ACTIONS.add)} */}
              <Button type="primary">新增文章</Button>
            </Link>
          </Access>,
        ]}
        columns={columns}
        // @ts-ignore
        request={getArticles}
      />

      {/* 编辑、新增文章 */}
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
          label="文章"
          rules={[
            { required: true, message: '文章必填' },
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
    </AppPageContainer>
  );
};

export default UserPage;
