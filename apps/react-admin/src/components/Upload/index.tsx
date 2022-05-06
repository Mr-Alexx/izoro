/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useRef, useEffect } from 'react';

import { Upload, Button, Tooltip, Modal } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';

import type { FileInfo, propsType } from './data';

const type = 'DragableUploadList';

const DragableUploadListItem = ({
  originNode,
  moveRow,
  file,
  fileList1,
}: {
  originNode: any;
  moveRow: any;
  file: any;
  fileList1: any;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const index = fileList1.indexOf(file);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor: any) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  const errorNode = <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>;
  return (
    <div
      ref={ref}
      className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move' }}>
      {file.status === 'error' ? errorNode : originNode}
    </div>
  );
};

const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const UploadComponent: React.FC<propsType> = props => {
  const { list, handleChange } = props;

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    setFileList(list || []);
  }, [list]);

  // 拖拽排序顺序改变传递当前文件列表给父组件
  useEffect(() => {
    handleChange(fileList);
  }, [fileList, handleChange]);

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = fileList[dragIndex];
      setFileList(
        update(fileList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [fileList],
  );

  const onChange = (lists: any) => {
    console.log(lists.fileList);
    setFileList(lists.fileList);
    handleChange(lists);
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleCancel = () => setPreviewVisible(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      <DndProvider backend={HTML5Backend}>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          fileList={fileList}
          listType="picture-card"
          onPreview={handlePreview}
          multiple={true}
          onChange={onChange}
          itemRender={(originNode, file, currFileList) => (
            <DragableUploadListItem originNode={originNode} file={file} fileList1={currFileList} moveRow={moveRow} />
          )}>
          {uploadButton}
          {/* <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
        </p> */}
        </Upload>
      </DndProvider>
    </div>
  );
};

export default UploadComponent;
