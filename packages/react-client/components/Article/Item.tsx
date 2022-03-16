import { formatTime } from '@/utils';
import Link from 'next/link';
import type { FC } from 'react';
import { IzImage } from '../izImage';
import styles from './index.module.scss';

const ArticleItem: FC<{
  /** 数据项 */
  dataSource: ArticleApi.ArticleItem;
}> = ({ dataSource }) => {
  return (
    <li className={styles['article-item']} onClick={() => window.open(`/post/${dataSource.id}`, '_blank')}>
      {/* 日期、分类等 */}
      <div className={styles['article-item__info']}>
        <Link href={`/${dataSource.category.name}`}>
          <a className={styles['category']} target="_blank" title={dataSource.category.name}>
            {dataSource.category.name}
          </a>
        </Link>
        <span>{formatTime(dataSource.publish_at)}</span>
        {dataSource.tags?.map(item => {
          return (
            <span key={item.id} className={styles['tag']}>
              <Link key={item.id} href={`/tag/${item.name}`}>
                <a target="_blank" title={item.name}>
                  {item.name}
                </a>
              </Link>
              ·
            </span>
          );
        })}
      </div>

      {/* 内容块 */}
      <div className={styles['article-item__content']}>
        <div className={styles['content-left']}>
          {/* 标题 */}
          <div className={styles['title']}>
            <Link href={`/post/${dataSource.id}`}>
              <a target="_blank" title={dataSource.title}>
                {dataSource.title}
              </a>
            </Link>
          </div>

          {/* 总结 */}
          <p className={styles['summary']}>{dataSource.summary}</p>
        </div>

        {/* 封面图 */}
        <div className={styles['content-right']}>
          <IzImage src={dataSource.cover} alt={dataSource.title} width={100} height={100} />
        </div>
      </div>
    </li>
  );
};

export default ArticleItem;
