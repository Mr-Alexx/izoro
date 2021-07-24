import React, { useState, useEffect } from 'react';
import type { FC } from 'react';

import { Tabs, Button, Carousel, Row, Col, Card, Table, Radio, Steps, Timeline, Affix, Anchor } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';

// import ProCard from '@ant-design/pro-card';
import type { commodityProfitType } from './data';

import type { ColumnProps } from 'antd/es/table';

import { history } from 'umi';

import Iconfont from '@/components/Iconfont';

import styles from './index.less';

const { TabPane } = Tabs;
const { Step } = Steps;
const { Link } = Anchor;

const columns: ColumnProps<commodityProfitType>[] = [
  {
    title: '产品尺寸(长*宽*高)',
    width: 160,
    dataIndex: 'product_size',
    key: 'product_size',
    fixed: 'left',
  },
  {
    title: '重量(kg)',
    width: 100,
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: '产品体积(m³)',
    width: 120,
    dataIndex: 'product_volume',
    key: 'product_volume',
  },
  {
    title: '开发邮资',
    width: 100,
    dataIndex: 'development_postage',
    key: 'development_postage',
  },
  {
    title: '币种',
    width: 100,
    dataIndex: 'currency',
    key: 'currency',
  },
  {
    title: '汇率',
    width: 100,
    dataIndex: 'exchange_rate',
    key: 'exchange_rate',
  },
  {
    title: '产品成本',
    width: 100,
    dataIndex: 'product_costs',
    key: 'product_costs',
  },
  {
    title: '尾程运费(汇率前)',
    width: 150,
    dataIndex: 'tail_freight_exchange_rate_before',
    key: 'tail_freight_exchange_rate_before',
  },
  {
    title: '尾程运费(汇率后)',
    width: 150,
    dataIndex: 'tail_freight_exchange_rate_after',
    key: 'tail_freight_exchange_rate_after',
  },
  {
    title: '售价(汇率前)',
    width: 150,
    dataIndex: 'price_exchange_rate_before',
    key: 'price_exchange_rate_before',
  },
  {
    title: '售价(汇率后)',
    width: 150,
    dataIndex: 'price_exchange_rate_after',
    key: 'price_exchange_rate_after',
  },
  {
    title: '平台费用',
    width: 100,
    dataIndex: 'platform_cost',
    key: 'platform_cost',
  },
  {
    title: '采购运费',
    width: 100,
    dataIndex: 'procurement_freight',
    key: 'procurement_freight',
  },
  {
    title: '损耗',
    width: 100,
    dataIndex: 'wastage',
    key: 'wastage',
  },
  {
    title: 'GST',
    width: 100,
    dataIndex: 'gst',
    key: 'gst',
  },
  {
    title: '类型',
    width: 100,
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '运费',
    width: 100,
    dataIndex: 'freight',
    key: 'freight',
  },
  {
    title: '利润',
    width: 100,
    dataIndex: 'profit',
    key: 'profit',
  },
  {
    title: '毛利率',
    width: 100,
    dataIndex: 'gross_profit_rate',
    key: 'gross_profit_rate',
  },
];

const data: commodityProfitType[] = [
  {
    id: 1,
    product_size: 20,
  },
];

const CheckGoods: FC = () => {
  const [platform, setPlatform] = useState<any>('');
  const [id, setId] = useState<any>('');
  const [commodityDevelopNumber, setCommodityDevelopNumber] = useState('E0028498');
  const [logValue, setLogValue] = useState('1');
  const handleLogChange = (e: any) => {
    setLogValue(e.target.value);
  };
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined);
  useEffect(() => {
    const { query = {} } = history.location;
    // console.log(query);
    if (query.platform && query.id) {
      setPlatform(query.platform);
      setId(query.id);
    }
  }, []);

  useEffect(() => {
    setTargetOffset(window.innerHeight / 2);
  }, []);

  const handleEditBasicInfo = () => {
    if (platform === 'amazon') {
      history.push(`/product-develop/amazon/create?id=${id}&cate=2`);
    } else if (platform === 'ebay') {
      history.push(`/product-develop/ebay/create?id=${id}&cate=2`);
    }
  };
  return (
    <div
      style={{
        background: '#F0F2F5',
      }}>
      <PageContainer>
        <Affix offsetTop={50}>
          <Tabs
            defaultActiveKey="1"
            tabBarExtraContent={
              <div className={`${styles.flex} ${styles.alignCenter}`}>
                <Button className={styles.mr10}>返回</Button>
                <div>商品开发号：{commodityDevelopNumber}</div>
              </div>
            }
            className={styles.myTabs}>
            <TabPane
              tab={
                <Anchor affix={false} targetOffset={targetOffset}>
                  <Link href="#basic-info" title="基础信息" />
                </Anchor>
              }
              key="1"></TabPane>
            <TabPane
              tab={
                <Anchor affix={false} targetOffset={targetOffset}>
                  <Link href="#commodity-profit" title="商品利润" />
                </Anchor>
              }
              key="2"></TabPane>
            <TabPane
              tab={
                <Anchor affix={false} targetOffset={targetOffset}>
                  <Link href="#supplier-quotation" title="供应商报价" />
                </Anchor>
              }
              key="3"></TabPane>
            <TabPane
              tab={
                <Anchor affix={false} targetOffset={targetOffset}>
                  <Link href="#declaration-info" title="报关信息" />
                </Anchor>
              }
              key="4"></TabPane>
            <TabPane
              tab={
                <Anchor affix={false} targetOffset={targetOffset}>
                  <Link href="#logistics-properties" title="物流属性" />
                </Anchor>
              }
              key="5"></TabPane>
            <TabPane
              tab={
                <Anchor affix={false} targetOffset={targetOffset}>
                  <Link href="#log" title="日志" />
                </Anchor>
              }
              key="6"></TabPane>
          </Tabs>
        </Affix>
        <Row gutter={20}>
          <Col lg={8} md={24}>
            <Affix offsetTop={150}>
              <Card
                title="商品信息"
                extra={
                  <Button
                    onClick={() => {
                      handleEditBasicInfo();
                    }}>
                    编辑商品资料
                  </Button>
                }>
                <Carousel autoplay>
                  <div>
                    <h3 className={styles.contentStyle}>1</h3>
                  </div>
                  <div>
                    <h3 className={styles.contentStyle}>2</h3>
                  </div>
                  <div>
                    <h3 className={styles.contentStyle}>3</h3>
                  </div>
                  <div>
                    <h3 className={styles.contentStyle}>4</h3>
                  </div>
                </Carousel>
                <div className={`${styles.productTitle} ${styles.ellipse2}`}>
                  49x TIG Welding Torch Stubby Gas Lens #10 Pyrex Glass Cup Kit For WP-17/18/26 AU
                </div>
                <div className={`${styles.flex} ${styles.alignCenter} ${styles.productCosts}`}>
                  <span className={styles.label}>产品成本</span>
                  <span className={styles.content}>¥68.00</span>
                </div>
                <div className={`${styles.productDetail}`}>
                  <div className={`${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>商品中文名</div>
                    <div className={styles.flex1}>中文名</div>
                  </div>
                  <div className={`${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>商品ID</div>
                    <div className={styles.flex1}>11987</div>
                  </div>
                  <div className={`${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>品牌</div>
                    <div className={styles.flex1}>无</div>
                  </div>
                  <div className={`${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>型号</div>
                    <div className={styles.flex1}>无</div>
                  </div>
                  <div className={`${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>商品尺寸(CM)</div>
                    <div className={styles.flex1}>无</div>
                  </div>
                  <div className={`${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>重量(kg)</div>
                    <div className={styles.flex1}>无</div>
                  </div>
                </div>
              </Card>
            </Affix>
          </Col>
          <Col lg={16} md={24}>
            <Card
              title="基础信息"
              id="basic-info"
              extra={
                <Button
                  onClick={() => {
                    handleEditBasicInfo();
                  }}>
                  编辑基础信息
                </Button>
              }>
              <div className={`${styles.productDetail} ${styles.labelRight}`}>
                <div className={styles.flex}>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>产品开发</div>
                    <div className={styles.flex1}>张三</div>
                  </div>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>线索提供人</div>
                    <div className={styles.flex1}>张三</div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>状态</div>
                    <div className={styles.flex1}>已经询价</div>
                  </div>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>销售人</div>
                    <div className={styles.flex1}>--</div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>创建时间</div>
                    <div className={styles.flex1}>2021-04-15 17:51:21</div>
                  </div>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>更新时间</div>
                    <div className={styles.flex1}>2021-04-16 16:54:31</div>
                  </div>
                </div>
                <div className={`${styles.flex} ${styles.crossLine}`}>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>关键词</div>
                    <div className={styles.flex1}>gas / Torch</div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>平台分类ID一</div>
                    <div className={styles.flex1}>67062</div>
                  </div>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>平台分类ID二</div>
                    <div className={styles.flex1}></div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>卖家</div>
                    <div className={styles.flex1}>freekoqishop</div>
                  </div>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>竞品Item ID</div>
                    <div className={styles.flex1}>392977823719</div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>首页同款最低价</div>
                    <div className={styles.flex1}>27.8000</div>
                  </div>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>物品详情(UPC)</div>
                    <div className={styles.flex1}>--</div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>备注</div>
                    <div className={styles.flex1}></div>
                  </div>
                </div>
              </div>
            </Card>
            <Card
              id="commodity-profit"
              className={styles.mt20}
              title="商品利润"
              extra={
                <Button
                  onClick={() => {
                    history.push({
                      pathname: '/product-develop/profit-allocation',
                    });
                  }}>
                  利润配置
                </Button>
              }>
              <Table columns={columns} pagination={false} dataSource={data} bordered scroll={{ x: 1300 }} />
            </Card>
            <Card
              className={styles.mt20}
              id="supplier-quotation"
              title="供应商报价"
              extra={<Button>新增供应商报价</Button>}>
              <Card
                size="small"
                title="这里显示供应的名称（没有则显示“无供应商名称”）"
                extra={
                  <div>
                    <Iconfont type="icon-eye" style={{ fontSize: 18, color: 'red', cursor: 'pointer' }} />
                    <Iconfont
                      type="icon-link"
                      style={{
                        fontSize: 18,
                        color: 'red',
                        cursor: 'pointer',
                        marginLeft: 10,
                      }}
                    />
                    <Iconfont
                      type="icon-edit"
                      style={{
                        fontSize: 18,
                        color: '#fc0',
                        cursor: 'pointer',
                        marginLeft: 10,
                      }}
                    />
                  </div>
                }
                style={{ background: '#F8F9FA' }}>
                <div className={`${styles.productDetail} ${styles.labelRight}`}>
                  <div className={styles.flex}>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>产品开发</div>
                      <div className={styles.flex1}>张三</div>
                    </div>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>线索提供人</div>
                      <div className={styles.flex1}>张三</div>
                    </div>
                  </div>
                  <div className={styles.flex}>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>状态</div>
                      <div className={styles.flex1}>已经询价</div>
                    </div>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>销售人</div>
                      <div className={styles.flex1}>--</div>
                    </div>
                  </div>
                  <div className={styles.flex}>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>创建时间</div>
                      <div className={styles.flex1}>2021-04-15 17:51:21</div>
                    </div>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>更新时间</div>
                      <div className={styles.flex1}>2021-04-16 16:54:31</div>
                    </div>
                  </div>
                  <div className={`${styles.flex} ${styles.crossLine}`}>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>关键词</div>
                      <div className={styles.flex1}>gas / Torch</div>
                    </div>
                  </div>
                  <div className={styles.flex}>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>平台分类ID一</div>
                      <div className={styles.flex1}>67062</div>
                    </div>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>平台分类ID二</div>
                      <div className={styles.flex1}></div>
                    </div>
                  </div>
                  <div className={styles.flex}>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>卖家</div>
                      <div className={styles.flex1}>freekoqishop</div>
                    </div>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>竞品Item ID</div>
                      <div className={styles.flex1}>392977823719</div>
                    </div>
                  </div>
                  <div className={styles.flex}>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>首页同款最低价</div>
                      <div className={styles.flex1}>27.8000</div>
                    </div>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>物品详情(UPC)</div>
                      <div className={styles.flex1}>--</div>
                    </div>
                  </div>
                  <div className={styles.flex}>
                    <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                      <div className={styles.label}>备注</div>
                      <div className={styles.flex1}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </Card>
            <Card className={styles.mt20} id="declaration-info" title="报关信息" extra={<Button>新增报关信息</Button>}>
              <div
                className={`${styles.flex} ${styles.flexDirectioncolumn} ${styles.alignCenter} ${styles.emptyDeclarationInfo}`}>
                <Iconfont
                  type="icon-wifi-off"
                  style={{
                    fontSize: 18,
                    color: '#fc0',
                  }}
                />
                <span>暂无报关信息</span>
              </div>
            </Card>
            <Card className={styles.mt20} id="logistics-properties" title="物流属性">
              <div className={`${styles.productDetail} ${styles.labelRight}`}>
                <div className={styles.flex}>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>液体</div>
                    <div className={styles.flex1}>未知</div>
                  </div>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>粉末</div>
                    <div className={styles.flex1}>未知</div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>带电池</div>
                    <div className={styles.flex1}>未知</div>
                  </div>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>膏体</div>
                    <div className={styles.flex1}>未知</div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>仿牌</div>
                    <div className={styles.flex1}>未知</div>
                  </div>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>带磁性</div>
                    <div className={styles.flex1}>未知</div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>人体接触类</div>
                    <div className={styles.flex1}>未知</div>
                  </div>
                  {/* <div
                    className={`${styles.flex1} ${styles.flex} ${styles.item}`}>
                    <div className={styles.label}>带磁性</div>
                    <div className={styles.flex1}>未知</div>
                  </div> */}
                </div>
              </div>
            </Card>
            <Card
              className={styles.mt20}
              id="log"
              title="日志"
              extra={
                <div>
                  <Radio.Group value={logValue} onChange={handleLogChange} size="small">
                    <Radio.Button value="1">审核流程</Radio.Button>
                    <Radio.Button value="2">修改日志</Radio.Button>
                  </Radio.Group>
                </div>
              }>
              <div>
                {logValue === '1' && (
                  <Steps current={1}>
                    <Step title="Finished" description="This is a description." />
                    <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
                    <Step title="Waiting" description="This is a description." />
                  </Steps>
                )}
                {logValue === '2' && (
                  <div style={{ margin: '20px 40px' }}>
                    <Timeline>
                      <Timeline.Item color="gray">
                        <p className={styles.stepTitle}>活动按期开始</p>
                        <p className={styles.stepDate}>2020-04-14 15:05:16</p>
                      </Timeline.Item>
                      <Timeline.Item color="gray">
                        <p className={styles.stepTitle}>通过审核</p>
                        <p className={styles.stepDate}>2020-04-14 15:05:16</p>
                      </Timeline.Item>
                      <Timeline.Item color="gray">
                        <p className={styles.stepTitle}>创建成功</p>
                        <p className={styles.stepDate}>2020-04-14 15:05:16</p>
                      </Timeline.Item>
                    </Timeline>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </div>
  );
};

export default CheckGoods;
