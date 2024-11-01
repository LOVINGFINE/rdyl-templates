import { i18nConfig, storage } from '@/App.config';
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
import base64 from 'react-native-base64';

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
  async get(initialLang: string = '') {
    try {
      const t = await storage.load<string>({
        key: LangToken.name,
      });
      LangToken.value = t;
      return t;
    } catch {
      return initialLang;
    }
  },
  set(data: string) {
    LangToken.value = data;
    return storage.save({
      key: LangToken.name,
      data,
      expires: null,
    });
  },
  remove() {
    LangToken.value = '';
    return storage.clearMapForKey(LangToken.name);
  },
};

export const useI18nConnect = () => useContext(I18nCtx);

export default I18nConnect;
