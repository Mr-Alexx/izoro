import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import { Card, Row, Col, Form, Input, Select, Button, Space, Descriptions } from 'antd';
import { Link } from 'umi';

import styles from './index.less';

// 旧系统模版信息
const BasicInfo: FC = () => {
  return (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="名称">旧系统模版</Descriptions.Item>
          <Descriptions.Item label="类型">产品</Descriptions.Item>
          <Descriptions.Item label="创建人">汪莹超</Descriptions.Item>
          <Descriptions.Item label="创建时间">2019-09-21 15:33:41</Descriptions.Item>
          <Descriptions.Item label="更新时间">2020-04-09 21:07:34</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );
};

const MasterTemplateView: FC = () => {
  return (
    <PageContainer
      title={`名称:
      旧系统模版`}
      extra={
        <RouteContext.Consumer>
          {/* @ts-ignore */}
          {({ location }) => {
            return [
              <Link to="/finished-store/template-module/master-template-upload/index">
                <Button>返回</Button>
              </Link>,
              <Link to={`/finished-store/template-module/master-template-upload/create?id=${location.query.id}&cate=2`}>
                <Button type="primary">编辑母版</Button>
              </Link>,
            ];
          }}
        </RouteContext.Consumer>
      }
      content={<BasicInfo />}>
      <Card title="详情" style={{ marginTop: '20px' }}></Card>
    </PageContainer>
  );
};

export default MasterTemplateView;
