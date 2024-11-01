/** @i18n */
interface I18nConfig {
  locales: Record<string, I18nLangEntry>;
  initialLang: string;
}

type TRValue = string | number | boolean;

interface I18nConnectValue {
  title: string;
  lang: string;
  dataSource: Record<string, TRValue>;
  locales: Record<string, I18nLangEntry>;
  setLang(name: string): void;
  t: TR;
}

interface I18nLangEntry {
  title: string;
  messages: Record<string, TRValue>;
}

type TR = (k: string, o?: Record<string, unknown>) => string;

declare interface window {
  $t: TR;
}

declare var $t: TR;

/** @Auth */
interface AuthConnectValue {
  token: string;
  isLogin: boolean;
  setToken(t: string): void;
  setWatermark(t: string): void;
}

/** @Router */
interface RouteOptionMeta {
  title?: string;
}

interface RouteOption {
  name: string;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.ComponentType<any>;
  meta?: RouteOptionMeta;
  redirect?: string | ((e: RouteOption) => string);
  isPublic?: boolean;
  routes?: RouteOption[];
}

interface RouterConnectValue {
  current?: RouteOption;
  pending: boolean;
  setPending(e: boolean): void;
  push(n: string, o?: ActionUriParam): void;
  redirect(n: string, o?: ActionUriParam): void;
  back(delta: number): void;
}

interface ActionUriParam {
  params?: ParamMap;
  query?: ParamMap;
}

interface QueryParam {
  stay?: boolean;
  replace?: boolean;
}

interface RouterConnectProps {
  afterEach?(e: RouteOption): void;
}

type QParam = Record<string, unknown>;
