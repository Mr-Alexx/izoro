import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

const Tags: FC = () => {
  const [tagsData, setTagsData] = useState<string[]>(['关键词1', '关键词2', '关键词3']);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [editInputIndex, setEditInputIndex] = useState<number>(-1);
  const [editInputValue, setEditInputValue] = useState<string>('');
  const saveInputRef = useRef<Input | null>(null);
  const saveEditInputRef = useRef<Input | null>(null);

  const handleClose = (removedTag: string) => {
    const tags = tagsData.filter(tag => tag !== removedTag);
    console.log(removedTag);
    setTagsData(tags);
  };

  useEffect(() => {
    if (inputVisible && saveInputRef.current) {
      console.log(saveInputRef.current);
      saveInputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    saveEditInputRef.current?.focus();
  }, [editInputIndex]);

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tags = tagsData;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tagsData, inputValue];
    }

    setTagsData(tags);
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: any) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tagsData];
    newTags[editInputIndex] = editInputValue;

    setTagsData(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  //   saveInputRef = input => {
  //     this.input = input;
  //   };

  //   saveEditInputRef = input => {
  //     this.editInput = input;
  //   };

  return (
    <>
      {tagsData.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={saveEditInputRef}
              key={tag}
              size="small"
              className={styles.tagInput}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag className={styles.editInput} key={tag} closable={index !== 0} onClose={() => handleClose(tag)}>
            <span
              onDoubleClick={e => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  // saveEditInputRef.current?.focus();
                  e.preventDefault();
                }
              }}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          className={styles.tagInput}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className={styles.siteTagplus} onClick={showInput}>
          <PlusOutlined /> New Keyword
        </Tag>
      )}
    </>
  );
};

export default Tags;
