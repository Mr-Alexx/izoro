/**
 * @description 系统默认布局
 */
import Header from '@/components/Header';
import type { FC } from 'react';
import styles from './index.module.scss';

const DefaultLayout: FC = props => {
  const { children } = props;
  return (
    <div className={styles['default-layout']}>
      {/* 头部 */}
      <Header />

      {/* 内容块 */}
      <main>{children}</main>

      {/* 底部 */}
    </div>
  );
};

export default DefaultLayout;
