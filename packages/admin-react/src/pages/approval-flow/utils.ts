/* eslint-disable */
type Client = {
  width: number;
  height: number;
};
export const getContainerSize = (): Client => {
  return {
    // // @ts-ignore
    // width: document.body.offsetWidth - 240, // 800,
    // // @ts-ignore
    // height: document.body.offsetHeight - 110,
    // @ts-ignore
    width: document.querySelector('.ant-layout-content')?.offsetWidth - 240,
    // @ts-ignore
    height: document.querySelector('.ant-layout-content')?.offsetHeight - 120,
  };
};

// guid生成器
export const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// edge label设置
type LabelOptions = {
  text: string;
  color: string;
  background: string;
};
export const getLabels = (options: LabelOptions): Record<string, any>[] => {
  return [
    {
      attrs: {
        label: {
          text: `${options.text}`,
          fill: options.color,
          fontSize: 12,
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
        },
        body: {
          ref: 'label',
          fill: options.background,
          rx: 4,
          ry: 4,
          refWidth: '140%',
          refHeight: '140%',
          refX: '-20%',
          refY: '-20%',
        },
      },
    },
  ];
};
