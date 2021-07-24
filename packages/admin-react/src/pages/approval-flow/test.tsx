import AppTable from '@/components/AppTable';
import RouterPrompt from '@/components/RouterPrompt';
import { ModalForm, ProFormField } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message } from 'antd';
import ConfigProvider from 'antd/es/config-provider';
import type { FC } from 'react';
import { useState } from 'react';

type Test2 = {
  id: string;
  name: string;
  title: string;
};
const Test: FC = () => {
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const data = [
    { id: 1, name: 'test', value: 'fd' },
    { id: 2, name: 'test', value: 'fd' },
    { id: 3, name: 'test', value: 'fd' },
  ];
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'name', dataIndex: 'name', key: 'name' },
    { title: 'value', dataIndex: 'value', key: 'value' },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <Button type="link" onClick={() => setVisible(true)}>
          修改
        </Button>
      ),
    },
  ];
  return (
    <RouterPrompt
      when={isEdited}
      onOk={() => {
        console.log('ok');
      }}>
      <PageContainer title="全局配置测试">
        <AppTable<Test2>
          columns={columns}
          request={async () => {
            await new Promise((resolve, reject) => {
              setTimeout(() => resolve(true), 1000);
            });
            return {
              data,
              success: true,
              total: 50,
            };
          }}
          toolbar={{
            multipleLine: true,
            position: 'top',
            tabs: {
              items: [
                {
                  key: 'tab1',
                  tab: '标签一',
                },
                {
                  key: 'tab2',
                  tab: '标签二',
                },
              ],
            },
          }}
          search={{
            syncToUrl: true,
            syncToInitialValues: false,
          }}
          toolBarRender={() => [<Button type="primary">新增xx</Button>]}
          options={{
            // 下载链接
            // download: 'https://www.baidu.com',
            // 或者自定义的下载方法
            download: () => {
              message.info('下载中...');
              return new Promise(resolve => {
                setTimeout(() => resolve(true), 2000);
              });
            },
            // 传id形式
            // mark: 1,
            // 自处理备注保存方法
            mark: async () => {
              return new Promise(resolve => {
                setTimeout(() => resolve(true), 1000);
              });
            },
          }}
        />
        <ModalForm
          visible={visible}
          onVisibleChange={setVisible}
          onFinish={async value => {
            console.log(value);
            return true;
          }}
          onChange={() => {
            if (isEdited) {
              return;
            }
            console.log('表单修改了');
            setIsEdited(true);
          }}>
          <ProFormField name="test1" label="表单1" />
          <ProFormField name="test2" label="表单2" />
        </ModalForm>
      </PageContainer>
    </RouterPrompt>
  );
};

export default Test;
