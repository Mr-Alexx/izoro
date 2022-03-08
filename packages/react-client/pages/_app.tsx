import type { GetServerSidePropsContext } from 'next';
import type { AppProps } from 'next/app';
import { FC } from 'react';
import '../styles/global.css';
import { get } from '@/utils/request';

const App: FC<AppProps> = props => {
  const { Component, pageProps } = props;
  return (
    <div>
      <Component {...pageProps} />
    </div>
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
