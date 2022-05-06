/**
 * @description 通用详情抽屉组件
 * @use
 */
import { Drawer, Skeleton, Spin } from 'antd';
import type { DrawerProps } from 'antd';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import type { FC } from 'react';
import { useState } from 'react';
import AffixAnchor from '@/components/AffixAnchor';
import classNames from 'classnames';
import styles from './detail-drawer.less';
import { useEffect } from 'react';

type DetailDrawerProps<T = Record<string, any>> = T & {
  /** @name 加载中 */
  loading?: boolean;
  /** @name 受控的打开关闭 */
  visible?: DrawerProps['visible'];
  /** @name 打开关闭的事件 */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * 不支持 'visible'，请使用全局的 visible
   *
   * @name 抽屉的属性
   */
  drawerProps?: Omit<DrawerProps, 'visible'>;
  /** @name 抽屉的标题 */
  title?: DrawerProps['title'];
  /** @name 抽屉的宽度 */
  width?: DrawerProps['width'];
  /** @name 锚点 */
  anchors?: string[];
};

const DetailDrawer: FC<DetailDrawerProps> = ({
  loading,
  children,
  visible: drawerVisble,
  onVisibleChange,
  drawerProps,
  title,
  width,
  anchors,
}: DetailDrawerProps) => {
  const [visible, setVisible] = useMergedState<boolean>(!!drawerVisble, {
    value: drawerVisble,
    onChange: onVisibleChange,
  });

  // <DrawerForm
  return (
    <Drawer
      {...drawerProps}
      className={classNames([styles['detail-drawer'], anchors && anchors.length > 0 ? styles['has-anchors'] : ''])}
      title={
        <div>
          {title}
          <AffixAnchor list={anchors} />
        </div>
      }
      placement={drawerProps?.placement ?? 'right'}
      visible={visible}
      onClose={e => {
        setVisible(false);
        drawerProps?.onClose?.(e);
      }}>
      {/* {loading ? <Spin spinning={loading} size="default" style={{ margin: '20px auto 0 auto' }} /> : children} */}
      {/* <Skeleton loading={loading} active paragraph={{ rows: 10 }}>
        {children}
      </Skeleton> */}
      {children}
    </Drawer>
  );
};

export default DetailDrawer;
