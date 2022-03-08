declare namespace App {
  /** 系统设置 */
  type Settings = {
    favicon?: string; // 页面favicon
    title?: string; // 系统标题
    keyword?: string; // seo关键词
    description?: string; // seo描述
    logo?: string; // logo图
    theme?: 'dark' | 'default'; // 主题
    fixedHeader?: boolean; // 是否固定顶部
    googleAnalysisId?: string; // 谷歌分析id
    baiduAnalysisId?: string; // 百度统计id
    sentryId?: string; // sentry错误分析sdk id
  };
}
