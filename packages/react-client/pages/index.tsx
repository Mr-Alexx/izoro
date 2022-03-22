import type { GetServerSidePropsContext } from 'next';
import { get } from '@/utils/request';
import ArticleList from '@/components/Article/List';
import { useEffect, useState } from 'react';
import Wrapper from '@/components/Wrapper';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/router';

export default function Home({ data: initialData }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  // useEffect(() => {
  //   if (!router.query.page) {
  //     return;
  //   }
  //   get('/article', { page: parseInt(router.query.page) }).then(res => {
  //     console.log('res', res);
  //   });
  // }, [router.query.page]);
  return (
    <Wrapper aside={<div>右侧</div>}>
      <ArticleList dataSource={data} />
      <Pagination
        onChange={page => {
          router.push({ query: { page } });
          get('/article', { page: parseInt(router.query.page) }).then(res => {
            console.log('res', res);
            // setData(res.list);
          });
        }}
      />
    </Wrapper>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const data = await get('/article');
    return {
      props: {
        data: data.list,
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
