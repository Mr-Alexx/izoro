/**
 * @description 菜单搜索
 */
import { SearchOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { Select, Tooltip } from 'antd';

import routes from '../../../config/routes';
import formatRoutes from './formatRoutes';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { ModalForm } from '@ant-design/pro-form';
import { memo } from 'react';
import styles from './index.less';
import type { BaseOptionType } from 'antd/lib/select';

export type HeaderSearchProps = {
  className?: string;
  visible?: boolean;
  value?: string;
};

const SearchSelect = memo(() => {
  const history = useHistory();
  const [value, setValue] = useState<string>();
  let timer: any = null;

  return (
    <Select
      style={{ width: 180 }}
      dropdownMatchSelectWidth={360}
      dropdownClassName={styles.searchSelect}
      key="small"
      showSearch
      allowClear
      showArrow={false}
      placeholder="菜单快速搜索"
      value={value}
      onSelect={selectedVal => {
        history.push(selectedVal as string);
        if (timer) {
          clearTimeout(timer);
        } else {
          timer = setTimeout(() => {
            setValue(undefined);
          });
        }
      }}
      onChange={(selectedVal: string) => {
        setValue(selectedVal);
      }}
      options={formatRoutes(routes)}
      filterOption={(inputValue: string, option?: BaseOptionType) => {
        const reg = new RegExp(inputValue, 'ig');
        return option?.label?.match(reg);
      }}
    />
  );
});

const HeaderSearch = memo((props: HeaderSearchProps) => {
  const { className } = props;
  const [searchMode, setSearchMode] = useState<boolean>(false);

  return (
    <Row>
      {/* pc直接显示搜索框 */}
      <Col md={24} sm={0}>
        <SearchSelect />
      </Col>
      {/* 移动端弹窗显示 */}
      <Col md={0} sm={24}>
        <div className={className}>
          <Tooltip title="菜单搜索">
            <SearchOutlined
              key="Icon"
              style={{
                cursor: 'pointer',
              }}
              onClick={() => setSearchMode(true)}
            />
          </Tooltip>
          <ModalForm title="菜单搜索" submitter={false} visible={searchMode} onVisibleChange={setSearchMode}>
            <SearchSelect />
          </ModalForm>
        </div>
      </Col>
    </Row>
  );
});

export default HeaderSearch;
