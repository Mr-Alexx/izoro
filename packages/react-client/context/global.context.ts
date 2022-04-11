import { createContext } from 'react';

type GlobalContextProps = {
  settings: App.Settings;
};

const GlobalContext = createContext<GlobalContextProps>({
  settings: {
    baiduAnalysisId: 'c5ad548499f502d216048dc032549622',
  },
});

export default GlobalContext;
