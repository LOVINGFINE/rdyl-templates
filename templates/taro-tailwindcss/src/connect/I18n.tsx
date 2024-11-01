import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Taro from '@tarojs/taro';
import { base64 } from '@/utils/parser';
import { i18nConfig } from '@/index.config';

const I18nCtx = createContext<I18nConnectValue>({} as I18nConnectValue);
const { locales, initialLang } = i18nConfig;

const I18nConnect: FC<PropsWithChildren> = ({ children }) => {
  const [lang, _setLang] = useState<string>(LangToken.value);
  const [ready, setReady] = useState(false);
  const entry = useMemo(() => {
    return (
      locales[lang] || {
        title: '',
        messages: {},
      }
    );
  }, [lang, locales]);

  const t = useCallback(ParserI18nFn(entry.messages), [entry]);

  const setLang = useCallback(
    (e: string) => {
      LangToken.set(e);
      _setLang(e);
    },
    [lang]
  );

  useEffect(() => {
    global.$t = t;
  }, [t]);

  useEffect(() => {
    LangToken.get(initialLang)
      .then(setLang)
      .finally(() => {
        setReady(true);
      });
  }, []);

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
      {ready && children}
    </I18nCtx.Provider>
  );
};

function ParserI18nFn(data: Record<string, TRValue>) {
  return (k: string, named?: Record<string, unknown>) => {
    let text = data[k];
    if (!text) {
      console.warn(`i18n:[${k}] not found`);
      return k;
    }
    if (named) {
      for (const key in named) {
        const varRegExp = new RegExp(`{${key}}`, 'g');
        text = `${text}`.replace(varRegExp, `${named[key]}`);
      }
    }
    return text as string;
  };
}

export const LangToken = {
  name: base64.encode('Lang-Token').toUpperCase(),
  value: '',
  get(i: string = '') {
    const t = Taro.getStorageSync(LangToken.name) || i;
    LangToken.value = t;
    return t;
  },
  set(t: string) {
    LangToken.value = t;
    Taro.setStorageSync(LangToken.name, t);
  },
  remove() {
    LangToken.value = '';
    Taro.removeStorageSync(LangToken.name);
  },
};

export const useI18nConnect = () => useContext(I18nCtx);

export default I18nConnect;
