/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { ModalForm } from '@ant-design/pro-form';
import { message, Checkbox, Image, Divider, Button, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import type { PropsType1, PropsType2 } from './data';
import styles from './index.less';

const { Option } = Select;

const ProductList: FC<PropsType2> = props => {
  const { productList, handleDelete } = props;

  return (
    <div className={styles.pictureList}>
      {productList.map((item, index) => {
        return (
          <span key={item.value} className={styles.item}>
            <Image className={styles.picture} width={60} preview={false} src={item.url} />
            <DeleteOutlined
              className={styles.delete}
              onClick={() => {
                handleDelete(item.value);
              }}
            />
          </span>
        );
      })}
    </div>
  );
};

const ChooseImageModalForm: FC<PropsType1> = props => {
  const { options } = props;
  const plainOptions = options;
  const [selectPictureModalVisit, setSelectPictureModalVisit] = useState<boolean>(false);
  // 选择图片弹框
  // checkbox组件选中的数据
  const [checkedList, setCheckedList] = useState<any[]>([]);
  // 子组件（含有删除）数据列表
  const [checkedOptionList, setCheckedOptionList] = useState<any[]>([]);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  // 弹框头部筛选框改变时触发
  const handleStatusChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onCheckAllChange = (e: any) => {
    const checkedArr = plainOptions.map(item => {
      return item.value;
    });
    setCheckedList(e.target.checked ? checkedArr : []);
    setCheckedOptionList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  const onPictureChange = (list: any[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
    if (list.length) {
      const arr: any[] = [];
      list.forEach((item: string) => {
        plainOptions.forEach((option: any) => {
          if (item === option.value) {
            arr.push(option);
          }
        });
      });
      setCheckedOptionList(arr);
    }
  };

  const handleDelete = (data: number) => {
    const arr: any[] = checkedOptionList;
    const newArr: any[] = []; // 传入选中图片的子组件列表
    const newArr1: any[] = []; // 当前选中的图片的value值
    arr.forEach(item => {
      if (item.value !== data) {
        newArr.push(item);
        newArr1.push(item.value);
      }
    });

    setCheckedOptionList(newArr);
    setCheckedList(newArr1);
    setIndeterminate(false);
    setCheckAll(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setSelectPictureModalVisit(true);
        }}>
        选择图片
      </Button>
      <ModalForm
        title={
          <>
            <span>请选择图片</span>
            <Select defaultValue="1" style={{ marginLeft: 20, width: 200 }} onChange={handleStatusChange}>
              <Option value="">全部</Option>
              <Option value="1">显示</Option>
              <Option value="0">隐藏</Option>
            </Select>
          </>
        }
        width="85%"
        visible={selectPictureModalVisit}
        submitter={{
          render: (prop, defaultDoms) => {
            return [
              <Button
                key="hide"
                type="primary"
                danger
                onClick={() => {
                  prop.submit();
                }}>
                隐藏图片
              </Button>,
              ...defaultDoms,
            ];
          },
        }}
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
        onVisibleChange={setSelectPictureModalVisit}>
        <>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            全选
          </Checkbox>

          <Checkbox.Group
            style={{ width: '100%' }}
            value={checkedList}
            options={plainOptions}
            onChange={onPictureChange}
          />
        </>
        <Divider />
        <ProductList productList={checkedOptionList} handleDelete={handleDelete} />
      </ModalForm>
    </>
  );
};

export default ChooseImageModalForm;
