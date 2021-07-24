import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card } from 'antd';

import { QueryFilter, ProFormSelect } from '@ant-design/pro-form';

import styles from './index.less';

import { history } from 'umi';

const productAttrDetail: FC = () => {
  return (
    <PageContainer>
      <Card title="搜索">
        <QueryFilter
          onFinish={async values => {
            console.log(values.name);
          }}>
          <ProFormSelect
            name="language"
            label="语言"
            showSearch
            options={[
              {
                value: '',
                label: '请选择',
              },
              {
                value: '英文',
                label: '英文',
              },
              {
                value: '中文',
                label: '中文',
              },
            ]}
          />
        </QueryFilter>
      </Card>
      <div className={styles.mt20}>
        <Button
          type="primary"
          onClick={() => {
            history.push({
              pathname: '/finished-store/product-store/add-product-detail',
            });
          }}>
          添加详情
        </Button>
      </div>
      <Card title="SPU详情" className={styles.mt10}>
        <div className={styles.textCenter}>没有找到数据。</div>
      </Card>
    </PageContainer>
  );
};

export default productAttrDetail;
