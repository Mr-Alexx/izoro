import { transformTimeRange } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-table';
import moment from 'moment';

/**
 * @description 常用静态变量
 */
export enum ACTIONS {
  view = 1,
  edit = 2,
  add = 3,
  del = 4,
}

export enum FORM_ACTIONS {
  unknow = 0,
  reset = 1,
  submit = 2,
  saveDraft = 3,
}

export enum OPERATION_TEXT {
  create_success = '新增成功',
  edit_success = '编辑成功',
  operation_success = '操作成功',
  create_err = '新增失败',
  edit_err = '编辑失败',
  operation_err = '操作失败',
}

// 菜单icon列表
export const MENU_ICON_LIST = [
  'icon-chengpinku',
  'icon-kefu',
  'icon-shouye',
  'icon-shangjia',
  'icon-chanpin',
  'icon-douyin',
  'icon-shezhi',
];

// 状态 enum
export const STATUS_ENUM = {
  0: {
    text: '禁用',
    status: 'Error',
  },
  1: {
    text: '正常',
    status: 'Processing',
  },
};
export const STATUS_OPTIONS = [
  { value: 0, label: '禁用' },
  { value: 1, label: '正常' },
];

// 是/否 enum
export const BOOLEAN_ENUM = {
  0: {
    text: '否',
  },
  1: {
    text: '是',
  },
};
// 是/否 options
export const BOOLEAN_OPTIONS = [
  { value: 0, label: '否' },
  { value: 1, label: '是' },
];

// ProColumns dateRange 列通用配置
export const DATE_RANGE_COLUMNS: ProColumns = {
  width: 140,
  align: 'center',
  valueType: 'dateRange',
  search: {
    transform: transformTimeRange,
  },
  fieldProps: {
    allowEmpty: [true, true], // 允许起始项部分为空
    ranges: {
      // 预设时间段
      今天: [moment(), moment()],
      昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      前天: [moment().subtract(2, 'days'), moment().subtract(2, 'days')],
      近3天: [moment().subtract(2, 'd'), moment()],
      近7天: [moment().subtract(6, 'd'), moment()],
      近14天: [moment().subtract(13, 'days'), moment()],
      近30天: [moment().subtract(29, 'days'), moment()],
      近60天: [moment().subtract(59, 'days'), moment()],
      近90天: [moment().subtract(89, 'days'), moment()],
      本周: [moment().startOf('week'), moment().endOf('week')],
      本月: [moment().startOf('month'), moment().endOf('month')],
      本季度: [moment().startOf('quarter'), moment().endOf('quarter')],
      本年: [moment().startOf('year'), moment().endOf('year')],
    },
  },
};

// 物流信息：液体、粉末等的radio options
export const LOGISTICS_OPTIONS: APP.Options = [
  {
    label: '未知',
    value: 2,
  },
  {
    label: '是',
    value: 1,
  },
  {
    label: '否',
    value: 0,
  },
];
