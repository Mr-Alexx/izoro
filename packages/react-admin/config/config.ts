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
  /**
   * exportStatic是配合ssr预渲染的
   * 开启时，windows和linux打包生成的目录不一致
   * linux 会将动态路由打包后生成 xx/:id/xx.html，这样的目录windows无法识别(特殊字符 : 无法识别)
   * 此处应该关闭该配置
   * https://umijs.org/zh-CN/docs/ssr#%E5%BC%80%E5%90%AF%E9%A2%84%E6%B8%B2%E6%9F%93
   */
  // exportStatic: {}, // browser history模式时需要配置 https://pro.ant.design/docs/deploy-cn
  hash: true,
  // dva: {
  //   hmr: true,
  // },
  dva: false,
  // https://umijs.org/zh-CN/config#headscripts
  // headScripts: [{ src: '/plugins/aliyun-oss-sdk.min.js' }],
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: false,
    siderWidth: 208,
    ...defaultSettings,
  },

  locale: {
    // default: zhCN,
    antd: true,
  },
  // 必须设置为false，antd时间选择器的月份跟星期才能使用国际化
  ignoreMomentLocale: false,
  // 极速启动 https://github.com/ant-design/ant-design-pro/issues/8656
  // https://umijs.org/zh-CN/config#mfsu
  // https://github.com/umijs/umi/issues/6766
  mfsu: {},
  webpack5: {},
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes:
    process.env.NODE_ENV === 'development'
      ? [
          ...routes,
          {
            component: '404',
          },
        ]
      : [
          ...routes,
          {
            component: '404',
          },
        ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  // theme: {
  //   'primary-color': defaultSettings.primaryColor,
  //   '@s-site-menu-width': '258px',
  // },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: '天枢系统',
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},

  // dumi文档配置，生成项目文档
  // see https://d.umijs.org/zh-CN/config
  mode: 'site',
});
