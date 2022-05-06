/**
 * 二次确认按钮
 * @author 潜
 * @useage <ConfirmButton >提交</ConfirmButton>
 */
import { Button, Popconfirm, Tooltip } from 'antd';
import type { ButtonProps, PopconfirmProps } from 'antd';
import { DeleteFilled, EditFilled, EyeFilled, PlusCircleFilled } from '@ant-design/icons';
import { FC } from 'react';
import type { IconButtonAction } from './TooltipButton';
import { iconMap } from './TooltipButton';

type ConfirmButtonProps = PopconfirmProps & {
  buttonProps?: ButtonProps;
  /** 按钮类型，'view' | 'add' | 'edit' | 'delete'，如果是这其中的一种，显示对应的图标按钮 */
  type?: IconButtonAction;
  /** 提示，如果有，会采用Tooltip的形式 */
  tips?: string;
};

/** 图标按钮 */
const IconButton: FC<ButtonProps & { iconType: IconButtonAction }> = ({ iconType, ...buttonProps }) => {
  const newButtonProps = {
    type: 'text',
    size: 'small',
    ...buttonProps,
  } as ButtonProps;

  return (
    <Tooltip title={iconMap[iconType].tips}>
      <Button
        {...newButtonProps}
        style={{ color: iconMap[iconType as string] }}
        danger={iconType === 'delete'}
        icon={iconMap[iconType]?.icon}
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
