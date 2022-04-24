import Head from 'next/head';
import { GetServerSidePropsContext, GetStaticPaths, GetStaticProps } from 'next';
import { get } from '@/utils/request';
import { useEffect, useMemo } from 'react';
import Wrapper from '@/components/Wrapper';
import styles from './index.module.scss';
import message from '@/components/Message';
import type { AnchorItem } from '@/components/Anchors';
import Anchors from '@/components/Anchors';

export default function Post({ postData }) {
  /** 给code元素加上头部： 代码伸缩、代码语言、复制按钮 信息 */
  useEffect(() => {
    console.log('postData', postData);
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
              复制代码
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

    /** 代码复制逻辑 - 经测试，拷贝功能耗时 < 10ms，故不作重复点击处理 */
    function copyHanlder(e) {
      if (!/(copy-code-button)|(iconfont icon-copy)/gi.test(e.target.className)) {
        return;
      }
      // 拷贝当前元素及所有子孙元素
      const cloneNode = this.cloneNode(true);
      // 去掉代码框加入的头部内容
      cloneNode.removeChild(cloneNode.querySelector('.code-header'));
      // 真实复制的内容就是去掉头部后的内容
      const innerText = cloneNode.innerText;

      // 保留复制样式需要用textarea而不是input
      const input = document.createElement('textarea');
      input.value = innerText;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      message.success('复制成功！');
    }

    window.addEventListener('load', addCodeHeaderInfo);

    // 移除所有绑定的事件
    return () => {
      window.removeEventListener('load', addCodeHeaderInfo);
      const codeDoms = document.querySelectorAll('code.hljs');
      codeDoms.forEach(item => {
        if (item) {
          item.removeEventListener('click', collapseHanlder);
          item.removeEventListener('click', copyHanlder);
        }
      });
    };
  }, []);

  /** 锚点内容 */
  const anchors: AnchorItem[] = useMemo(() => {
    const { html } = postData;
    if (!html) {
      return [];
    }
    // 匹配h元素
    const reg = /<(h(1|2|3|4|5|6))[^>]*>(.+)<\/(h(1|2|3|4|5|6))>/gi;
    const matchHElements = html.match(reg).map((hElementString, index) => {
      const item: AnchorItem = {};

      hElementString.replace(reg, ($1, $2, $3, $4, $5) => {
        item.name = $4;
        item.hType = +$3;
      });
      return item;
    });
    return matchHElements;
  }, [postData]);

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
        <script
          src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.5.0/build/highlight.min.js"
          // src="/js/highlight.min.js"
          async
        />
      </Head>
      <Wrapper aside={<Anchors dataSource={anchors} />}>
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
    console.error(12, err);
  }
};
