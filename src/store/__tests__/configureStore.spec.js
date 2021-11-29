import * as redux from 'redux';
import configureStore from '../configureStore';

jest.spyOn(redux, 'createStore');
jest.spyOn(redux, 'applyMiddleware');

test('configureStore is a function', () => {
  expect(configureStore).toBeDefined();
  expect(typeof configureStore).toBe('function');
});

test('configureStore is initialised correctly', () => {
  const store = configureStore();
  expect(store).toBeInstanceOf(Object);
  expect(redux.createStore).toHaveBeenCalled();
  expect(redux.applyMiddleware).toHaveBeenCalled();
  expect(redux.applyMiddleware).toHaveBeenCalledWith(expect.any(Function), expect.any(Function));

  const {
    dispatch, subscribe, getState, replaceReducer,
  } = store;

  expect(typeof dispatch).toBe('function');
  expect(typeof subscribe).toBe('function');
  expect(typeof getState).toBe('function');
  expect(typeof replaceReducer).toBe('function');
});

test('configureStore().getState() == default state', () => {
  const store = configureStore();

  const initialState = store.getState();

  expect(initialState.user).toBeDefined();
  expect(initialState.currencies.length).toEqual(0);
  expect(Object.keys(initialState.dates).length).toEqual(8);
  expect(initialState.clients.length).toEqual(0);
  expect(initialState.brokers.length).toEqual(0);
  expect(initialState.agents.length).toEqual(0);
  expect(initialState.executionVenues.length).toEqual(0);
  expect(initialState.deal.dealId).toBeDefined();
  expect(initialState.ui.isThirdCPChecked).toBeFalsy();
  expect(initialState.user.preferences.defaults).toBeDefined();
  expect(initialState.user.permissions).toBeDefined();
});
