import { ReactNode } from 'react';

type SkeletonProps = {
  children?: ReactNode;
  /** @name 加载状态，为true时显示占位图 */
  loading?: boolean;
  /** @name 标题设置 */
  title?:
    | false
    | {
        /** @name 标题宽度 */
        width?: number | string;
      };
  /** @name 段落设置 */
  paragraph?:
    | false
    | {
        /** @name 行数 */
        rows?: number;
        /** @name 最后一行的宽度 */
        width?: number | string;
      };
};

/** 标题元素 */
const Title = (props: { width?: number | string }) => {
  return <h3 className="iz-skeleton-title" style={{ width: props.width || '35%' }} />;
};

/** 段落元素 */
const Paragraph = (props: { rows?: number; width?: number | string }) => {
  const { width, rows = 2 } = props;
  return (
    <ul className="iz-skeleton-paragraph">
      {[...Array(rows)].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index} style={{ width: index === rows - 1 ? width || '65%' : '' }} />
      ))}
    </ul>
  );
};

/** 占位图组件 */
const Skeleton = (props: SkeletonProps) => {
  const { loading, title, paragraph, children } = props;

  if (loading) {
    return (
      <div className="iz-skeleton">
        {title && <Title {...title} />}
        {paragraph && <Paragraph {...paragraph} />}
      </div>
    );
  }

  return <>{children}</>;
};

Skeleton.defaultProps = {
  title: { width: '35%' },
  paragraph: {
    rows: 2,
    width: '65%',
  },
};

export default Skeleton;
