import { legacy_createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer/index";

export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); // para que se puedan unar los devtools