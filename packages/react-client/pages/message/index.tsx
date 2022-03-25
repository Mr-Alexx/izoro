import Skeleton from '@/components/Skeleton';
import Wrapper from '@/components/Wrapper';
import { useEffect, useState } from 'react';

export default function Message() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
      timer = null;
    };
  }, []);

  return (
    <Wrapper>
      <Skeleton loading={loading} paragraph={{ rows: 10, width: '100%' }}>
        测试占位图loading后展示的内容
      </Skeleton>
    </Wrapper>
  );
}
