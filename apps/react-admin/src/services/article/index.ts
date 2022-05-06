import { del, get, patch, post } from '@/utils/request';

export const getArticles = (params: ArticleApi.ArticleQueryParams): Promise<Api.ListRes<ArticleApi.Article[]>> =>
  get('/article', params);

export const getArticle = (id: number): Promise<ArticleApi.Article> => get(`/article/${id}`);

export const addArticle = (data: ArticleApi.ArticleCreateDto): Promise<any> => post('/article', data);

export const editArticle = (data: ArticleApi.ArticleEditDto): Promise<any> => patch('article', data);

export const deleteArticle = (id: number): Promise<string> => del(`/article/${id}`);

export const viewPassword = (id: number): Promise<string> => get(`/article/password/${id}`);
