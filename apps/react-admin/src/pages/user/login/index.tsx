import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState, useRef, useLayoutEffect } from 'react';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import styles from './index.less';
import { login } from '@/services/user';
import { updateToken, getToken } from '@/utils/auth';

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
    history.push(redirect ?? '/');
  }, 10);
};

const Login: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { initialState, setInitialState } = useModel('@@initialState');
  const formRef = useRef<ProFormInstance>();

  // 有登录，直接重定向
  useLayoutEffect(() => {
    if (initialState?.currentUser && getToken()) {
      goto();
    }
  }, []);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      setInitialState({ ...initialState, currentUser: userInfo });
    }
  };

  const handleLogin = async (values: UserApi.LoginDto): Promise<boolean | void> => {
    try {
      // 登录
      const data = await login({ ...values });
      console.log('data', data);
      if (data?.accessToken) {
        message.success('登录成功！');
        // 设置token信息
        updateToken(data);
        await fetchUserInfo();
        goto();
        return;
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error?.message);
    }
    return false;
  };

  if (initialState?.currentUser && getToken()) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div
          className={styles.main}
          style={{
            marginTop: 40,
          }}>
          <LoginForm
            formRef={formRef}
            logo="/images/logo.png"
            title="天枢系统"
            subTitle="TEAMSURE"
            initialValues={{
              autoLogin: true,
            }}
            autoFocusFirstInput
            onFinish={handleLogin}>
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
                    message: '账号必填！',
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
                    message: '密码必填！',
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
            </div>
          </LoginForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
