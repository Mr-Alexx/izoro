import GlobalContext from '@/context/global.context';
import { useContext } from 'react';
import Head from 'next/head';

const AppHead = () => {
  const { settings } = useContext(GlobalContext);

  return (
    <Head>
      <title>{settings.title}</title>

      <meta name="title" content={settings.title} />
      <meta name="keyword" content={settings.keyword} />
      <meta name="description" content={settings.description} />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover,maximum-scale=1" />
    </Head>
  );
};

export default AppHead;
