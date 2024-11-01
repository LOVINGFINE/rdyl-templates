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

declare var $t: TR;

/** @Auth */
interface AuthConnectValue {
  token: string;
  isLogin: boolean;
  setToken(t: string): void;
}
