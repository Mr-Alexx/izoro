import { FC } from 'react';
import styles from './index.module.scss';

const Search: FC = () => {
  return (
    <span className={styles['header-search']}>
      <input className={styles['header-search__input']} placeholder="探索IZORO" />
      <span className={styles['header-search__btn']}>
        <i className="iconfont icon-search" />
      </span>
    </span>
  );
};

export default Search;
