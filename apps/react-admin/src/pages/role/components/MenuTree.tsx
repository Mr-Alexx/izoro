import type { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Table, message, Checkbox, Skeleton } from 'antd';
import type { Key } from 'antd/lib/table/interface';
import ProForm, { DrawerForm } from '@ant-design/pro-form';
import { getMenus } from '@/services/menu';
import { authorizeRole } from '@/services/role';
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

type PermissionsAndMenusResult = {
  menus: number[];
  permissions: number[];
};

const getPermissionsAndMenus = (
  data: MenuApi.Menu[],
  result?: PermissionsAndMenusResult,
): PermissionsAndMenusResult => {
  if (!result) {
    result = {
      menus: [],
      permissions: [],
    };
  }
  data.forEach(item => {
    if (item.checked) {
      result!.menus.push(item.id);
    }
    if (item.permissions) {
      result!.permissions.push(...item.permissions.filter(v => v.checked).map(v => v.id));
    }
    if (item.children) {
      getPermissionsAndMenus(item.children, result);
    }
  });

  return result;
};

const MenuTree: FC<{
  /* 角色id */
  roleId?: number;
  /* 关闭回调 */
  onClose?: () => void;
}> = props => {
  const { roleId, onClose } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<MenuApi.Menu[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  useEffect(() => {
    setVisible(!!roleId);
  }, [roleId]);

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
      render: (_: any, row: MenuApi.Menu, index: number) => {
        return (
          <>
            {row?.permissions?.map((item: PermissionApi.Permission, checkboxIndex: number) => (
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

  /**
   * @description 权限更改回调
   * @param { Record<string, any> } row
   */
  const changeChecked = (e: any, row: Record<string, any>, index: number, checkboxIndex: number): void => {
    const checked = e?.target?.checked;
    // 更新本身的checked状态
    row.permissions[checkboxIndex].checked = checked;

    // 更新父类菜单的checked状态
    // 只有在父菜单没有选中，且权限至少选中一个的情况下给父菜单勾选
    if (!row.checked && row.permissions.filter((v: Record<string, any>) => v?.checked).length > 0) {
      row.checked = true;
    }

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
  const toggleSelectedAll = (list: MenuApi.Menu[], checked: boolean) => {
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

  const submit = async () => {
    const { menus, permissions } = getPermissionsAndMenus(data);
    try {
      const msg = await authorizeRole({
        roles: [roleId],
        menus,
        permissions,
      });
      message.success(msg);
      onClose?.();
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  };

  return (
    <DrawerForm
      // title={`分配权限：${role?.name}`}
      width={900}
      drawerProps={{
        placement: 'right',
        destroyOnClose: true,
        bodyStyle: {
          paddingBottom: 80,
        },
        onClose,
      }}
      request={async () => {
        try {
          const menuPermissions = await getMenus({ roles: `${roleId}` });
          const [formatData, defaultChecked] = formatPermissionData(menuPermissions, []);

          setData(formatData);
          setSelectedRowKeys(defaultChecked);
          return {};
        } catch (err) {
          console.error(err);
          return {};
        }
      }}
      visible={visible}
      onFinish={submit}>
      {/* defaultExpandAllRows不展开问题，参考 https://github.com/ant-design/ant-design/issues/4145 */}
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
              toggleSelectedAll(data, selected);
            },
            onChange: selectedKeys => {
              setSelectedRowKeys(selectedKeys);
            },
            onSelect: (row, selected) => {
              row.checked = selected;
              if (!row?.permissions) {
                return;
              }
              // 子权限选中与反选 - 暂时独立开来，不做联动
              // row.permissions.forEach((item: PermissionApi.Permission) => {
              //   item.checked = selected;
              // });
              setData([...data]);
            },
          }}
        />
      </ProForm.Item>
    </DrawerForm>
  );
};

export default MenuTree;
