/**
 * @description 列表页通用小工具
 * @use
 * <ProTable <xxx> toolbar= />
 */

import React, { useState } from 'react';
import { DownloadOutlined, TagOutlined } from '@ant-design/icons';
import styles from './index.less';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Row, Col, Tooltip, message } from 'antd';

type DownloadFunc = () => void;
type MarkFunc = () => Promise<boolean>;
export declare type ToolBarOptions = {
  download?: false | DownloadFunc | string; // 是否显示下载，显示的话可以传链接也可以传自定义处理方法
  mark?: false | MarkFunc | string | number; // 是否显示备注，显示的话可以传方法自行处理
};
type ColumnItem = {
  title: string; // 标题
  dataIndex: string; // 键
  tips?: string | undefined;
};

const TableToolBar: React.FC<{ columns?: ColumnItem[]; options?: ToolBarOptions }> = ({
  columns,
  options = { download: true, mark: true },
}) => {
  const { download, mark } = options;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * @description 保存列备注
   */
  const handleSave = async (): Promise<boolean> => {
    try {
      if (typeof mark === 'function') {
        // 自行处理
        const isSuccess = await mark();
        console.log(isSuccess);
      } else {
        await new Promise(resolve => {
          setTimeout(() => resolve(true), 1500);
        });
        console.log(mark);
      }
      message.success('保存成功！');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  /**
   * @description 处理下载
   */
  const handleDownload = async () => {
    if (!download || loading) {
      return;
    }
    if (typeof download === 'function') {
      setLoading(true);
      try {
        await download();
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    } else {
      window.open(download as string, '_blank');
    }
  };

  return (
    <div>
      <div>
        {mark && (
          <Tooltip placement="top" title="列备注" key="beizhu">
            <TagOutlined onClick={() => setVisible(true)} className={styles.customColumn} />
          </Tooltip>
        )}
        {download && (
          <Tooltip placement="top" title="下载表格" key="download">
            <DownloadOutlined onClick={handleDownload} className={styles.customColumn} />
          </Tooltip>
        )}
      </div>

      <ModalForm
        // destroyOnClose
        layout="horizontal"
        title="列备注"
        width={900}
        visible={visible}
        onVisibleChange={setVisible}
        onFinish={handleSave}
        labelCol={{ span: 7 }}>
        {/* 动态获取的列内容 */}
        <Row gutter={20}>
          {columns?.map(item => (
            <Col key={item.dataIndex} span={12}>
              <ProFormText initialValue={item?.tips} label={item.title} name={item.dataIndex} />
            </Col>
          ))}
        </Row>
      </ModalForm>
    </div>
  );
};

export default TableToolBar;
