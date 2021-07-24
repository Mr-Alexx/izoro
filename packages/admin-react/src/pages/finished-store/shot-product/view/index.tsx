import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Row, Col, Form, Space, Radio, Modal, Steps, Table, Menu, Dropdown, Input } from 'antd';
import type { ColumnProps } from 'antd/es/table';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { Link } from 'umi';
import TableToolBar from '@/components/TableToolBar';
import Upload from '@/components/Upload';

import type { TableListItem, TableListItem2 } from './data';

import styles from './index.less';

const { Step } = Steps;
const data = [
  {
    id: 1,
    avatar: 'https://i.ebayimg.com/images/g/OH4AAOSwgiJfSHOx/s-l300.jpg',
    spu: 'P027980',
    sku: '563057',
    item_id: '174359270611',
    product_name: 'eBay R134A recharge hose汽车空调制冷剂加注管加氟管检测补充管 R134A 管',
    quantity: 0,
    remark: '',
    purchase_order_num: '',
    status: '',
  },
];

const data2: {
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

const ShotProductView: FC = () => {
  // 批量操作单选按钮
  const [radioBtnValue, setRadioBtnValue] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [logValue, setLogValue] = useState('1');
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [imgPathModalVisible, setImgPathModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  //   下拉按钮菜单中的子菜单不固定显示
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">查看拍摄</Menu.Item>
      <Menu.Item key="2">查看设计</Menu.Item>
    </Menu>
  );
  function handleMenuClick(e: any) {
    console.log('click', e.key);
    setIsModalVisible(true);
  }

  const handleLogChange = (e: any) => {
    setLogValue(e.target.value);
  };

  const getFileList = (val: any[]) => {
    console.log('==============子组件的值');
    console.log(val);
  };
  const columns1: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 60,
    },
    {
      title: '图片',
      dataIndex: 'avatar',
      key: 'avatar',
      valueType: 'image',
      width: 120,
    },
    {
      title: 'SPU',
      dataIndex: 'spu',
      key: 'spu',
      width: 120,
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: 120,
    },
    {
      title: 'Item ID',
      dataIndex: 'item_id',
      key: 'item_id',
      width: 120,
    },
    {
      title: '名称',
      dataIndex: 'product_name',
      key: 'product_name',
      width: 200,
      ellipsis: true,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 100,
    },
    {
      title: '采购单号',
      dataIndex: 'purchase_order_num',
      key: 'purchase_order_num',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
    {
      title: '操作',
      width: 300,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row, index, action) => [
        <a
          key="1"
          onClick={() => {
            setUploadModalVisible(true);
          }}>
          上传设计图
        </a>,
        <a
          key="2"
          onClick={() => {
            setDownloadModalVisible(true);
          }}>
          下载设计图
        </a>,
        <Dropdown.Button key="3" overlay={menu} size="small">
          查看图片
        </Dropdown.Button>,
      ],
    },
  ];
  const columns2: ColumnProps<TableListItem2>[] = [
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
  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}>
      <Space>
        <Link to="/finished-store/shot-product/index">
          <Button>返回</Button>
        </Link>
        <Button
          type="primary"
          onClick={() => {
            setImgPathModalVisible(true);
          }}>
          添加拍摄图片路径
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setStatusModalVisible(true);
          }}>
          更改状态
        </Button>
      </Space>

      <Card className={styles.mt10} title="IMG2106070002">
        <Form name="basic" className={styles.form} initialValues={{}}>
          <Row gutter={20}>
            <Col lg={12} md={24}>
              <Form.Item label="申请部门">B21216</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="拍摄需求号">IMG2106070002</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="产品名称">eBay R134A recharge hose汽车空调制冷剂加注管加氟管检测补充管</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="需求单类型">替换</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="是否需要拍摄">不拍摄</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="销售跟进人">范焕君</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="单据状态">需求确认</Form.Item>
            </Col>

            <Col lg={12} md={24}>
              <Form.Item label="创建人">范焕君</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="创建时间">2021-06-07 09:27:47</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="验收人">-</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="拍摄人">-</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="设计人">-</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="设计接单确认时间">-</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="拍摄完成时间">-</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="设计完成时间">0000-00-00 00:00:00</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="返修时间">0000-00-00 00:00:00</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="验收完成时间">0000-00-00 00:00:00</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="备注">补齐主图</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="设计接单超时">否</Form.Item>
            </Col>

            <Col lg={12} md={24}>
              <Form.Item label="设计完成超时">否</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="Ebay设计接单人">马金鑫</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="预计接单时间">2021-06-07 09:27:47</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="拍摄图片路径"></Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card className={styles.mt20} title="产品单信息">
        <ProTable<TableListItem>
          sticky
          headerTitle=""
          rowKey="id"
          search={false}
          scroll={{ x: 1300 }}
          dataSource={data}
          toolBarRender={() => [
            <TableToolBar
              columns={columns1.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))}
            />,
          ]}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
          tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
            <Space size={24}>
              <span>
                已选 {selectedRowKeys.length} 项
                <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
            </Space>
          )}
          tableAlertOptionRender={() => {
            return (
              <Radio.Group
                defaultValue={radioBtnValue}
                buttonStyle="solid"
                onChange={(e: any) => {
                  setRadioBtnValue(e.target.value);
                }}>
                <Radio.Button value="1">批量下载</Radio.Button>
                <Radio.Button value="2">批量拍摄下载</Radio.Button>
                <Radio.Button value="3">批量设计下载</Radio.Button>
              </Radio.Group>
            );
          }}
          columns={columns1}
          options={{
            fullScreen: true,
            reload: true,
            setting: true,
            density: true,
          }}
        />
      </Card>
      <Card className={styles.mt20} title="样品单信息">
        <div style={{ textAlign: 'center' }}>没有找到数据</div>
      </Card>
      <Card
        className={styles.mt20}
        style={{ minHeight: 300 }}
        id="log"
        title="日志"
        extra={
          <div>
            <Radio.Group value={logValue} onChange={handleLogChange} size="small">
              <Radio.Button value="1">审核流程</Radio.Button>
              <Radio.Button value="2">修改信息日志</Radio.Button>
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
              <Table showHeader={false} columns={columns2} dataSource={data2} />
            </div>
          )}
        </div>
      </Card>

      <Modal
        title="
        查看图片"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}>
        图片
      </Modal>
      <ModalForm
        title="图片上传"
        width="80%"
        layout="horizontal"
        visible={uploadModalVisible}
        onVisibleChange={setUploadModalVisible}
        onFinish={async value => {
          console.log(value);
          setUploadModalVisible(false);
        }}
        className={styles.form}>
        <Row gutter={20}>
          <Col lg={12} md={24}>
            <Form.Item label="上传图片">
              <Upload handleChange={getFileList} />
            </Form.Item>
          </Col>
        </Row>
      </ModalForm>
      <ModalForm
        title="图片下载"
        width="80%"
        layout="horizontal"
        visible={downloadModalVisible}
        onVisibleChange={setDownloadModalVisible}
        onFinish={async value => {
          console.log(value);
          setDownloadModalVisible(false);
        }}
        className={styles.form}>
        <Row gutter={20}>
          <Col lg={12} md={24}>
            {/* <Form.Item label="下载图片"></Form.Item> */}
          </Col>
        </Row>
      </ModalForm>
      {/* 添加拍摄图片路径 */}
      <ModalForm
        title="添加拍摄图片路径"
        width="80%"
        layout="horizontal"
        visible={imgPathModalVisible}
        onVisibleChange={setImgPathModalVisible}
        onFinish={async value => {
          console.log(value);
          setImgPathModalVisible(false);
        }}
        className={styles.form}>
        <Row gutter={20}>
          <Col lg={12} md={24}>
            <ProFormTextArea
              name="path"
              label="拍摄图片路径"
              rules={[{ required: true, message: '拍摄图片路径不能为空' }]}
            />
          </Col>
        </Row>
      </ModalForm>
      {/* 更改状态 */}
      <ModalForm
        title="更改状态"
        width="80%"
        layout="horizontal"
        visible={statusModalVisible}
        onVisibleChange={setStatusModalVisible}
        onFinish={async value => {
          console.log(value);
          setStatusModalVisible(false);
        }}
        className={styles.form}>
        <Row gutter={20}>
          <Col lg={12} md={24}>
            <ProFormSelect
              name="design_receipt_timeout"
              label="设计接单超时"
              showSearch
              allowClear
              options={[
                {
                  value: '',
                  label: '选择',
                },
                {
                  value: '1',
                  label: '未超时',
                },
                {
                  value: '2',
                  label: '已超时',
                },
              ]}
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormSelect
              name="design_comple_timeout"
              label="设计完成超时"
              showSearch
              allowClear
              options={[
                {
                  value: '',
                  label: '选择',
                },
                {
                  value: '1',
                  label: '未超时',
                },
                {
                  value: '2',
                  label: '已超时',
                },
              ]}
            />
          </Col>
        </Row>
      </ModalForm>
    </PageContainer>
  );
};

export default ShotProductView;
