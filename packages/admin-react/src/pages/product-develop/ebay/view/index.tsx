import { InfoCircleOutlined } from '@ant-design/icons';
import { Badge, Card, Statistic, Descriptions, Divider, Tooltip, Button } from 'antd';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import type { FC } from 'react';
import { useState } from 'react';
import { Link } from 'umi';

import styles from './index.less';

const extra = (
  <div className={styles.moreInfo}>
    <Statistic title="状态" value="待审批" />
    <Statistic title="订单金额" value={568.08} prefix="¥" />
  </div>
);

const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label="创建人">曲丽丽</Descriptions.Item>
        <Descriptions.Item label="订购产品">XX 服务</Descriptions.Item>
        <Descriptions.Item label="创建时间">2017-07-07</Descriptions.Item>
        <Descriptions.Item label="关联单据">
          <a href="">12421</a>
        </Descriptions.Item>
        <Descriptions.Item label="生效日期">2017-07-07 ~ 2017-08-08</Descriptions.Item>
        <Descriptions.Item label="备注">请于两个工作日内确认</Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);

const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'agree') {
        return <Badge status="success" text="成功" />;
      }
      return <Badge status="error" text="驳回" />;
    },
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

interface AdvancedState {
  operationKey: string;
  tabActiveKey: string;
}

const EbayView: FC = () => {
  const [tabStatus, seTabStatus] = useState<AdvancedState>({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });
  // const { data = {}, loading } = useRequest<{ data: AdvancedProfileData }>(queryAdvancedProfile);
  // const { advancedOperation1, advancedOperation2, advancedOperation3 } = data;
  // const contentList = {
  //   tab1: (
  //     <Table
  //       pagination={false}
  //       loading={loading}
  //       dataSource={advancedOperation1}
  //       columns={columns}
  //     />
  //   ),
  //   tab2: (
  //     <Table
  //       pagination={false}
  //       loading={loading}
  //       dataSource={advancedOperation2}
  //       columns={columns}
  //     />
  //   ),
  //   tab3: (
  //     <Table
  //       pagination={false}
  //       loading={loading}
  //       dataSource={advancedOperation3}
  //       columns={columns}
  //     />
  //   ),
  // };
  const onTabChange = (tabActiveKey: string) => {
    seTabStatus({ ...tabStatus, tabActiveKey });
  };

  return (
    <PageContainer
      title="单号：234231029431"
      extra={
        <RouteContext.Consumer>
          {/* @ts-ignore */}
          {() => {
            return (
              <Link to={`/product-develop/ebay/index`}>
                <Button>返回</Button>
              </Link>
            );
          }}
        </RouteContext.Consumer>
      }
      className={styles.pageHeader}
      tabActiveKey={tabStatus.tabActiveKey}
      onTabChange={onTabChange}
      tabList={[
        {
          key: 'detail',
          tab: '详情',
        },
        {
          key: 'rule',
          tab: '规则',
        },
      ]}>
      <div className={styles.main}>
        <GridContent>
          <Card title="基础信息" style={{ marginBottom: 24 }} bordered={false}>
            <Descriptions style={{ marginBottom: 24 }}>
              <Descriptions.Item label="用户姓名">付小小</Descriptions.Item>
              <Descriptions.Item label="会员卡号">32943898021309809423</Descriptions.Item>
              <Descriptions.Item label="身份证">3321944288191034921</Descriptions.Item>
              <Descriptions.Item label="联系方式">18112345678</Descriptions.Item>
              <Descriptions.Item label="联系地址">曲丽丽 18100000000</Descriptions.Item>
            </Descriptions>
          </Card>
        </GridContent>
      </div>
    </PageContainer>
  );
};

export default EbayView;
