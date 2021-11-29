import { useEffect, useCallback } from 'react';

const ConfirmBeforeUnload = () => {
  const onBeforeUnload = useCallback((e) => {
    e.preventDefault();
    e.returnValue = '';
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [onBeforeUnload]);

  return null;
};

export default ConfirmBeforeUnload;
