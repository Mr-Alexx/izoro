import { FC } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

const IzPagination: FC = () => {
  return <div className={classNames(styles['iz-pagination'])}>分页</div>;
};

export default IzPagination;
