// @flow
import {combineReducers} from "redux-immutable";
import { routerReducer as router } from 'react-router-redux';
import data from './data';

const rootReducer = combineReducers({
  router,data
});

export default rootReducer;
