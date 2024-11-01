export const getKeysValueProxy = <T extends object = object>(
  d: T,
  keysValue: Record<string | symbol, unknown>
) => {
  return new Proxy(d, {
    get(target, p) {
      if (keysValue[p as string]) {
        return keysValue[p];
      } else if (p !== undefined) {
        // @ts-ignore
        return target[p];
      }
      return target;
    },
  });
};
