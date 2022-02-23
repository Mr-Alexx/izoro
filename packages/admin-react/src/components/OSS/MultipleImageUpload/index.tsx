import React, { memo, useState } from 'react';
import type { SortEnd } from 'react-sortable-hoc';
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/lib/upload';
import { createViewer, imageUploadHandler } from '../util/upload-handler';
import { message, Upload } from 'antd';
import type { Props, SortableItemParams, SortableListParams } from './types';
import styles from './index.less';
import { DeleteOutlined, EyeOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const defaultFiledsName = { id: 'id', url: 'pic' };

// e.nativeEvent.stopImmediatePropagation()
// 查看、删除图片
const SortableItem = SortableElement((params: SortableItemParams) => {
  const fieldsName = params.fieldsName ?? defaultFiledsName;
  const { url: urlKey } = fieldsName;

  return (
    <div className={styles.sortableItem}>
      <div className={styles.imageItem}>
        <div className={styles.imageItemActions}>
          <EyeOutlined
            onClick={e => {
              e.stopPropagation();
              params.onPreview(params.item);
            }}
          />
          {!params.props.disabled && (
            <DeleteOutlined
              onClick={e => {
                e.stopPropagation();
                params.onRemove(params.item);
              }}
            />
          )}
        </div>
        <img src={params.item[urlKey]} className={styles.imageItemImage} />
      </div>
    </div>
  );
});

// 图片上传逻辑
const SortableList = SortableContainer((params: SortableListParams) => {
  const { props, items } = params;
  const maxCount = props?.maxCount || 100;
  const { directoryPath, limit } = props;
  const mouseEvent = new MouseEvent('click');
  const fieldsName = params.fieldsName ?? defaultFiledsName;
  const { url: urlKey } = fieldsName;
  /**
   * @description 上传前处理
   */
  const beforeUpload = async (file: File & { uid: string; url: string }) => {
    const { msg, path } = imageUploadHandler(file, {
      directoryPath,
      limit,
    });
    const warnMsg = msg || (items.length >= maxCount ? '已达到最大上传数量，不能继续上传！' : '');

    // 不是图片也不再限定尺寸内，则不显示图片
    if (warnMsg) {
      // 上传失败的文件不显示列表 https://github.com/ant-design/ant-design/issues/15561#issuecomment-475108235
      message.warning(warnMsg);
      return Upload.LIST_IGNORE;
    }

    try {
      // @ts-ignore
      const result = await window.__oss__?.put(path, file);
      file[urlKey] = result.url;
    } catch (err) {
      console.error(err);
      message.error('上传失败！');
      return Upload.LIST_IGNORE;
    }

    // 不调用默认的上传方法
    return false;
  };

  return (
    <div className={styles.dragContainer} style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
      <Dragger
        style={{ width: '100%' }}
        {...props}
        // @ts-ignore
        fileList={items}
        maxCount={maxCount}
        multiple={props.multiple !== false}
        showUploadList={false}
        // @ts-ignore
        beforeUpload={beforeUpload}
        // customRequest={customRequest}
        onChange={params.onChange}
        // directory // 允许文件夹上传
        id="multiple-uploader-dragger">
        {/* 加上div和onClick事件，是为了防止SortableItem拖动后出发了Dragger的点击事件 */}
        <div className={styles.listContainer}>
          <div className={styles.imgList} onClick={e => e.stopPropagation()}>
            {items?.map?.((item, index) => (
              <SortableItem
                key={`${item[urlKey]}`}
                index={index}
                // @ts-ignore
                item={item}
                props={props}
                onPreview={params.onPreview}
                onRemove={params.onRemove}
                fieldsName={fieldsName}
              />
            ))}

            {/* 方框上传提示，有图片时显示 */}
            {items.length > 0 && items.length < maxCount && !params.props.disabled && (
              <div
                className={styles.uploadItem}
                onClick={() => {
                  // 主动触发Dragger点击选择，弹出选择窗口
                  document.getElementById('multiple-uploader-dragger')?.dispatchEvent(mouseEvent);
                }}>
                <p>
                  <PlusOutlined />
                </p>
                <p>上传图片</p>
              </div>
            )}
          </div>
        </div>
        {/* 默认上传提示，无图片时显示 */}
        {items.length <= 0 && (
          <div className={styles.uploadTips}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: '60px' }} />
            </p>
            <p className="ant-upload-text">点击或者将文件拖到此区域进行上传</p>
            {/* <p className="ant-upload-hint">最多可上传{maxCount}张png/jpg/jpeg/gif格式文件</p> */}
          </div>
        )}
        {props.children}
        {/* 最大上传数提示 */}
        <p className={styles.maxTips}>
          最多可上传<span className="primary">{maxCount}</span>张图片，还可以上传
          <span className="primary">{maxCount - items.length}</span>张。
        </p>
      </Dragger>
    </div>
  );
});

const MultipleImageUpload: React.FC<Props> = memo(({ value, onChange, ...props }) => {
  const fieldsName = props.fieldsName ?? defaultFiledsName;
  const { id: idKey, url: urlKey } = fieldsName;
  const [fileList, setFileList] = useState<UploadFile[] | Record<string, any>[]>([]);

  const triggerChange = (list: UploadFile[] | Record<string, any>[]) => {
    if (!value) {
      setFileList(list);
    }
    onChange?.(
      list.map(item => {
        if (item[idKey]) {
          return {
            [idKey]: item[idKey],
            [urlKey]: item[urlKey],
          };
        }
        return {
          [urlKey]: item[urlKey],
        };
      }),
    );
  };

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const newFileList = arrayMove(fileList, oldIndex, newIndex);
    triggerChange(newFileList);
  };

  const onSortTableChange = ({ fileList: newFileList }: UploadChangeParam) => {
    triggerChange(newFileList);
  };

  /**
   * @description 处理图片删除
   */
  const onRemove = (file: UploadFile) => {
    const newFileList = (value ?? fileList)?.filter(item => item.uid !== file.uid);
    triggerChange(newFileList);
  };

  /**
   * @description 图片放大查看器
   */
  const onPreview = async (file: UploadFile) => {
    // 找出默认下标
    const index = (value ?? fileList)?.findIndex(item => item[urlKey] === file[urlKey]);
    createViewer(
      (value ?? fileList)?.map?.(item => item[urlKey] as string),
      index,
    );
  };

  return (
    <SortableList
      // 当移动 1 之后再触发排序事件，默认是0，会导致无法触发图片的预览和删除事件
      distance={1}
      items={value ?? fileList}
      onSortEnd={onSortEnd}
      axis="xy"
      helperClass="SortableHelper"
      props={{
        disabled: props.disabled,
        directoryPath: props.directoryPath,
        showUid: props.showUid,
        maxCount: props.maxCount,
      }}
      fieldsName={fieldsName}
      onChange={onSortTableChange}
      onRemove={onRemove}
      onPreview={onPreview}
    />
  );
});

export default MultipleImageUpload;
