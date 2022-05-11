import AppPageContainer from '@/components/AppPageContainer';
import AppTable from '@/components/AppTable';
import ConfirmButton from '@/components/Button/ConfirmButton';
import TooltipButton from '@/components/Button/TooltipButton';
import { ACTIONS } from '@/constants';
import { addCategory, deleteCategory, editCategory, getCategories } from '@/services/category';
import ProForm, { ModalForm, ProFormText, ProFormTreeSelect } from '@ant-design/pro-form';
import type { ProColumnType } from '@ant-design/pro-table';
import { Button, FormInstance, message, Popconfirm, Space } from 'antd';
import { useState, useMemo, useRef } from 'react';
import { Access, useAccess } from 'umi';

const CategoryPage = () => {
  const [visible, setVisible] = useState<boolean>();
  const [title, setTitle] = useState<string>();
  const formRef = useRef<FormInstance>();
  // const [currentRow, setCurrentRow] = useState<CategoryApi.Category>();
  // const title = useMemo(() => {
  //   return currentRow?.id ? '新增分类' : `编辑分类 - ${currentRow?.name}`;
  // }, [currentRow]);
  const access = useAccess();

  const columns: ProColumnType<CategoryApi.Category>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      width: 80,
    },
    {
      title: '层级',
      dataIndex: 'level',
      search: false,
      align: 'center',
      width: 80,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      search: false,
      valueType: 'dateTime',
      align: 'center',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      search: false,
      valueType: 'dateTime',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'option',
      width: 100,
      fixed: 'right',
      render: (_, row) => {
        return (
          <Space size={5}>
            <Access key="edit" accessible={access.system.role.edit}>
              <TooltipButton iconType="add" title="新增子分类" onClick={() => handleAction(ACTIONS.add)} />
            </Access>
            <Access key="edit" accessible={access.system.role.edit}>
              <TooltipButton iconType="edit" title="编辑分类" onClick={() => handleAction(ACTIONS.edit, row)} />
            </Access>

            <Access key="del" accessible={access.system.role.edit}>
              <ConfirmButton
                iconType="delete"
                title={`确定要删除分类 ${row.name} 吗？`}
                onConfirm={() => handleAction(ACTIONS.del, row)}
              />
            </Access>
          </Space>
        );
      },
    },
  ];

  /**
   * 处理操作
   * @param {ACTIONS} action 操作
   * @param {CategoryApi.Category} record 行记录
   * @return {void | boolean} boolean用于popconfirm异步关闭
   */
  const handleAction = (action: ACTIONS, record?: CategoryApi.Category): void | boolean => {
    switch (action) {
      case ACTIONS.edit:
      case ACTIONS.add:
        formRef.current?.setFieldsValue({
          id: record?.id,
          name: record?.name,
          pid: record?.pid,
        });
        setTitle(record?.id ? '新增分类' : `编辑分类 - ${record?.name}`);
        setVisible(true);
        break;
      case ACTIONS.del:
        deleteCategory(record?.id as number).then(tip => message.success(tip));
        break;
    }
  };

  /** 处理新增/编辑 */
  const submit = async (formVal: CategoryApi.CategoryEditDto) => {
    try {
      const data = formVal.id ? await addCategory(formVal) : await editCategory(formVal);
      console.log(data);
      message.success(`${formVal.id ? '编辑' : '新增'}成功！`);
      return true;
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  return (
    <AppPageContainer>
      <AppTable
        columns={columns}
        request={getCategories}
        toolBarRender={() => [
          <Button key="add" type="primary">
            新增分类
          </Button>,
        ]}
      />
      <ModalForm
        formRef={formRef}
        title={title}
        visible={visible}
        onVisibleChange={setVisible}
        onFinish={submit}
        layout="horizontal">
        <ProForm.Item name="id" hidden />
        <ProFormText name="name" label="分类名称" rules={[{ required: true, message: '分类名称必填' }]} />
        <ProFormTreeSelect name="pid" label="父类" rules={[{ required: true, message: '父类必选' }]} />
      </ModalForm>
    </AppPageContainer>
  );
};

export default CategoryPage;
