// import type { GetServerSidePropsContext } from 'next';
import type { AppProps } from 'next/app';
import { FC } from 'react';
import '../styles/components.scss';
import '../styles/global.scss';
// import { get } from '@/utils/request';
import AppHead from '@/components/Head';
import Layout from '@/layouts/DefaultLayout';

const App: FC<AppProps> = props => {
  const { Component, pageProps } = props;
  return (
    <>
      <AppHead />
      <Component {...pageProps} />
    </>
  );
  return (
    <Layout>
      <AppHead />
      <Component {...pageProps} />
    </Layout>
  );
};

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   try {
//     const data = await get('/article');
//     console.log(data);
//     return {
//       data,
//     };
//   } catch (err) {}
// };

export default App;
