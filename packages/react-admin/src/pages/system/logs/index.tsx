/**
 * @description 账号管理页
 */

import type { FC } from 'react';
import type { FormInstance } from 'antd';
import { Button, message } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ProFormText, ProFormSelect, ModalForm, ProFormRadio } from '@ant-design/pro-form';
import { getBusinessList, getRegisteredLogs, registerLog, editRegisteredLog } from '@/services/system';
import { useState, useRef } from 'react';
import { ACTIONS } from '@/constants';
import { Access, useAccess, useRequest } from 'umi';

/**
 * @description hooks形式的函数式组件
 * @see https://juejin.cn/post/6944863057000529933
 */
const Logs: FC = () => {
  // 业务类型选择列表
  const [workTypeList, setWorkTypeList] = useState<any[]>([]);

  // 当前操作行
  const [currentRow, setCurrentRow] = useState<SYSTEM_API.RegisteredLogItem | undefined>();

  // 当前操作状态
  const [actionType, setActionType] = useState<number>(ACTIONS.view);

  // 查看/编辑/新增表单弹窗
  const [modalVisible, updateModalVisible] = useState<boolean>(false);

  // 表单弹窗标题
  const [modalTitle, setModalTitle] = useState<string>('新增日志');

  const formRef = useRef<FormInstance>();

  const actionRef = useRef<ActionType>();

  const access = useAccess();

  const typeList = [
    { label: '业务', value: 1 },
    { label: '审批', value: 2 },
  ];

  // 初始化业务类型选择列表
  useRequest(() => getBusinessList({ current: 1, pageSize: 100 }), {
    onSuccess: data => {
      setWorkTypeList(
        // @ts-ignore
        data.map(v => ({
          value: v.id,
          label: `${v.name} (${v.code})`,
        })),
      );
    },
  });

  /**
   * @description 编辑/添加账号
   */
  const submit = async (value: SYSTEM_API.EditLogParams): Promise<boolean> => {
    let msg: string = '';
    try {
      if (actionType === ACTIONS.add) {
        msg = '新增日志成功!';
        await registerLog(value);
      } else {
        await editRegisteredLog({ ...value, id: currentRow?.id as number });
        msg = `编辑成功`;
      }
      message.success(msg);
      updateModalVisible(false);
      // 刷新列表
      actionRef.current?.reload();
    } catch (err) {
      console.error(err);
      return false;
      // message.error(err.message);
    }
    return true;
  };

  // 表头数据（列）
  const columns: ProColumns<SYSTEM_API.RegisteredLogItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'center',
      valueType: 'index',
    },
    {
      title: '业务类型',
      dataIndex: 'work_id',
      key: 'work_id',
      align: 'center',
      valueType: 'select',
      fieldProps: {
        options: workTypeList,
      },
    },
    {
      title: '表名',
      ellipsis: true,
      dataIndex: 'table_name',
      key: 'table_name',
      align: 'center',
      valueType: 'text',
    },
    {
      title: '前端路由',
      ellipsis: true,
      dataIndex: 'front_route',
      key: 'front_route',
      align: 'center',
      valueType: 'text',
    },
    {
      title: '是否主表',
      ellipsis: true,
      dataIndex: 'main_table',
      key: 'main_table',
      align: 'center',
      search: false,
      render: (_, row) => {
        return <span>{row.main_table === -1 ? '-' : row.main_table === 0 ? '否' : '是'}</span>;
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      valueType: 'select',
      render: (_, row) => {
        return <span>{row.type === 1 ? '业务' : '审批'}</span>;
      },
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: '操作',
      width: 80,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Access key="edit" accessible={access.system.user.edit}>
          <a
            onClick={() => {
              setCurrentRow(row);
              setModalTitle(`编辑日志注册 - ${row.id}`);
              setActionType(ACTIONS.edit);
              updateModalVisible(true);
            }}>
            编辑
          </a>
        </Access>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<SYSTEM_API.RegisteredLogItem, APP.TablePagination>
        actionRef={actionRef}
        sticky
        headerTitle="日志注册列表"
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Access key="primary" accessible={access.system.user.create}>
            <Button
              type="primary"
              onClick={() => {
                setCurrentRow(undefined);
                setModalTitle('新增日志');
                setActionType(ACTIONS.add);
                updateModalVisible(true);
              }}>
              新增日志
            </Button>
          </Access>,
        ]}
        columns={columns}
        request={getRegisteredLogs}
        options={{
          fullScreen: true,
          reload: true,
          setting: true,
          density: true,
        }}
      />

      {/* 查看、编辑、新增角色 */}
      <ModalForm
        formRef={formRef}
        modalProps={{
          destroyOnClose: true,
        }}
        title={modalTitle}
        width="500px"
        visible={modalVisible}
        onVisibleChange={updateModalVisible}
        initialValues={{
          work_id: currentRow?.work_id,
          table_name: currentRow?.table_name,
          front_route: currentRow?.front_route,
          main_table: currentRow?.main_table === 0 ? 0 : 1,
          type: currentRow?.type || 1,
        }}
        onFinish={submit}
        labelCol={{ span: 4 }}
        layout="horizontal">
        <ProFormSelect
          name="work_id"
          label="业务类型"
          placeholder="请选择业务类型"
          rules={[{ required: true }]}
          options={workTypeList}
        />

        <ProFormText name="table_name" label="表名" placeholder="请输入表名" rules={[{ required: true }]} />
        <ProFormText
          name="front_route"
          label="前端路由"
          placeholder="请输入前端路由地址"
          rules={[{ required: true }]}
        />
        <ProFormRadio.Group
          name="main_table"
          label="是否主表"
          options={[
            { label: '是', value: 1 },
            { label: '否', value: 0 },
          ]}
        />
        <ProFormSelect
          name="type"
          label="日志类型"
          placeholder="请选择日志类型"
          key="type"
          options={typeList}
          allowClear={false}
          rules={[{ required: true }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default Logs;
