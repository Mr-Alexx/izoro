import { FC, useMemo, useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Search: FC = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');

  const disabled = useMemo(() => {
    return !value?.trim?.();
  }, [value]);

  useEffect(() => {
    if (router.pathname === '/search') {
      setValue((router.query.keyword || '') as string);
    }
  }, [router]);

  /** 搜索逻辑 */
  const handleSearch = () => {
    const searchVal = value?.trim?.();
    // 空值、查询参数没变都不操作
    if (!searchVal || router.query.keyword === searchVal) {
      return;
    }

    router.push(`/search?keyword=${encodeURIComponent(searchVal)}`);
  };

  return (
    <span className={styles['header-search']}>
      <input
        className={styles['header-search__input']}
        placeholder="探索IZORO"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          if (e.code === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button type="button" className={styles['header-search__btn']} disabled={disabled} onClick={handleSearch}>
        <i className="iconfont icon-search" />
      </button>
    </span>
  );
};

export default Search;
