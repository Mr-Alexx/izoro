/**
 * 提示按钮
 * @author 潜
 * @useage <TooltipButton title="test" >提交</TooltipButton>
 */
import { Button, Tooltip } from 'antd';
import type { ButtonProps, TooltipProps } from 'antd';
import { DeleteFilled, EditFilled, EyeFilled, PlusCircleFilled } from '@ant-design/icons';

type Action = 'view' | 'add' | 'edit' | 'delete';
type ConfirmButtonProps = TooltipProps &
  ButtonProps & {
    /** 按钮类型，'view' | 'add' | 'edit' | 'delete'，如果是这其中的一种，显示对应的图标按钮 */
    iconType?: Action;
  };

const iconMap = {
  view: { tips: '查看', color: '#ffc069', icon: <EyeFilled /> },
  add: { tips: '新增', color: '#ffc069', icon: <PlusCircleFilled /> },
  edit: { tips: '编辑', color: '#ffc069', icon: <EditFilled /> },
  delete: { tips: '删除', color: '#ffc069', icon: <DeleteFilled /> },
};

const TooltipButton = (props: ConfirmButtonProps) => {
  const { children, iconType: type, title, ...buttonProps } = props;
  let newButtonProps = {
    type: 'text',
    size: 'small',
    ...buttonProps,
  } as ButtonProps;

  if (type) {
    newButtonProps = {
      ...newButtonProps,
      style: { color: iconMap[type as string]?.color },
      danger: type === 'delete',
      icon: iconMap[type]?.icon,
    };
  }
  return (
    <Tooltip title={title ?? iconMap[type as string]?.tips}>
      <Button {...newButtonProps}>{children}</Button>
    </Tooltip>
  );
};

export default TooltipButton;
