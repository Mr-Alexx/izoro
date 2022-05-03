import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  title: 'TEAMSURE',
  pwa: false,
  logo: '/images/logo.png',
  iconfontUrl: '//at.alicdn.com/t/font_3368508_65h9th8ew5f.js', // 菜单要使用iconfont，此处必加
  // navTheme: 'dark',
  // 拂晓蓝
  // primaryColor: '#1890ff',
  // layout: 'top',
  // contentWidth: 'Fluid',
  // fixedHeader: true,
  // fixSiderbar: true,
  // colorWeak: false,
  // splitMenus: false,

  fixedHeader: true,
  navTheme: 'dark',
  primaryColor: '#1890ff',
  // layout: 'mix',
  contentWidth: 'Fluid',
  // splitMenus: true,
  fixSiderbar: true,
  footerRender: false,

  // layout: 'mix',
  // contentWidth: 'Fluid',
  // navTheme: 'light',
  // splitMenus: true,
};

export default Settings;
