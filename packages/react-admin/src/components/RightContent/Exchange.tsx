/**
 * @description 汇率查看组件
 */
import { TransactionOutlined } from '@ant-design/icons';
import type { FC } from 'react';
import { useState } from 'react';
import { Dropdown, Menu, Tooltip } from 'antd';
import styles from './index.less';

type MenuItem = {
  currency: string; // 货币名称
  symbol: string; // 货币符号
  name: string; // 中文名
  flag: string; // 旗
  rate: number | string; // 汇率
};

const Exchange: FC<{ list: MenuItem[]; className?: any }> = ({ list, className }) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Dropdown
      className={className}
      placement="bottomRight"
      visible={visible}
      trigger={['click']}
      onVisibleChange={setVisible}
      overlay={() => {
        return (
          <Menu onClick={() => {}} style={{ height: 400, overflow: 'auto' }}>
            {list?.map(item => (
              <Menu.Item key={item.name}>
                <div className={styles.exchangeItem}>
                  <div className={styles.itemWrapper}>
                    <div className={styles.flag}>{item.flag}</div>
                    <div className={styles.content}>
                      <em>{item.currency}</em>
                      <span>
                        {item.name} {item.symbol}
                      </span>
                    </div>
                  </div>
                  <div className={styles.rate}>{item.rate}</div>
                </div>
              </Menu.Item>
            ))}
          </Menu>
        );
      }}>
      <Tooltip title="汇率">
        <TransactionOutlined className={styles.exchangeIcon} />
      </Tooltip>
    </Dropdown>
  );
};

export default Exchange;
