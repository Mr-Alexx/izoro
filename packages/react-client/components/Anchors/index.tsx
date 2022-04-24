/**
 * 锚点组件
 * @usage
 */
import styles from './index.module.scss';

export type AnchorItem = {
  name?: string;
  hType?: number;
};

const Anchors = (props: { dataSource?: AnchorItem[] }) => {
  const { dataSource } = props;
  if (!dataSource) {
    return null;
  }
  return (
    <div className={styles['anchor-wrapper']}>
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
