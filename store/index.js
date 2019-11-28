import { createStore, combineReducers, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import ReduxThunk from "redux-thunk";

const store = createStore(
  combineReducers({
    root: rootReducer
  }),
  applyMiddleware(ReduxThunk)
);

export default store;
