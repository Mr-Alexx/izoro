import type { FC, MouseEvent } from 'react';
import { memo } from 'react';
import { useState, useEffect } from 'react';
import { message, Upload, Button } from 'antd';
import { QuestionCircleOutlined, PictureOutlined } from '@ant-design/icons';
import moment from 'moment';
import type { UploadChangeParam, UploadProps } from 'antd/lib/upload';
import styles from './index.less';
import { createViewer } from '../util/pictureUtil';

const { Dragger } = Upload;

type Props = UploadProps & {
  onChange?: (url: string | undefined) => void;
  tips?: string;
};

const LIMIT_SIZE = 1; // MB
const SingleImageUpload: FC<Props> = memo(({ onChange, tips, ...props }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string | undefined>();

  /**
   * @description 上传前处理
   */
  const beforeUpload = async (file: File & { uid: string; url: string }) => {
    const isImg = /image\/jpeg|image\/jpg|image\/png|image\/webp|image\/gif/.test(file.type);
    if (!isImg) {
      message.error('只能上传图片！');
    }
    const isInLimitSize = file.size / 1024 / 1024 <= LIMIT_SIZE;
    if (!isInLimitSize) {
      message.error(`图片大小限制在 ${LIMIT_SIZE}MB 以内!`);
    }

    // 不是图片也不再限定尺寸内，则不显示图片
    if (!isImg || !isInLimitSize) {
      // 上传失败的文件不显示列表 https://github.com/ant-design/ant-design/issues/15561#issuecomment-475108235
      return Upload.LIST_IGNORE;
    }
    setLoading(true);
    try {
      const fileType = file.type.split('/')[1];
      // @ts-ignore
      const result = await window.__oss__?.put(
        `${moment().format('YYYY-MM-DD')}/images/${file.name.replace(
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
    <div>
      <div className={styles.uploadPicture}>
        <Upload
          multiple={false}
          maxCount={1}
          showUploadList={false}
          disabled={props.disabled}
          name="avatar"
          // @ts-ignore
          beforeUpload={beforeUpload}
          onChange={handleChange}>
          <Button type="link" icon={<PictureOutlined />}></Button>
        </Upload>
      </div>
      {tips && (
        <div>
          <QuestionCircleOutlined />
          &nbsp;
          {tips}
        </div>
      )}
    </div>
  );
});

export default SingleImageUpload;
