import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import Footer from '@/components/Footer';
import styles from './index.less';
import { login } from '@/services/users';
import { updateToken } from '@/utils/auth';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
/** 此方法会跳转到 redirect 参数所在的位置 */

const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as {
      redirect: string;
    };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  // const [userLoginState, setUserLoginState] = useState<ANT_API.LoginResult>({});
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      setInitialState({ ...initialState, currentUser: userInfo });
    }
  };

  const handleSubmit = async (values: USERS_API.LoginParams): Promise<void> => {
    setSubmitting(true);
    try {
      // 登录
      const data = await login({ ...values });
      if (data?.accessToken) {
        message.success('登录成功！');
        // 设置token信息
        updateToken(data);
        await fetchUserInfo();
        goto();
        return;
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    }

    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              {/* <img alt="logo" className={styles.logo} src="/images/logo.png" /> */}
              {/* 内容管理系统 */}
            </Link>
          </div>
        </div>

        <div
          className={styles.main}
          style={{
            marginTop: 40,
          }}>
          <ProForm
            initialValues={{
              autoLogin: true,
              account: 'qian',
              password: '123456',
            }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async values => {
              handleSubmit(values as USERS_API.LoginParams);
            }}>
            {errorMsg && <LoginMessage content={errorMsg} />}
            <>
              <ProFormText
                name="account"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入账号"
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>

            <div
              style={{
                marginBottom: 24,
              }}>
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}>
                忘记密码 ?
              </a>
            </div>
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
