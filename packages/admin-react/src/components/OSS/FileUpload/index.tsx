import type { FC } from 'react';
import { memo } from 'react';
import { useState, useEffect } from 'react';
import { message, Upload } from 'antd';
import moment from 'moment';
import type { UploadChangeParam, UploadProps } from 'antd/lib/upload';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

type Props = UploadProps & {
  initialValue?: string; // 默认显示图片
  onChange?: (url: string | undefined) => void;
};

const LIMIT_SIZE = 5; // MB
const FileUpload: FC<Props> = memo(({ multiple, maxCount, initialValue, onChange, ...props }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string | undefined>();

  useEffect(() => {
    setUrl(initialValue);
  }, [initialValue]);

  /**
   * @description 上传前处理
   */
  const beforeUpload = async (file: File & { uid: string; url: string }) => {
    const isInLimitSize = file.size / 1024 / 1024 <= LIMIT_SIZE;
    if (!isInLimitSize) {
      message.error(`文件大小限制在 ${LIMIT_SIZE}MB 以内!`);
    }

    // 不是图片也不再限定尺寸内，则不显示图片
    if (!isInLimitSize) {
      // 上传失败的文件不显示列表 https://github.com/ant-design/ant-design/issues/15561#issuecomment-475108235
      return Upload.LIST_IGNORE;
    }
    setLoading(true);
    try {
      let fileType: string = '';
      if (file.type) {
        fileType = file.type?.split?.('/')?.[1];
      } else {
        fileType = file.name?.split?.('/')?.reverse()?.[0];
      }
      console.log(fileType);
      // @ts-ignore
      const result = await window.__oss__?.put(
        `${moment().format('YYYY-MM-DD')}/files/${file.name.replace(
          `.${fileType}`,
          '',
        )}-${new Date().getTime()}.${fileType}`,
        file,
      );
      file.url = result.url;
    } catch (err) {
      console.error(err);
      message.error('上传失败！');
      // message.error(err);
      return Upload.LIST_IGNORE;
    } finally {
      setLoading(false);
    }

    // 不调用默认的上传方法
    return false;
  };

  const handleChange = ({ fileList: newFileList }: UploadChangeParam) => {
    const file = newFileList[0];
    // console.log(file)
    setUrl(file.url);
    onChange?.(file.url);
  };

  return (
    <Dragger
      name="file"
      multiple={multiple || false}
      maxCount={maxCount || 1}
      showUploadList={true}
      disabled={props.disabled}
      // @ts-ignore
      beforeUpload={beforeUpload}
      onChange={handleChange}>
      <p className="ant-upload-drag-icon" style={{ marginBottom: 0 }}>
        <InboxOutlined style={{ fontSize: 32 }} />
      </p>
      <p className="ant-upload-text" style={{ fontSize: 12 }}>
        点击/拖动上传
      </p>
    </Dragger>
  );
});

export default FileUpload;
