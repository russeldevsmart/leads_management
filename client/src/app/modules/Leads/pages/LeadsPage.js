import React from "react";
import { Route } from "react-router-dom";
import { LeadsLoadingDialog } from "./leads-loading-dialog/LeadsLoadingDialog";
import { LeadEditDialog } from "./lead-edit-dialog/LeadEditDialog";
import { LeadDeleteDialog } from "./lead-delete-dialog/LeadDeleteDialog";
import { LeadsDeleteDialog } from "./leads-delete-dialog/LeadsDeleteDialog";
// import { LeadsFetchDialog } from "./leads-fetch-dialog/LeadsFetchDialog";
// import { LeadsUpdateStateDialog } from "./leads-update-status-dialog/LeadsUpdateStateDialog";
import { LeadsUIProvider } from "./LeadsUIContext";
import { LeadsCard } from "./LeadsCard";

export function LeadsPage({ history }) {
  const leadsUIEvents = {
    newLeadButtonClick: () => {
      history.push("/leads/new");
    },
    openEditLeadDialog: (id) => {
      history.push(`/leads/${id}/edit`);
    },
    openDeleteLeadDialog: (id) => {
      history.push(`/leads/${id}/delete`);
    },
    openDeleteLeadsDialog: () => {
      history.push(`/leads/deleteLeads`);
    },
    // openFetchLeadsDialog: () => {
    //   history.push(`/leads/fetch`);
    // },
    // openUpdateLeadsStatusDialog: () => {
    //   history.push("/leads/updateStatus");
    // }
  }

  return (
    <LeadsUIProvider leadsUIEvents={leadsUIEvents}>
      <LeadsLoadingDialog />
      <Route path="/leads/new">
        {({ history, match }) => (
          <LeadEditDialog
            show={match != null}
            onHide={() => {
              history.push("/leads");
            }}
          />
        )}
      </Route>
      <Route path="/leads/:id/edit">
        {({ history, match }) => (
          <LeadEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/leads");
            }}
          />
        )}
      </Route>
      <Route path="/leads/deleteLeads">
        {({ history, match }) => (
          <LeadsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/leads");
            }}
          />
        )}
      </Route>
      <Route path="/leads/:id/delete">
        {({ history, match }) => (
          <LeadDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/leads");
            }}
          />
        )}
      </Route>
      {/*
      <Route path="/leads/fetch">
        {({ history, match }) => (
          <LeadsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/leads");
            }}
          />
        )}
      </Route>
      <Route path="/leads/updateStatus">
        {({ history, match }) => (
          <LeadsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/leads");
            }}
          />
        )}
      </Route> */}
      <LeadsCard />
    </LeadsUIProvider>
  );
}
