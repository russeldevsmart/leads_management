// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";
import { statusList } from "../../../constants";

export function StatusColumnFormatter(cellContent, row) {
  const index = statusList.findIndex((el) => el.label === row.status);
  return (
    <span className={`label label-inline label-lg label-${statusList[index].color}`}>{row.status}</span>
  )
}
