import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { LeadsTable } from "./leads-table/LeadsTable";
import { LeadsGrouping } from "./leads-grouping/LeadsGrouping";
import { useLeadsUIContext } from "./LeadsUIContext";

export function LeadsCard() {
  const intl = useIntl();
  const leadsUIContext = useLeadsUIContext();
  const leadsUIProps = useMemo(() => {
    return {
      ids: leadsUIContext.ids,
      newLeadButtonClick: leadsUIContext.newLeadButtonClick,
    };
  }, [leadsUIContext]);

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "LEAD.LIST" })}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={leadsUIProps.newLeadButtonClick}
          >
            {intl.formatMessage({ id: "LEAD.NEW" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {leadsUIProps.ids.length > 0 && <LeadsGrouping />}
        <LeadsTable />
      </CardBody>
    </Card>
  );
}
