import Head from 'next/head';
import { GetServerSidePropsContext, GetStaticPaths, GetStaticProps } from 'next';
import { get } from '@/utils/request';
import { useEffect } from 'react';
import Wrapper from '@/components/Wrapper';
import Layout from '@/layouts/DefaultLayout';
import styles from './index.module.scss';

export default function Post({ postData }) {
  /** 给code元素加上头部： 代码伸缩、代码语言、复制按钮 信息 */
  useEffect(() => {
    /** 代码框加头部逻辑 */
    const addCodeHeaderInfo = () => {
      const codeDoms = document.querySelectorAll('code.hljs');

      if (codeDoms.length === 0) {
        return;
      }

      codeDoms.forEach(item => {
        const div = document.createElement('div');
        div.className = 'code-header';
        div.innerHTML = `
          <div class="code-header__left">
            <span class="collapse-button">
              <i class="iconfont icon-arrow-down"></i>
            </span>
          </div>
          <div class="code-header__right">
            <span class="code-language">${item.className.substring(14)}</span>
            <i class="split-divider"></i>
            <span class="copy-code-button">
              <i class="iconfont icon-copy"></i>
              COPY
            </span>
          </div>
        `;
        item.appendChild(div);
        item.addEventListener('click', collapseHanlder);
        item.addEventListener('click', copyHanlder);
      });
    };

    /** 代码框伸缩逻辑 */
    function collapseHanlder(e) {
      if (!/(collapse-button)|(iconfont icon-arrow-down)/gi.test(e.target.className)) {
        return;
      }
      const classNames = this.className;
      this.setAttribute('class', `hljs language-js ${classNames.includes('is-collapsed') ? '' : 'is-collapsed'}`);
    }

    /** 代码复制逻辑 */
    function copyHanlder(e) {
      if (!/(copy-code-button)|(iconfont icon-copy)/gi.test(e.target.className)) {
        return;
      }

      const inerText = this.innerHtml;
    }

    window.addEventListener('load', addCodeHeaderInfo);

    return () => {
      window.removeEventListener('load', addCodeHeaderInfo);
      const codeDoms = document.querySelectorAll('code.hljs');
      codeDoms.forEach(item => {
        item.removeEventListener('click', collapseHanlder);
        item.removeEventListener('click', copyHanlder);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>{postData.title}</title>
        <meta name="title" content={postData.title} />
        <meta name="keyword" content={postData.seo_keywords} />
        <meta name="description" content={postData.seo_description} />
        <link rel="stylesheet" href="/css/markdown-themes/cyanosis.min.css" />

        {/* 代码高亮插件 see https://highlightjs.org/download/ */}
        <link
          rel="stylesheet"
          // href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/atom-one-dark.min.css"
          href="/css/highlight-themes/atom-one-dark.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js" />
      </Head>
      <Wrapper aside={<div>x</div>}>
        <article className={styles['article-content']}>
          <h1>{postData.title}</h1>
          <div>{/* <Date dateString={postData.date} /> */}</div>
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: postData.html }} />
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
