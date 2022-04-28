/**
 * 二次确认按钮
 * @author 潜
 * @useage <ConfirmButton >提交</ConfirmButton>
 */
import { Button, Popconfirm, Tooltip } from 'antd';
import type { ButtonProps, PopconfirmProps } from 'antd';
import { DeleteFilled, EditFilled, EyeFilled, PlusCircleFilled } from '@ant-design/icons';
import { FC } from 'react';

type Action = 'view' | 'add' | 'edit' | 'delete';
type ConfirmButtonProps = PopconfirmProps & {
  buttonProps?: ButtonProps;
  /** 按钮类型，'view' | 'add' | 'edit' | 'delete'，如果是这其中的一种，显示对应的图标按钮 */
  type?: Action;
  /** 提示，如果有，会采用Tooltip的形式 */
  tips?: string;
};

const iconMap = {
  view: { tips: '查看', color: '#ffc069' },
  add: { tips: '新增', color: '#ffc069' },
  edit: { tips: '编辑', color: '#ffc069' },
  delete: { tips: '删除', color: '#ffc069' },
};

/** 图标按钮 */
const IconButton: FC<ButtonProps & { iconType: Action }> = ({ iconType, ...buttonProps }) => {
  let icon: React.ReactNode;
  const newButtonProps = {
    type: 'text',
    size: 'small',
    ...buttonProps,
  } as ButtonProps;

  switch (iconType) {
    case 'view':
      icon = <EyeFilled />;
      break;
    case 'add':
      icon = <PlusCircleFilled />;
      break;
    case 'edit':
      icon = <EditFilled />;
      break;
    case 'delete':
      icon = <DeleteFilled />;
      break;
  }
  return (
    <Tooltip title={iconMap[iconType].tips}>
      <Button
        {...newButtonProps}
        style={{ color: iconMap[iconType as string] }}
        danger={iconType === 'delete'}
        icon={icon}
      />
    </Tooltip>
  );
};

const ConfirmButton = (props: ConfirmButtonProps) => {
  const { children, buttonProps, placement, type, tips, ...popconfirmProps } = props;
  const newButtonProps = {
    type: 'text',
    size: 'small',
    ...buttonProps,
  } as ButtonProps;

  return (
    <Popconfirm {...popconfirmProps} placement={placement ?? 'bottomRight'}>
      {type ? (
        <IconButton iconType={type} />
      ) : tips ? (
        <Tooltip title={tips}>
          <Button {...newButtonProps}>{children}</Button>
        </Tooltip>
      ) : (
        <Button {...newButtonProps}>{children}</Button>
      )}
    </Popconfirm>
  );
};

export default ConfirmButton;
