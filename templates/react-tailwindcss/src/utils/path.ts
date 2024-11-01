export const PATH_PARAM_REG = /:([a-zA-Z0-9$_]+)/g;

export function getParamKeys(path: string) {
  const names: string[] = [];
  let temp = PATH_PARAM_REG.exec(path);
  while (temp) {
    names.push(temp[1]);
    temp = PATH_PARAM_REG.exec(path);
  }
  return names;
}

export function resolve(...args: string[]) {
  let url = "";
  args.forEach(u => {
    if (u.startsWith("/")) {
      url += u;
    } else {
      url += `/${u}`;
    }
  });
  return url.replaceAll("//", "/");
}

export function toURL(path: string, opt: TolURLOpts = {}) {
  const { params = {}, query = {} } = opt;
  const paramKeys = getParamKeys(path);
  let url = path;
  paramKeys.forEach(n => {
    const val = params[n] || "";
    url = url.replaceAll(`:${n}`, `${val}`);
  });
  const search = new URLSearchParams();
  for (const key in query) {
    search.append(key, `${query[key]}`);
  }
  const str = search.toString();
  if (str) {
    url += `?${str}`;
  }
  return url;
}

export function match(pathname: string, url: string) {
  const regex = new RegExp(
    `${url
      .replaceAll("*", "\\*")
      .replace(PATH_PARAM_REG, "(?:([a-zA-Z0-9$_]+))")}\\/?$`,
    "i"
  );
  if (regex.exec(pathname)) {
    return regex.exec(pathname)?.index === 0;
  }
  return false;
}

export function toRouteMaps(routes: RouteOption[]) {
  const maps: Record<string, RouteOption> = {};
  const fn = (list: RouteOption[], root = "") => {
    list.forEach(ele => {
      const k = !!ele.name ? ele.name : ele.path;
      const path = resolve(root, ele.path);
      const target = {
        ...ele,
        path,
      };
      if (maps[k]) {
        maps[k + 1] = target;
      } else {
        maps[k] = target;
      }
      if (ele.routes) {
        fn(ele.routes, path);
      }
    });
  };
  fn(routes);
  return maps;
}

export default {
  PATH_PARAM_REG,
  toRouteMaps,
  getParamKeys,
  resolve,
  toURL,
  match,
};

/** @types */
type OParam = Record<string, unknown>;

interface TolURLOpts {
  params?: OParam;
  query?: OParam;
}
