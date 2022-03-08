import Link from 'next/link';
import type { FC } from 'react';

const ArticleItem: FC<{
  /** 数据项 */
  dataSource: ArticleApi.ArticleItem;
}> = ({ dataSource }) => {
  return (
    <li>
      {/* 日期、分类等 */}
      <div>
        <Link href={`/${dataSource.category_name}`}>{dataSource.category_name}</Link>
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
        {/* 内容 */}
        <div>test</div>

        {/* 封面图 */}
        <div>test</div>
      </div>
    </li>
  );
};

export default ArticleItem;
