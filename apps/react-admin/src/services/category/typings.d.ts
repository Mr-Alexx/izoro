declare namespace CategoryApi {
  type CategoryCreateDto = {
    /**
     * 父类id
     */
    pid: number;
    /**
     * 分类名称
     */
    name: string;
    /**
     * 分类层级
     */
    level: number;
  };

  type CategoryEditDto = CategoryCreateDto & {
    /**
     * 分类id
     */
    id: number;
  };
  type Category = CategoryEditDto & {
    /**
     * 创建时间
     */
    created_at: Date;
    /**
     * 更新时间
     */
    updated_at: Date;
    /**
     * 关联的文章
     */
    // articles: Array<Article>;
  };
}
