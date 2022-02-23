import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Table,
  Card,
  Row,
  Col,
  Modal,
  message,
  InputNumber,
  Divider,
  Image,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { memo } from 'react';
// import cartesian from "../../utils/cartesian";
import _ from 'lodash';
import { getAttrList } from '@/services/product';
// import { uuid } from "../../utils";

import { DeleteOutlined, PlusOutlined, PictureOutlined } from '@ant-design/icons';
import styles from './index.less';
import SingleImageUpload from '@/components/OSS/SingleImageUpload';
import UploadPicture from '../OSS/UploadPicture';

const { Option } = Select;

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// @ts-nocheck
const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian: any = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

const getBase64 = (img: Blob | undefined, callback: (result: any) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

// 去重
const unique = (arr: any) => {
  const obj = {};
  let res = [];
  res = arr.reduce((preValue: any, item: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    obj[item.name] ? '' : (obj[item.name] = true && preValue.push(item));
    // console.log(obj, 'obj2');
    return preValue;
  }, []);
  return res;
};

const unique2 = (arr: any) => {
  const arr1 = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr1.indexOf(arr[i]) === -1) {
      arr1.push(arr[i]);
    } else if (arr[i].length > 0) {
      message.error('与其他规格名称重复，请修改');
    }
  }
  return arr1;
};

export interface SkuItem {
  key?: string;
  skuId?: string;
  properties?: { name: string; value: string }[];

  /** 价格 */
  //   price?: number;
  //   sku
  sale_price?: number; // 售价
  original_price?: number; // 原价
  market_price?: number; // 市场价
  supply_price_in_tax?: number; // 供应价格（含税）
  supply_price_out_tax?: number; // 市场价
  sku?: string; // sku
  pic?: string; // sku主图
  viewImg?: string;
  /** 库存 采购数量 */
  // hold?: number;
  remark?: string;
  id?: number;
}

interface Props {
  skus: SkuItem[];
  attributeOptions: any[];
  pics: any[];
  onChange?: (skus: any) => void;
  // showPrice?: boolean;
  customCol?: {
    original_price?: boolean;
    sale_price?: boolean;
    market_price?: boolean;
    supply_price_in_tax?: boolean;
    supply_price_in_tax_disabled?: boolean;
    supply_price_out_tax?: boolean;
  };
  currency?: string;
  disabled?: boolean;
}

interface TotalPropertyValues {
  name: string;
  key: string;
  values?: string[];
  title?: string;
  id?: number;
  original_price?: number;
  sale_price?: number;
  market_price?: number;
  supply_price_in_tax?: number;
  supply_price_out_tax?: number;
}

const ProFormSku: FC<Props> = props => {
  const { skus, attributeOptions, pics, onChange, customCol = {}, currency = '', disabled = false } = props;

  const defaultProperties: TotalPropertyValues[] = [];
  // console.log(pics);
  // 计算默认展示的价格或者库存
  // let defaultPrice;
  // let defaultHold;
  console.log(skus);
  skus?.forEach(sku => {
    sku.properties?.forEach((prop, i) => {
      if (prop.name && prop.value) {
        const currentProp = defaultProperties.find(p => p.name === prop.name);
        // console.log(currentProp);
        console.log('currentProp', currentProp);
        if (currentProp) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          !currentProp.values?.includes(prop.value) && currentProp.values?.push(prop.value);
          // console.log(currentProp);
        } else {
          defaultProperties.push({
            name: prop.name,
            key: uuid(),
            values: [prop.value],
            id: sku?.id,
            original_price: sku?.original_price,
            sale_price: sku?.sale_price,
            market_price: sku?.market_price,
            supply_price_in_tax: sku?.supply_price_in_tax,
            supply_price_out_tax: sku?.supply_price_out_tax,
          });
        }
      }
    });
    // if (skus.length === 1) {
    //   defaultPrice = sku.price;
    //   defaultHold = sku.hold;
    // }
  });

  console.log('df', defaultProperties);

  // console.log(defaultProperties);
  defaultProperties?.forEach(item => {
    item?.values?.push('');
  });

  // 检查是否禁用
  // eslint-disable-next-line func-names
  // 是否禁用iuput
  const checkDisabled = (name: string, value: string) => {
    return defaultProperties.some((item: any) => {
      return item.name === name && item?.values && item.values?.length > 0 && item.values.indexOf(value) > -1;
    });
  };
  // 是否禁用删除规格按钮
  const checkDisabledDelete = (name: string) => {
    return defaultProperties.some((item: any) => {
      return item.name === name;
    });
  };

  const [totalProperties, setTotalProperties] = useState(defaultProperties);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [columns, setColumns] = useState<ColumnsType<SkuItem>>([]);
  const [rows, setRows] = useState<SkuItem[]>(skus ?? []);
  const [currentValue, setCurrentValue] = useState<string>(''); // 当前点击的属性值

  // 批量设置
  const [multipleEdit, setMultipleEdit] = useState<
    {
      name: string;
      values: string[];
      key: string;
      currentVal: string;
      id: string;
    }[]
  >([]);

  // const [attributeOptions, setAttributeOptions] = useState<string[]>(['颜色', '型号', '尺寸']);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // useEffect(() => {
  //   getAttrList({ page: 1, page_num: 500, language_id: 1 })
  //     .then(res => {
  //       setAttributeOptions(res.data);

  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }, []);

  const findAttrName = (val: string) => {
    let name: string = '';
    attributeOptions.forEach(item => {
      if (item.id === Number(val)) {
        name = item.name;
      }
    });
    return name;
  };

  const [addAttribute, setaddAttribute] = useState<string>('');

  const addItem = () => {
    // setAttributeOptions([...attributeOptions, addAttribute]);
    setaddAttribute('');
  };

  const [editValues, setEditValues] = useState<{
    // hold: number | undefined;
    sku: string;
    remark: string;
    original_price: number | undefined;
    sale_price: number | undefined;
    market_price: number | undefined;
    supply_price_in_tax: number | undefined;
    supply_price_out_tax: number | undefined;
  }>({
    // hold: undefined,
    sku: '',
    remark: '',
    original_price: undefined,
    sale_price: undefined,
    market_price: undefined,
    supply_price_in_tax: undefined,
    supply_price_out_tax: undefined,
  });

  const changeMultipleEdit = (index: number, id: string, values: string[]) => {
    const arr = multipleEdit;
    arr[index].currentVal = id;
    // arr[index].values = values;
    setMultipleEdit([...arr]);
  };

  // 商品规格操作相关
  const property = {
    add() {
      setTotalProperties(prev => [
        ...prev,
        {
          name: '',
          title: '',
          key: uuid(),
          values: [''],
        },
      ]);
    },
    remove(i: number) {
      setTotalProperties(prev => {
        const ret = JSON.parse(JSON.stringify(prev));
        ret.splice(i, 1);
        return ret;
      });
    },
    onChangeName(i: number, name: string) {
      // setTotalProperties(prev => {
      //   console.log('==============');
      //   console.log(prev);
      //   const ret = [...prev];
      //   ret[i].name = name;

      //   return ret;
      // });
      // 属性去重
      setTotalProperties(prev => {
        const ret = [...prev];
        ret[i].name = name;
        ret[i].title = findAttrName(name);
        return unique([...ret]);
      });
    },
    onChangeValues(i: number, values: string[]) {
      setTotalProperties(prev => {
        const ret = [...prev];
        ret[i].values = values;
        return ret;
      });
    },
  };

  const sku = {
    // 售价
    onChangeSalePrice(r: SkuItem, price: number) {
      setRows(prev => {
        r.sale_price = price as any;
        const ret = JSON.parse(JSON.stringify(prev));
        return ret;
      });
    },
    // 原价
    onChangeOriginalPrice(r: SkuItem, price: number) {
      setRows(prev => {
        r.original_price = price as any;
        const ret = JSON.parse(JSON.stringify(prev));
        return ret;
      });
    },
    // 市场价
    onChangeMarketPrice(r: SkuItem, price: number) {
      setRows(prev => {
        r.market_price = price as any;
        const ret = JSON.parse(JSON.stringify(prev));
        return ret;
      });
    },
    // 供应含税价
    onChangeSupplyPriceInTax(r: SkuItem, price: number) {
      setRows(prev => {
        r.supply_price_in_tax = price as any;
        const ret = JSON.parse(JSON.stringify(prev));
        return ret;
      });
    },
    // 供应不含税价
    onChangeSupplyPriceOutTax(r: SkuItem, price: number) {
      setRows(prev => {
        r.supply_price_out_tax = price as any;
        const ret = JSON.parse(JSON.stringify(prev));
        return ret;
      });
    },
    onChangeSku(r: SkuItem, skuVal: string) {
      setRows(prev => {
        r.sku = skuVal;
        const ret = JSON.parse(JSON.stringify(prev));
        return ret;
      });
    },

    onChangeSkuPic(r: SkuItem, pic: string) {
      setRows(prev => {
        r.pic = pic;
        const ret = JSON.parse(JSON.stringify(prev));
        return ret;
      });
    },

    // onChangeHold(r: SkuItem, hold: string) {
    //   setRows(prev => {
    //     r.hold = Number(hold);
    //     const ret = JSON.parse(JSON.stringify(prev));
    //     return ret;
    //   });
    // },

    onChangeRemark(r: SkuItem, remark: string) {
      setRows(prev => {
        r.remark = remark;
        const ret = JSON.parse(JSON.stringify(prev));
        return ret;
      });
    },
  };

  // 当商品规格发生改变时候改变数据
  useEffect(() => {
    let _isShowDetail = false;
    const _columns: ColumnsType<SkuItem> = [];
    const _rows: SkuItem[] = [];

    const properties: { name: string; value: string }[][] = [];

    // 遍历规格数组，
    totalProperties.forEach(prop => {
      if (prop.name && prop.values?.length) {
        const cartesianItem: any = [];
        _isShowDetail = true;

        // 每个规格单独添加为表格中的一列
        _columns.push({
          title: findAttrName(prop.name),
          name: prop.name,
          width: 200,
          dataIndex: 'properties',
          key: 'properties',
        });

        // 对于每个规格的属性处理
        prop.values.forEach(value => {
          if (value.length > 0) {
            cartesianItem.push({
              name: prop.name,
              value,
            });
          }
        });
        // 所有属性按照规格添加的顺序保存到二维数组中
        // ex: [[{name: '颜色', value: '黑色'}, {name: '颜色', value: '蓝色'}], [{name: '尺码', value: 'sm'}, {name: '尺码', value: 'xl'}]] 第一规格为颜色，第二规格为尺码
        properties.push(cartesianItem);
      }
    });
    // console.log(totalProperties, _columns, properties);

    // 使用笛卡尔乘积并根据属性计算所有可能的sku

    const cartesianProperties = cartesian(...properties);

    cartesianProperties?.forEach((e: any, i: any) => {
      _rows.push({
        key: i,
        skuId: uuid(),
        properties: Array.isArray(e) ? e : [e],
      });
    });
    //
    const colSpanArray: any = {};
    const rowCount: any = [];
    _rows.forEach((r, rindex) => {
      r.properties?.forEach((p, pindex) => {
        if (!colSpanArray[p.name]) {
          colSpanArray[p.name] = [];
        }
        if (rowCount[pindex] !== p.value) {
          colSpanArray[p.name].push(rindex - 1);
          rowCount[pindex] = p.value;
          if (rindex + 1 === _rows.length) {
            colSpanArray[p.name].push(rindex);
          }
        } else if (rindex + 1 === _rows.length) {
          colSpanArray[p.name].push(rindex);
        }
      });
    });

    // 自定义规格在表格列的渲染方法
    // 只有第一规格才加上通用sku主图添加功能，添加后所有第一规格相同的行的sku主图都替换为该主图
    _columns.forEach((c, specIndex) => {
      c.render = (value, _, index) => {
        const item = value.find((v: any) => v.name === c.name);
        const obj: any = {
          children: item?.value,
          props: {},
        };
        obj.props.rowSpan = 0;
        colSpanArray[c.name as string]?.forEach((i, cindex) => {
          // 第一个规格才加上sku主图添加功能
          if (specIndex === 0) {
            // 主图添加功能
            obj.children = (
              <div>
                <span>{item?.value}</span>
                {pics?.length > 0 && (
                  <Button
                    type="link"
                    onClick={() => {
                      setIsModalVisible(true);
                      setCurrentValue(item.value);
                    }}
                    icon={<PictureOutlined />}></Button>
                )}
                {/* <UploadPicture  onChange={(url: any) => sku.onChangeSkuPic(row, url)}/> */}

                {(!pics || pics.length < 1) && (
                  <UploadPicture
                    onChange={(url: any) => {
                      const rowsArr = [..._rows];

                      rowsArr.forEach(row1 => {
                        row1.properties?.forEach(propertyItem => {
                          if (propertyItem.value === item.value) {
                            row1.pic = url;
                          }
                        });
                      });

                      setRows([...rowsArr]);
                    }}
                  />
                )}
              </div>
            );
          }
          const prev = colSpanArray[c.name as string][cindex - 1];
          if (index === (prev === undefined ? 0 : prev + 1)) {
            obj.props.rowSpan = prev === undefined ? i + 1 : i - prev;
          }
        });
        return obj;
      };
    });
    // 添加额外的栏

    _columns.push({
      title: 'SKU',
      width: 200,
      dataIndex: 'sku',
      key: 'sku',

      render: (value, row, index) => {
        return (
          <Input
            value={value}
            required
            disabled
            placeholder="SKU由系统自动生成"
            onChange={e => sku.onChangeSku(row, e.target.value)}
          />
        );
      },
    });
    // sku图
    _columns.push({
      title: 'SKU图',
      width: 90,
      dataIndex: 'pic',
      key: 'pic',
      align: 'center',
      render: (value, row, index) => {
        // return <Input value={value} required onChange={e => sku.onChangeSku(row, e.target.value)} />;
        return (
          <div style={{ display: 'inline-block' }}>
            <SingleImageUpload
              width={80}
              height={80}
              initialValue={row?.pic}
              onChange={(url: any) => sku.onChangeSkuPic(row, url)}
              showText={false}
            />
          </div>
        );
      },
    });

    // _columns.push({
    //   title: '采购数量',
    //   width: 200,
    //   dataIndex: 'hold',
    //   key: 'hold',
    //   render: (value, row, index) => {
    //     return <Input value={value} required onChange={e => sku.onChangeHold(row, e.target.value)} />;
    //   },
    // });
    if (customCol.sale_price) {
      _columns.push({
        title: `销售价（${currency}）`,
        dataIndex: 'sale_price',
        key: 'sale_price',
        width: 200,
        render: (value, row, index) => {
          return <Input value={value} required onChange={e => sku.onChangeSalePrice(row, Number(e.target.value))} />;
        },
      });
    }
    if (customCol.original_price) {
      _columns.push({
        title: `原价（${currency}）`,
        dataIndex: 'original_price',
        key: 'original_price',
        width: 200,
        render: (value, row, index) => {
          return (
            <Input value={value} required onChange={e => sku.onChangeOriginalPrice(row, Number(e.target.value))} />
          );
        },
      });
    }

    if (customCol.market_price) {
      _columns.push({
        title: `市场价（${currency}）`,
        dataIndex: 'market_price',
        key: 'market_price',
        width: 200,
        render: (value, row, index) => {
          return <Input value={value} required onChange={e => sku.onChangeMarketPrice(row, Number(e.target.value))} />;
        },
      });
    }

    if (customCol.supply_price_in_tax) {
      _columns.push({
        title: `供应含税价（${currency}）`,
        dataIndex: 'supply_price_in_tax',
        key: 'supply_price_in_tax',
        width: 200,
        render: (value, row, index) => {
          return (
            <Input
              value={value}
              required
              disabled={customCol?.supply_price_in_tax_disabled}
              onChange={e => sku.onChangeSupplyPriceInTax(row, Number(e.target.value))}
            />
          );
        },
      });
    }

    if (customCol.supply_price_out_tax) {
      _columns.push({
        title: `供应含不税价（${currency}）`,
        dataIndex: 'supply_price_out_tax',
        key: 'supply_price_out_tax',
        width: 200,
        render: (value, row, index) => {
          return (
            <Input value={value} required onChange={e => sku.onChangeSupplyPriceOutTax(row, Number(e.target.value))} />
          );
        },
      });
    }

    _columns.push({
      title: '备注',
      width: 200,
      dataIndex: 'remark',
      key: 'remark',
      render: (value, row, index) => {
        return <Input value={value} required onChange={e => sku.onChangeRemark(row, e.target.value)} />;
      },
    });

    _columns.push({
      title: '条数',
      width: 60,
      align: 'center',
      render: (value, row, index) => {
        return index + 1;
      },
    });

    setIsShowDetail(_isShowDetail);
    setColumns(_columns);
    // 当totalProperties 发生改变时候就要重置行元素
    if (!_.isEqual(totalProperties, defaultProperties)) {
      setRows(_rows);
    }
    const editArr: {
      values: string[];
      name: string;
      id: string;
      key: string;
      currentVal: string;
    }[] = [];

    totalProperties.forEach(item => {
      if (item.name && item.values) {
        if (item.values.length > 1) {
          editArr.push({
            values: item.values,
            name: findAttrName(item.name),
            key: item.key,
            currentVal: item.name,
            id: item.name,
          });
        }
      }
    });

    setMultipleEdit(editArr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalProperties, currency, pics]);

  // 调整属性顺序 暂时没用到
  // const onPressTop = (index: number) => {
  //   const topProperty = totalProperties[index];
  //   _.pullAt(totalProperties, index);
  //   totalProperties.unshift(topProperty);
  //   setTotalProperties([...totalProperties]);
  // };

  const formatProperty = (array: any[] | undefined) => {
    if (array === undefined) {
      return [];
    }
    const arr: any[] = [];
    array.forEach(item => {
      arr.push({
        attr_id: item.name,
        attr_name: findAttrName(item.name),
        value: item.value,
      });
    });
    return arr;
  };
  useEffect(() => {
    const arr: any = []; // 用于存放扁平化后的数组
    let keyArr: any = [];
    const allKeys: any = [];
    const productAttr: any = [];
    rows.forEach((item, i) => {
      item.properties?.forEach(attr => {
        arr.push(attr);
        allKeys.push(attr.name);
      });
    });
    keyArr = new Set(allKeys);
    keyArr.forEach((k, kIndex) => {
      const obj = { attr_id: 0, attr_values: [] };
      obj.attr_id = k;
      productAttr.push(obj);
    });
    productAttr.forEach((p, pIndex) => {
      arr.forEach(a => {
        if (p.attr_id === a.name) {
          if (p.attr_values.indexOf(a.value) < 0) {
            p.attr_values.push(a.value);
          }
        }
      });
    });
    // console.log(productAttr); // 最终的产品属性
    // console.log(rows);
    const formatRows: any[] = [];
    rows.forEach(item => {
      formatRows.push({
        attribute: formatProperty(item.properties),
        pic: item?.pic,
        remark: item?.remark,
        // hold: item?.hold,
        original_price: Number(item?.original_price),
        sale_price: Number(item?.sale_price),
        id: item?.id,
        market_price: Number(item?.market_price),
        supply_price_in_tax: Number(item?.supply_price_in_tax),
        supply_price_out_tax: Number(item?.supply_price_out_tax),
      });
    });
    // onChange?.(rows);
    // onChange?.(formatRows);
    onChange?.({
      product_info: formatRows,
      product_attr: productAttr,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  return (
    <>
      <Row gutter={16} className={styles.specific}>
        <Col lg={24} md={24}>
          <Form.Item
            label="商品规格"
            required
            // name="product_attr"
            // rules={[
            //   {
            //     required: true,
            //     message: '商品规格不能为空!',
            //   },
            // ]}
            labelCol={{
              md: { span: 24 },
              lg: { span: 3 },
            }}>
            {/* <Space direction="vertical"> */}
            <>
              {totalProperties?.map((prop, i) => {
                return (
                  <Card
                    key={prop.key}
                    style={{ marginBottom: 10 }}
                    bordered={false}
                    title={
                      <Select
                        style={{ width: 240 }}
                        placeholder={`规格${i + 1}`}
                        value={Number(prop.name) || ''}
                        disabled={disabled ? checkDisabledDelete(prop.name) : false}
                        showSearch
                        allowClear
                        filterOption={(input, option) => {
                          // console.log(option);
                          // console.log(input);
                          return option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }}
                        optionFilterProp="children"
                        onChange={v => property.onChangeName(i, v)}
                        dropdownRender={menu => (
                          <div>
                            {menu}
                            <Divider style={{ margin: '4px 0' }} />
                            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                              <Input
                                style={{ flex: 'auto' }}
                                value={addAttribute}
                                onChange={(e: any) => {
                                  setaddAttribute(e.target.value);
                                }}
                              />
                              <a
                                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                onClick={addItem}>
                                <PlusOutlined /> Add item
                              </a>
                            </div>
                          </div>
                        )}>
                        {attributeOptions.map(item => (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    }
                    extra={
                      <Button
                        type="link"
                        disabled={disabled ? checkDisabledDelete(prop.name) : false}
                        onClick={() => property.remove(i)}>
                        删除规格
                      </Button>
                    }>
                    <Space wrap>
                      {prop.name &&
                        prop?.values &&
                        prop.values.map((inputItem, inputi) => {
                          return (
                            <Input
                              key={inputItem}
                              style={{ width: 200 }}
                              className={
                                disabled
                                  ? inputItem.length > 0
                                    ? checkDisabled(prop.name, inputItem)
                                      ? styles.disabled
                                      : ''
                                    : ''
                                  : ''
                              }
                              disabled={
                                disabled ? (inputItem.length > 0 ? checkDisabled(prop.name, inputItem) : false) : false
                              }
                              defaultValue={inputItem}
                              placeholder="请输入规格值"
                              onChange={(e: any) => {
                                const arr = prop.values;
                                if (arr) {
                                  if (inputi === arr.length - 1) {
                                    arr[inputi + 1] = '';
                                  }
                                  // 去重
                                  // const newArr = unique2(arr);
                                  // console.log('newArr');
                                  // console.log(newArr);
                                  property.onChangeValues(i, arr);
                                }
                              }}
                              onBlur={(e: any) => {
                                const arr = prop.values;

                                if (arr) {
                                  if (!e.target.value || e.target.value === '') {
                                    arr?.splice(inputi, 1);
                                  } else {
                                    arr[inputi] = e.target.value;
                                  }
                                  // 解决当某个规格在最后一个input框没有输入任何值的时候会自动删除的问题
                                  if (arr.length < 1 || arr[arr.length - 1] !== '') {
                                    arr.push('');
                                  }
                                  // 去重
                                  // const newArr = unique2(arr);
                                  const newArr = [];
                                  for (let g = 0, len = arr.length; g < len; g++) {
                                    if (newArr.indexOf(arr[g]) === -1) {
                                      newArr.push(arr[g]);
                                    } else if (arr[g].length > 0) {
                                      message.error('与其他规格名称重复，请修改');
                                    }
                                  }

                                  property.onChangeValues(i, [...newArr]);
                                }
                              }}
                              addonAfter={
                                inputItem ? (
                                  <DeleteOutlined
                                    onClick={() => {
                                      const arr = prop?.values;
                                      if (arr) {
                                        arr?.splice(inputi, 1);
                                        property.onChangeValues(i, arr);
                                      }
                                    }}
                                  />
                                ) : (
                                  false
                                )
                              }
                            />
                          );
                        })}

                      {/* {
                              prop.name&&<Input style={{ width: 200 }}
                              onChange={(e: any) => {
                                if(prop.values){
                                  property.onChangeValues(i, [...prop?.values,e.target.value])
                                }else{
                                  property.onChangeValues(i, [e.target.value])
                                }
                                
                              }}
                            />
                            } */}
                    </Space>
                  </Card>
                );
              })}

              {totalProperties.length < 10 && (
                <Button type="dashed" onClick={property.add}>
                  添加规格
                </Button>
              )}
            </>
          </Form.Item>
        </Col>
        {isShowDetail ? (
          <Col lg={24} md={24}>
            <Form.Item
              label="SKU信息"
              required
              // name="product_info"
              // rules={[
              //   {
              //     required: true,
              //     message: 'SKU信息不能为空!',
              //   },
              // ]}
              wrapperCol={{
                md: { span: 24 },
                lg: { span: 21 },
              }}
              labelCol={{
                md: { span: 24 },
                lg: { span: 3 },
              }}>
              <Space wrap style={{ marginBottom: 10 }}>
                {multipleEdit?.map((prop, i) => {
                  return (
                    <Select
                      key={multipleEdit[i].key}
                      defaultValue={prop.currentVal}
                      value={prop.currentVal}
                      onChange={v => changeMultipleEdit(i, v, multipleEdit[i].values)}
                      style={{ width: 120 }}>
                      <Option key={`${multipleEdit[i].key}`} value={multipleEdit[i].id}>
                        {multipleEdit[i].name}
                      </Option>
                      {multipleEdit[i].values
                        ?.filter(ele => ele.length > 0)
                        .map((option, optionIndex) => {
                          return (
                            // eslint-disable-next-line react/no-array-index-key
                            <Option key={`${multipleEdit[i].key}${optionIndex}`} value={option}>
                              {option}
                            </Option>
                          );
                        })}
                    </Select>
                  );
                })}
                {/* <Input
                  placeholder="SKU"
                  
                  value={editValues.sku}
                  onChange={(e: any) => {
                    setEditValues({
                      ...editValues,
                      sku: e.target.value,
                    });
                  }}
                  style={{ width: 120 }}
                /> */}
                {/* <InputNumber
                    min={0}
                    style={{ width: 120 }}
                    onBlur={(e: any) => {
                      setEditValues({
                        ...editValues,
                        hold: e.target.value,
                      });
                    }}
                    value={editValues.hold}
                    placeholder="采购数量"
                  /> */}
                {customCol.sale_price && (
                  <InputNumber
                    min={0}
                    style={{ width: 120 }}
                    onBlur={(e: any) => {
                      setEditValues({
                        ...editValues,
                        sale_price: e.target.value,
                      });
                    }}
                    value={editValues.sale_price}
                    placeholder="销售价"
                  />
                )}
                {customCol.original_price && (
                  <InputNumber
                    min={0}
                    style={{ width: 120 }}
                    onBlur={(e: any) => {
                      setEditValues({
                        ...editValues,
                        original_price: e.target.value,
                      });
                    }}
                    value={editValues.original_price}
                    placeholder="原价"
                  />
                )}
                {customCol.market_price && (
                  <InputNumber
                    min={0}
                    style={{ width: 120 }}
                    onBlur={(e: any) => {
                      setEditValues({
                        ...editValues,
                        market_price: e.target.value,
                      });
                    }}
                    value={editValues.market_price}
                    placeholder="市场价"
                  />
                )}
                {customCol.supply_price_in_tax && !customCol.supply_price_in_tax_disabled && (
                  <InputNumber
                    min={0}
                    style={{ width: 120 }}
                    onBlur={(e: any) => {
                      setEditValues({
                        ...editValues,
                        supply_price_in_tax: e.target.value,
                      });
                    }}
                    value={editValues.supply_price_in_tax}
                    placeholder="供应含税价"
                  />
                )}
                {customCol.supply_price_out_tax && (
                  <InputNumber
                    min={0}
                    style={{ width: 120 }}
                    onBlur={(e: any) => {
                      setEditValues({
                        ...editValues,
                        supply_price_out_tax: e.target.value,
                      });
                    }}
                    value={editValues.supply_price_out_tax}
                    placeholder="供应不含税价"
                  />
                )}
                <Input
                  placeholder="备注"
                  onChange={(e: any) => {
                    setEditValues({
                      ...editValues,
                      remark: e.target.value,
                    });
                  }}
                  value={editValues.remark}
                  style={{ width: 120 }}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    const rowsArr = [...rows];
                    // const arr = [];
                    for (let r = 0; r < rowsArr.length; r++) {
                      let isNeedDdit = true;
                      for (let m = 0; m < multipleEdit.length; m++) {
                        if (rows[r].properties) {
                          let pArr: any = [];
                          pArr = rows[r].properties;

                          if (
                            pArr[m].value !== multipleEdit[m].currentVal &&
                            pArr[m].name !== multipleEdit[m].currentVal
                          ) {
                            isNeedDdit = false;
                          }
                          // for (let p = 0; p < pArr?.length; p++) {
                          //   console.log(pArr[p]);
                          //   if ((pArr[p].name !== multipleEdit[m].name) && (pArr[p].value !== multipleEdit[m].name)) {
                          //     isNeedDdit = false;
                          //   }
                          // }
                        }
                      }
                      if (isNeedDdit) {
                        if (editValues.sku.length > 0) {
                          rowsArr[r].sku = editValues.sku;
                        }

                        // if (editValues.hold && editValues.hold > 0) {
                        //   rowsArr[r].hold = editValues.hold;
                        // }

                        if (editValues.original_price && editValues.original_price > 0) {
                          rowsArr[r].original_price = editValues.original_price;
                        }
                        if (editValues.sale_price && editValues.sale_price > 0) {
                          rowsArr[r].sale_price = editValues.sale_price;
                        }
                        if (editValues.market_price && editValues.market_price > 0) {
                          rowsArr[r].market_price = editValues.market_price;
                        }
                        if (editValues.supply_price_in_tax && editValues.supply_price_in_tax > 0) {
                          rowsArr[r].supply_price_in_tax = editValues.supply_price_in_tax;
                        }
                        if (editValues.supply_price_out_tax && editValues.supply_price_out_tax > 0) {
                          rowsArr[r].supply_price_out_tax = editValues.supply_price_out_tax;
                        }

                        if (editValues.remark.length > 0) {
                          rowsArr[r].remark = editValues.remark;
                        }
                      }
                    }
                    setRows(rowsArr);
                  }}>
                  批量设置
                </Button>
              </Space>
              <Table
                className={styles.customTable}
                pagination={false}
                size="small"
                scroll={{ x: 1300, y: 600 }}
                columns={columns}
                dataSource={rows}
                bordered
                // footer={() => 'Footer'}
              />
            </Form.Item>
          </Col>
        ) : null}
      </Row>
      <Modal
        title="选择图片"
        visible={isModalVisible}
        footer={null}
        onCancel={() => {
          setIsModalVisible(false);
        }}>
        <Space>
          {pics?.map(pic => {
            return (
              <Image
                key={pic.pic || pic}
                width={100}
                src={pic.pic || pic}
                onClick={() => {
                  console.log(pic);
                  const rowsArr = [...rows];
                  console.log(rowsArr);
                  rowsArr.forEach(row1 => {
                    row1.properties?.forEach(propertyItem => {
                      if (propertyItem.value === currentValue) {
                        row1.pic = pic.pic || pic;
                      }
                    });
                  });
                  setRows([...rowsArr]);
                  setCurrentValue('');
                  setIsModalVisible(false);
                }}
                preview={false}
                style={{ cursor: 'pointer' }}
              />
            );
          })}
        </Space>
      </Modal>
    </>
  );
};

export default ProFormSku;
