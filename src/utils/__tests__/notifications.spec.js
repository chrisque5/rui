import { notification } from 'antd';
import * as notifications from '../notifications';

const {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
  showWarningNotification,
  closeIcon,
  clearAll,
} = notifications;

jest.mock('antd', () => ({
  notification: {
    error: jest.fn(),
    info: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
    destroy: jest.fn(),
    close: jest.fn(),
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('notifications return the correct number of keys', () => {
  expect(Object.keys(notifications).length).toEqual(6);
});

test('showErrorNotification calls the correct notification type, with the correct parameters when duration passed in', () => {
  showErrorNotification('dummyMessage', 'dummyDesc', 1);
  expect(notification.error).toHaveBeenCalledTimes(1);
  expect(notification.error).toBeCalledWith({
    description: 'dummyDesc', duration: 1, message: 'dummyMessage', closeIcon,
  });
});

test('showErrorNotification calls the correct notification type, with the correct parameters when duration not passed in', () => {
  showErrorNotification('dummyMessage', 'dummyDesc');
  expect(notification.error).toHaveBeenCalledTimes(1);
  expect(notification.error).toBeCalledWith({
    description: 'dummyDesc', duration: 5, message: 'dummyMessage', closeIcon,
  });
});

test('showSuccessNotification calls the correct notification type, with the correct parameters when duration passed in', () => {
  showSuccessNotification('dummyMessage', 'dummyDesc', 1);
  expect(notification.success).toHaveBeenCalledTimes(1);
  expect(notification.success).toBeCalledWith({
    description: 'dummyDesc', duration: 1, message: 'dummyMessage', closeIcon,
  });
});

test('showSuccessNotification calls the correct notification type, with the correct parameters when duration not passed in', () => {
  showSuccessNotification('dummyMessage', 'dummyDesc');
  expect(notification.success).toHaveBeenCalledTimes(1);
  expect(notification.success).toBeCalledWith({
    description: 'dummyDesc', duration: 0, message: 'dummyMessage', closeIcon,
  });
});

test('showWarningNotification calls the correct notification type, with the correct parameters when duration passed in', () => {
  showWarningNotification('dummyMessage', 'dummyDesc', 1);
  expect(notification.warning).toHaveBeenCalledTimes(1);
  expect(notification.warning).toBeCalledWith({
    description: 'dummyDesc', duration: 1, message: 'dummyMessage', closeIcon,
  });
});

test('showWarningNotification calls the correct notification type, with the correct parameters when duration not passed in', () => {
  showWarningNotification('dummyMessage', 'dummyDesc');
  expect(notification.warning).toHaveBeenCalledTimes(1);
  expect(notification.warning).toBeCalledWith({
    description: 'dummyDesc', duration: 5, message: 'dummyMessage', closeIcon,
  });
});

test('showInfoNotification calls the correct notification type, with the correct parameters when duration passed in', () => {
  showInfoNotification('dummyMessage', 'dummyDesc', 1);
  expect(notification.info).toHaveBeenCalledTimes(1);
  expect(notification.info).toBeCalledWith({
    description: 'dummyDesc', duration: 1, message: 'dummyMessage', closeIcon,
  });
});

test('showInfoNotification calls the correct notification type, with the correct parameters when duration not passed in', () => {
  showInfoNotification('dummyMessage', 'dummyDesc');
  expect(notification.info).toHaveBeenCalledTimes(1);
  expect(notification.info).toBeCalledWith({
    description: 'dummyDesc', duration: 5, message: 'dummyMessage', closeIcon,
  });
});

test('clearAll calls the correct notification function when invoked', () => {
  clearAll();
  expect(notification.destroy).toHaveBeenCalledTimes(1);
});
