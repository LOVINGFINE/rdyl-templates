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
import { storage } from '@/App.config';
import base64 from 'react-native-base64';

export const AuthCtx = createContext<AuthConnectValue>({} as AuthConnectValue);

const AuthConnect: FC<PropsWithChildren> = ({ children }) => {
  const [token, _setToken] = useState(AuthToken.value);
  const [ready, setReady] = useState(false);

  const isLogin = useMemo(() => !!token, [token]);

  const setToken = useCallback(
    (e: string) => {
      _setToken(e);
      AuthToken.set(e);
    },
    [token]
  );

  useEffect(() => {
    AuthToken.get()
      .then(setToken)
      .finally(() => {
        setReady(true);
      });
  }, []);

  return (
    <AuthCtx.Provider value={{ token, isLogin, setToken }}>
      {ready && children}
    </AuthCtx.Provider>
  );
};

export const AuthToken = {
  name: base64.encode('Auth-Token').toUpperCase(),
  value: '',
  async get() {
    try {
      const t = await storage.load<string>({
        key: AuthToken.name,
      });
      AuthToken.value = t;
      return t;
    } catch {
      return '';
    }
  },
  set(data: string) {
    AuthToken.value = data;
    return storage.save({
      key: AuthToken.name,
      data,
      expires: null,
    });
  },
  remove() {
    AuthToken.value = '';
    return storage.clearMapForKey(AuthToken.name);
  },
};

export const useAuthConnect = () => useContext(AuthCtx);

export default AuthConnect;
