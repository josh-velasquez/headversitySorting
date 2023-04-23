import { combineReducers } from "redux";
import omnisortReducer from "./omnisortReducer";

const reducers = combineReducers({
  results: omnisortReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
