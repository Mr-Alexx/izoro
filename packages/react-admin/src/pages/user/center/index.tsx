import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import styles from './style.less';
import { useModel, Link } from 'umi';
import ProDescriptions from '@ant-design/pro-descriptions';
import AppPageContainer from '@/components/AppPageContainer';
import { Button } from 'antd';

const Settings: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  const columns = [
    { title: '账号', key: 'number', dataIndex: 'number' },
    { title: '名称', key: 'real_name', dataIndex: 'real_name' },
    { title: '邮箱', key: 'email', dataIndex: 'email' },
    { title: '电话号码', key: 'mobile', dataIndex: 'mobile' },
    {
      title: '角色',
      key: 'roles',
      dataIndex: 'roles',
      valueType: 'select',
      fieldProps: {
        // options: roles,
        multiple: true,
      },
    },
    { title: '创建时间', key: 'created_at', dataIndex: 'created_at' },
    { title: '更新时间', key: 'updated_at', dataIndex: 'updated_at' },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '禁用',
          status: 'Error',
        },
        1: {
          text: '正常',
          status: 'Processing',
        },
      },
    },
  ];

  return (
    <AppPageContainer
      extra={
        <Link to="/user/change-password">
          <Button type="primary">修改密码</Button>
        </Link>
      }>
      <GridContent>
        <div className={styles.main}>
          <div>
            <div className={styles.baseView}>
              <div className={styles.left}>
                <ProDescriptions
                  labelStyle={{ width: 120 }}
                  bordered
                  column={2}
                  dataSource={initialState?.currentUser}
                  columns={columns}
                />
              </div>
            </div>
          </div>
        </div>
      </GridContent>
    </AppPageContainer>
  );
};
export default Settings;
