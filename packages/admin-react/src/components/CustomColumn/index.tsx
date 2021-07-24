/**
 * @format
 * @description 表格自定义列组件
 */

import React from 'react';
import { Button, Tooltip } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import styles from './index.less';
import { Modal, message } from 'antd';
import { useState } from 'react';

const CustomColumn: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  const handleSave = () => {
    openModal();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      closeModal();
      message.success('保存成功！');
    }, 3000);
  };

  return (
    <>
      <Tooltip placement="top" title="自定义列">
        <SettingOutlined onClick={openModal} className={styles.customColumn} />
      </Tooltip>

      <Modal
        visible={visible}
        title="自定义列"
        onCancel={closeModal}
        onOk={handleSave}
        footer={[
          <Button key="back" onClick={closeModal}>
            取消
          </Button>,
          <Button key="submit" onClick={handleSave} loading={loading} type="primary">
            保存
          </Button>,
        ]}>
        {/* 动态获取的列内容 */}
      </Modal>
    </>
  );
};

export default CustomColumn;
