import { Tag, Space, Tooltip } from 'antd';
// import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import NoticeIconView from '../NoticeIcon';
import Exchange from './Exchange';
import { QuestionCircleOutlined } from '@ant-design/icons';

export type SiderTheme = 'light' | 'dark';
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};
// 写死汇率列表，后面放到个人信息接口
const EXCHANGE_RATE = [
  { id: 1, flag: '🇨🇳', name: '人民币', currency: 'CNY', symbol: '¥', rate: 1 },
  { id: 2, flag: '🇺🇸', name: '美元', currency: 'USD', symbol: '$', rate: 6.357 },
  { id: 3, flag: '🇬🇧', name: '英镑', currency: 'GBP', symbol: '£', rate: 9.0194 },
  { id: 4, flag: '🇦🇺', name: '澳元', currency: 'AUD', symbol: 'A$', rate: 4.9102 },
  { id: 5, flag: '🇪🇺', name: '欧元', currency: 'EUR', symbol: '€', rate: 7.7612 },
  { id: 6, flag: '🇨🇦', name: '加币', currency: 'CAD', symbol: 'C$', rate: 5.2564 },
  { id: 7, flag: '🇯🇵', name: '日元', currency: 'JPY', symbol: '￥', rate: 0.058 },
  { id: 8, flag: '🇭🇰', name: '港币', currency: 'HKD', symbol: 'HK$', rate: 0.819 },
  { id: 9, flag: '🇲🇾', name: '林吉特', currency: 'MYR', symbol: 'RM', rate: 1.5349 },
  { id: 10, flag: '🇲🇽', name: '墨西哥比索', currency: 'MXN', symbol: 'Mex$', rate: 0.3202 },
  { id: 11, flag: '🇮🇩', name: '印尼盾', currency: 'IDR', symbol: 'Rp', rate: 0.0004 },
  { id: 12, flag: '🇹🇭', name: '泰铢', currency: 'THB', symbol: '฿', rate: 0.2033 },
  { id: 13, flag: '🇸🇬', name: '新加坡币', currency: 'SGD', symbol: 'S$', rate: 4.8037 },
  { id: 14, flag: '🇨🇳', name: '新台币', currency: 'TWD', symbol: 'NT$', rate: 0.223 },
  { id: 15, flag: '🇵🇭', name: '菲律宾比索', currency: 'PHP', symbol: '₱', rate: 0.1328 },
  { id: 16, flag: '🇦🇪', name: '阿联酋迪拉姆', currency: 'AED', symbol: 'AED', rate: 1.6734 },
  { id: 16, flag: '🇸🇦', name: '沙特里亚尔', currency: 'SAR', symbol: 'SAR', rate: 1.6511 },
];

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      {/* <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          {
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
            value: 'umi ui',
          },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]} // onSearch={value => {
        //   console.log('input', value);
        // }}
      /> */}
      <Tooltip title="使用文档">
        <span
          className={styles.action}
          onClick={() => {
            window.open('https://pro.ant.design/docs/getting-started');
          }}>
          <QuestionCircleOutlined />
        </span>
      </Tooltip>

      {/* 汇率查看 */}
      <Exchange list={EXCHANGE_RATE} />

      {/* 消息通知 */}
      <NoticeIconView />
      <Avatar menu />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
    </Space>
  );
};

export default GlobalHeaderRight;
