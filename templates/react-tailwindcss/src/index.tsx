import "@/styles/index.less";
import ReactDOM from "react-dom/client";
import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterConnect from "@/connect/Router";
import AuthConnect from "@/connect/Auth";
import I18nConnect from "@/connect/I18n";

import { i18nConfig, website_name } from "@/App.config";
import { routes } from "@/App.router";

const App: FC = () => {
  function afterEach(route: RouteOption) {
    const { meta = {} } = route;
    if (meta?.title) {
      document.title = `${website_name} · ${meta?.title}`;
    } else {
      document.title = website_name;
    }
  }
  return (
    <I18nConnect {...i18nConfig}>
      <AuthConnect>
        <Router>
          <RouterConnect afterEach={afterEach} routes={routes} />
        </Router>
      </AuthConnect>
    </I18nConnect>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
