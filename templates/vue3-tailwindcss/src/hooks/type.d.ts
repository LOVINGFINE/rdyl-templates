/** @i18n */
interface I18nConfig {
  locales: Record<string, I18nLangEntry>;
  initialLang: string;
}

type TRValue = string | number | boolean;

type TR = (k: string, o?: Record<string, unknown>) => string;

interface I18nLangEntry {
  title: string;
  messages: Record<string, TRValue>;
}

type I18nLocales = Record<string, I18nLangEntry>;

declare interface Window {
  $t: TR;
}

declare var $t: TR;