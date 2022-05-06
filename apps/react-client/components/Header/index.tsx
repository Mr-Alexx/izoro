import type { FC } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Search from './Search';

const NAV_LIST = [
  { name: '首页', link: '/' },
  { name: '分类', link: '/category' },
  { name: '归档', link: '/archives' },
  { name: '留言板', link: '/message' },
  { name: '关于', link: '/about-me' },
];

const Header: FC = () => {
  const router = useRouter();
  const pathname = router.pathname;

  console.log('pathname', pathname);

  return (
    <header className={styles['app-header']}>
      <div className={styles['app-header__logo']}>logo</div>
      <nav className={styles['app-header__nav']}>
        <ul className={styles['nav-list']}>
          {NAV_LIST.map(item => {
            return (
              <li
                key={item.name}
                className={classNames(styles['nav-item'], pathname === item.link ? styles['is-active'] : null)}>
                <Link href={item.link}>{item.name}</Link>
              </li>
            );
          })}
        </ul>

        <div>
          <Search />
        </div>
      </nav>
    </header>
  );
};

export default Header;
