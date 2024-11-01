import { useCallback, DependencyList } from 'react';
import {
  DebouncedFunc,
  ThrottleSettings,
  DebounceSettings,
  debounce,
  throttle,
} from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <T extends (...args: any) => any>(
  fn: T,
  dep: DependencyList = [],
  wait = 200,
  opts?: DebounceSettings
): DebouncedFunc<T> => {
  return useCallback(debounce(fn, wait, opts), dep);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useThrottle = <T extends (...args: any) => any>(
  fn: T,
  dep: DependencyList = [],
  wait = 200,
  opts?: ThrottleSettings
): DebouncedFunc<T> => {
  return useCallback(throttle(fn, wait, opts), dep);
};

export * from './image';
