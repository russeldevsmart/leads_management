import axios from "axios";
import {dashboardSlice} from "./dashboardSlice";

const {actions} = dashboardSlice;

export const fetchAllData = () => dispatch => {
  dispatch(actions.startCall());
  return axios.get("/api/leads/get-dashboard-info")
    .then(response => {
      dispatch(actions.allDataFetched(response.data));
    })
    .catch(error => {
    //   error.clientMessage = "Can't fetch makes";
    //   dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}
