import {createSlice} from "@reduxjs/toolkit";

const initialLeadsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  makes: null,
  leadForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const leadsSlice = createSlice({
  name: "leads",
  initialState: initialLeadsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getLeadById
    leadFetched: (state, action) => {
      const { carModels, leadForEdit } = action.payload;
      state.actionsLoading = false;
      state.leadForEdit = leadForEdit;
      state.models = carModels.map((model) => {
        return { label: model.name, value: model.id_car_model, _id: model._id };
      });
      state.error = null;
    },
    // findLeads
    leadsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createLead
    leadCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.lead);
    },
    // updateLead
    leadUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity._id === action.payload.lead._id) {
          return action.payload.lead;
        }
        return entity;
      });
    },
    // deleteLead
    leadDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteLeads
    leadsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // makesFetched
    makesFetched: (state, action) => {
      const { carMakes } = action.payload;
      state.error = null;
      state.actionsLoading = false;
      state.makes = carMakes.map((make) => {
        return { label: make.name, value: make.id_car_make, _id: make._id };
      });
    },
    // modelsFetched
    modelsFetched: (state, action) => {
      const { carModels } = action.payload;
      state.error = null;
      state.actionsLoading = false;
      state.models = carModels.map((model) => {
        return { label: model.name, value: model.id_car_model, _id: model._id };
      });
    }
  }
});
