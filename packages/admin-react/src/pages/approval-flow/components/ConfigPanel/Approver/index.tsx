/**
 * @description 审批人设置表单
 */
import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import type { FormInstance, RadioChangeEvent } from 'antd';
import { Button, Col, Row } from 'antd';
import { Input } from 'antd';
import { AutoComplete } from 'antd';
import { message } from 'antd';
import { Cascader } from 'antd';
import { Tag } from 'antd';
import { Popconfirm } from 'antd';
import FlowGraph from '../../Graph';
import type { Cell } from '@antv/x6';
import type { ButtonActionItem, CommonNodeType, NodeForm } from '../typings';
import styles from './index.less';
import { EditableProTable } from '@ant-design/pro-table';
import { ProFormDigit, ProFormSelect, ProFormRadio, DrawerForm } from '@ant-design/pro-form';
import type { CascaderValueType } from 'antd/lib/cascader';
import { useGridAttr } from '@/pages/approval-flow/models/global';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { guid } from '@/pages/approval-flow/utils';

type IProps = {
  onClose: () => void;
};
// 模拟数据
const rpcOptions = [
  {
    value: 'users',
    label: 'users',
    children: [
      { value: 'getUsers', label: 'getUsers' },
      { value: 'addUser', label: 'addUser' },
    ],
  },
  {
    value: 'system',
    label: 'system',
    children: [
      { value: 'getXXX', label: 'getXXX' },
      { value: 'addXX', label: 'addXX' },
    ],
  },
];

// 预定义按钮名称类型
const nameOptions = [
  { value: '通过' },
  { value: '拒绝' },
  { value: '废弃' },
  { value: '接受' },
  { value: '确认' },
  { value: '取消' },
];
// 自定义按钮名称添加form item
const NameAutocomplete: FC<{
  value?: string | undefined;
  onChange?: (value: string | undefined) => void;
}> = ({ value, onChange }) => {
  const ref = useRef(null);
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const handleChange = (newVal: string | undefined) => {
    setInputValue(newVal);
    if (onChange) {
      onChange(newVal);
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <AutoComplete
      ref={ref}
      value={inputValue}
      options={nameOptions}
      placeholder="请输入名称"
      onChange={handleChange}></AutoComplete>
  );
};
// 自定义按钮添加的rpc和method编辑form item
const RpcSelector: FC<{
  options: Record<string, any>[];
  value?: CascaderValueType | undefined;
  onChange?: (value: CascaderValueType) => void;
}> = ({ value, options, onChange }) => {
  const ref = useRef<Cascader | null>(null);
  const [selectValue, setSelectValue] = useState<CascaderValueType | undefined>();

  useEffect(() => {
    setSelectValue(value);
  }, [value]);

  const handleChange = (newVal: CascaderValueType) => {
    setSelectValue(newVal);
    if (onChange) {
      onChange(newVal);
    }
  };

  return <Cascader ref={ref} options={options} value={selectValue} onChange={handleChange}></Cascader>;
};

const Approver: FC<CommonNodeType & IProps> = (props: CommonNodeType & IProps) => {
  const { id, onClose } = props;

  const cellRef = useRef<Cell>();
  const [form, setForm] = useState<NodeForm>();
  const [cellJson, setCellJson] = useState<Cell.Properties>();
  const [title, setTitle] = useState<string>('');
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const formRef = useRef<FormInstance>();
  const [tableData, setTableData] = useState<ButtonActionItem[]>([]);
  const [approvalType, setApprovalType] = useState<number>(3);
  const [visible, setVisible] = useState<boolean>(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const { roles, users } = useGridAttr();

  const changeType = (e: RadioChangeEvent) => {
    setApprovalType(e.target.value);
    formRef?.current?.setFieldsValue({ approver_ids: [] });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    setVisible(true);
    const { graph } = FlowGraph;
    const cell = graph.getCellById(`${id}`);
    console.log('cell', id, graph.toJSON());
    console.log(cell);
    const cellJsonData = cell.toJSON();
    setCellJson(cellJsonData);
    if (!cell || !cellJsonData.type) {
      return;
    }
    cellRef.current = cell;
    // 初始数据
    const nodeTitle = cell.getAttrs().title.text;
    setTitle(nodeTitle as string);
    setForm(cellJsonData.data.form);
    setTableData(cellJsonData.data.form?.action || []);
    setApprovalType(cellJsonData.data.form?.approver_type);
  }, [id]);

  const columns = [
    {
      title: '按钮名称',
      dataIndex: 'button_name',
      key: 'button_name',
      width: 160,
      renderFormItem: (_, row) => {
        return <NameAutocomplete />;
      },
    },
    {
      title: '服务和调用方法',
      dataIndex: 'rpcAndMethod',
      key: 'rpcAndMethod',
      renderFormItem: (_, row) => {
        return <RpcSelector options={rpcOptions} />;
      },
      render: (_, row) => {
        if (!row.rpc) {
          return '-';
        }
        return (
          <div>
            <span>{row.rpc}</span>: <Tag color="processing">{row.method}</Tag>
          </div>
        );
      },
    },
    {
      title: '下一节点',
      dataIndex: 'next_node_name',
      key: 'next_node_name',
      editable: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'operation',
      width: 140,
      render: (text, record, index, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.button_id);
          }}>
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定要删除该按钮吗？"
          onConfirm={() => {
            const remainActions = tableData.filter(v => v.button_id !== record.button_id);
            setTableData(remainActions);
            // 移除port
            // @ts-ignore
            cellRef.current.removePort({
              id: record.button_id,
              group: 'bottom',
            });
            // 重新赋值
            cellRef.current?.setData(
              {
                form: {
                  // @ts-ignore
                  ...cellRef.current?.getData()?.form,
                  action: remainActions,
                  type: 2,
                },
              },
              {
                overwrite: true,
              },
            );
          }}>
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <DrawerForm
      formRef={formRef}
      title={
        <div style={{ width: '50%', display: 'flex' }}>
          <div>
            {editTitle ? (
              <Input value={title} onChange={e => setTitle(e.target.value)} />
            ) : (
              <span style={{ lineHeight: '32px' }}>{title}</span>
            )}
          </div>
          <div style={{ marginLeft: 20 }}>
            {editTitle ? (
              <Button
                type="text"
                onClick={() => {
                  // 保存title到cell内
                  cellRef.current?.setAttrs({
                    title: {
                      text: title,
                    },
                  });
                  setEditTitle(false);
                }}>
                <SaveOutlined />
              </Button>
            ) : (
              <Button type="text" onClick={() => setEditTitle(true)}>
                <EditOutlined />
              </Button>
            )}
          </div>
        </div>
      }
      drawerProps={{
        destroyOnClose: true,
        // mask: false,
      }}
      visible={visible}
      onVisibleChange={(show: boolean) => {
        setVisible(show);
        if (!show && onClose) {
          onClose();
        }
      }}
      layout="horizontal"
      className={styles.drawerForm}
      labelCol={{ span: 4 }}
      submitter={{
        searchConfig: {
          resetText: '取消',
          submitText: '确定',
        },
      }}
      onFinish={async values => {
        // if (!tableData || tableData?.filter(v => v.button_name && v.rpc && v.method).length === 0) {
        //   message.warning('请添加操作按钮！');
        //   return false;
        // }
        const params = {
          ...values,
          approver_ids: values.approver_type === 3 ? [0] : values.approver_ids,
          action: tableData,
          type: 2,
        };

        const approverLabels =
          values.approver_type === 3
            ? ['上级审批']
            : values.approver_type === 1
            ? users.filter(v => values.approver_ids.includes(v.value)).map(v => v.label)
            : roles.filter(v => values.approver_ids.includes(v.value)).map(v => v.label);

        // 设置节点的文本
        cellRef.current?.setAttrs({
          text: {
            text: `${values.approver_type === 2 ? '审批角色' : '审批人'}：${approverLabels.join(', ')}`,
          },
        });
        // 附着数据
        cellRef.current?.setData(
          {
            form: params,
          },
          {
            overwrite: true,
          },
        );
        return true;
      }}
      initialValues={{
        approver_type: form?.approver_type || 3,
        approver_ids: form?.approver_ids,
        business_status: form?.business_status,
      }}>
      <ProFormRadio.Group
        label="审批人类型"
        name="approver_type"
        rules={[{ required: true }]}
        options={[
          { label: '指定人员', value: 1 },
          { label: '角色', value: 2 },
          { label: '上级审批', value: 3 },
        ]}
        fieldProps={{
          onChange: changeType,
        }}
      />
      {/* 上级审批固定为[0] */}
      {approvalType === 1 && (
        <ProFormSelect
          label="审批人"
          name="approver_ids"
          rules={[{ required: true }]}
          mode="multiple"
          options={users}
          placeholder="请选择审批人"
        />
      )}
      {approvalType === 2 && (
        <ProFormSelect
          label="审批角色"
          name="approver_ids"
          rules={[{ required: true }]}
          mode="multiple"
          options={roles}
          placeholder="请选择审批角色"
        />
      )}
      <ProFormDigit label="业务状态" name="business_status" placeholder="请输入业务状态" />
      <div>
        {/* <ProForm.Item label="操作按钮" /> */}
        <EditableProTable<ButtonActionItem>
          headerTitle="操作按钮"
          className={styles.editTable}
          rowKey="button_id"
          size="small"
          // @ts-ignore
          columns={columns}
          value={tableData}
          onChange={value => {
            setTableData(value);
            // 附着数据
            cellRef.current?.setData(
              {
                form: {
                  // @ts-ignore
                  ...cellRef.current?.getData().form,
                  action: value,
                  type: 2,
                },
              },
              { overwrite: true },
            );
          }}
          editable={{
            editableKeys,
            onChange: setEditableRowKeys,
            // 保存操作按钮
            // 新增/删除链接桩，新增/删除连接线
            onSave: async (key, row) => {
              if (row.rpcAndMethod) {
                [row.rpc, row.method] = row.rpcAndMethod;
              }
              const { graph } = FlowGraph;
              // 判断链接桩/连接线是否存在
              // 获取链接桩
              // @ts-ignore
              const existPortIds = cellRef.current.getPorts().map(v => v.id);
              if (existPortIds.includes(row.button_id)) {
                // 已存在port，修改port文本
                // @ts-ignore
                const port = cellRef.current?.getPort(row.button_id);
                // @ts-ignore
                cellRef.current?.setPortProp(row.button_id, 'attrs/text/text', row.button_name);

                // 如果有链接线，则设置连接线文本
                if (port.connectEdgeId) {
                  const line = graph.getCellById(port.connectEdgeId);
                  line.setAttrs({
                    text: {
                      text: row.button_name,
                      fill: '#fff',
                      fontSize: 12,
                      textAnchor: 'middle',
                      textVerticalAnchor: 'middle',
                    },
                  });
                  line.setData({
                    source: row,
                  });
                }
              } else {
                // 未存在，新增链接桩
                // @ts-ignore
                cellRef.current.addPort(
                  {
                    id: row.button_id,
                    type: 'button',
                    group: 'bottom',
                    attrs: {
                      text: {
                        text: row.button_name,
                      },
                    },
                  },
                  {
                    type: 'button',
                    source: id,
                  },
                );
              }
              return false;
            },
          }}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            creatorButtonText: '新增操作按钮',
            // @ts-ignore
            record: () => ({
              button_id: guid(),
              button_name: undefined,
              // type: 'default',
              rpc: undefined,
              method: undefined,
              next_node: undefined,
            }),
          }}></EditableProTable>
      </div>
    </DrawerForm>
  );
};

export default Approver;
