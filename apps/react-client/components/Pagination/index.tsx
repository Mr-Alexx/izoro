import { useState, useEffect, FC, useMemo } from 'react';
import classNames from 'classnames';
import Input from '../Input';
import { useRouter } from 'next/router';

type InputProps = {
  /** @name 总数 */
  total?: number;
  /** @name 每页条数 */
  limit?: number;
  /** @name 是否同步到url的查询参数 */
  syncToUrl?: boolean;
  /** @name 页码变更回调 */
  onChange?: (number) => void;
};

const Pagination: FC<InputProps> = ({ total, limit = 12, syncToUrl = true, onChange }) => {
  const [page, setPage] = useState<number | undefined>(1);

  const handleChange = (val?: string | number) => {
    const newValue = !val || Number(val) < 1 ? 1 : parseInt(val as string);
    setPage(newValue);
    onChange?.(newValue);
  };

  const router = useRouter();
  useEffect(() => {
    if (syncToUrl && router.query.page) {
      setPage(parseInt(router.query.page as string));
    }
  }, [syncToUrl, router.query]);

  const hasNextPage = useMemo(() => {
    return total > page * limit;
  }, [total, limit, page]);

  return (
    <div className="iz-pagination">
      <button
        disabled={page <= 1}
        type="button"
        className={classNames('iz-pagination__prev', page <= 1 ? 'is-disabled' : undefined)}
        onClick={() => handleChange(page - 1)}>
        上一页
      </button>
      <span className="iz-pagination__jumper">
        <span>跳至</span>
        <Input
          type="number"
          className="jumper-input"
          value={page}
          onChange={e => {
            // @ts-ignore
            setValue(!e.target.value ? '' : parseInt(e.target.value));
          }}
          onBlur={e => {
            const targetValue = e.target.value;
            if (!targetValue || Number(targetValue) < 1) {
              setPage(1);
            } else {
              setPage(parseInt(targetValue));
            }
          }}
          onKeyDown={e => {
            if (e.code === 'Enter') {
              // @ts-ignore
              handleChange(e.target.value);
            }
          }}
        />
        <span>页</span>
      </span>
      <button
        disabled={!hasNextPage}
        type="button"
        className={classNames('iz-pagination__next', !hasNextPage ? 'is-disabled' : undefined)}
        onClick={() => handleChange(page + 1)}>
        下一页
      </button>
    </div>
  );
};

export default Pagination;
