import {
  FC,
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { i18nConfig } from "@/App.config";

const I18nCtx = createContext<I18nConnectValue>({} as I18nConnectValue);
const { locales, initialLang } = i18nConfig;

const I18nConnect: FC<PropsWithChildren> = props => {
  const { children } = props;

  const [lang, setLang] = useState<string>(LangToken.get() || initialLang);

  const entry = useMemo(() => {
    return (
      locales[lang] || {
        title: "",
        messages: {},
      }
    );
  }, [lang, locales]);

  const t = useCallback(ParserI18nFn(entry.messages), [entry]);

  useEffect(() => {
    window.$t = t;
  }, [t]);

  return (
    <I18nCtx.Provider
      value={{
        locales,
        dataSource: entry.messages,
        title: entry.title,
        lang,
        t,
        setLang,
      }}
    >
      {children}
    </I18nCtx.Provider>
  );
};

function ParserI18nFn(data: Record<string, string | number | boolean>) {
  return (k: string, named?: Record<string, unknown>) => {
    let text = data[k];
    if (!text) {
      console.warn(`i18n:[${k}] not found`);
      return k;
    }
    if (named) {
      for (const key in named) {
        const varRegExp = new RegExp(`{${key}}`, "g");
        text = `${text}`.replace(varRegExp, `${named[key]}`);
      }
    }
    return text as string;
  };
}

/** @当前语种 */
export const LangToken = {
  name: btoa("Lang-Token").toUpperCase(),
  get() {
    return atob(localStorage.getItem(this.name) || "");
  },
  set(k: string) {
    localStorage.setItem(this.name, btoa(k).toUpperCase());
  },
  remove() {
    localStorage.removeItem(this.name);
  },
};

export const useI18n = () => useContext(I18nCtx);

export default I18nConnect;
