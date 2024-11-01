import { useCallback, useMemo } from 'react';
import Taro from '@tarojs/taro';
import { URLSearchParams } from '@/utils/url';
import { pages, tabs } from '@/index.router';

export const RouteMaps = {
  ...Object.fromEntries(pages.map((ele) => [ele.name, ele])),
  ...Object.fromEntries(
    tabs.map((ele) => [
      ele.name,
      {
        isTab: true,
        ...ele,
      },
    ])
  ),
};

function getRouteOption(n: string = '') {
  if (RouteMaps[n]) {
    return RouteMaps[n];
  }
  const k = Object.keys(RouteMaps).find(
    (e) => n.indexOf(RouteMaps[e].path) > -1
  );
  if (k) {
    return RouteMaps[k];
  }
  return RouteMaps['homepage'];
}

function getCurrentRouter() {
  return Taro.getCurrentInstance().router;
}

function ParseUrl(name: string, _q: Record<string, unknown> = {}) {
  const target = RouteMaps[name];
  const si = new URLSearchParams(target.path);
  si.assign(_q);
  const path = target.path.startsWith('/') ? target.path : `/${target.path}`;
  return `${path}${si.toString()}`;
}

function RouterPush(name: string, _q: SearchParams = {}, keep?: boolean) {
  const params = getCurrentRouter()?.params || {};
  const target = getRouteOption(name);
  const query = keep ? { ..._q, ...params } : _q;
  const url = ParseUrl(name, query);
  // @ts-ignore
  if (target?.isTab) {
    Taro.switchTab({
      url,
    });
  } else {
    Taro.navigateTo({
      url,
    });
  }
}

function RouterRedirect(name: string, _q: SearchParams = {}, keep?: boolean) {
  const params = getCurrentRouter()?.params || {};
  const target = getRouteOption(name);
  const query = keep ? { ..._q, ...params } : _q;
  const url = ParseUrl(name, query);
  // @ts-ignore
  if (target?.isTab) {
    Taro.switchTab({
      url,
    });
  } else {
    Taro.redirectTo({
      url,
    });
  }
}

const RouterUri = {
  push(name: string, query: SearchParams = {}, keep?: boolean) {
    RouterPush(name, query, keep);
  },
  redirect(name: string, query: SearchParams = {}, keep?: boolean) {
    RouterRedirect(name, query, keep);
  },
  back(delta: number = -1) {
    const hasBack = (Taro.getCurrentPages() || [])?.length > delta * -1;
    if (hasBack) {
      Taro.navigateBack({
        delta,
      });
    } else {
      RouterPush('homepage');
    }
  },
  toSign() {
    // @ts-ignore
    const { path = '' } = getCurrentRouter();
    RouterPush('Login', {
      redirectURL: encodeURIComponent(path),
    });
  },
  reLaunch() {
    // @ts-ignore
    const { path = '', params } = getCurrentRouter();
    const { redirectURL = '', ...query } = params;
    const pathname = decodeURIComponent(redirectURL);
    if (redirectURL && pathname.indexOf(path) === -1) {
      Taro.reLaunch({
        url: ParseUrl(pathname, query),
      });
    } else {
      const target = getRouteOption();
      Taro.reLaunch({
        url: ParseUrl(target.name, query),
      });
    }
  },
};

export const useRoute = () => {
  const currentRouter = Taro.getCurrentInstance().router;

  const query = useMemo(():any => {
    return currentRouter?.params || {};
  }, [currentRouter]);

  return useMemo((): Route => {
    const { path = '' } = currentRouter || {};
    const target = getRouteOption(path);
    const back = (Taro.getCurrentPages() || [])?.length > 1;
    return {
      ...target,
      query,
      back,
      tab: false,
    };
  }, [query]);
};

export const useRouter = () => {
  const current = useRoute();

  const push = useCallback(RouterUri.push, []);
  const redirect = useCallback(RouterUri.redirect, []);
  const back = useCallback(RouterUri.back, []);

  return useMemo(() => {
    const target = {
      RouteMaps,
      current,
      push,
      back,
      redirect,
    };
    Object.defineProperty(target, 'current', {
      writable: false,
    });
    Object.defineProperty(target, 'RouteMaps', {
      writable: false,
    });
    return target;
  }, [RouteMaps, current]);
};

export default RouterUri;
