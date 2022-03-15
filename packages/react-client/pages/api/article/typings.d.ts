declare namespace ArticleApi {
  type Tag = {
    id: number;
    name: string;
  };
  type ArticleItem = {
    /** 文章id */
    id: string | number;
    /** 封面图 */
    cover?: string;
    /** 标题 */
    title: string;
    /** 描述 */
    summary: string;
    /** 发布时间 */
    publish_at: string;
    /** 分类 */
    category?: {
      id: number;
      name: string;
    };
    /** 查看次数 */
    views: number;
    /** 点赞次数 */
    likes?: number;
    /** 评论次数 */
    comments?: number;
    /** 标签名 */
    tags?: Tag[];
  };

  type ArticleDetail = ArticleItem & {
    /** markdown */
    markdown: string;
    /** markdown转化的html */
    html: string;
    /** markdowntheme */
    theme?: string;
    /** 高亮主题 */
    highlight?: string;
    /** 公开状态 */
    public_status: number;
    /** 密码 */
    password?: string;
    /** 状态 */
    status: number;
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
  };
}
