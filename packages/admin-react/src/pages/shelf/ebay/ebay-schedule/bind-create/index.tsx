import type { FC } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Button, Row, Col, message, Card } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Link } from 'umi';
import styles from './index.less';

const EbayScheduleBindCreate: FC = () => {
  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}>
      <Link to="/shelf/ebay/schedule/bind-index">
        <Button type="primary">返回</Button>
      </Link>
      <Card title="新增上架计划" style={{ marginTop: '10px' }}>
        <ProForm
          submitter={false}
          className={styles.form}
          layout="horizontal"
          onFinish={async values => {
            console.log(values);
            message.success('提交成功');
          }}>
          <Row gutter={20}>
            <Col lg={12} md={24}>
              <ProFormText name="bound_num" label="捆绑号" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="country"
                label="国家"
                showSearch
                mode="multiple"
                options={[
                  {
                    label: '澳大利亚',
                    value: '1',
                  },
                  {
                    label: '英国',
                    value: '2',
                  },
                  {
                    label: '德国',
                    value: '3',
                  },
                ]}
                placeholder="请选择"
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="shelf_shop"
                label="上架店铺"
                placeholder="请输入"
                rules={[{ required: true, message: '上架店铺不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="optimization_time"
                label="优化时间"
                placeholder="请输入"
                rules={[{ required: true, message: '优化时间不能为空' }]}
              />
            </Col>
            <Col md={24} lg={24} style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                提交保存
              </Button>
            </Col>
          </Row>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EbayScheduleBindCreate;
