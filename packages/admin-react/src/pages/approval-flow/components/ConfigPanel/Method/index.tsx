/**
 * @description 条件节点
 */
import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import type { FormInstance } from 'antd';
import { Cascader } from 'antd';
import { Button, Input, message, Popconfirm } from 'antd';
import FlowGraph from '../../Graph';
import type { Cell } from '@antv/x6';
import type { CallTypeResItem, CommonNodeType, CallType } from '../typings';
import styles from './index.less';
import { EditableProTable } from '@ant-design/pro-table';
import ProForm, { DrawerForm, ProFormDigit } from '@ant-design/pro-form';
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

const Method: FC<CommonNodeType & IProps> = (props: CommonNodeType & IProps) => {
  const { id, onClose } = props;

  const cellRef = useRef<Cell>();
  const [form, setForm] = useState<CallType>();
  const [title, setTitle] = useState<string>('');
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const formRef = useRef<FormInstance>();
  const [tableData, setTableData] = useState<CallTypeResItem[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    setVisible(true);
    const { graph } = FlowGraph;
    const cell = graph.getCellById(`${id}`);
    const cellJsonData = cell.toJSON();
    if (!cell || !cellJsonData.type) {
      return;
    }
    cellRef.current = cell;
    // 初始数据
    const nodeTitle = cell.getAttrs().title.text;
    setTitle(nodeTitle as string);
    setForm({
      ...cellJsonData.data.form.condition.call,
      business_status: cellJsonData.data.form.business_status,
    });
    setTableData(cellJsonData.data.form?.condition?.call?.result || []);
  }, [id]);

  const saveData = (resultList: CallTypeResItem[]) => {
    const { rpcAndMethod, business_status } = formRef.current?.getFieldsValue();
    const [rpc, method] = rpcAndMethod;
    // 附着数据
    cellRef.current?.setData(
      {
        form: {
          type: 1,
          business_status,
          condition: {
            type: 2,
            call: {
              rpc,
              method,
              rpcAndMethod,
              result: resultList,
            },
          },
        },
      },
      { overwrite: true },
    );
  };

  const columns = [
    {
      title: '返回值',
      dataIndex: 'res',
      key: 'res',
      render: () => <span>res</span>,
      editable: false,
    },
    {
      title: '比较符',
      dataIndex: 'comparer',
      key: 'comparer',
      valueType: 'select',
      fieldProps: {
        value: '=',
        options: [{ value: '=', label: '=' }],
      },
    },
    {
      title: '比较值',
      dataIndex: 'res',
      key: 'res',
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
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}>
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定要删除该返回值吗？"
          onConfirm={() => {
            const remainActions = tableData.filter(v => v.id !== record.id);
            setTableData(remainActions);
            // 移除port
            // @ts-ignore
            cellRef.current.removePort({
              id: record.id,
              group: 'bottom',
            });
            // 重新附着数据
            saveData(remainActions);
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
      onFinish={async () => {
        // if (!tableData || tableData?.filter(v => !!v.res).length === 0) {
        //   message.warning('请添加返回值！');
        //   return false;
        // }
        // 附着数据
        saveData(tableData);
        return true;
      }}
      initialValues={{
        business_status: form?.business_status,
        rpcAndMethod: form?.rpcAndMethod,
      }}>
      <ProFormDigit label="业务状态" name="business_status" placeholder="请输入业务状态" />
      <ProForm.Item
        label="RPC和调用方法"
        name="rpcAndMethod"
        rules={[{ required: true, message: '请选择RPC和调用方法' }]}>
        <Cascader
          showSearch
          options={rpcOptions}
          onChange={values => {
            cellRef.current?.setAttrs({
              text: {
                text: values.length > 0 ? `RPC: ${values[0]}, 方法: ${values[1]}` : '请设置RPC和调用方法',
              },
            });
          }}
        />
      </ProForm.Item>
      <div>
        {/* <ProFormDigit label="业务状态" name="business_status" placeholder="请输入业务状态" /> */}

        {/* <ProForm.Item label="表达式" /> */}
        <EditableProTable<CallTypeResItem>
          headerTitle="返回值设置"
          className={styles.editTable}
          rowKey="id"
          size="small"
          // @ts-ignore
          columns={columns}
          value={tableData}
          onChange={value => {
            setTableData(value);
            // 附着数据
            saveData(value);
          }}
          editable={{
            editableKeys,
            onChange: setEditableRowKeys,
            // 保存操作按钮
            // 新增/删除链接桩，新增/删除连接线
            onSave: async (key, row) => {
              const { graph } = FlowGraph;
              if (!row.res) {
                return message.warning('填写返回值');
              }
              // 判断链接桩/连接线是否存在
              // 获取链接桩
              // @ts-ignore
              const existPortIds = cellRef.current.getPorts().map(v => v.id);
              const portText = `res = ${row.res}`;
              if (existPortIds.includes(row.id)) {
                // 已存在port，修改port文本
                // @ts-ignore
                const port = cellRef.current?.getPort(row.id);

                // @ts-ignore
                cellRef.current?.setPortProp(row.id, 'attrs/text/text', portText);

                // 如果有链接线，则设置连接线文本
                if (port.connectEdgeId) {
                  const line = graph.getCellById(port.connectEdgeId);
                  line.setAttrs({
                    text: {
                      text: portText,
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
                // 未存在，新增链接桩和连接线
                // @ts-ignore
                cellRef.current.addPort(
                  {
                    id: row.id,
                    type: 'method',
                    group: 'bottom',
                    attrs: {
                      text: {
                        text: portText,
                      },
                    },
                  },
                  {
                    type: 'method',
                    source: id,
                  },
                );
              }
              return false;
            },
          }}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            creatorButtonText: '新增返回值',
            // @ts-ignore
            record: () => ({
              id: guid(),
              res: '',
              next_node: null,
            }),
          }}
        />
      </div>
    </DrawerForm>
  );
};

export default Method;
