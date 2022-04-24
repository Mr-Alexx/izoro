declare namespace App {
  /** 系统设置 */
  type Settings = {
    theme?: 'dark' | 'default'; // 主题
    fixedHeader?: boolean; // 是否固定顶部
    logo?: string;
    favicon?: string;
    site_name?: string;
    seo_keyword?: string;
    seo_description?: string;
    baidu_analysis_id?: string;
    google_analysis_id?: string;
    sentry_sdk?: string;
    sentry_dsn_key?: string; // sentry dsn key，初始化sentry用
  };
}
