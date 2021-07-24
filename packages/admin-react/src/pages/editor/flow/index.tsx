import { Button, Col, Row } from 'antd';
import GGEditor, { Flow } from 'gg-editor';

import { PageContainer } from '@ant-design/pro-layout';
import type { FC } from 'react';
import React, { useRef } from 'react';
import EditorMinimap from './components/EditorMinimap';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import { FlowItemPanel } from './components/EditorItemPanel';
import { FlowToolbar } from './components/EditorToolbar';
import styles from './index.less';

GGEditor.setTrackable(false);
const FlowEditor: FC = () => {
  const editorRef = useRef<any>(null);
  return (
    <PageContainer
      content="千言万语不如一张图，流程图是表示算法思路的好方法"
      extra={
        <Button onClick={() => console.log(editorRef.current, editorRef.current?.propsAPI?.save())}>
          查看数据格式
        </Button>
      }>
      <GGEditor ref={editorRef} className={styles.editor}>
        <Row className={styles.editorHd}>
          <Col span={24}>
            <FlowToolbar />
          </Col>
        </Row>
        <Row className={styles.editorBd}>
          <Col span={4} className={styles.editorSidebar}>
            <FlowItemPanel />
          </Col>
          <Col span={16} className={styles.editorContent}>
            <Flow className={styles.flow} />
          </Col>
          <Col span={4} className={styles.editorSidebar}>
            <FlowDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        <FlowContextMenu />
      </GGEditor>
    </PageContainer>
  );
};

export default FlowEditor;
