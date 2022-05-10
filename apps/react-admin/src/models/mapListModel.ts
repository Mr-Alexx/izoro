/**
 * @description 局部公共map列表数据 - 某几个页面公用 - 调用时初始化，但会缓存到内存中
 * @example 使用方法：
 * const { productAttributes, initProductAttributes } = useModel('localMapListModel')
 * useEffect(() => { initProductAttributes() }, [])
 * @see https://github.com/ant-design/ant-design-pro/issues/6723 页面内再初始model的方法
 */

import { useState, useCallback } from 'react';
import { getPermissionsMap } from '@/services/menu';

type MapList = {
  /** 权限map列表 */
  permissions: APP.Options;
  /** 初始化权限map列表 */
  initPermissions: () => void;
};

export default function useLocalMapListModel(): MapList {
  const [permissions, setPermissions] = useState<APP.Options>();

  /** 初始ebay站点 */
  const initPermissions = useCallback(async () => {
    if (permissions) {
      return;
    }

    try {
      const data = await getPermissionsMap();
      setPermissions(data);
    } catch (err) {
      setPermissions([]);
      console.error('[初始权限map列表失败]: ', err);
    }
  }, [permissions]);

  return {
    permissions,
    initPermissions,
  };
}
