import axios from "axios";

export const LEADS_URL = "/api/leads";

// CREATE =>  POST: add a new lead to the server
export function createLead(lead) {
  return axios.post(`${LEADS_URL}/create`, { lead });
}

// READ
export function getAllLeads() {
  return axios.get(LEADS_URL);
}

export function getLeadById(leadId) {
  return axios.get(`${LEADS_URL}/get?id=${leadId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findLeads(queryParams) {
  return axios.post(`${LEADS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the lead on the server
export function updateLead(lead) {
  return axios.post(`${LEADS_URL}/update`, { lead });
}

// UPDATE Status
export function updateStatusForLeads(ids, status) {
  return axios.post(`${LEADS_URL}/updateStatusForLeads`, {
    ids,
    status
  });
}

// DELETE => delete the lead from the server
export function deleteLead(leadId) {
  return axios.delete(`${LEADS_URL}/delete?id=${leadId}`);
}

// DELETE Leads by ids
export function deleteLeads(ids) {
  return axios.post(`${LEADS_URL}/deleteLeads`, { ids });
}
