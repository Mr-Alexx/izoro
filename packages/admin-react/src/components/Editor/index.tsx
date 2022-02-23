import type { FC } from 'react';
import { useState } from 'react';
import { Editor as TinymceEditor } from '@tinymce/tinymce-react';
import { imageUploadHandler, fileUploadHandler } from '../OSS/util/upload-handler';
import { message } from 'antd';

const base64ToFile = (base64String: string, type: string, fileName: string): File | undefined => {
  if (!base64String) {
    return;
  }
  const bstr = atob(base64String);
  let length = bstr.length;
  const u8arr = new Uint8Array(length);
  while (length--) {
    u8arr[length] = bstr.charCodeAt(length);
  }
  return new File([u8arr], fileName, { type });
};

export type EditorProps = {
  /**
   * @description 绑定值
   */
  value?: string;
  /**
   * @description 初值
   */
  initialValue?: string;
  /**
   * @description 宽度，数值型会直接转px
   * @default 100%
   */
  width?: number | string;
  /**
   * @description 高度，数值型会直接转px
   * @default 500
   */
  height?: number | string;
  /**
   * @description 编辑器内容变更回调
   */
  onChange?: (value: string) => void;
};

const Editor: FC<EditorProps> = props => {
  const { onChange, initialValue, value, width, height } = props;
  const [editorValue, setEditorValue] = useState<string>();

  const triggerChange = (content: string) => {
    if (!value) {
      setEditorValue(value);
    }
    onChange?.(content);
  };

  return (
    <TinymceEditor
      // 使用本地的tinymce
      tinymceScriptSrc="/plugins/tinymce_5.9.1/tinymce.min.js"
      initialValue={initialValue}
      value={value ?? editorValue}
      onEditorChange={(content: string) => triggerChange(content)}
      init={{
        // external_plugins: {
        //   powerpaste: '/plugins/tinymce_5.9.1/plugins/powerpaste/plugin.min.js',
        // },
        // powerpaste_allow_local_images: true,
        // paste_data_images: true,
        language: 'zh_CN',
        // 使用的插件，powerpaste为pojie功能，实际官方为收费功能
        // powerpaste放在本地 /plugins/tinymce_5.9.1/plugins/powerpaste 目录下
        plugins:
          'print preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons powerpaste',
        // 自定义快捷菜单栏
        toolbar:
          'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect lineheight | alignleft aligncenter alignright alignjustify | numlist bullist | forecolor backcolor casechange permanentpen formatpainter removeformat | preview fullscreen | insertfile image media link anchor',
        toolbar_sticky: true,
        // 预设字体大小
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
        // 预设字体
        font_formats:
          '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif',
        // autosave_ask_before_unload: true,
        // autosave_interval: '30s',
        // autosave_prefix: '{path}{query}-{id}-',
        // autosave_restore_when_empty: false,
        // autosave_retention: '2m',
        image_advtab: true,
        importcss_append: true,
        automatic_uploads: true,
        images_reuse_filename: false,
        // 目前不支持excel带图片的复制
        // 有需要参考 https://www.jianshu.com/p/8bba1d594f0a
        // 粘贴图片、直接拖图片到编辑器、图片插件上传tab触发的方法
        images_upload_handler: async (blobInfo, success, failure) => {
          // 由于直接粘贴图片时，转blob会有问题
          // 这里采用迂回的方式，先转base64再转回blob
          // 参考 https://www.jianshu.com/p/a2ac665601f3
          const file = blobInfo.blob();
          // @ts-ignore
          const newFile = base64ToFile(blobInfo.base64(), file.type, file.name);

          const { msg, path } = imageUploadHandler(newFile as File);
          if (msg) {
            // 上传失败需要移除图片
            failure(msg, { remove: true });
          }
          // @ts-ignore
          window.__oss__
            .put(path, newFile)
            .then((result: any) => {
              if (result.res.requestUrls) {
                success(result.res.requestUrls[0]);
              }
            })
            .catch((err: any) => {
              console.error(err);
              failure(err, { remove: true });
            });
        },
        // 自定义文件选择限制，只允许上传图片和视频
        // file_picker_types: 'image, media',
        // 自定义文件选择图标行为，这里弹出文件选择窗口
        file_picker_callback: (callback, value, meta) => {
          // 创建input:file
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          const fileType = meta.filetype;

          if (fileType === 'image') {
            /* Provide image and alt text for the image dialog */
            input.setAttribute('accept', 'image/*');
          } else if (fileType === 'media') {
            /* Provide alternative source and posted for the media dialog */
            input.setAttribute('accept', 'media/*');
          }

          /* eslint-disable-next-line */
          input.onchange = async function () {
            const file = (this as any)?.files?.[0];
            console.log(file);
            const { msg, path } = fileType === 'image' ? imageUploadHandler(file) : fileUploadHandler(file);
            if (msg) {
              message.warning(msg);
              return;
            }

            try {
              // @ts-ignore
              const { url } = await window.__oss__?.put(path, file);
              callback(url);
            } catch (err) {
              console.error(err);
              message.error('上传失败');
            }
          };

          input.click();
        },

        // height: 500,
        width: width || '100%',
        height: height || 500,
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        contextmenu: 'link image imagetools table',
      }}
    />
  );
};

export default Editor;
