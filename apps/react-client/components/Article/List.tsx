/**
 * @description 文章列表
 * @use <ArticleList dataSource={[]}/>
 */
import type { FC } from 'react';
import ArticleItem from './Item';
import styles from './index.module.scss';

const ArticleList: FC<{
  dataSource?: ArticleApi.ArticleItem[];
}> = ({ dataSource }) => {
  if (!dataSource) {
    return null;
  }

  return (
    <ul className={styles['article-list']}>
      {dataSource?.map(item => {
        return <ArticleItem key={item.id} dataSource={item} />;
      })}
    </ul>
  );
};

export default ArticleList;
