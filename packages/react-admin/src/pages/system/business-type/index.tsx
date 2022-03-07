/**
 * @description 业务类型管理页
 */

import type { FC } from 'react';
import type { FormInstance } from 'antd';
import { Button, message } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ProFormText, ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { getBusinessList, createBusiness, editBusiness } from '@/services/system';
import { useState, useRef } from 'react';
import { ACTIONS } from '@/constants';
import { Access, useAccess } from 'umi';

/**
 * @description hooks形式的函数式组件
 * @see https://juejin.cn/post/6944863057000529933
 */
const BusinessType: FC = () => {
  // 当前操作行
  const [currentRow, setCurrentRow] = useState<SYSTEM_API.BusinessItem | undefined>();

  // 当前操作状态
  const [actionType, setActionType] = useState<number>(ACTIONS.view);

  // 查看/编辑/新增表单弹窗
  const [modalVisible, updateModalVisible] = useState<boolean>(false);

  // 表单弹窗标题
  const [modalTitle, setModalTitle] = useState<string>('新增业务类型');

  const formRef = useRef<FormInstance>();

  const actionRef = useRef<ActionType>();

  const access = useAccess();
  /**
   * @description 编辑/添加账号
   */
  const submit = async (value: SYSTEM_API.EditBusinessParams): Promise<boolean> => {
    let msg: string = '';
    try {
      if (actionType === ACTIONS.add) {
        msg = '新增业务类型成功!';
        await createBusiness(value);
      } else {
        msg = `编辑业务类型成功`;
        await editBusiness({ ...value, id: currentRow?.id as number });
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

  // 表头数据（列）
  const columns: ProColumns<SYSTEM_API.BusinessItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'center',
      valueType: 'index',
    },
    {
      title: '业务名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '标识',
      ellipsis: true,
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      valueType: 'text',
    },
    {
      title: '描述',
      ellipsis: true,
      dataIndex: 'desc',
      key: 'desc',
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
      width: 80,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <Access key="edit" accessible={access.system.business.edit}>
          <a
            onClick={() => {
              setCurrentRow(row);
              setModalTitle(`编辑业务类型 - ${row.id}`);
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
      <ProTable<SYSTEM_API.BusinessItem, APP.TablePagination>
        actionRef={actionRef}
        sticky
        headerTitle="业务类型列表"
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Access key="primary" accessible={access.system.business.create}>
            <Button
              type="primary"
              onClick={() => {
                setCurrentRow(undefined);
                setModalTitle('新增业务类型');
                setActionType(ACTIONS.add);
                updateModalVisible(true);
              }}>
              新增业务类型
            </Button>
          </Access>,
        ]}
        columns={columns}
        request={getBusinessList}
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
          name: currentRow?.name,
          code: currentRow?.code,
          desc: currentRow?.desc,
        }}
        onFinish={submit}
        labelCol={{ span: 4 }}
        layout="horizontal">
        <ProFormText name="name" label="业务名称" placeholder="请输入业务名称" rules={[{ required: true }]} />
        <ProFormText name="code" label="标识" placeholder="请输入标识" rules={[{ required: true }]} />
        <ProFormTextArea name="desc" label="描述" placeholder="请输入描述" />
      </ModalForm>
    </PageContainer>
  );
};

export default BusinessType;
