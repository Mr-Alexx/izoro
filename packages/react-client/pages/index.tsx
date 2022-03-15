import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import type { GetServerSidePropsContext } from 'next';
import { get } from '@/utils/request';
import ArticleList from '@/components/Article/List';
import { useEffect } from 'react';
import Wrapper from '@/components/Wrapper';

export default function Home({ data }) {
  useEffect(() => {
    console.log('data', data);
  }, []);
  return (
    <Layout home>
      <Wrapper aside={<div>右侧</div>}>
        <ArticleList dataSource={data} />
      </Wrapper>
    </Layout>
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
