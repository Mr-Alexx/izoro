declare namespace Api {
  type ListQueryParams = {
    page: number;
    limit: number;
  };
  /** @name 通用列表响应 */
  type ListRes<ListData> = {
    total: number;
    list: ListData;
  };

  type ArticleItem = {
    id: string;
    /** 文章封面图 */
    cover: string;
    /** 文章标题 */
    title: string;
    /** 文章摘要 */
    summary: string;
    /** 文章markdown */
    markdown: string;
    /** 基于markdown生成的html */
    html: string;
    /** markdown主题 */
    theme: string;
    /** 代码高亮主题 */
    highlight: string;
    /** 发布状态：-1 回收，0 草稿，1 已发布 */
    status: number;
    /** 查看人数 */
    views: number;
    /** 密码 */
    password: string;
    /** 公开状态：0 公开，1 需要密码，2 私密 */
    public_status: number;
    /** seo关键字 */
    seo_keywords: string;
    /** seo描述 */
    seo_description: string;
    /** 发布时间 */
    publish_at: string;
    /** 关联标签组 @type {Array<Tag>} @memberof Article */
    tags: {
      id: number;
      name: string;
    }[];
    /** 关联分类 */
    category: {
      id: number;
      name: string;
    };
    created_at: Date;
    updated_at: Date;
  };

  type CategoryItem = {
    id: number;
    /** 父类id */
    pid: number;
    /** 分类名称 */
    name: string;
    /** 分类层级 */
    level: number;
    /** 创建时间 */
    created_at: Date;
    /** 更新时间 */
    updated_at: Date;
    /** 子分类 */
    children?: CategoryItem[];
  };

  type TagItem = {
    id: number;
    /** 标签名称 */
    name: string;
    /** 创建时间 */
    created_at: Date;
    /** 更新时间 */
    updated_at: Date;
  };

  type Setting = {
    /** logo */
    logo: string;
    /** favicon */
    favicon: string;
    /** 站点名称 */
    site_name: string;
    /** seo关键词 */
    seo_keyword: string;
    /** seo描述 */
    seo_description: string;
    /** 百度统计id */
    baidu_analysis_id: string;
    /** 谷歌分析id */
    google_analysis_id: string;
    /** sentry browser sdk */
    sentry_sdk: string;
    /** sentry dsn key，初始化sentry用 */
    sentry_dsn_key: string;
  };
}
