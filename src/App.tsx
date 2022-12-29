/*
 * Created by zhangq on 2021/07/01
 * App
 */
import { FC } from "react";
import { AppRouter } from "@/packages/router";
import { I18nProvider } from "@/packages/i18n";
import routes from "@/config/router";
import i18n from "@/locales";

const App: FC = () => {
  /** render */
  return (
    <I18nProvider initial={i18n} defaultNs="zh-CN">
      <AppRouter routes={routes} />
    </I18nProvider>
  );
};

export default App;
