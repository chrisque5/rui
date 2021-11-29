import rootReducer from '../rootReducer';

test('rootReducer is defined', () => {
  expect(rootReducer).toBeDefined();
});

test('rootReducer is an function', () => {
  expect(typeof rootReducer).toBe('function');
});
