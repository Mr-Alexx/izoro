/** @format */

import { Card, Col, Row, Statistic } from 'antd';
import { useRequest } from 'umi';
import type { FC } from 'react';
import React from 'react';
import { uniqueId, update } from 'lodash';
import { Gauge, WordCloud, Liquid, RingProgress } from '@ant-design/charts';
import type { WordCloudData } from '@antv/g2plot/esm/plots/word-cloud/layer';

import { createFromIconfontCN } from '@ant-design/icons';

import { GridContent } from '@ant-design/pro-layout';
// import numeral from 'numeral';
// import Map from './components/Map';
// import ActiveChart from './components/ActiveChart';
// import { queryTags } from './service';
import styles from './style.less';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2498052_9d1kadeo8du.js',
});

const Dashboard: FC = () => {
  return (
    <GridContent>
      <>
        <Card style={{ marginBottom: 20 }}>
          <div className={styles.header}>
            <img alt="" />
            <div className={styles.flex1}>
              <div className={styles.flex} style={{ alignItems: 'flex-end' }}>
                <span className={styles.name}>张三</span>
                <span className={styles.position}>（项目经理）</span>
              </div>
              <div className={`${styles.flex} ${styles.userDetailMsg}`}>
                <div className={styles.jobNumber}>
                  <span className={styles.label}>工号：</span>
                  <span className={styles.content}>HH496</span>
                </div>
                <div>
                  <span className={styles.label}>上次登录时间：</span>
                  <span className={styles.content}>2021/4/9 12:35:42</span>
                </div>
              </div>
            </div>
            <div className={styles.headerRight}>
              <IconFont type="icon-settings" className={styles.cursor} style={{ fontSize: 24 }} />
              <IconFont type="icon-logout" className={styles.cursor} style={{ marginLeft: 20, fontSize: 24 }} />
            </div>
          </div>
        </Card>
        <Row gutter={24}>
          <Col md={17} xs={24} style={{ marginBottom: 20 }} className={styles.operationalData}>
            <Card
              title="运营数据"
              extra={<span className={styles.updateTime}>更新时间：2021/4/9 12:00:00</span>}
              bordered={false}></Card>
          </Col>
          <Col md={7} xs={24} style={{ marginBottom: 20 }}>
            <Card title="系统公共" bordered={false}></Card>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};
export default Dashboard;
