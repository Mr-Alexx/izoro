/**
 * 锚点组件
 */
import styles from './index.module.scss';
import variables from '@/styles/var.module.scss';
import type { CSSProperties } from 'react';

export type AnchorItem = {
  /** 锚点名称 */
  name?: string;
  /** h元素类型，如 h1 则 hType为1 */
  hType?: number;
};

const Anchors = (props: {
  dataSource?: AnchorItem[];
  sticky:
    | false
    | {
        offsetTop: number | string;
      };
}) => {
  const { dataSource, sticky } = props;
  if (!dataSource) {
    return null;
  }

  const anchorStyles =
    sticky === false
      ? null
      : ({
          position: 'sticky',
          top: sticky?.offsetTop || parseInt(variables.headerHeight) + 15,
          zIndex: 10,
        } as CSSProperties);
  return (
    <div className={styles['anchor-wrapper']} style={anchorStyles}>
      <div className={styles['anchor-title']}>目录</div>
      <ul className={styles['anchor-list']}>
        {dataSource.map((item: AnchorItem, index: number) => (
          // data-id={`anchor-${index}`}
          // 因为是从h2开始算锚点，所以减1（h1是页面标题，不算在内）
          <li style={{ paddingLeft: 12 * (item.hType - 1) }} key={index} className={styles['anchor-item']}>
            <a href={`#anchor-${index}`}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Anchors;
