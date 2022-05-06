import { get, post } from '@/utils/request';
import ArticleItem from '../components/Article/Item';

/** 获取系统设置 */
export const getSetting = (): Promise<Api.Setting> => get('/setting');

/** 获取文章列表 */
export const getArticles = (params: Api.ListQueryParams): Promise<Api.ListRes<Api.ArticleItem[]>> =>
  get('/article', params);

/** 获取文章详情 */
export const getArticle = (id: string): Promise<Api.ArticleItem> => get(`/article/${id}`);

/** 获取分类列表 */
export const getCategories = (): Promise<Api.CategoryItem[]> => get('/category');

/** 获取标签列表 */
export const getTags = (): Promise<Api.TagItem[]> => get('/tag');
