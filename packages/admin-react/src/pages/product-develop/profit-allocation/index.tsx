import React, { useState } from 'react';
import type { FC } from 'react';

import { Card } from 'antd';

import Ebay from './components/Ebay';

const tabListNoTitle = [
  {
    key: '1',
    tab: '洋桃',
  },
  {
    key: '2',
    tab: 'eBay',
  },
  {
    key: '3',
    tab: 'Amazon',
  },
  {
    key: '4',
    tab: 'Shopee',
  },
  {
    key: '5',
    tab: '独立站',
  },
];
const ProfitAllocation: FC = () => {
  const [tab, setTab] = useState('2');
  return (
    <Card
      tabList={tabListNoTitle}
      activeTabKey={tab}
      onTabChange={key => {
        setTab(key);
      }}>
      <Ebay />
    </Card>
  );
};

export default ProfitAllocation;
