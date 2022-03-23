import Head from 'next/head';
import { GetServerSidePropsContext, GetStaticPaths, GetStaticProps } from 'next';
import { get } from '@/utils/request';
import { useEffect } from 'react';
import Wrapper from '@/components/Wrapper';
import Layout from '@/layouts/DefaultLayout';

export default function Post({ postData }) {
  useEffect(() => {
    console.log('postData', postData);
  }, []);

  return (
    <>
      <Head>
        <title>{postData.title}</title>
        <meta name="title" content={postData.title} />
        <meta name="keyword" content={postData.seo_keywords} />
        <meta name="description" content={postData.seo_description} />
        <link rel="stylesheet" href="/css/code-mirror.css" />
      </Head>
      <Wrapper aside={<div>test</div>}>
        <article>
          <h1>{postData.title}</h1>
          <div>{/* <Date dateString={postData.date} /> */}</div>
          <div className="bytemd-editor" dangerouslySetInnerHTML={{ __html: postData.html }} />
        </article>
      </Wrapper>
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const postData = await get(`/article/${context.params.id}`);
    return {
      props: {
        postData,
      },
    };
  } catch (err) {
    // console.error(12, err);
  }
};
