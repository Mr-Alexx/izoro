import type { MenuDataItem } from '@ant-design/pro-layout';

/**
 * @description 筛选出可以搜索的菜单
 */
const formatRoutes = (data: MenuDataItem[], options: { label: string; value: string }[] = [], parentName?: string) => {
  data.forEach((route: MenuDataItem) => {
    if (!route.routes || route.routes.length === 0) {
      // !route.hideInMenu && route.name
      if (route.name && !route.hideInSearch) {
        options.push({
          value: route.path || route.redirect,
          label: `${parentName ? `${parentName} / ` : ''}${route.name}`,
        });
      }
    } else {
      formatRoutes(route.routes, options, `${parentName ? `${parentName} / ` : ''}${route.name}`);
    }
  });
  return options;
};

export default formatRoutes;
