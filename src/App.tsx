import {
  IonApp,
  IonRouterOutlet,
  isPlatform,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "react-router-dom";
import ProtectedRoute from "./components/protected-route";
import SessionPage from "./pages/session-page";
import HomePage from "./pages/home-page";
import SettingsPage from "./pages/settings-page";
import SavingsAccounts from "./pages/savings-accounts";
import InsuranceAccounts from "./pages/insurance-accounts";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
import "@ionic/react/css/palettes/dark.class.css";
/* import "@ionic/react/css/palettes/dark.system.css"; */

/* Theme variables */
import "./theme/variables.css";

/* Setup */
setupIonicReact({ mode: "ios" });
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet animated={!isPlatform("mobileweb")}>
            <Route exact path="/session" component={SessionPage} />
            <ProtectedRoute exact path="/" component={HomePage} />
            <ProtectedRoute exact path="/settings" component={SettingsPage} />
            <ProtectedRoute
              exact
              path="/settings/savings-accounts"
              component={SavingsAccounts}
            />
            <ProtectedRoute
              exact
              path="/settings/insurance-accounts"
              component={InsuranceAccounts}
            />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </QueryClientProvider>
  );
}
