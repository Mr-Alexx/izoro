// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
// import staticRoutes from './staticRoutes';
import routes from './routes';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  devServer: {
    host: '0.0.0.0',
    port: 2022,
  },
  // history: { type: 'hash' },
  exportStatic: {}, // browser history模式时需要配置 https://pro.ant.design/docs/deploy-cn
  hash: true,
  dva: false,
  mfsu: {},
  webpack5: {},
  // 必须设置为false，antd时间选择器的月份跟星期才能使用国际化
  ignoreMomentLocale: false,
  locale: {
    // default: zhCN,
    antd: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    siderWidth: 208,
    locale: false,
    ...defaultSettings,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: '内容管理系统',
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
});
