import React, { useMemo } from "react";
import { useLeadsUIContext } from "../LeadsUIContext";

export function LeadsGrouping() {
  // Leads UI Context
  const leadsUIContext = useLeadsUIContext();
  const leadsUIProps = useMemo(() => {
    return {
      ids: leadsUIContext.ids,
      setIds: leadsUIContext.setIds,
      openDeleteLeadsDialog: leadsUIContext.openDeleteLeadsDialog,
      openFetchLeadsDialog: leadsUIContext.openFetchLeadsDialog,
      openUpdateLeadsStatusDialog:
        leadsUIContext.openUpdateLeadsStatusDialog,
    };
  }, [leadsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{leadsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={leadsUIProps.openDeleteLeadsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              {/* &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={leadsUIProps.openFetchLeadsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={leadsUIProps.openUpdateLeadsStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
