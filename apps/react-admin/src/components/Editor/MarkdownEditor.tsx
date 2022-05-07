import { useState } from 'react';
import { Editor as BytemdEditor } from '@bytemd/react';
import highlight from '@bytemd/plugin-highlight';
import gfm from '@bytemd/plugin-gfm';
import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter';
import zhHans from 'bytemd/locales/zh_Hans.json';
import 'bytemd/dist/index.css';
import './cyanosis.min.css';
import './atom-one-dark.min.css';

export type BytemdEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const MarkdownEditor = (props: BytemdEditorProps) => {
  const { onChange, value, width, height } = props;
  const [editorValue, setEditorValue] = useState<string>('');

  const triggerChange = (content: string) => {
    if (!value) {
      setEditorValue(content || '');
    }
    onChange?.(content);
  };

  return (
    <>
      {/* <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.5.0/build/highlight.min.js" async></script> */}
      <BytemdEditor
        value={value ?? editorValue}
        onChange={triggerChange}
        locale={zhHans}
        plugins={[highlight(), gfm(), breaks(), frontmatter()]}
      />
    </>
  );
};

export default MarkdownEditor;
