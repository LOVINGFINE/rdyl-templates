import { Watermark } from "@/components";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from "react";

export const AuthCtx = createContext<AuthConnectValue>({} as AuthConnectValue);

const AuthConnect: FC<PropsWithChildren> = ({ children }) => {
  const [token, _setToken] = useState(AuthToken.get());
  const [watermark, setWatermark] = useState("");

  const setToken = useCallback(
    (t: string) => {
      _setToken(t);
      AuthToken.set(t);
    },
    [token]
  );

  const isLogin = useMemo(() => {
    return !!token;
  }, [token]);

  return (
    <AuthCtx.Provider
      value={{
        token,
        isLogin,
        setToken,
        setWatermark,
      }}
    >
      <Watermark content={watermark} />
      {children}
    </AuthCtx.Provider>
  );
};

export const AuthToken = {
  name: btoa("Auth-Token").toUpperCase(),
  get() {
    return localStorage.getItem(AuthToken.name) || "";
  },
  set(k: string) {
    localStorage.setItem(AuthToken.name, k);
  },
  remove() {
    localStorage.removeItem(AuthToken.name);
  },
};

export const useAuthConnect = () => useContext(AuthCtx);

export default AuthConnect;
