/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Form } from 'antd';

const middlewares = [thunk];
const renderWithForm = (
  ui,
  {
    initialState,
    store = configureMockStore(middlewares)(initialState),
    ...renderOptions
  } = {},
) => {
  const wrapper = ({ children }) => <Provider store={store}><Form>{children}</Form></Provider>;

  return render(ui, { wrapper, ...renderOptions });
};

const renderWithProvider = (
  ui,
  {
    initialState,
    store = configureMockStore(middlewares)(initialState),
    ...renderOptions
  } = {},
) => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return render(ui, { wrapper, ...renderOptions });
};
// re-export everything
export * from '@testing-library/react';
// override render method
export { renderWithForm, renderWithProvider };
