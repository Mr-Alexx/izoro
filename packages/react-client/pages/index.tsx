import type { GetServerSidePropsContext } from 'next';
import { get } from '@/utils/request';
import ArticleList from '@/components/Article/List';
import { useEffect, useState } from 'react';
import Wrapper from '@/components/Wrapper';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/router';
import Skeleton from '@/components/Skeleton';

export default function Home({ initialData }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Api.ListRes>(initialData);
  console.log(router.query);

  // useEffect(() => {
  //   if (!router.query.page) {
  //     return;
  //   }
  //   get('/article', { page: parseInt(router.query.page) }).then(res => {
  //     console.log('res', res);
  //   });
  // }, [router.query.page]);

  const request = async page => {
    setLoading(true);
    router.push({ query: { page } });
    get('/article', { page: parseInt(page), limit: 12 })
      .then(res => {
        console.log('res', res);
        setData(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper aside={<div>右侧</div>}>
      <Skeleton loading={loading} paragraph={{ rows: 16 }}>
        <ArticleList dataSource={data.list} />
      </Skeleton>
      <Pagination total={data.total} onChange={request} />
    </Wrapper>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const data = await get('/article', { page: 1, limit: 12 });
    return {
      props: {
        initialData: data,
      },
    };
  } catch (err) {
    // console.error(12, err);
  }
};

// export const getStaticProps: GetStaticProps = async context => {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }
