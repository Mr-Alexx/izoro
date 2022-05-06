import GlobalContext from '@/context/global.context';
import { useContext } from 'react';
import Head from 'next/head';
import Script from 'next/script';

const AppHead = () => {
  const { settings } = useContext(GlobalContext);

  return (
    <>
      <Head>
        <title>{settings.site_name}</title>

        <meta name="title" content={settings.site_name} />
        <meta name="keyword" content={settings.seo_keyword} />
        <meta name="description" content={settings.seo_description} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover,maximum-scale=1" />
      </Head>

      {/* next/script https://nextjs.org/docs/basic-features/script */}
      {settings.baidu_analysis_id && (
        <Script
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?${settings.baidu_analysis_id}";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`,
          }}
        />
      )}
    </>
  );
};

export default AppHead;
