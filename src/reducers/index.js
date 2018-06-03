import {combineReducers} from "redux-immutable";
import data from './data';
import route from './route';

const rootReducer = combineReducers({
  data,route
});

export default rootReducer;
