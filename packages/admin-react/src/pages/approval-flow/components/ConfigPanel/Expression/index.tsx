/**
 * @description 条件节点
 */
import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import type { FormInstance } from 'antd';
import { Button, Input, AutoComplete, message, Popconfirm } from 'antd';
import FlowGraph from '../../Graph';
import type { Cell } from '@antv/x6';
import type { ExpressionItem, CommonNodeType, NodeForm } from '../typings';
import styles from './index.less';
import { EditableProTable } from '@ant-design/pro-table';
import ProForm, { DrawerForm } from '@ant-design/pro-form';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { guid } from '@/pages/approval-flow/utils';
import { ProFormDigit } from '@ant-design/pro-form';

type IProps = {
  onClose: () => void;
};

// 预定义按钮名称类型
const nameOptions = [{ value: 'status' }, { value: 'type' }, { value: 'value' }];
// 比较符options
const compareSymbols = (() => {
  return ['=', '>', '>=', '<', '<=', 'IN', 'NOT IN'].map(v => ({ value: v, label: v }));
})();
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
const Condition: FC<CommonNodeType & IProps> = (props: CommonNodeType & IProps) => {
  const { id, onClose } = props;

  const cellRef = useRef<Cell>();
  const [form, setForm] = useState<NodeForm>();
  const [cellJson, setCellJson] = useState<Cell.Properties>();
  const [title, setTitle] = useState<string>('');
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const formRef = useRef<FormInstance>();
  const [tableData, setTableData] = useState<ExpressionItem[]>([]);
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
    setCellJson(cellJsonData);
    if (!cell || !cellJsonData.type) {
      return;
    }
    cellRef.current = cell;
    // 初始数据
    const nodeTitle = cell.getAttrs().title.text;
    setTitle(nodeTitle as string);
    setForm(cellJsonData.data.form);
    setTableData(cellJsonData.data.form?.condition?.expression || []);
  }, [id]);

  const saveData = (resultList: ExpressionItem[]) => {
    // 附着数据
    cellRef.current?.setData(
      {
        form: {
          type: 1,
          condition: {
            type: 1,
            expression: resultList,
          },
        },
      },
      {
        overwrite: true,
      },
    );
  };

  const columns = [
    {
      title: '字段名称',
      dataIndex: 'field',
      key: 'field',
      renderFormItem: (_, row) => {
        return <NameAutocomplete />;
      },
    },
    {
      title: '比较符',
      dataIndex: 'comparer',
      key: 'comparer',
      valueType: 'select',
      fieldProps: {
        options: compareSymbols,
      },
    },
    {
      title: '比较值',
      dataIndex: 'value',
      key: 'value',
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
          title="确定要删除该表达式吗？"
          onConfirm={() => {
            const remainActions = tableData.filter(item => item.id !== record.id);
            setTableData(remainActions);
            // 移除port
            // @ts-ignore
            cellRef.current.removePort({
              id: record.id,
              group: 'bottom',
            });
            // 重新赋值
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
        // if (!tableData || tableData?.filter(v => v.field && v.comparer && v.value).length === 0) {
        //   message.warning('请添加表达式！');
        //   return false;
        // }
        // 附着数据
        saveData(tableData);
        return true;
      }}
      initialValues={{
        type: 1, // 固定为表达式类型
        business_status: form?.business_status,
        expression: form?.condition?.expression,
      }}>
      <div>
        <ProFormDigit label="业务状态" name="business_status" placeholder="请输入业务状态" />
        {/* <ProForm.Item label="表达式" /> */}
        <EditableProTable<ExpressionItem>
          headerTitle="表达式列表"
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
              // 判断链接桩/连接线是否存在
              // 获取链接桩
              // @ts-ignore
              const existPortIds = cellRef.current.getPorts().map(v => v.id);
              const expressionText = `${row.field} ${row.comparer} ${row.value}`;
              if (existPortIds.includes(row.id)) {
                // @ts-ignore
                const port = cellRef.current?.getPort(row.id);
                // @ts-ignore
                cellRef.current?.setPortProp(row.id, 'attrs/text/text', expressionText);

                // 如果有链接线，则设置连接线文本
                if (port.connectEdgeId) {
                  const line = graph.getCellById(port.connectEdgeId);
                  line.setAttrs({
                    text: {
                      text: expressionText,
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
                    group: 'bottom',
                    type: 'expression',
                    attrs: {
                      text: {
                        text: expressionText,
                      },
                    },
                  },
                  {
                    type: 'expression',
                    source: id,
                  },
                );
              }
              return false;
            },
          }}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            creatorButtonText: '新增表达式',
            // @ts-ignore
            record: () => ({
              id: guid(),
              field: '',
              comparer: '',
              value: '',
              next_node: null,
            }),
          }}
        />
      </div>
    </DrawerForm>
  );
};

export default Condition;
