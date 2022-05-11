import type { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import type { RoleItem } from '../data';
import { Table, message, Checkbox, Drawer, Button, Spin, Skeleton } from 'antd';
import type { Key } from 'antd/lib/table/interface';
import ProForm, { DrawerForm } from '@ant-design/pro-form';
import { getMenus } from '@/services/menu';

interface Props {
  /* 角色id */
  roleId?: number;
  /* 关闭回调 */
  onClose?: () => void;
}

const MenuTree: FC<Props> = (props: Props) => {
  const { roleId, onClose } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MenuApi.Menu[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  useEffect(() => {
    if (roleId) {
      setVisible(true);
      fetchData();
    }
  }, [roleId]);
  /**
   * @description 改造菜单数据
   * @param { Array } list
   * @return { Array }
   */
  const formatPermissionData = (list: Record<string, any>[], defaultChecked: number[]): any[] => {
    list.forEach(item => {
      if (item.checked) {
        defaultChecked.push(item.id);
      }

      if (item.children) {
        formatPermissionData(item.children, defaultChecked);
      }
    });
    return [list, defaultChecked];
  };
  /**
   * @description 获取角色菜单数据
   */
  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await getMenus({ roleIds: [roleId as number] });
      console.log('res', res);
      setData(res);

      // const [formatData, defaultChecked] = formatPermissionData(res, []);

      // setData(formatData);
      // setSelectedRowKeys(defaultChecked);
      // 默认选中
    } catch (err) {
      message.error('获取菜单失败');
      console.error(err);
    }
    setLoading(false);
  };
  /**
   * @description 权限更改回调
   * @param { Record<string, any> } row
   */
  const changeChecked = (e: any, row: Record<string, any>, index: number, checkboxIndex: number): void => {
    const checked = e?.target?.checked;
    // 更新本身的checked状态
    // eslint-disable-next-line
    row.permissions[checkboxIndex].checked = checked;

    // 更新父类菜单的checked状态
    // eslint-disable-next-line
    row.checked = Number(row.permissions.filter((v: Record<string, any>) => v?.checked).length > 0);

    // 更新表格数据
    setData([...data]);

    // 更新table的row selection
    const selectedKeys = [...selectedRowKeys];
    if (row.checked && !selectedKeys.includes(row.id)) {
      selectedKeys.push(row.id);
    } else if (!row.checked && selectedKeys.includes(row.id)) {
      selectedKeys.splice(selectedKeys.indexOf(row.id), 1);
    }
    setSelectedRowKeys([...selectedKeys]);
  };

  /**
   * @description 全选与反选
   */
  const toggleSelectedAll = (list: MenuApi.Menu[], checked: number) => {
    list.forEach(item => {
      item.checked = checked;
      if (item.permissions) {
        item.permissions.forEach(v => {
          v.checked = checked;
        });
      }
      if (Array.isArray(item.children) && item.children.length > 0) {
        toggleSelectedAll(item.children, checked);
      }
    });
  };

  const columns: Record<string, any>[] = [
    {
      title: '菜单',
      width: 240,
      dataIndex: 'name',
    },
    {
      title: '权限',
      dataIndex: 'permissions',
      align: 'left',
      // @ts-ignore
      render: (_, row, index) => {
        return (
          <>
            {row?.permissions?.map((item: Record<string, any>, checkboxIndex: number) => (
              <Checkbox
                key={item?.id}
                checked={item?.checked}
                value={item?.id}
                onChange={e => changeChecked(e, row, index, checkboxIndex)}
                style={{ marginLeft: 0, marginRight: 10, marginBottom: 5 }}>
                {item?.name}
              </Checkbox>
            ))}
          </>
        );
      },
    },
  ];

  return (
    <DrawerForm
      // title={`分配权限：${role?.name}`}
      width={900}
      // onClose={onClose}
      drawerProps={{
        placement: 'right',
        destroyOnClose: true,
        bodyStyle: {
          paddingBottom: 80,
        },
      }}
      visible={visible}
      onVisibleChange={onClose}
      // onFinish={onOk}
    >
      {/* defaultExpandAllRows不展开问题，参考 https://github.com/ant-design/ant-design/issues/4145 */}
      <Skeleton loading={loading} active paragraph={{ rows: 16 }}>
        <ProForm.Item>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={false}
            expandable={{
              defaultExpandAllRows: true,
            }}
            rowSelection={{
              checkStrictly: true,
              selectedRowKeys,
              onSelectAll: selected => {
                // 全选与反选
                // 遍历源数据，将checked都改为1
                toggleSelectedAll(data, Number(selected));
              },
              onChange: selectedKeys => {
                setSelectedRowKeys(selectedKeys);
              },
              onSelect: (row, selected) => {
                // eslint-disable-next-line
                row.checked = Number(selected);
                if (!row?.permissions) {
                  return;
                }
                // 子权限选中与反选
                row.permissions.forEach((item: MenuApi.Menu) => {
                  // eslint-disable-next-line
                  item.checked = Number(selected);
                });
                setData([...data]);
              },
            }}
          />
        </ProForm.Item>
      </Skeleton>
    </DrawerForm>
  );
};

export default MenuTree;
