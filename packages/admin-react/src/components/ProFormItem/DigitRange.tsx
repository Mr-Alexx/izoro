import { InputNumber } from 'antd';
import { memo, useState, useEffect } from 'react';

type ValueProps = (string | number | undefined)[];

type DigitRangeProps = {
  /**
   * @description 禁用
   */
  disabled?: boolean;
  /**
   * @description 只读
   */
  readOnly?: boolean;
  /**
   * @description value
   */
  value?: ValueProps;
  /**
   * @description 初值
   */
  initialValue?: ValueProps;
  /**
   * @description onChange方法
   */
  onChange?: (value?: (number | undefined)[]) => void;
};

const DigitRange = memo((props: DigitRangeProps) => {
  const { value, initialValue, onChange, disabled, readOnly } = props;
  const [range, setRange] = useState<(number | undefined)[]>([]);

  useEffect(() => {
    setRange(value ? value.map(item => Number(item)) : []);
  }, [value]);

  const handleChange = (index: number, inputValue?: number) => {
    range[index] = inputValue;
    setRange([...range]);
    onChange?.(range);
  };

  return (
    <div className="digit-range">
      <InputNumber
        disabled={disabled}
        readOnly={readOnly}
        defaultValue={initialValue?.[0] ? Number(initialValue?.[0]) : undefined}
        value={range?.[0]}
        onChange={(val: number) => handleChange(0, val)}
        className="digit-range__start"
      />
      <span className="digit-range__split">-</span>
      <InputNumber
        disabled={disabled}
        readOnly={readOnly}
        defaultValue={initialValue?.[1] ? Number(initialValue?.[0]) : undefined}
        value={range?.[1]}
        onChange={(val: number) => handleChange(1, val)}
        className="digit-range__end"
      />
    </div>
  );
});

export default DigitRange;
