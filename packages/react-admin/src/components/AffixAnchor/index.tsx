/**
 * @format
 * @description 固钉将元素固定在可是范围内和锚点定位组件
 */
import type { FC } from 'react';
import { Tabs, Affix } from 'antd';

const { TabPane } = Tabs;
type propsType = {
  list?: string[];
  offsetTop?: number;
};
const AffixAnchor: FC<propsType> = props => {
  if (!props?.list) {
    return null;
  }
  const { list, offsetTop } = props;
  return (
    <Affix key="anchor" className="drawer-anchor-tabs" offsetTop={offsetTop}>
      <Tabs
        tabBarStyle={{ background: '#fff' }}
        onChange={key => {
          const dom = document.getElementById(`${key}`);
          dom?.scrollIntoView({
            behavior: 'smooth', // 平滑过渡
            block: 'center',
          });
        }}>
        {list?.map((item: string) => (
          <TabPane tab={item} key={item} />
        ))}
      </Tabs>
    </Affix>
  );
};
export default AffixAnchor;
