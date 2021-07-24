import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { Button, Radio, Select, TreeSelect, Menu, Dropdown } from 'antd';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { debounce } from 'lodash';

import type { TableListItem, TableListPagination } from './data';
import { Link, history } from 'umi';
import TableToolBar from '@/components/TableToolBar';

import { getEbayPublishList } from '@/services/product';
// DatePicker 设置为中文
import 'moment/locale/zh-cn';

const { Option, OptGroup } = Select;

const PublishList: FC = () => {
  const [activekey, setActiveKey] = useState<React.Key>('3');
  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);
  // 批量操作单选按钮
  const [radioBtnValue, setRadioBtnValue] = useState<string>('');
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'SKU',
      width: 120,
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: '店铺名称',
      width: 120,
      dataIndex: 'shop_name',
      key: 'shop_name',
      valueType: 'select',
      renderFormItem: (_, { defaultRender }) => {
        return (
          <Select key="searchSelect" showSearch placeholder="请选择" allowClear mode="multiple">
            {
              <OptGroup label="ebay">
                <Option key="1" value="alien-wolf">
                  alien-wolf
                </Option>
                <Option key="2" value="verruecktefabrik">
                  verruecktefabrik
                </Option>
                <Option key="3" value="e-onlinebuy">
                  e-onlinebuy
                </Option>
              </OptGroup>
            }
          </Select>
        );
      },
    },
    {
      title: 'Item ID',
      width: 120,
      dataIndex: 'item_id',
      key: 'item_id',
    },
    {
      title: '关注数',
      width: 120,
      dataIndex: 'attention_num',
      key: 'attention_num',
      search: false,
    },
    {
      title: '当天销量',
      width: 120,
      dataIndex: 'day_sales',
      key: 'day_sales',
      search: false,
    },
    {
      title: '折扣名',
      width: 120,
      dataIndex: 'discount_name',
      key: 'discount_name',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: 'test',
            value: '1',
          },
          {
            label: '3-5-10',
            value: '2',
          },
          {
            label: '7-12-20',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: 'BM排行',
      width: 120,
      dataIndex: 'bm_ranking',
      key: 'bm_ranking',
      search: false,
    },
    {
      title: 'BM更新时间',
      width: 120,
      dataIndex: 'bm_update',
      key: 'bm_update',
      search: false,
    },
    {
      title: 'BM总曝光数',
      width: 120,
      dataIndex: 'bm_exposure',
      key: 'bm_exposure',
      search: false,
    },
    {
      title: 'Markdown名称',
      width: 120,
      dataIndex: 'markdown_name',
      key: 'markdown_name',
      search: false,
    },
    {
      title: 'MD开始时间',
      width: 120,
      dataIndex: 'md_start',
      key: 'md_start',
      search: false,
    },
    {
      title: 'MD结束时间',
      width: 120,
      dataIndex: 'md_end',
      key: 'md_end',
      search: false,
    },
    {
      title: '曝光数',
      width: 120,
      dataIndex: 'exposure_num',
      key: 'exposure_num',
      search: false,
    },
    {
      title: '点击数',
      width: 120,
      dataIndex: 'click_num',
      key: 'click_num',
      search: false,
    },
    {
      title: '销售数（广告）',
      width: 120,
      dataIndex: 'sales_num',
      key: 'sales_num',
      search: false,
    },
    {
      title: '价格',
      width: 120,
      dataIndex: 'price',
      key: 'price',
      search: false,
    },
    {
      title: '刊登时间',
      width: 120,
      dataIndex: 'publish_time',
      key: 'publish_time',
      search: false,
    },
    {
      title: '刊登时间',
      width: 120,
      dataIndex: 'publish_time',
      key: 'publish_time',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: value => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '创建时间',
      width: 120,
      dataIndex: 'publish_time',
      key: 'publish_time',
      valueType: 'dateRange',
      search: false,
    },
    {
      title: '关键词',
      width: 120,
      dataIndex: 'keyword',
      key: 'keyword',
      search: false,
    },
    {
      title: '关键词排名（广告）',
      width: 120,
      dataIndex: 'ad_Keyword_ranking',
      key: 'ad_Keyword_ranking',
      search: false,
    },
    {
      title: '关键词排名（自然）',
      width: 120,
      dataIndex: 'na_Keyword_ranking',
      key: 'na_Keyword_ranking',
      search: false,
    },
    {
      title: '广告费率',
      width: 120,
      dataIndex: 'ad_rate',
      key: 'ad_rate',
      search: false,
    },
    {
      title: '图片',
      width: 120,
      dataIndex: 'avatar',
      key: 'avatar',
      valueType: 'image',
      search: false,
    },
    {
      title: '处理状态',
      width: 120,
      dataIndex: 'process_state',
      key: 'process_state',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '正常',
            value: '1',
          },
          {
            label: '作废',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '广告系列名',
      width: 120,
      dataIndex: 'ad_series_name',
      key: 'ad_series_name',
      search: false,
    },
    {
      title: '推送状态',
      width: 120,
      dataIndex: 'push_state',
      key: 'push_state',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '',
          },
          {
            label: '未推送',
            value: '1',
          },
          {
            label: '待推送',
            value: '2',
          },
          {
            label: '推送成功',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '下架时间',
      width: 120,
      dataIndex: 'off_time',
      key: 'off_time',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: value => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '站点',
      width: 120,
      dataIndex: 'site',
      key: 'site',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '美国',
            value: '1',
          },
          {
            label: '德国',
            value: '2',
          },
          {
            label: '英国',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '持续时间',
      width: 120,
      dataIndex: 'time_duration',
      key: 'time_duration',
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '',
          },
          {
            label: 'GTC',
            value: '1',
          },
          {
            label: 'Days_1',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: 'Paypal',
      width: 120,
      dataIndex: 'paypal',
      key: 'paypal',
      hideInTable: true,
    },
    {
      title: '刊登人',
      width: 120,
      dataIndex: 'publisher',
      key: 'publisher',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '邓建辉',
            value: '1',
          },
          {
            label: '罗燕梅',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '绑定人员',
      width: 120,
      dataIndex: 'binding_personnel',
      key: 'binding_personnel',
      valueType: 'select',
      hideInTable: true,
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '',
          },
          {
            label: '邓建辉',
            value: '1',
          },
          {
            label: '罗燕梅',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '平台分类ID一',
      width: 120,
      dataIndex: 'platform_category_id1',
      key: 'platform_category_id1',
      search: false,
    },
    {
      title: '平台分类ID二',
      width: 120,
      dataIndex: 'platform_category_id2',
      key: 'platform_category_id2',
      search: false,
    },
    {
      title: '价格范围',
      width: 120,
      dataIndex: 'price_range',
      key: 'price_range',
      search: false,
    },
    {
      title: '币种Code',
      width: 120,
      dataIndex: 'currency_code',
      key: 'currency_code',
      search: false,
    },
    {
      title: '在线数量',
      width: 120,
      dataIndex: 'online_number',
      key: 'online_number',
      search: false,
    },
    {
      title: '浏览量',
      width: 120,
      dataIndex: 'views',
      key: 'views',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '',
          },
          {
            label: '有流量',
            value: '1',
          },
          {
            label: '无流量',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '销售数量',
      width: 120,
      dataIndex: 'sales_num',
      key: 'sales_num',
      valueType: 'digit',
    },
    {
      title: '广告状态',
      width: 120,
      dataIndex: 'advertising_state',
      key: 'advertising_state',
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '',
          },
          {
            label: '正常',
            value: '1',
          },
          {
            label: '结束',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '展示类型',
      width: 120,
      dataIndex: 'show_type',
      key: 'show_type',
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '',
          },
          {
            label: '仅展示sku',
            value: '1',
          },
          {
            label: '仅展示捆绑号',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '标题',
      width: 120,
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '定时上架时间',
      width: 120,
      dataIndex: 'shelf_time',
      key: 'shelf_time',
      search: false,
    },
    {
      title: '刊登方式',
      width: 120,
      dataIndex: 'published_way',
      key: 'published_way',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '',
          },
          {
            label: '一口价',
            value: '1',
          },
          {
            label: '多属性',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: 'ebay-主要类别',
      width: 120,
      dataIndex: 'main_category',
      key: 'main_category',
      hideInTable: true,
    },
    {
      title: 'ebay-第二类别',
      width: 120,
      dataIndex: 'second_category',
      key: 'second_category',
      hideInTable: true,
    },
    {
      title: '产品包裹重(kg)',
      width: 120,
      dataIndex: 'package_weight',
      key: 'package_weight',
      search: false,
    },
    {
      title: '账号',
      width: 120,
      dataIndex: 'account',
      key: 'account',
      search: false,
    },
    {
      title: '处理时间',
      width: 120,
      dataIndex: 'handle_time',
      key: 'handle_time',
      search: false,
    },
    {
      title: '处理时间',
      width: 120,
      dataIndex: 'handle_time',
      key: 'handle_time',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: value => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: 'Rate Table',
      width: 120,
      dataIndex: 'rate_table',
      key: 'rate_table',
    },
    {
      title: '物品所在地',
      width: 120,
      dataIndex: 'goods_location',
      key: 'goods_location',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '1',
          },
          {
            label: 'Melbourne',
            value: '1',
          },
          {
            label: 'Sydney',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '下架人',
      width: 120,
      dataIndex: 'shelves_person',
      key: 'shelves_person',
      search: false,
    },
    {
      title: '下架时间',
      width: 120,
      dataIndex: 'shelves_time',
      key: 'shelves_time',
      search: false,
    },
    // {
    //   title: '下架时间',
    //   width: 120,
    //   dataIndex: 'shelves_time',
    //   key: 'shelves_time',
    //   valueType: 'dateRange',
    //   hideInTable: true,
    //   search: {
    //     transform: value => {
    //       return {
    //         startTime: value[0],
    //         endTime: value[1],
    //       };
    //     },
    //   },
    // },
    {
      title: '操作',
      width: 200,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row, index, action) => [
        <Link to="/" key="1">
          查看
        </Link>,
        <Link to="/" key="2">
          编辑
        </Link>,
        <Link to="/" key="3">
          编辑广告
        </Link>,
      ],
    },
  ];
  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}>
      <ProTable<TableListItem, TableListPagination>
        sticky
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={getEbayPublishList}
        scroll={{ x: 1300 }}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activekey,
            items: [
              {
                key: '1',
                label: <span>已上架</span>,
              },
              {
                key: '2',
                label: <span>待上架</span>,
              },
              {
                key: '3',
                label: <span>已下架</span>,
              },
              {
                key: '4',
                label: <span>7天未售出</span>,
              },
              {
                key: '5',
                label: <span>15天未售出</span>,
              },
            ],
            onChange: key => {
              if (key === '1') {
                history.push('/shelf/ebay/publish-list/index');
              } else if (key === '2') {
                history.push('/shelf/ebay/publish-list/stay-on');
              } else if (key === '4') {
                history.push(`/shelf/ebay/publish-list/index?shelf=4`);
              } else if (key === '5') {
                history.push(`/shelf/ebay/publish-list/index?shelf=5`);
              }
            },
          },
        }}
        toolBarRender={() => [
          <TableToolBar
            options={{ download: false, mark: true }}
            columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))}
          />,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        columns={columns}
        options={{
          fullScreen: true,
          reload: true,
          setting: true,
          density: true,
        }}
      />
      {selectedRows?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}>
                {selectedRows.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }>
          <Radio.Group
            onChange={(e: any) => {
              setRadioBtnValue(e.target.value);
            }}
            value={radioBtnValue}>
            <Radio.Button value="1">批量修改</Radio.Button>
            <Radio.Button value="2">下架</Radio.Button>
            <Radio.Button value="3">复制到产品</Radio.Button>
            <Radio.Button value="4">添加折扣</Radio.Button>
            <Radio.Button value="5">添加Markdown折扣</Radio.Button>
            <Radio.Button value="6">删除折扣</Radio.Button>
            <Radio.Button value="7">删除Markdown折扣</Radio.Button>
            <Radio.Button value="8">批量广告</Radio.Button>
            <Radio.Button value="9">rateTable</Radio.Button>
            <Radio.Button value="10">拉取listing</Radio.Button>
            <Radio.Button value="11">清空消息</Radio.Button>
            <Radio.Button value="12">取消补货</Radio.Button>
            <Radio.Button value="13">同步数据</Radio.Button>
            <Radio.Button value="14">同步关键词</Radio.Button>
            <Radio.Button value="15">价格/数量</Radio.Button>
            <Radio.Button value="16">手动关注</Radio.Button>
          </Radio.Group>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default PublishList;
