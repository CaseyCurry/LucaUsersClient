import {
  createStore,
  applyMiddleware,
  combineReducers
} from "redux";
import promise from "redux-promise-middleware";
import appReducer from "./reducers/app";
import authenticationReducer from "./pages/authentication/reducers/authentication";
import registrationReducer from "./pages/registration/reducers/registration";

const reducer = combineReducers({
  app: appReducer,
  authentication: authenticationReducer,
  registration: registrationReducer
});
const middleware = applyMiddleware(promise());
const store = createStore(reducer, middleware);

export default store;
