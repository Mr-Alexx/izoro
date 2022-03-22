import { useState, useEffect, FC } from 'react';
import classNames from 'classnames';
import Input from '../Input';
import { useRouter } from 'next/router';

type InputProps = {
  /** @name 总数 */
  total?: number;
  /** @name 是否同步到url的查询参数 */
  syncToUrl?: boolean;
  /** @name 页码变更回调 */
  onChange?: (number) => void;
};

const Pagination: FC<InputProps> = ({ total, syncToUrl = true, onChange }) => {
  const [value, setValue] = useState<number | undefined>(1);

  const handleChange = (val?: string | number) => {
    const newValue = !val || Number(val) < 1 ? 1 : parseInt(val as string);
    setValue(newValue);
    onChange?.(newValue);
  };

  const router = useRouter();
  useEffect(() => {
    if (syncToUrl && router.query.page) {
      setValue(parseInt(router.query.page as string));
    }
  }, [syncToUrl, router.query]);

  return (
    <div className="iz-pagination">
      <div className="iz-pagination__prev" onClick={() => handleChange(value - 1)}>
        上一页
      </div>
      <div className="iz-pagination__jumper">
        <span>跳至</span>
        <Input
          type="number"
          className="jumper-input"
          value={value}
          onChange={e => {
            // @ts-ignore
            setValue(!e.target.value ? '' : parseInt(e.target.value));
          }}
          onBlur={e => {
            const targetValue = e.target.value;
            if (!targetValue || Number(targetValue) < 1) {
              setValue(1);
            } else {
              setValue(parseInt(targetValue));
            }
          }}
          onKeyDown={e => {
            if (e.code === 'Enter') {
              handleChange(e.target.value);
            }
          }}
        />
        <span>页</span>
      </div>
      <div className="iz-pagination__next" onClick={() => handleChange(value + 1)}>
        下一页
      </div>
    </div>
  );
};

export default Pagination;
