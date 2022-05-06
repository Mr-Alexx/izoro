import { get, patch, post, del } from '@/utils/request';

/** 获取分类列表 */
export const getCategories = (): Promise<Api.ListRes<CategoryApi.Category[]>> => get('/category');

/** 新增分类 */
export const addCategory = (data: CategoryApi.CategoryCreateDto): Promise<CategoryApi.Category> =>
  post('/category', data);

/** 编辑分类 */
export const editCategory = (data: CategoryApi.CategoryEditDto): Promise<CategoryApi.Category> =>
  patch(`/category/${data.id}`, data);

/** 删除分类 */
export const deleteCategory = (id: number): Promise<string> => del(`/category/${id}`);
