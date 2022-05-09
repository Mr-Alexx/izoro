import { useState, useEffect } from 'react';
import { Editor as BytemdEditor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter';
import zhHans from 'bytemd/locales/zh_Hans.json';
import 'bytemd/dist/index.css';
import highlight from './bytemd-plugins/plugin-highlight';
import { highlightSelectPlugin, themeSelectPlugin, createCssLink } from './bytemd-plugins/extra-plugin';
import { BytemdPlugin, getProcessor } from 'bytemd';
import { uploadFile } from '@/services/system/index';

export type BytemdEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

type ProccessResult = { html: any; frontmatter: Record<string, string> };

const plugins: BytemdPlugin[] = [
  highlight(),
  gfm(),
  breaks(),
  frontmatter(),
  themeSelectPlugin() as BytemdPlugin,
  highlightSelectPlugin() as BytemdPlugin,
];

/**
 * markdown获取处理后的html和theme、highlight
 * 配置默认主题为cyanosis，默认highlight为atom-one-dark
 * 使用方式参考bytemd源码 /packages/bytemd/src/viewer.ts getProcessor方法定义
 * @param {string} value markdown内容
 * @return {ProccessResult}
 */
export const getProcessorData = (value: string): ProccessResult => {
  // @ts-expect-error
  const { value: html, frontmatter } = getProcessor({ plugins }).processSync(value);
  return {
    html,
    frontmatter: {
      theme: 'cyanosis',
      highlight: 'atom-one-dark',
      ...frontmatter,
    },
  };
};

const MarkdownEditor = (props: BytemdEditorProps) => {
  const { onChange, value } = props;
  const [editorValue, setEditorValue] = useState<string>('');

  /* 设置默认主题 */
  useEffect(() => {
    createCssLink('theme', '/css/themes/cyanosis.min.css');
    createCssLink('highlight', '/css/highlights/atom-one-dark.min.css');

    return () => {
      document.querySelector('link#theme')?.remove?.();
      document.querySelector('link#highlight')?.remove?.();
    };
  }, []);

  const triggerChange = (content: string) => {
    if (!value) {
      setEditorValue(content || '');
    }
    onChange?.(content);
  };

  const handleUpload = async (files: File[]): Promise<any> => {
    const data = await Promise.all(
      files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        return uploadFile(formData);
      }),
    );
    return data;
  };

  return (
    <BytemdEditor
      value={value ?? editorValue}
      onChange={triggerChange}
      locale={zhHans}
      plugins={plugins}
      uploadImages={handleUpload}
    />
  );
};

export default MarkdownEditor;
