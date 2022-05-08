import { useState } from 'react';
import { Editor as BytemdEditor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter';
import zhHans from 'bytemd/locales/zh_Hans.json';
import 'bytemd/dist/index.css';
// import './cyanosis.min.css';
// import './atom-one-dark.min.css';
import highlight from './bytemd-plugins/plugin-highlight';
import { highlightSelectPlugin, themeSelectPlugin } from './bytemd-plugins/extra-plugin';
import { useEffect } from 'react';
import { getProcessor } from 'bytemd';

export type BytemdEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const MarkdownEditor = (props: BytemdEditorProps) => {
  const { onChange, value, width, height } = props;
  const [editorValue, setEditorValue] = useState<string>('');
  const plugins = [highlight(), gfm(), breaks(), frontmatter(), themeSelectPlugin(), highlightSelectPlugin()];

  const triggerChange = (content: string) => {
    // console.log('content', content);
    // changeStyle(content);
    const { contents, frontmatter } = getProcessor({ value: content, plugins }).processSync(content);
    // console.log('d: ', contents, frontmatter);
    if (!value) {
      setEditorValue(content || '');
    }
    onChange?.(contents);
  };

  /**
   * highlight和theme切换方法
   */
  const changeStyle = (inputVal: string) => {
    const lines = inputVal.split('\n');

    if (lines[0].match(/---/) && lines.filter(line => line.match(/---/)).length >= 2) {
      const themeLine = lines.filter(line => line.indexOf('theme: ') > -1)[0];
      const highlightLine = lines.filter(line => line.indexOf('highlight: ') > -1)[0];
      const theme = themeLine.substring(6).trim() || 'juejin';
      const highlight = highlightLine.substring(10).trim();

      toggleLink('theme', `/css/juejin-markdown-theme/${theme}.min.css`);
      toggleLink('highlight', `/css/highlight/${highlight}.min.css`);
    }
  };

  const toggleLink = (type: string, href: string) => {
    // 先移除已存在的，避免重复添加
    document.getElementById(type)?.remove?.();

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', href);
    link.setAttribute('id', type);
    document.head.append(link);
  };

  return (
    <>
      <BytemdEditor
        value={value ?? editorValue}
        onChange={triggerChange}
        locale={zhHans}
        // @ts-ignore
        plugins={plugins}
      />
    </>
  );
};

export default MarkdownEditor;
