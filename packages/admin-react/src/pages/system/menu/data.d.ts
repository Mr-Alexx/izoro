export type PermissionProps = {
  menu: Partial<MenuListItem> | undefined;
};

export type ActionSelectList = {
  value: string;
  label: string;
  key: string;
};

export type MenuListProps = {
  // onAction: (action?: number, row?: Partial<MenuListItem> | undefined) => void;
  onChange: (row: USERS_API.MenuItem) => void;
};
