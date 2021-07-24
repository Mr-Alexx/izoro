import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { QueryFilter, ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';

import { useState } from 'react';

const CategoryAnalysis: FC = () => {
  const [pictureNum, setPictureNum] = useState<number>(2585);
  return (
    <PageContainer>
      <ProCard>
        <QueryFilter<{
          name: string;
          company: string;
        }>
          onFinish={async values => {
            console.log(values.name);
          }}>
          <ProFormText name="id" label="分类ID" />
        </QueryFilter>
      </ProCard>
      <ProCard title={`图片数量：${pictureNum}`} style={{ marginTop: 20 }} headerBordered>
        内容
      </ProCard>
    </PageContainer>
  );
};

export default CategoryAnalysis;
