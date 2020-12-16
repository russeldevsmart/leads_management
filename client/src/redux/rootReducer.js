import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {leadsSlice} from "../app/modules/Leads/_redux/leadsSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  leads: leadsSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
