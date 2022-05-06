import { Tag, Space, Tooltip } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
// import NoticeIconView from '../NoticeIcon';
import { FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { RouteContextType } from '@ant-design/pro-layout';
import { RouteContext } from '@ant-design/pro-layout';
import HeaderSearch from '../HeaderSearch';

export type SiderTheme = 'light' | 'dark';
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings || !initialState.currentUser) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <RouteContext.Consumer>
      {(value: RouteContextType) => {
        const { isMobile } = value;
        return (
          <Space className={className}>
            <HeaderSearch className={styles.action} />
            <Tooltip title="接口文档">
              <a
                href={
                  process.env.NODE_ENV === 'development' ? 'http://localhost:3001/doc' : 'https://api.izoro.top/doc'
                }
                target="_blank"
                rel="noreferrer">
                <FileSearchOutlined />
              </a>
            </Tooltip>
            {!isMobile && (
              <>
                <Tooltip title="开发文档">
                  <a href="/~docs" target="_blank" className={styles.action}>
                    <QuestionCircleOutlined />
                  </a>
                </Tooltip>
                {/* 消息通知 */}
                {/* <NoticeIconView /> */}
              </>
            )}

            <Avatar menu />
            {REACT_APP_ENV && (
              <span>
                <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
              </span>
            )}
          </Space>
        );
      }}
    </RouteContext.Consumer>
  );
};

export default GlobalHeaderRight;
