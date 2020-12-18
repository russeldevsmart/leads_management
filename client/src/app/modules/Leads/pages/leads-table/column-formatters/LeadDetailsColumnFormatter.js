// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";

export function LeadDetailsColumnFormatter(cellContent, row) {
  return (
    <div className="d-flex flex-column">
      <span className="badge badge-pill badge-primary font-size-md mb-3">{row.client_type}</span>
      <span className="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1">
        {row.name}
      </span>
      <span className="text-muted font-weight-bold">{row.phone}</span>
      <span className="text-muted font-weight-bold">{row.email}</span>
    </div>
  );
}
