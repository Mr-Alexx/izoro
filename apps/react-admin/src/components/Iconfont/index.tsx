import type { FC } from 'react';

import { createFromIconfontCN } from '@ant-design/icons';

const Font = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_2498052_idxror9cdef.js'],
});

export type IconfontProps = {
  type: string;
  style?: Record<string, unknown>;
};

const Iconfont: FC<IconfontProps> = props => {
  return <Font type={props.type} style={{ fontSize: 14, ...props.style }} />;
};

export default Iconfont;
