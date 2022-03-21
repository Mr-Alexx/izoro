import type { GetServerSidePropsContext } from 'next';
import { get } from '@/utils/request';
import ArticleList from '@/components/Article/List';
import { useEffect } from 'react';
import Wrapper from '@/components/Wrapper';
import Pagination from '@/components/IzPagination';

export default function Home({ data }) {
  useEffect(() => {
    console.log('data', data);
  }, []);
  return (
    <Wrapper aside={<div>右侧</div>}>
      <ArticleList dataSource={data} />
      <Pagination />
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
