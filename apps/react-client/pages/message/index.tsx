// import Skeleton from '@/components/Skeleton';
import Wrapper from '@/components/Wrapper';
// import { useEffect, useState } from 'react';
import message from '@/components/Message';

export default function Message() {
  return (
    <Wrapper style={{ paddingTop: 50 }}>
      <span
        onClick={() => {
          // message.info('测试');
          // message.success('测试2');
          // message.warning('测试3');
          // message.error('测试4');
          message.success('复制成功');
        }}
        style={{ color: '#e7e7e7' }}>
        查看
      </span>
    </Wrapper>
  );
}
