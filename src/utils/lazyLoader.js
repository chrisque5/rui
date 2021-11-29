import { lazy } from 'react';

export const lazyWithPreload = (factory) => {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
};

export const dummy = 'dummy';
