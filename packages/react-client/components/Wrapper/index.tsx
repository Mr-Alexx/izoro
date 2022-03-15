import styles from './index.module.scss';
import { ReactNode, FC } from 'react';
import classNames from 'classnames';

const Wrapper: FC<{
  aside?: ReactNode;
}> = props => {
  return (
    <div className={classNames(styles.wrapper, styles['wrapper--has-aside'])}>
      <div className={styles['wrapper__content']}>{props.children}</div>
      {props.aside && <aside className={styles['wrapper__aside']}>{props.aside}</aside>}
    </div>
  );
};

export default Wrapper;
