import { useState, useCallback } from 'react';

export default function AppModel() {
  const [formUid, setFormUid] = useState<string | undefined>();

  const guid = useCallback(() => {
    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      // eslint-disable-next-line
      const r = (Math.random() * 16) | 0;
      // eslint-disable-next-line
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    setFormUid(id);
  }, []);

  return {
    formUid,
    guid,
  };
}
