import { Button, Form, Input, Select, Space, Table, Card, Row, Col, Upload } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
// import cartesian from "../../utils/cartesian";
import _ from 'lodash';
// import { uuid } from "../../utils";

import { DeleteOutlined } from '@ant-design/icons';

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

export interface SkuItem {
  key?: string;
  skuId?: string;
  properties?: { name: string; value: string }[];

  /** 价格 */
  //   price?: number;
  //   sku
  sku?: string; // sku
  pic?: string; // sku主图
  viewImg?: string;
  /** 库存 采购数量 */
  hold?: number;
  remark?: string;
}

interface Props {
  skus: SkuItem[];
  onChange?: (skus: SkuItem[]) => void;
}

interface TotalPropertyValues {
  name: string;
  key: string;
  values?: string[];
}

const SkuCreator: FC<Props> = props => {
  const { skus, onChange } = props;
  const defaultProperties: TotalPropertyValues[] = [];

  // 计算默认展示的价格或者库存
  // let defaultPrice;
  // let defaultHold;

  skus?.forEach(sku => {
    sku.properties?.forEach((prop, i) => {
      if (prop.name && prop.value) {
        const currentProp = defaultProperties.find(p => p.name === prop.name);
        if (currentProp) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          !currentProp.values?.includes(prop.value) && currentProp.values?.push(prop.value);
        } else {
          defaultProperties.push({
            name: prop.name,
            key: uuid(),
            values: [prop.value],
          });
        }
      }
    });
    // if (skus.length === 1) {
    //   defaultPrice = sku.price;
    //   defaultHold = sku.hold;
    // }
  });

  const [totalProperties, setTotalProperties] = useState(defaultProperties);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [columns, setColumns] = useState<ColumnsType<SkuItem>>([]);
  const [rows, setRows] = useState<SkuItem[]>(skus ?? []);

  // 商品规格操作相关
  const property = {
    add() {
      setTotalProperties(prev => [
        ...prev,
        {
          name: '',
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
      setTotalProperties(prev => {
        console.log('==============');
        console.log(prev);
        const ret = [...prev];
        ret[i].name = name;

        return ret;
      });
    },
    onChangeValues(i: number, values: string[]) {
      console.log('==============values');
      console.log(values);
      setTotalProperties(prev => {
        console.log('==============onChangeValues');
        console.log(prev);
        const ret = [...prev];
        ret[i].values = values;
        return ret;
      });
    },
  };

  const sku = {
    // onChangePrice(r: SkuItem, price: string) {
    //   setRows(prev => {
    //     r.price = price as any;
    //     const ret = JSON.parse(JSON.stringify(prev));
    //     return ret;
    //   });
    // },

    onChangeSku(r: SkuItem, skuVal: string) {
      setRows(prev => {
        r.sku = skuVal;
        const ret = JSON.parse(JSON.stringify(prev));
        return ret;
      });
    },

    onChangeSkuPic(r: SkuItem, pic: string) {
      console.log(r, pic);
      setRows(prev => {
        r.pic = pic;
        const ret = JSON.parse(JSON.stringify(prev));
        return ret;
      });
    },

    onChangeHold(r: SkuItem, hold: string) {
      setRows(prev => {
        r.hold = Number(hold);
        const ret = JSON.parse(JSON.stringify(prev));
        return ret;
      });
    },

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
          title: prop.name,
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
        const item = value.find((v: any) => v.name === c.title);
        const obj: any = {
          children: item?.value,
          props: {},
        };
        obj.props.rowSpan = 0;
        colSpanArray[c.title as string]?.forEach((i, cindex) => {
          // 第一个规格才加上sku主图添加功能
          if (specIndex === 0) {
            // 主图添加功能
            obj.children = (
              <div>
                <span>{c.title}</span>
                <Button type="link">+</Button>
              </div>
            );
          }
          const prev = colSpanArray[c.title as string][cindex - 1];
          if (index === (prev === undefined ? 0 : prev + 1)) {
            obj.props.rowSpan = prev === undefined ? i + 1 : i - prev;
          }
        });
        return obj;
      };
    });
    // 添加额外的栏
    // _columns.push({
    //   title: '价格',
    //   dataIndex: 'price',
    //   key: 'price',
    //   width: 200,
    //   render: (value, row, index) => {
    //     return <Input value={value} prefix="￥" required onChange={e => sku.onChangePrice(row, e.target.value)} />;
    //   },
    // });
    _columns.push({
      title: 'SKU',
      width: 200,
      dataIndex: 'sku',
      key: 'sku',
      render: (value, row, index) => {
        return <Input value={value} required onChange={e => sku.onChangeSku(row, e.target.value)} />;
      },
    });
    // sku图
    _columns.push({
      title: 'SKU图',
      width: 80,
      dataIndex: 'pic',
      key: 'pic',
      render: (value, row, index) => {
        // return <Input value={value} required onChange={e => sku.onChangeSku(row, e.target.value)} />;
        return (
          <Upload
            name="avatar"
            listType="picture-card"
            style={{
              width: 50,
              height: 50,
            }}
            showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={info => () => {
              // if (info.file.status === 'uploading') {
              //   this.setState({ loading: true });
              //   return;
              // }
              console.log('info', info);
              if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, imageUrl => {
                  console.log(imageUrl);
                  sku.onChangeSkuPic(row, imageUrl);
                });
              }
            }}>
            {row?.pic ? (
              <img src={row?.pic} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <div>
                {/* <Icon type={this.state.loading ? 'loading' : 'plus'} /> */}
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </Upload>
        );
      },
    });

    _columns.push({
      title: '采购数量',
      width: 200,
      dataIndex: 'hold',
      key: 'hold',
      render: (value, row, index) => {
        return <Input value={value} required onChange={e => sku.onChangeHold(row, e.target.value)} />;
      },
    });

    _columns.push({
      title: '备注',
      width: 200,
      dataIndex: 'remark',
      key: 'remark',
      render: (value, row, index) => {
        return <Input value={value} required onChange={e => sku.onChangeRemark(row, e.target.value)} />;
      },
    });

    setIsShowDetail(_isShowDetail);
    setColumns(_columns);
    // 当totalProperties 发生改变时候就要重置行元素
    if (!_.isEqual(totalProperties, defaultProperties)) {
      setRows(_rows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalProperties]);

  // 调整属性顺序 暂时没用到
  // const onPressTop = (index: number) => {
  //   const topProperty = totalProperties[index];
  //   _.pullAt(totalProperties, index);
  //   totalProperties.unshift(topProperty);
  //   setTotalProperties([...totalProperties]);
  // };
  useEffect(() => {
    onChange?.(rows);
  }, [rows]);

  return (
    <>
      <Row gutter={16}>
        <Col lg={24} md={24}>
          <Form.Item
            label="商品规格"
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
                    title={
                      <Select
                        style={{ width: 200 }}
                        value={prop.name}
                        onChange={v => property.onChangeName(i, v)}
                        options={[
                          {
                            label: '颜色',
                            value: '颜色',
                          },
                          {
                            label: '型号',
                            value: '型号',
                          },
                          {
                            label: '尺寸',
                            value: '尺寸',
                          },
                        ]}
                      />
                    }
                    extra={<a onClick={() => property.remove(i)}>删除规格</a>}>
                    <Space wrap>
                      {prop.name &&
                        prop?.values &&
                        prop.values.map((inputItem, inputi) => {
                          return (
                            <Input
                              key={inputItem}
                              style={{ width: 200 }}
                              defaultValue={inputItem}
                              onChange={(e: any) => {
                                const arr = prop.values;
                                if (arr) {
                                  if (inputi === arr.length - 1) {
                                    arr[inputi + 1] = '';
                                  }

                                  property.onChangeValues(i, arr);
                                }
                              }}
                              onBlur={(e: any) => {
                                console.log(e.target.value);
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
                                  property.onChangeValues(i, arr);
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
              label="规格明细"
              labelCol={{
                md: { span: 24 },
                lg: { span: 3 },
              }}>
              <Table
                pagination={false}
                size="small"
                columns={columns}
                dataSource={rows}
                bordered
                // footer={() => 'Footer'}
              />
            </Form.Item>
          </Col>
        ) : null}
      </Row>
    </>
  );
};

export default SkuCreator;
