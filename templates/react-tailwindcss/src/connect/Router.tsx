import {
  FC,
  Fragment,
  Suspense,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { resolve, match, toURL, toRouteMaps } from "@/utils/path";
import { website_name } from "@/App.config";

const RouterCtx = createContext<RouterConnectValue>({} as RouterConnectValue);

const RouterConnect: FC<RouterConnectProps> = ({ routes = [], afterEach }) => {
  const _routes_map = useMemo(() => toRouteMaps(routes), [routes.length]);

  const location = useLocation();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  function toRender(items: RouteOption[]) {
    return items.map(item => {
      return (
        <Route
          key={item.path}
          path={item.path}
          element={
            <Suspense fallback={<></>}>
              {item.component ? (
                <item.component>
                  <Outlet />
                </item.component>
              ) : (
                <Outlet />
              )}
            </Suspense>
          }
        >
          {item.routes && toRender(item.routes)}
        </Route>
      );
    });
  }

  const current = useMemo(() => {
    return Object.values(_routes_map).find(ele =>
      match(location.pathname, ele.path)
    );
  }, [location.pathname, _routes_map]);

  function _handle(name: string, opts: ActionUriParam = {}, replace?: boolean) {
    const { params = {}, query = {} } = opts;
    const c = _routes_map[name];
    console.log(c);
    
    if (c) {
      navigate(toURL(c.path, { params, query }), { replace });
    } else {
      navigate(name, { replace });
    }
  }

  function push(name: string, opts?: ActionUriParam) {
    _handle(name, opts);
  }

  function redirect(name: string, opts: ActionUriParam = {}) {
    _handle(name, opts, true);
  }

  function back(delta: number) {
    navigate(delta);
  }

  function beforeEach(route: RouteOption) {
    if (route.redirect && route.redirect !== location.pathname) {
      // 重定向
      if (typeof route.redirect === "string") {
        const path = resolve(route.path, route.redirect);
        redirect(path);
      } else {
        const r = route.redirect(route);
        redirect(r);
      }
    } else {
      afterEach && afterEach(route);
    }
  }

  useEffect(() => {
    if (current) {
      beforeEach(current);
      setPending(false);
    }
  }, [current]);

  const elements = useMemo(() => {
    return <Routes>{toRender(routes)}</Routes>;
  }, []);

  return (
    <Fragment>
      {pending && (
        <div className="z-[9999] fixed left-0 top-0 w-[100vw] h-[100vh] flex flex-col items-center justify-center frosted-1">
          <div className="relative inline-block">
            <div className="text-[var(--primary)] font-[900] text-anim-floating text-[24px] sm:text-[48px]">
              {website_name}
            </div>
            <div className="text-anim-bar-loader bg-[#08979cd4] h-[12px] sm:h-[18px] shadow-sm" />
          </div>
        </div>
      )}
      <RouterCtx.Provider
        value={{
          current,
          pending,
          setPending,
          redirect,
          push,
          back,
        }}
      >
        {elements}
      </RouterCtx.Provider>
    </Fragment>
  );
};

export const useQuery = (): [
  URLSearchParams,
  (p: QParam, opts?: QueryParam) => void
] => {
  const [query, _setQuery] = useSearchParams();

  function setQuery(p: QParam, opts?: QueryParam) {
    const { stay = true, replace = false } = opts || {};
    let newParams: Record<string, unknown> = p;
    const all = () => {
      const values: Record<string, unknown> = {};
      query.forEach((v, k) => {
        values[k] = v;
      });
      return values;
    };
    if (stay) {
      newParams = {
        ...all(),
        ...p,
      };
    }
    _setQuery(newParams as Record<string, string>, { replace });
  }

  return [query, setQuery];
};

export const useRouter = () => useContext(RouterCtx);

export default RouterConnect;
