import type { FC } from 'react';

import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Button } from 'antd';
import { history } from 'umi';
import styles from './index.less';

import BasicInfo from './components/BasicInfo';

const { TabPane } = Tabs;

const ViewProduct: FC = () => {
  const handleTabChange = (key: string) => {
    console.log(key);
  };
  return (
    <PageContainer>
      {/* <Space>
      
        <Button type="primary">SKU基本信息</Button>
        <Button type="primary">SKU基本信息</Button>
      </Space> */}
      <Tabs
        tabBarExtraContent={
          <Button
            onClick={() => {
              history.goBack();
            }}>
            返回
          </Button>
        }
        defaultActiveKey="1"
        onChange={handleTabChange}
        className={styles.myTabs}>
        <TabPane tab="SKU基本信息" key="1">
          <BasicInfo />
        </TabPane>
        <TabPane tab="产品图片" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="产品详情" key="3">
          Content of tab 3
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default ViewProduct;
