import type { FC } from 'react';
import AppPageContainer from '@/components/AppPageContainer';
import AppTable from '@/components/AppTable';
import type { ProColumns } from '@ant-design/pro-table';
import { getSchedules, getScheduleMethods, addSchedule } from '@/services/system';
import { Button, Col, message, Row, Space } from 'antd';
import ProForm, {
  ModalForm,
  ProFormDigit,
  ProFormText,
  ProFormSelect,
  ProFormGroup,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useState } from 'react';
import { Access, useAccess, useRequest } from 'umi';
import { values } from 'lodash';
import { editSchedule } from '../../../services/system/index';

// const types = [
//   { label: '间隔执行', value: 0 },
//   { label: '定时执行', value: 1 },
// ];

const CRON_TIMES_LIST = [
  { label: '秒', index: 0, default: '*' },
  { label: '分', index: 1, default: '*' },
  { label: '时', index: 2, default: '*' },
  { label: '日', index: 3, default: '*' },
  { label: '月', index: 4, default: '*' },
  { label: '周', index: 5, default: '*' },
];

const Schedule: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [methods, setMethods] = useState<{ value: string; label: string }[]>();
  // const [type, setType] = useState<number>(0);
  const [currentRow, setCurrentRow] = useState<SYSTEM_API.ScheduleItem>();
  const [cronTimes, setCronTimes] = useState<string[]>(['*', '*', '*', '*', '*', '*']);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const access = useAccess();

  useRequest(getScheduleMethods, {
    onSuccess: data => {
      setMethods(data);
    },
  });

  /**
   * @description 打开定时任务编辑窗
   */
  const openModal = (row?: SYSTEM_API.ScheduleItem) => {
    console.log(row);
    setCurrentRow(row);
    setVisible(true);
    setIsEdit(!!row);
    setCronTimes(currentRow?.cron_time ? currentRow?.cron_time?.split(' ') : ['*', '*', '*', '*', '*', '*']);
  };

  /**
   * @description 更改定时设置
   */
  const changeCronTime = (value: string, index: number) => {
    cronTimes[index] = value;
    setCronTimes([...cronTimes]);
    console.log(cronTimes, cronTimes.join(' '));
  };

  /**
   * @description 表单提交
   */
  const submit = async value => {
    const cron_time = cronTimes.join(' ');
    try {
      let msg = '新增成功！';
      if (!isEdit) {
        await addSchedule({ ...value, cron_time });
      } else {
        await editSchedule({ ...value, cron_time, id: currentRow?.id });
        msg = '编辑成功！';
      }
      message.success(msg);
      return true;
    } catch (err) {
      message.error(err.message);
    }
    return false;
  };

  const columns: ProColumns<SYSTEM_API.ScheduleItem>[] = [
    {
      title: '序号',
      width: 50,
      key: 'index',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '任务名称',
      width: 160,
      key: 'name',
      align: 'center',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '任务描述',
      width: 200,
      key: 'description',
      align: 'center',
      dataIndex: 'description',
      valueType: 'text',
    },
    {
      title: '调用方法',
      width: 140,
      key: 'method',
      align: 'center',
      dataIndex: 'method',
      valueType: 'text',
      search: false,
    },
    {
      title: '最大运行时间',
      width: 120,
      key: 'max_run_time',
      align: 'center',
      dataIndex: 'max_run_time',
      valueType: 'text',
      search: false,
    },
    {
      title: '运行Timer',
      key: 'cron_time',
      width: 120,
      align: 'center',
      dataIndex: 'cron_time',
      valueType: 'text',
      search: false,
    },
    {
      title: '运行状态',
      key: 'run_status',
      align: 'center',
      width: 80,
      dataIndex: 'run_status',
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '未运行', value: 0 },
          { label: '运行中', value: 1 },
        ],
      },
    },
    {
      title: '任务状态',
      key: 'status',
      align: 'center',
      width: 80,
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '禁用',
          status: 'Error',
        },
        1: {
          text: '启用',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      width: 180,
      key: 'created_at',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      width: 180,
      key: 'updated_at',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 160,
      fixed: 'right',
      key: 'operation',
      render: (text, row) => {
        const actions = [
          <Access key="view" accessible={access.system.schedule.view}>
            <a>查看</a>
          </Access>,
          <Access key="edit" accessible={access.system.schedule.edit}>
            <a>编辑</a>
          </Access>,
        ];
        if (row.status === 0) {
          actions.push(
            <Access key="start" accessible={access.system.schedule.start}>
              <a>启动</a>
            </Access>,
          );
        } else {
          actions.push(
            <Access key="stop" accessible={access.system.schedule.stop}>
              <a>停止</a>
            </Access>,
          );
        }
        actions.push(
          <Access key="reset" accessible={access.system.schedule.reset}>
            <a>重置</a>
          </Access>,
        );
        return actions;
      },
    },
  ];

  return (
    <AppPageContainer>
      <AppTable<SYSTEM_API.ScheduleItem>
        columns={columns}
        request={getSchedules}
        scroll={{ x: 1200 }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => openModal()}>
            新增定时任务
          </Button>,
        ]}
      />

      <ModalForm
        title={!isEdit ? '新增定时任务' : `编辑定时任务 - ${currentRow?.name}`}
        visible={visible}
        onVisibleChange={setVisible}
        layout="horizontal"
        labelCol={{ span: 3 }}
        onFinish={submit}
        initialValues={{
          name: currentRow?.name,
          method: currentRow?.method,
          max_run_time: currentRow?.max_run_time,
          status: Number(currentRow?.status) === 0 ? 0 : 1,
          // cron_time: currentRow?.cron_time,
        }}>
        <ProFormText name="name" label="任务名称" rules={[{ required: true }]} />
        <ProFormTextArea name="description" label="任务描述" />
        <ProFormSelect name="method" label="调用方法" options={methods} rules={[{ required: true }]} />
        <ProFormDigit name="max_run_time" label="最大运行时间" />
        <ProFormSelect
          name="status"
          label="任务状态"
          rules={[{ required: true }]}
          options={[
            { value: 0, label: '禁用' },
            { value: 1, label: '启用' },
          ]}
        />
        {/* <ProFormSelect name="type" label="任务类型" options={types} fieldProps={{ onChange: setType }} /> */}
        <ProForm.Item label="定时设置">
          <Row gutter={20}>
            {CRON_TIMES_LIST.map(item => (
              <Col xs={12} sm={8} key={item.index}>
                <ProFormText
                  label={item.label}
                  fieldProps={{
                    value: cronTimes[item.index],
                    onChange: e => changeCronTime(e.target.value, item.index),
                  }}
                />
              </Col>
            ))}
          </Row>
        </ProForm.Item>
      </ModalForm>
    </AppPageContainer>
  );
};

export default Schedule;
