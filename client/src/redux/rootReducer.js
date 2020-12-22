import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {leadsSlice} from "../app/modules/Leads/_redux/leadsSlice";
import {dashboardSlice} from "../app/modules/Dashboard/_redux/dashboardSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  leads: leadsSlice.reducer,
  dashboard: dashboardSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
