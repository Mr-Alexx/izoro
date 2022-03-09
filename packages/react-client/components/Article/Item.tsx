import Link from 'next/link';
import type { FC } from 'react';
import { IzImage } from '../izImage';

const ArticleItem: FC<{
  /** 数据项 */
  dataSource: ArticleApi.ArticleItem;
}> = ({ dataSource }) => {
  return (
    <li>
      <a href={`/post/${dataSource.id}`} target="_blank" title={dataSource.title} rel="noreferrer">
        {/* 日期、分类等 */}
        <div>
          {/* <Link href={`/${dataSource.category_name}`}>{dataSource.category_name}</Link> */}
          <span>{dataSource.publish_at}</span>
          {dataSource.tags?.map(item => {
            return (
              <span key={item.id}>
                <Link href={`/tag/${item.name}`}>{item.name}</Link>·
              </span>
            );
          })}
        </div>

        {/* 内容块 */}
        <div>
          <div>
            {/* 标题 */}
            <div>{dataSource.title}</div>

            {/* 总结 */}
            <p>{dataSource.summary}</p>
          </div>

          {/* 封面图 */}
          <div>
            <IzImage src={dataSource.cover ?? '/'} alt={dataSource.title} width={100} height={100} />
          </div>
        </div>
      </a>
    </li>
  );
};

export default ArticleItem;
