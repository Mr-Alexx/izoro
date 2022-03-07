/**
 * @description 二次封装proComponent的pageContainer组件
 * 新增功能：
 * 1. 增加tab锚点功能，使用 anchors=["xx", "xx"]或者anchorts = [{id: 'xx', label: 'xxx'}]
 * 2. 增加返回配置，使用 back={true}即可，默认是history.go(-1)，其它返回逻辑使用pageContainer自带设置
 * 3. ...待定
 */
import type { PageContainerProps } from '@ant-design/pro-layout';
import { PageContainer } from '@ant-design/pro-layout';
import { Affix, Anchor } from 'antd';
import type { FC, ReactNode } from 'react';
import styles from './index.less';
import classNames from 'classnames';

type AnchorItem =
  | string
  | {
      id: string;
      label: string;
    };
type AppPageContainerProps = PageContainerProps & {
  anchor?: {
    offsetTop?: number;
    list: AnchorItem[];
  };
  back?: boolean;
  footerAlign?: 'left' | 'center' | 'right';
  footerToolBar?: {
    visible?: boolean;
    total?: number;
    onCancel?: () => void;
    extra?: React.ReactNode;
    content?: React.ReactNode | ReactNode[];
  };
};

const AppPageContainer: FC<AppPageContainerProps> = props => {
  const { anchor, extra, back, children, footerAlign } = props;
  let { onBack } = props;

  // 锚点不记录到url上，不对返回有影响
  const handleClick = (
    e: React.MouseEvent<HTMLElement>,
    // link: {
    //   title: React.ReactNode;
    //   href: string;
    // },
  ) => {
    e.preventDefault();
    // console.log(link);
  };

  let extraContent;
  if (anchor) {
    // 有锚点则构造锚点
    extraContent = (
      // @ts-ignore
      <Affix key="anchor" className="anchor-tabs" offsetTop={anchor.offsetTop || 48} onClick={handleClick}>
        <Anchor affix={false} offsetTop={130}>
          {anchor?.list.map((item: AnchorItem) => (
            // @ts-ignore
            <Anchor.Link key={item?.id || item} href={`#${item?.id || item}`} title={item?.label || item} />
          ))}
        </Anchor>
      </Affix>
    );
  }
  if (extra) {
    // 如果有自定额外内容，则将锚点和额外内容合并
    extraContent = (
      <>
        {extra}
        {extraContent}
      </>
    );
  }

  const newBack = back === false ? false : true;
  if (newBack) {
    onBack = () => window.history.go(-1);
  }

  return (
    <PageContainer
      // classNames={[
      //   footerAlign ? styles[`app-page-container--${footerAlign}`] : '',
      //   anchor?.list && anchor?.list?.length > 0 ? styles['has-anchor-tabs'] : '',
      // ]}
      className={classNames(styles['app-page-container'], {
        [styles[`app-page-container--${footerAlign}`]]: !!footerAlign,
        [styles['has-anchor-tabs']]: anchor?.list && anchor?.list?.length > 0,
      })}
      {...props}
      extra={extraContent}
      onBack={onBack}>
      {children}
    </PageContainer>
  );
};

export default AppPageContainer;
