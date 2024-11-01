import { Image } from 'react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useImageSize = (uri: string) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    Image.getSize(uri, (w, h) => {
      setWidth(w);
      setHeight(h);
    });
  }, [uri]);

  const ratio = useMemo(() => {
    if (width > 0 && height > 0) {
      return width / height;
    }
    return 1;
  }, [width, height]);

  const calc = useCallback(
    (t: 'w' | 'h', n: number) => {
      if (t === 'w') {
        return n * ratio;
      }
      return n / ratio;
    },
    [ratio]
  );

  return {
    width,
    height,
    ratio,
    calc,
  };
};
