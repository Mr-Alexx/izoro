import type { FC } from 'react';
import React from 'react';
import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from 'antd';
import { Link, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import type { ActivitiesType, CurrentUser, SalesDataType } from './data.d';
import { queryCurrent, queryProjectNotice, queryActivities, fakeChartData } from './service';

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];
const salesData: SalesDataType[] = [
  { name: '今日销售额', value: 194161, compareValue: 201343, rate: -14 },
  { name: '今日销单量', value: 194161, compareValue: 201343, rate: -14 },
  { name: '近7天销售额', value: 194161, compareValue: 201343, rate: -14 },
  { name: '近7天销单量', value: 194161, compareValue: 201343, rate: -14 },
  { name: '近30天销售额', value: 194161, compareValue: 201343, rate: -14 },
  { name: '近30天销单量', value: 194161, compareValue: 201343, rate: -14 },
];

const PageHeaderContent: FC<{ currentUser: CurrentUser }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};

const ExtraContent: FC<Record<string, any>> = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="项目数" value={56} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="团队内排名" value={8} suffix="/ 24" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="项目访问" value={2223} />
    </div>
  </div>
);

const Workplace: FC = () => {
  const { data: currentUser } = useRequest(queryCurrent);
  const { loading: projectLoading, data: projectNotice = [] } = useRequest(queryProjectNotice);
  const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
  const { data } = useRequest(fakeChartData);

  const renderActivities = (item: ActivitiesType) => {
    // const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
    //   if (item[key]) {
    //     return (
    //       <a href={item[key].link} key={item[key].name}>
    //         {item[key].name}
    //       </a>
    //     );
    //   }
    //   return key;
    // });
    return (
      <List.Item key={item.id} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <List.Item.Meta
          avatar={false}
          title={
            <span>最新待处理事项 - 第{item.id}条</span>
            // <span>
            //   <a className={styles.username}>{item.user.name}</a>
            //   &nbsp;
            //   <span className={styles.event}>{events}</span>
            // </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  return (
    <PageContainer
      content={<PageHeaderContent currentUser={currentUser || ({} as CurrentUser)} />}
      extraContent={<ExtraContent />}>
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.projectList}
            style={{ marginBottom: 24 }}
            title="销售数据"
            bordered={false}
            extra={
              <a target="_blank" href="http://erpbi.bz-bss.com/#/dashboard">
                BI内查看
              </a>
            }
            loading={projectLoading}
            bodyStyle={{ padding: 0 }}>
            {salesData.map(item => (
              <Card.Grid className={styles.projectGrid} key={item.name}>
                <Card bodyStyle={{ padding: 0 }} bordered={false}>
                  <Card.Meta
                    title={
                      <div className={styles.cardTitle} style={{ lineHeight: 40 }}>
                        <span>{item.name}</span>
                        <span>{item.rate}%</span>
                      </div>
                    }
                    description=""
                  />
                  <div>
                    <em>{item.value}</em>
                    <span>{item.compareValue}</span>
                  </div>
                </Card>
              </Card.Grid>
            ))}
          </Card>

          <Card
            bodyStyle={{ padding: 0 }}
            bordered={false}
            className={styles.activeCard}
            title="最近待办事项"
            loading={activitiesLoading}>
            <List<ActivitiesType>
              loading={activitiesLoading}
              renderItem={item => renderActivities(item)}
              dataSource={activities}
              className={styles.activitiesList}
              size="large"
            />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card style={{ marginBottom: 24 }} title="快捷操作" bordered={false} bodyStyle={{ padding: 0 }}>
            <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
          </Card>
          <Card
            style={{ marginBottom: 24 }}
            bordered={false}
            title="待审批事项"
            loading={data?.radarData?.length === 0}>
            待审批列表
          </Card>
          {/* <Card
            bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
            bordered={false}
            title="待办事项"
            loading={projectLoading}>
            <div className={styles.activeCard}>
              <List<ActivitiesType>
                loading={activitiesLoading}
                renderItem={item => renderActivities(item)}
                dataSource={activities}
                className={styles.activitiesList}
                size="large"
                style={{ padding: 0 }}
              />
            </div>
          </Card> */}
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Workplace;
