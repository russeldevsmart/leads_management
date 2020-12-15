import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { LeadsFilter } from "./leads-filter/LeadsFilter";
import { LeadsTable } from "./leads-table/LeadsTable";
import { LeadsGrouping } from "./leads-grouping/LeadsGrouping";
import { useLeadsUIContext } from "./LeadsUIContext";

export function LeadsCard() {
  const leadsUIContext = useLeadsUIContext();
  const leadsUIProps = useMemo(() => {
    return {
      ids: leadsUIContext.ids,
      newLeadButtonClick: leadsUIContext.newLeadButtonClick,
    };
  }, [leadsUIContext]);

  return (
    <Card>
      <CardHeader title="Leads list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={leadsUIProps.newLeadButtonClick}
          >
            New Lead
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <LeadsFilter /> */}
        {leadsUIProps.ids.length > 0 && <LeadsGrouping />}
        <LeadsTable />
      </CardBody>
    </Card>
  );
}
