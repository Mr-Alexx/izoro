import type { FC, MouseEvent } from 'react';
import { memo } from 'react';
import { useState, useEffect } from 'react';
import { message, Upload } from 'antd';
import { DeleteOutlined, EyeOutlined, LoadingOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { UploadChangeParam, UploadProps } from 'antd/lib/upload';
import styles from './index.less';
import { createViewer, imageUploadHandler } from '../util/upload-handler';

const { Dragger } = Upload;

// 文档导出的props
export type ApiProps = {
  /** @description 默认显示的图片 */
  initialValue?: string;
  /** @description 更改图片回调 */
  onChange?: (url: string | undefined) => void;
  /**
   * @description 上传框宽度
   * @default 120
   */
  width?: number;
  /**
   * @description 上传框高度
   * @default 120
   */
  height?: number;
  /** @description 上传框底部友好提示 */
  tips?: string;
  /**
   * @description 上传图片大小限制，单位MB
   * @default 2MB
   */
  limit?: number;
  showText?: boolean; // 是否显示拖拽文案
};
type Props = ApiProps; // UploadProps &

const SingleImageUpload: FC<Props> = memo(
  ({ width, height, initialValue, limit, onChange, tips, showText = true, ...props }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [url, setUrl] = useState<string | undefined>();

    useEffect(() => {
      setUrl(initialValue);
    }, [initialValue]);

    /**
     * @description 上传前处理
     */
    const beforeUpload = async (file: File & { uid: string; url: string }) => {
      const { msg, path } = imageUploadHandler(file, {
        limit,
      });
      if (msg) {
        message.warning(msg);
        return Upload.LIST_IGNORE;
      }

      try {
        // @ts-ignore
        const result = await window.__oss__?.put?.(path, file);
        file.url = result.url;
      } catch (err) {
        console.error(err);
        message.error('上传失败！');
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

    const preview = (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      createViewer([url as string]);
    };
    const remove = (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      setUrl(undefined);
      onChange?.(undefined);
    };

    return (
      <div>
        <div
          style={{
            width: width || 120,
            height: height || width || 120,
          }}
          className={styles.singleImageUpload}>
          <Dragger
            multiple={false}
            maxCount={1}
            showUploadList={false}
            disabled={props.disabled}
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            // @ts-ignore
            beforeUpload={beforeUpload}
            onChange={handleChange}>
            {url ? (
              <div className={styles.uploadItem}>
                <div className={styles.uploadItemActions}>
                  <EyeOutlined onClick={preview} />
                  {!props.disabled && <DeleteOutlined onClick={remove} />}
                </div>
                <img src={url} className={styles.uploadItemImage} />
              </div>
            ) : (
              <div className={styles.uploadTips}>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                {showText && (
                  <div className={styles.uploadTipsLabel} style={{ marginTop: 8 }}>
                    点击/拖动图片上传
                  </div>
                )}
              </div>
            )}
          </Dragger>
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
  },
);

export default SingleImageUpload;
