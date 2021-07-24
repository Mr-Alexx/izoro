import type { FC } from 'react';

import ProForm, { ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-form';
import { Space, Table, Card, Button, Row, Col, Form } from 'antd';
import type { ColumnProps } from 'antd/es/table';
import type { TableListItem } from './data';
import styles from './index.less';

import { history } from 'umi';

const BasicInfo: FC = () => {
  const [form] = Form.useForm();
  const columns: ColumnProps<TableListItem>[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 200,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      render: (text, record) => (
        <div>
          <div>{record.content1}</div>
          <div>{record.content1}</div>
          <div>{record.content1}</div>
        </div>
      ),
    },
  ];
  const data: {
    // id?: number;
    date: string;
    content1: string;
    content2: string;
    content3: string;
  }[] = [
    {
      date: '2021-05-25 11:46:36',
      content1: '由[李健儿(李健儿)]修改',
      content2:
        '566422产品拓展: 备注 [空] -> [https://detail.1688.com/offer/612327906527.html?spm=a26352.b28411319.offerlist.1.42b91e62M3sPoC]',
      content3: '566422产品拓展: SKU备注 [空] -> []',
    },
    {
      date: '2021-05-25 11:46:36',
      content1: '由[李健儿(李健儿)]修改',
      content2:
        '566422产品拓展: 备注 [空] -> [https://detail.1688.com/offer/612327906527.html?spm=a26352.b28411319.offerlist.1.42b91e62M3sPoC]',
      content3: '566422产品拓展: SKU备注 [空] -> []',
    },
  ];
  return (
    <div>
      <Card
        title="基础属性"
        extra={
          <Space>
            <Button
              type="primary"
              size="small"
              key="1"
              onClick={() => {
                history.push({
                  pathname: '/finished-store/product-store/package-update',
                });
              }}>
              产品包装编辑
            </Button>
            <Button
              type="primary"
              size="small"
              key="2"
              onClick={() => {
                history.push({
                  pathname: '/finished-store/product-store/create-product-sku?cate=2',
                });
              }}>
              编辑
            </Button>
          </Space>
        }>
        <Row gutter={20}>
          <Col lg={6} md={24}>
            图片
          </Col>
          <Col lg={18} md={24}>
            <Form form={form} name="view_product" className={styles.form}>
              <Row gutter={20}>
                <Col lg={12} md={24}>
                  <Form.Item label="SKU">566422</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="SPU">P029240</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="名称">
                    厨房清洁刷洗碗碟机自动液体分配器锅清洁工具小工具炉灶台地板清洁刷Green
                  </Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="净重">276</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="净值尺寸（开发）">0.00 x 0.00 x 0.00</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="含包装尺寸（开发）">0.00 x 0.00 x 0.00</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="毛重">0</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="箱规数量">-</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="备注">
                    https://detail.1688.com/offer/612327906527.html?spm=a26352.b28411319.offerlist.1.42b91e62M3sPoC
                  </Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="SKU备注">备注</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="创建人">李健儿</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="创建时间">2021-05-25 11:46:36</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="产品开发人">李健儿(李健儿)</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="质检标准">质检标准</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="材质">材质</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="产品用途">产品用途</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="产品描述">产品描述</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="产品采购状态">无报价方案</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="产品货源状态">正常</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="起购量">-</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="加购量">-</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="生成周期">-</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="装箱尺寸">-</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="装箱重量">-</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="包装数量">0</Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
      <Card
        title="供应商报价信息"
        className={styles.mt20}
        extra={
          <Space>
            <Button type="primary" size="small" key="1">
              新增供应商
            </Button>
            <Button type="primary" size="small" key="2">
              添加1688链接
            </Button>
            <Button type="primary" size="small" key="2">
              添加报价
            </Button>
          </Space>
        }>
        <div className={styles.alignCenter}>没有找到数据</div>
      </Card>
      <Row gutter={20} className={styles.mt20}>
        <Col lg={12} md={24}>
          <Card
            title="物流属性"
            extra={
              <Space>
                <Button type="primary" size="small" key="1">
                  物流信息编辑
                </Button>
              </Space>
            }>
            <Form form={form} name="view_product" className={styles.form}>
              <Row gutter={20}>
                <Col lg={12} md={24}>
                  <Form.Item label="包裹重(g)">0</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="包裹尺寸(cm)">0.00 x 0.00 x 0.00</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="液体">未知</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="粉末">未知</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="带电池">未知</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="膏体">未知</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="仿牌">未知</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="带磁性">未知</Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item label="防疫物资">未知</Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card
            title="报关信息"
            extra={
              <Button type="primary" size="small" key="1">
                新增报关
              </Button>
            }>
            <div className={styles.alignCenter}>没有找到数据</div>
          </Card>
        </Col>
        <Card title="产品销售状态" className={styles.mt20} style={{ width: '100%' }}>
          <div className={styles.alignCenter}>没有找到数据</div>
        </Card>
        <Card
          title="原料方式"
          extra={
            <Button type="primary" size="small" key="1">
              新增产品原料方式
            </Button>
          }
          className={styles.mt20}
          style={{ width: '100%' }}>
          <div className={styles.alignCenter}>没有找到数据</div>
        </Card>
        <Card title="日志" className={styles.mt20} style={{ width: '100%' }}>
          {/* <div className={`${styles.alignRight} ${styles.log}`}>第1-1条，共1条数据</div> */}
          <Table showHeader={false} columns={columns} dataSource={data} />
        </Card>
      </Row>
    </div>
  );
};

export default BasicInfo;
