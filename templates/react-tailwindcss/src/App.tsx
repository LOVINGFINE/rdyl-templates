import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterConnect from "@/connect/Router";
import AuthConnect from "@/connect/Auth";
import I18nConnect from "@/connect/I18n";

const App: FC = () => {
  function afterEach(route: RouteOption) {
    /** @todo */
  }
  return (
    <I18nConnect>
      <AuthConnect>
        <Router>
          <RouterConnect afterEach={afterEach} />
        </Router>
      </AuthConnect>
    </I18nConnect>
  );
};

export default App;
