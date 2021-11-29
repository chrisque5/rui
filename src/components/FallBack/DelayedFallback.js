import { useState, useEffect } from 'react';
import { Spin } from 'antd';

const DelayedFallback = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 200);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div style={{ left: '50%', top: '50%', position: 'absolute' }}>
      {show && <Spin size="large" />}
    </div>
  );
};
export default DelayedFallback;
