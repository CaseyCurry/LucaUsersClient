import React from "react";
import {Provider} from "react-redux";
import HomeContainer from "./pages/home/HomeContainer";
import store from "./store";
import * as actions from "./actions";

export const App = ({handleSuccessfulAuthentication}) => {
  store.dispatch(actions.registerSuccessHandler(handleSuccessfulAuthentication));

  return <Provider store={store}>
    <HomeContainer/>
  </Provider>;
};

App.propTypes = {
  handleSuccessfulAuthentication: React.PropTypes.func.isRequired
};
