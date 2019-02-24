import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import NotificationsContainer from "./components/notifications/Notifications-Container";
import LoginContainer from "./pages/login/Login-Container";
import RegisterContainer from "./pages/register/Register-Container";
import store from "./store";
import "./styles/main";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="fluid-container">
          <Route path="/" component={NotificationsContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/register" component={RegisterContainer} />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
