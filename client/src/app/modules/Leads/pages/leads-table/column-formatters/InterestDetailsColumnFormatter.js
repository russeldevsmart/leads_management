// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";

export function InterestDetailsColumnFormatter(cellContent, row) {
  return (
    <div className="d-flex flex-column">
      <span className="label label-lg label-light-success label-inline mb-4">{row.make.name}</span>
      <span className="label label-lg label-light-primary label-inline">{row.model.name}</span>
    </div>
  );
}
