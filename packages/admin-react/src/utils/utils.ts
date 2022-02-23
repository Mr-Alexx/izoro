import type { ReactNode } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import moment from 'moment';

/* eslint-disable */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

/**
 * @description ProForm 通用转化时间段搜索项方法
 * 例如：create_by => { create_by_start: xxx, create_by_end: xx }
 * @param {string[]} value timeRange结果
 * @param {string} field 作用字段
 */
export const transformTimeRange = (value: string[], field: string): Record<string, any> | string => {
  return {
    [`${field}_start`]: value?.[0],
    [`${field}_end`]: value?.[1],
  };
};

/**
 * @create 2021/08/23 15:21
 * @creator 潜
 * @description ProForm 通用转布尔值选择框选中值为数值型
 * @param {string} value
 * @param {string} field 作用字段
 * @return {Record<string, string>}
 */
export const transformString2Number = (value: string, field: string): Record<string, any> | string => {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  return {
    [field]: Number(value),
  };
};

/**
 * @create 2021/08/23 15:30
 * @creator 潜
 * @description ProForm 通用数值型选择框选中值为字符串型
 * @param {string} value
 * @param {string} field 作用字段
 * @return {Record<string, string>}
 */
export const transformNumber2String = (value: string, field: string): Record<string, any> | string => {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  return {
    [field]: `${value}`,
  };
};

/**
 * @create 2021/08/23 15:41
 * @creator 潜
 * @description ProForm 通用转化多选选择数组为逗号隔开拼接的字符串
 * @param {string} value
 * @param {string} field 作用字段
 * @return {string}
 */
export const transformArray2String = (value: (string | number)[], field: string): Record<string, any> | string => {
  if (!value) {
    return '';
  }
  return {
    [field]: value?.join?.(','),
  };
};

/**
 * @create 2021/12/23
 * @creator 潜
 * @description ProForm 通用转化多选选择数组为数值型数组
 * @param {string} value
 * @param {string} field 作用字段
 * @return {string}
 */
export const transformStringArray2NumberArray = (
  value: (string | number)[],
  field: string,
): Record<string, any> | string => {
  if (!value) {
    return '';
  }
  return {
    [field]: value?.map(v => Number(v)),
  };
};

/**
 * @create 2021/12/23
 * @creator 潜
 * @description ProForm 通用转化input输入框的值，多个输入项用空格/逗号隔开的，都转化为用逗号隔开
 * @param {string} value
 * @param {string} field 作用字段
 * @return {string}
 */
export const transformInputString = (value: string, field: string): Record<string, any> | string => {
  if (!value) {
    return '';
  }
  return {
    [field]: value?.replace(/\s+|\,+|\，+/gi, ','),
  };
};

/**
 * @create 2021/08/26 10:19
 * @creator 潜
 * @description 延时方法
 * @param {value} second 秒
 * @return {Promise}
 */
export const waitTime = (second: number = 1500): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), second);
  });
};

/**
 * @create 2021/08/26 13:47
 * @creator 潜
 * @description ProTableColumn 时间段搜索时列显示为时间（默认会拆分成范围）
 */
export const timeRangeColRender = (dom: ReactNode): ReactNode | null => {
  // @ts-ignore
  const { props } = dom;
  return props.text || props.emptyText;
};

/**
 * @create 2021/08/26 17:53
 * @creator 潜
 * @description ProTableColumn 时间段搜索列通用构造方法
 * @param {string} title 列头名称
 * @param {string} dataIndex 关联字段
 * @param {object} query
 * @return {object}
 */
export const getSearchDateRangeColumn = (title: string, dataIndex: string, query: Record<string, any>): ProColumns => {
  return {
    title,
    dataIndex,
    key: dataIndex,
    width: 140,
    align: 'center',
    valueType: 'dateRange',
    search: {
      transform: transformTimeRange,
    },
    // 初始化值，将查询url的值映射到选择框
    initialValue: [query?.[`${dataIndex}_start`], query?.[`${dataIndex}_end`]],
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
    render: timeRangeColRender,
  };
};

/**
 * @description 将树形结构数据格式化为antd树形组件的数据格式
 * @param {Array} treeData
 * @return {Array}
 */
export const formatTreeData = (treeData: any) => {
  if (!Array.isArray(treeData) || treeData.length === 0) {
    return treeData;
  }
  return treeData.map(item => {
    const obj = {
      value: item.id,
      label: item.name,
      children: null,
    };
    if (item.children) {
      /* eslint-disable-next-line */
      obj.children = formatTreeData(item.children);
    }
    return obj;
  });
};

/**
 * @description 将对象数组格式化为[{value: xx, label: xx}]的形式
 * @param { Array } data 源数据
 * @param { Object } options { value: 'id', label: 'name' } 格式配置，定义value和label取的键
 * @return { Array } [{ value: xx, label: xxx }]
 */
export const formatSelectOptions = (
  data: Record<string, any>[] | undefined | any[],
  options: { value: string; label: string; value2String?: boolean } = { value: 'id', label: 'name' },
): { value: string; label: string }[] => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(item => {
    const newItem = {
      value: options.value2String ? `${item[options?.value]}` : item[options?.value],
      label: item[options?.label],
    };
    if (item.children) {
      // @ts-ignore
      newItem.children = formatSelectOptions(item.children, options);
    }
    return newItem;
  });
};

/**
 * @description 格式化mapObj，将value都转化为string类型
 * @param {Record<string, any>} data
 * @return {Record<string, any>}
 */
export const formatMapObj = (data: any) => {
  if (!data) {
    return null;
  }
  // 由于antd select区分数值型和字符型
  // 如果option的值为数值，而默认值是字符型（url上取出来的默认值）
  // 那么select就无法识别到对应的option
  // 所以需要将其格式化为[{value: string, label: string}]的模式
  Object.keys(data).forEach(key => {
    if (data[key]) {
      data[key] = formatSelectOptions(data[key], { value: 'value', label: 'label', value2String: true });
    }
  });
  return data;
};

/**
 * @description 在对象数组内取某个字段，重命名该字段，默认格式化为[{value: xx, label: xx}]形式
 * @param { Array } data 源数据
 * @param { Object } options { value: 'id', label: 'name' } 格式配置，定义取的字段和重命名
 * @return { Array } [{ value: xx, label: xxx }]
 * @example
 * 在 const test = [{ a: 1, b: 2 }, { a: 2, b: 3 }]内取出a字段值重命名为dd，取出b字段的值重命名为ff
 * getMapOptions(test, { dd: 'a', ff: 'b' })
 * 结果为：[{ dd: 1, ff: 2 }, { dd: 2, ff: 3 }]
 */
export const getMapOptionsAndRename = (
  data: Record<string, any>[] | undefined | null | any[],
  options: Record<string, string> = { value: 'id', label: 'name', children: 'children' },
): Record<string, any>[] | APP.Options | APP.TreeSelectOptions => {
  if (!data || !Array.isArray(data)) {
    return [];
  }
  const keys = Object.keys(options);
  let tempObj: any;
  return data.map(item => {
    tempObj = {};
    keys.forEach(key => {
      // 树形构造
      if (key === 'children' && item[options[key]]) {
        tempObj[key] = getMapOptionsAndRename(item[options[key]], options);
      } else {
        tempObj[key] = item[options[key]];
      }
    });
    return tempObj;
  });
};

/**
 * @description 建议uuid生成器函数
 * @return {string}
 */
export const getUuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * @description 获取column 自定渲染配置
 * @return {Object}
 */
export const getRenderConfig = (key: string) => {
  return {
    renderText: (_: any, row: any) => row[key] || '-',
    shouldCellUpdate: () => false,
  };
};
/**
 * @description 将对象数组格式化为[{title: xx, value: xx,key:xx,children:[{
 * value:xx,label:xx}]}]的形式
 * @param { Array } data 源数据
 * @return { Array } [{title: xx, value: xx,key:xx,children:[{
 * value:xx,label:xx}]}]
 */
export const formatTreeSelectOptions = (data: Record<string, any>[] | undefined | any[]) => {
  if (!data) return [];
  const tempArr = [];
  const afterData = [];
  for (let i = 0; i < data.length; i++) {
    if (tempArr.indexOf(data[i].platformId) === -1) {
      afterData.push({
        title: data[i].platform,
        children: [
          {
            value: data[i].id,
            label: data[i].name,
          },
        ],
        key: data[i].platformId,
        value: data[i].platformId,
      });
      tempArr.push(data[i].platformId);
    } else {
      for (let j = 0; j < afterData.length; j++) {
        if (afterData[j].value === data[i].platformId) {
          afterData[j].children.push({
            value: data[i].id,
            label: data[i].name,
          });
          break;
        }
      }
    }
  }
  // console.log(afterData, '结果');
  return afterData;
};
