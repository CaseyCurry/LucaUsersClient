import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import notificationReducers from "./components/notifications/reducers";

const reducers = combineReducers({
  notifications: notificationReducers
});

const middleware = applyMiddleware(thunk);

const store = createStore(reducers, compose(middleware));

export default store;
