import type { FC } from 'react';

import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_2498052_idxror9cdef.js'],
});

export type IconfontProps = {
  type: string;
  style?: Record<string, unknown>;
};

const Iconfont: FC<IconfontProps> = props => {
  return <IconFont type={props.type} style={{ fontSize: 14, ...props.style }} />;
};

export default Iconfont;
