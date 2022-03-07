import { Tag, Space, Tooltip } from 'antd';
// import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel, useRequest } from 'umi';
import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
// import NoticeIconView from '../NoticeIcon';
import Exchange from './Exchange';
import { FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { RouteContextType } from '@ant-design/pro-layout';
import { RouteContext } from '@ant-design/pro-layout';
import HeaderSearch from '../HeaderSearch';
import { getCurrencyInfo } from '@/services/system';
import { useState } from 'react';

export type SiderTheme = 'light' | 'dark';
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};
// 写死汇率列表，后面放到个人信息接口
const rateList = [
  { flag: '🇨🇳', name: '人民币', currency: 'CNY', symbol: '¥', rate: '-' },
  { flag: '🇺🇸', name: '美元', currency: 'USD', symbol: '$', rate: '-' },
  { flag: '🇬🇧', name: '英镑', currency: 'GBP', symbol: '£', rate: '-' },
  { flag: '🇦🇺', name: '澳元', currency: 'AUD', symbol: 'A$', rate: '-' },
  { flag: '🇪🇺', name: '欧元', currency: 'EUR', symbol: '€', rate: '-' },
  { flag: '🇨🇦', name: '加币', currency: 'CAD', symbol: 'C$', rate: '-' },
  { flag: '🇯🇵', name: '日元', currency: 'JPY', symbol: '￥', rate: '-' },
  { flag: '🇭🇰', name: '港币', currency: 'HKD', symbol: 'HK$', rate: '-' },
  { flag: '🇲🇾', name: '林吉特', currency: 'MYR', symbol: 'RM', rate: '-' },
  { flag: '🇲🇽', name: '墨西哥比索', currency: 'MXN', symbol: 'Mex$', rate: '-' },
  { flag: '🇮🇩', name: '印尼盾', currency: 'IDR', symbol: 'Rp', rate: '-' },
  { flag: '🇹🇭', name: '泰铢', currency: 'THB', symbol: '฿', rate: '-' },
  { flag: '🇸🇬', name: '新加坡币', currency: 'SGD', symbol: 'S$', rate: '-' },
  { flag: '🇨🇳', name: '新台币', currency: 'TWD', symbol: 'NT$', rate: '-' },
  { flag: '🇵🇭', name: '菲律宾比索', currency: 'PHP', symbol: '₱', rate: '-' },
  { flag: '🇦🇪', name: '阿联酋迪拉姆', currency: 'AED', symbol: 'AED', rate: '-' },
  { flag: '🇸🇦', name: '沙特里亚尔', currency: 'SAR', symbol: 'SAR', rate: '-' },
];

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [exchangeRateList, setExchangeRateList] = useState(rateList);

  if (!initialState || !initialState.settings || !initialState.currentUser) {
    return null;
  }

  // 初始化汇率
  useRequest(getCurrencyInfo, {
    onSuccess: (data: SYSTEM_API.CurrencyRateItem[]) => {
      let temp = null;
      rateList.forEach(item => {
        temp = data.find(v => item.currency === v.transactionCurrency);
        if (temp) {
          item.rate = `${temp?.rate}`;
        }
      });
      setExchangeRateList([...rateList]);
    },
  });

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
            {process.env.NODE_ENV === 'development' && (
              <Tooltip title="接口文档">
                <a href="/files/index.html" target="_blank">
                  <FileSearchOutlined />
                </a>
              </Tooltip>
            )}
            {!isMobile && (
              <>
                <Tooltip title="开发文档">
                  <a
                    href="/~docs"
                    target="_blank"
                    className={styles.action}
                    // onClick={() => {
                    //   window.open('https://pro.ant.design/docs/getting-started');
                    // }}
                  >
                    <QuestionCircleOutlined />
                  </a>
                </Tooltip>
                {/* 汇率查看 */}
                <Exchange className={styles.action} list={exchangeRateList} />
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
