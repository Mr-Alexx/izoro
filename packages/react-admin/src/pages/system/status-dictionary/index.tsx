/**
 * @description 状态字典管理页
 */

import type { FC } from 'react';
import type { FormInstance } from 'antd';
import { Popconfirm } from 'antd';
import { Button, message } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ProFormText, ModalForm, ProFormTextArea, ProFormDigit } from '@ant-design/pro-form';
import { getStatusList, createStatus, editStatus, deleteStatus } from '@/services/system';
import { useState, useRef } from 'react';
import { ACTIONS } from '@/constants';
import { Access, useAccess } from 'umi';

/**
 * @description hooks形式的函数式组件
 * @see https://juejin.cn/post/6944863057000529933
 */
const StatusDictionary: FC = () => {
  // 当前操作行
  const [currentRow, setCurrentRow] = useState<SYSTEM_API.StatusItem | undefined>();

  // 当前操作状态
  const [actionType, setActionType] = useState<number>(ACTIONS.view);

  // 查看/编辑/新增表单弹窗
  const [modalVisible, updateModalVisible] = useState<boolean>(false);

  // 表单弹窗标题
  const [modalTitle, setModalTitle] = useState<string>('新增状态字典');

  const formRef = useRef<FormInstance>();

  const actionRef = useRef<ActionType>();

  const access = useAccess();

  /**
   * @description 编辑/添加状态字典
   */
  const submit = async (value: SYSTEM_API.EditStatusParams): Promise<boolean> => {
    let msg: string = '';
    try {
      if (actionType === ACTIONS.add) {
        msg = '新增状态字典成功!';
        await createStatus(value);
      } else {
        msg = `编辑状态字典成功`;
        await editStatus({ ...value, id: currentRow?.id as number });
      }
      message.success(msg);
      updateModalVisible(false);
      // 刷新列表
      actionRef.current?.reload();
    } catch (err) {
      console.error(err);
      // message.error(err.message);
    }
    return true;
  };

  /**
   * @description 删除状态字典
   */
  const deleteItem = async (row: SYSTEM_API.StatusItem) => {
    try {
      await deleteStatus({ id: row?.id as number });
      message.success('删除成功！');
      actionRef.current?.reload();
    } catch (err) {
      message.error(err.message);
    }
  };

  // 表头数据（列）
  const columns: ProColumns<SYSTEM_API.StatusItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'center',
      valueType: 'index',
    },
    {
      title: '表名',
      dataIndex: 'table_name',
      key: 'table_name',
      align: 'center',
    },
    {
      title: '字段名称',
      ellipsis: true,
      dataIndex: 'field',
      key: 'field',
      align: 'center',
      valueType: 'text',
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
      valueType: 'text',
      search: false,
    },
    {
      title: '含义',
      ellipsis: true,
      dataIndex: 'meaning',
      key: 'meaning',
      align: 'center',
      valueType: 'text',
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
      width: 100,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Access key="edit" accessible={access.system.dictionary.edit}>
          <a
            onClick={() => {
              setCurrentRow(row);
              setModalTitle(`编辑状态字典 - ${row.id}`);
              setActionType(ACTIONS.edit);
              updateModalVisible(true);
            }}>
            编辑
          </a>
        </Access>,
        <Access key="delete" accessible={access.system.dictionary.delete}>
          <Popconfirm placement="bottomRight" title="确定要删除该字典吗？" onConfirm={() => deleteItem(row)}>
            <a>删除</a>
          </Popconfirm>
        </Access>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<SYSTEM_API.StatusItem, APP.TablePagination>
        actionRef={actionRef}
        sticky
        headerTitle="状态字典列表"
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Access key="primary" accessible={access.system.dictionary.create}>
            <Button
              type="primary"
              onClick={() => {
                setCurrentRow(undefined);
                setModalTitle('新增状态字典');
                setActionType(ACTIONS.add);
                updateModalVisible(true);
              }}>
              新增状态字典
            </Button>
          </Access>,
        ]}
        columns={columns}
        request={getStatusList}
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
          table_name: currentRow?.table_name,
          field: currentRow?.field,
          value: currentRow?.value,
          meaning: currentRow?.meaning,
        }}
        onFinish={submit}
        labelCol={{ span: 4 }}
        layout="horizontal">
        <ProFormText name="table_name" label="表名" placeholder="请输入表名" rules={[{ required: true }]} />
        <ProFormText name="field" label="字段名称" placeholder="请输入字段名称" rules={[{ required: true }]} />
        <ProFormDigit name="value" label="值" placeholder="请输入值" rules={[{ required: true }]} />
        <ProFormTextArea name="meaning" label="含义" placeholder="请输入含义" rules={[{ required: true }]} />
      </ModalForm>
    </PageContainer>
  );
};

export default StatusDictionary;
