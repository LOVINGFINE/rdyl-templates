import {
  FC,
  useEffect,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { base64 } from '@/utils/parser';
import Taro from '@tarojs/taro';

export const AuthCtx = createContext<AuthConnectValue>({} as AuthConnectValue);

const AuthConnect: FC<PropsWithChildren> = ({ children }) => {
  const [token, _setToken] = useState(AuthToken.value);
  const [ready, setReady] = useState(false);

  const isLogin = useMemo(() => !!token, [token]);

  const setToken = useCallback((e: string) => {
    _setToken(e);
    AuthToken.set(e);
  }, []);

  useEffect(() => {
    AuthToken.get()
      .then(setToken)
      .finally(() => {
        setReady(true);
      });
  }, []);

  return (
    <AuthCtx.Provider value={{ token, isLogin, setToken }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const AuthToken = {
  name: base64.encode('Auth-Token').toUpperCase(),
  value: '',
  get() {
    const t = Taro.getStorageSync(AuthToken.name) || '';
    AuthToken.value = t;
    return t;
  },
  set(t: string) {
    AuthToken.value = t;
    Taro.setStorageSync(AuthToken.name, t);
  },
  remove() {
    AuthToken.value = '';
    Taro.removeStorageSync(AuthToken.name);
  },
};

export const useAuthConnect = () => useContext(AuthCtx);

export default AuthConnect;
