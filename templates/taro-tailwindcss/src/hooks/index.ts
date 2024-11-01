import { useCallback, DependencyList } from 'react';
import {
  DebouncedFunc,
  ThrottleSettings,
  DebounceSettings,
  debounce,
  throttle,
} from 'lodash';

export const useDebounce = <T extends (...args: any) => any>(
  fn: T,
  dep: DependencyList = [],
  wait = 200,
  opts?: DebounceSettings
): DebouncedFunc<T> => {
  return useCallback(debounce(fn, wait, opts), dep);
};

export const useThrottle = <T extends (...args: any) => any>(
  fn: T,
  dep: DependencyList = [],
  wait = 200,
  opts?: ThrottleSettings
): DebouncedFunc<T> => {
  return useCallback(throttle(fn, wait, opts), dep);
};
