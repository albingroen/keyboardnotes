import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import LogRocket from 'logrocket';
import thunk from "redux-thunk";

import noteReducer from "./ducks/note/reducers";
import interfaceReducer from "./ducks/interface/reducers";

const rootReducer = combineReducers({
  note: noteReducer,
  interface: interfaceReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, LogRocket.reduxMiddleware()))
);

export default store;
