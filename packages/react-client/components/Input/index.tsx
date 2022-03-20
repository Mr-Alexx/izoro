import { FC } from 'react';

const Input: FC = () => {
  return (
    <span className="iz-input-wrapper">
      <input className="iz-input" />
      <span className="iz-input--prefix" />
    </span>
  );
};
