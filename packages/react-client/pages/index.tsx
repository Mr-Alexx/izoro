import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import type { GetServerSidePropsContext } from 'next';
import { get } from '@/utils/request';

export default function Home({ data }) {
  console.log('data', data);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <ul>
        {data?.map?.(item => {
          <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </Layout>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const data = await get('/article');
    // console.log(data.list, data.total);
    return {
      props: {
        data: data.list,
      },
    };
  } catch (err) {}
};

// export const getStaticProps: GetStaticProps = async context => {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }
