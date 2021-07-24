import { useState } from 'react';

export function useGridAttr() {
  const [gridAttrs, setGridAttrs] = useState({
    type: 'mesh',
    size: 10,
    color: '#e5e5e5',
    thickness: 1,
    colorSecond: '#d0d0d0',
    thicknessSecond: 1,
    factor: 4,
    bgColor: 'transparent',
    showImage: true,
    repeat: 'watermark',
    angle: 30,
    position: 'center',
    bgSize: JSON.stringify({ width: 150, height: 150 }),
    opacity: 0.1,
  });
  const setGridAttr = (key: string, value: any) => {
    setGridAttrs(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  const roles = [
    { value: 1, label: '角色1' },
    { value: 2, label: '角色2' },
    { value: 3, label: '角色3' },
  ];
  const users = [
    { value: 1, label: '潜1' },
    { value: 2, label: '潜2' },
    { value: 3, label: '潜3' },
  ];
  return {
    gridAttrs,
    setGridAttr,
    roles,
    users,
  };
}
