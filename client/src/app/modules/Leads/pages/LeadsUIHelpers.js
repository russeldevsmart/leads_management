export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  sortOrder: "-1",
  sortField: "name",
  pageNumber: 1,
  pageSize: 10
};
export const timelineColors = ["bg-danger", "bg-primary", "bg-warning", "bg-success", "bg-info", "", "bg-secondary"];

export const getTimeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 604800;
  if (interval > 1) {
    return Math.floor(interval) + " weeks";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    if (Math.floor(interval) === 1)
      return Math.floor(interval) + " day";
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}