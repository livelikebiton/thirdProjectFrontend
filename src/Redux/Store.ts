import { authReducer } from "./AuthState";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { vacationsReducer } from "./VacationsState";
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';

const reducers = combineReducers({ vacationsState: vacationsReducer, authState: authReducer});

const logger = createLogger();
const middleware = composeWithDevTools(applyMiddleware(logger));
const store = createStore(reducers, middleware)

export default store;

