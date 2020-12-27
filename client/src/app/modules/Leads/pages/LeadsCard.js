import React, { useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
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
import * as uiHelpers from "./LeadsUIHelpers";

export function LeadsCard() {
  const { listCategory } = useSelector(
    (state) => ({
      listCategory: state.leads.listCategory,
    }),
    shallowEqual
  );
  
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
      <CardHeader title={`${listCategory ? uiHelpers.getCategoryName(listCategory) : "All"} - ${intl.formatMessage({ id: "LEAD.LIST" })}`}>
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
