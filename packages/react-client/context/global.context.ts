import { createContext } from 'react';

type GlobalContextProps = {
  settings: App.Settings;
};

const GlobalContext = createContext<GlobalContextProps>({
  settings: {},
});

export default GlobalContext;
