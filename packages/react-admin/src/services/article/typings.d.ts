declare namespace ArticleApi {
  type ArticleQueryParams = Api.ListQueryParams & {};

  type ArticleCreateDto = {
    /**
     * 封面图url
     */
    cover?: string;
    /**
     * 文章标题
     */
    title: string;
    /**
     * 文章摘要
     */
    summary: string;
    /**
     * 文章原始内容
     */
    markdown: string;
    /**
     * 文章转化为html内容
     */
    html: string;
    /**
     * markdown主题
     */
    theme?: string;
    /**
     * 代码高亮主题
     */
    highlight?: string;
    /**
     * 发布状态：-1 回收，0 草稿，1 已发布
     */
    status: number;
    /**
     * 查看人数
     */
    views?: number;
    /**
     * 密码
     */
    password?: string;
    /**
     * 公开状态：0 公开，1 需要密码，2 私密
     */
    public_status: number;
    /**
     * SEO关键字
     */
    seo_keywords?: string;
    /**
     * SEO描述
     */
    seo_description?: string;
    /**
     * 关联的标签
     */
    tags: number[];
    /**
     * 关联的分类
     */
    category: number;
  };

  type ArticleEditDto = ArticleCreateDto & {
    id: number;
  };

  type Article = ArticleEditDto & {
    /**
     * 发布时间
     */
    publish_at: Date;
    created_at: Date;
    updated_at: Date;
  };
}
