import type { AppProps } from 'next/app';
import { FC } from 'react';
import '../styles/global.css';

const App: FC<AppProps> = props => {
  const { Component, pageProps } = props;
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
};

export async function getServe {

}

export default App;
