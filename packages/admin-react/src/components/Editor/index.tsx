import type { FC } from 'react';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

type EditorProps = {
  initialValue?: string | undefined;
  onChange?: (content: any, editor: any) => {};
};

const TinymceEditor: FC<EditorProps> = props => {
  const { onChange, initialValue } = props;
  return (
    <>
      <Editor
        initialValue={initialValue}
        init={{
          height: 500,
          language: 'zh_CN',
          menubar: true,
          plugins: [
            'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable',
          ],
          // a11y_advanced_options: true,
          toolbar:
            'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          onEditorChange: onChange,
          // plugins:
          //   'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable',
          // mobile: {
          //   plugins:
          //     'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable',
          // },
          // menubar: 'file edit view insert format tools table tc help',
          // toolbar:
          //   'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
          // autosave_ask_before_unload: true,
          // autosave_interval: '10s',
          // autosave_prefix: '{path}{query}-{id}-',
          // autosave_restore_when_empty: false,
          // autosave_retention: '2m',
          // image_advtab: true,
          // image_list: [
          //   { title: 'My page 1', value: 'https://www.tiny.cloud' },
          //   { title: 'My page 2', value: 'http://www.moxiecode.com' },
          // ],
          // image_class_list: [
          //   { title: 'None', value: '' },
          //   { title: 'Some class', value: 'class-name' },
          // ],
          // importcss_append: true,
          // height: 600,
          // image_caption: true,
          // quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          // noneditable_noneditable_class: 'mceNonEditable',
          // toolbar_mode: 'sliding',
          // spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
          // skin: 'oxide',
          // content_css: 'default',
        }}
      />
      {/* <script src="%PUBLIC_URL%/tinymce/tinymce.min.js"></script> */}
    </>
  );
};

export default TinymceEditor;
