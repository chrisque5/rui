import { notification, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const clearAll = () => {
  notification.destroy();
};

const closeIcon = (
  <>
    <Button size="small" data-testid="btnCloseAll" className="close-all" onClick={() => clearAll()}>Close All</Button>
    <CloseOutlined />
  </>
);

const showErrorNotification = (message, description, duration) => {
  notification.error({
    message, description, duration: duration || 5, closeIcon,
  });
};

const showSuccessNotification = (message, description, duration) => {
  notification.success({
    message, description, duration: duration || 0, closeIcon,
  });
};

const showWarningNotification = (message, description, duration) => {
  notification.warning({
    message, description, duration: duration || 5, closeIcon,
  });
};

const showInfoNotification = (message, description, duration) => {
  notification.info({
    message, description, duration: duration || 5, closeIcon,
  });
};

export {
  closeIcon,
  showErrorNotification,
  showSuccessNotification,
  showWarningNotification,
  showInfoNotification,
  clearAll,
};
