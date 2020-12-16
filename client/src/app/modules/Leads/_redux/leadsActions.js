import * as requestFromServer from "./leadsCrud";
import {leadsSlice, callTypes} from "./leadsSlice";

const {actions} = leadsSlice;

export const fetchCarMakes = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCarMakes()
    .then(response => {
      const { carMakes } = response.data;
      dispatch(actions.makesFetched({ carMakes }));
    })
    .catch(error => {
      error.clientMessage = "Can't fetch makes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}

export const fetchCarModels = (makeId) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCarModels(makeId)
    .then(response => {
      const { carModels } = response.data;
      dispatch(actions.modelsFetched({ carModels }));
    })
    .catch(error => {
      error.clientMessage = "Can't fetch models";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}

export const fetchLeads = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findLeads(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.leadsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find leads";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchLead = id => dispatch => {
  if (!id) {
    return dispatch(actions.leadFetched({ leadForEdit: undefined, carModels: [] }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getLeadById(id)
    .then(response => {
      const { lead, carModels } = response.data;
      dispatch(actions.leadFetched({ leadForEdit: lead, carModels }));
    })
    .catch(error => {
      error.clientMessage = "Can't find lead";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteLead = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLead(id)
    .then(response => {
      dispatch(actions.leadDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete lead";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createLead = leadForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createLead(leadForCreation)
    .then(response => {
      const { lead } = response.data;
      dispatch(actions.leadCreated({ lead }));
    })
    .catch(error => {
      error.clientMessage = "Can't create lead";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateLead = lead => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateLead(lead)
    .then(() => {
      dispatch(actions.leadUpdated({ lead }));
    })
    .catch(error => {
      error.clientMessage = "Can't update lead";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteLeads = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLeads(ids)
    .then(() => {
      dispatch(actions.leadsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete leads";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
