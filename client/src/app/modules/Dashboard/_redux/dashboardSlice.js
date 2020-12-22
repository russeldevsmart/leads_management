import {createSlice} from "@reduxjs/toolkit";

const initialDashboardState = {
  loading: false,
  totalLeads: 0,
  newLeads: 0,
  ongoingLeads: 0,
  goneLeads: 0,
  weeklyLeadsChartData: null,
  leadsCategoryChartData: null,
  leadStatuChartData: null,
  yearlyHeatmapData: null,
  topLead: null,
  lastActions: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    startCall: (state, action) => {
      state.loading= true;
    },
    allDataFetched: (state, action) => {
      state.loading = false;
      state.totalLeads = action.payload.totalLeads;
      state.newLeads = action.payload.newLeads;
      state.goneLeads = action.payload.goneLeads;
      state.ongoingLeads = action.payload.ongoingLeads;
      state.lastActions = action.payload.lastActions;
      state.topLead = action.payload.topLead;
      state.weeklyLeadsChartData = action.payload.weeklyLeadsChartData;
      state.leadStatuChartData = action.payload.leadStatuChartData;
      state.yearlyHeatmapData = action.payload.yearlyHeatmapData;
    }
  }
});
