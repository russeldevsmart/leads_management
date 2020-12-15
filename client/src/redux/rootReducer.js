import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {leadsSlice} from "../app/modules/Leads/_redux/leadsSlice";
// import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
// import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
// import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
// import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  leads: leadsSlice.reducer,
  // customers: customersSlice.reducer,
  // products: productsSlice.reducer,
  // remarks: remarksSlice.reducer,
  // specifications: specificationsSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
