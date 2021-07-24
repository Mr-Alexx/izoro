import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import FlowGraph from './components/Graph';
import ToolBar from './components/ToolBar';
import ConfigPanel from './components/ConfigPanel';
import './global.less';
import styles from './index.less';
import { Button } from 'antd';
import type { FormInstance } from 'antd';
import type { Cell, Graph } from '@antv/x6';
import type { Properties } from '@antv/x6/lib/types/csstype';
import { getContainerSize } from './utils';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useRouteMatch } from 'react-router-dom';
import testData, { workList, modelList } from './test';

const ApprovalEditPage: FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [graph, setGraph] = useState<Graph>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [data, setData] = useState<SYSTEM_API.ApprovalItem>();
  const router = useRouteMatch();
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    const id = router.params?.id;
    const instance = FlowGraph.init(id);
    setIsEdit(!!id);
    setGraph(instance);
    setIsReady(true);
    let initData = null;
    console.log(id);
    // 编辑时，初始数据
    if (id) {
      // 获取数据
      initData = testData.find(v => v.id === Number(id));

      formRef.current?.setFieldsValue({
        name: initData?.name,
        work_id: initData?.work_id,
        model: initData?.model,
        front_route: initData?.front_route,
        status: initData?.status === 0 ? 0 : 1,
      });
    } else {
      initData = {
        front_end: null,
        back_end: null,
      };
    }
    setData(initData);

    const resizeFn = () => {
      const { width, height } = getContainerSize();
      instance.resize(width, height);
    };
    resizeFn();

    window.addEventListener('resize', resizeFn);
    return () => {
      window.removeEventListener('resize', resizeFn);
    };
  }, []);

  const formatData = (graphData: Cell.Properties[] | undefined): Record<string, any>[] => {
    if (!graphData) {
      return [];
    }
    // 移除线节点和开始节点
    const nodes = graphData.filter(v => v.shape !== 'edge');
    return nodes.map(item => {
      return {
        ...item.data.form,
        id: item.id,
      };
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        {/* <span className={styles.headerTitle}>{!isEdit ? '新增审批流' : '编辑审批流'}:</span> */}
        <ProForm
          formRef={formRef}
          className={styles.headerForm}
          layout="horizontal"
          submitter={{
            render: false,
          }}
          // 保存最终触发的方法
          onFinish={async value => {
            try {
              const graphData = graph?.toJSON();
              // 按照后端接收的格式格式化数据
              const nodes = formatData(graphData?.cells);
              const formData = {
                frontend: graphData,
                backend: {
                  ...value,
                  nodes,
                },
              };
              console.log('上传的数据', formData);
            } catch (err) {
              console.error(err);
            }
          }}>
          <ProForm.Group>
            <ProFormText label="名称" name="name" rules={[{ required: true }]} />
            <ProFormSelect
              label="业务类型"
              name="work_id"
              options={workList}
              rules={[{ required: true }]}
              disabled={isEdit}
            />
            <ProFormSelect
              label="模型"
              name="model"
              options={modelList}
              rules={[{ required: true }]}
              disabled={isEdit}
            />
            <ProFormText label="前端路由" name="front_route" rules={[{ required: true }]} />
            {/* 编辑时不能修改状态，修改状态单独提供接口在审批流列表修改 */}
            <ProFormSelect
              disabled={isEdit}
              label="状态"
              name="status"
              rules={[{ required: true }]}
              options={[
                { value: 0, label: '禁用' },
                { value: 1, label: '启用' },
              ]}
            />
          </ProForm.Group>
        </ProForm>
        <Button className={styles.headerButton} type="primary" key="submit" onClick={() => formRef.current?.submit?.()}>
          保存
        </Button>
        {/* <Button
          type="primary"
          onClick={() => {
            const sourceData: Properties[] = graph?.toJSON().cells || [];
            const res: Record<string, any>[] = [];
            formatData(res, sourceData, '起始节点');
            console.log('结果', res);
          }}>
          格式化数据
        </Button> */}
      </div>
      <div className={styles.content}>
        {/* 左侧快捷选择栏 */}
        <div id="stencil" className={styles.sider} />

        {/* 绘图区 */}
        <div className={styles.panel}>
          <div className={styles.toolbar}>{isReady && <ToolBar />}</div>
          <div id="container" className="x6-graph" />
        </div>

        {/* 右侧配置栏 */}
        <div className={styles.config}>{isReady && <ConfigPanel />}</div>
      </div>
    </div>
  );
};

export default ApprovalEditPage;
