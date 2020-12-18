// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";
import moment from "moment";

export function LastActionColumnFormatter(cellContent, row) {
  return (
    <div className="d-flex">
      <img src="/media/users/default.jpg" className="rounded-circle mr-4" alt="Editor Avatar" width="40" height="40"></img>
      <div>
        <span className="d-inline-block w-100 mb-2 font-weight-bold text-dark-75">{row.edited_by.fullname}</span>
        <span className="d-inline-block w-100 mb-1 font-size-sm text-muted">{moment(row.edited_on).format("DD/MM/YYYY")}</span>
        <span className="d-inline-block w-100 font-size-sm text-muted">{moment(row.edited_on).format("HH:mm")}</span>
      </div>
    </div>
  );
}
