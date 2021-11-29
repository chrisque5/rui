import { saveCurrentPageAndRedirect, clearWindowName } from '../windowHelper';

const sessionStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value ? value.toString() : '';
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
    location: {
    },
  };
})();
describe('windowHelper', () => {
  Object.defineProperty(global, 'window', {
    value: sessionStorageMock,
    name: '',

  });
  Object.defineProperty(global, 'sessionStorage', {
    value: sessionStorageMock,
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });
  it('should set window name in session storage', () => {
    const setItemSpy = jest.spyOn(sessionStorage, 'setItem');
    saveCurrentPageAndRedirect();
    expect(setItemSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear session storage', () => {
    window.name = 'testwindow';
    const removeItemSpy = jest.spyOn(sessionStorage, 'removeItem');
    clearWindowName();
    expect(removeItemSpy).toBeCalledWith('testwindow');
    expect(removeItemSpy).toHaveBeenCalledTimes(1);
    delete global.window;
    delete global.sessionStorage;
  });
});
