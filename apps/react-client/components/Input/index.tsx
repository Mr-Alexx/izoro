import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';

const Input: FC<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = props => {
  // const [value, setValue] = useState<string>('');
  const { className: _className, ...rest } = props;

  return (
    <span className={classNames('iz-input-wrapper', _className)}>
      <input
        className="iz-input"
        {...rest}
        // value={value}
        // onChange={e => setValue(e.target.value)}
      />
    </span>
  );
};

export default Input;
