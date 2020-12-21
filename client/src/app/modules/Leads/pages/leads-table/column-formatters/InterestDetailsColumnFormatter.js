// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";

export function InterestDetailsColumnFormatter(cellContent, row) {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-wrap">
        {
          row.make && row.make.length > 0 && row.make.map((m, index) => (
            <span className="label label-lg label-light-success label-inline mb-4 mr-2" key={index}>{m.name}</span>
          ))
        }
      </div>
      <div className="d-flex flex-wrap">
        {
          row.model && row.model.length > 0 && row.model.map((m, index) => (
            <span className="label label-lg label-outline-primary label-inline mr-2" key={index}>{m.name}</span>
          ))
        }
      </div>
    </div>
  );
}
