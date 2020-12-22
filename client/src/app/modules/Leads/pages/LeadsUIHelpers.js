import equal from 'fast-deep-equal'
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
export const sourceList = [
  {label: "Voitures.ci", value: "Voitures.ci", _id: "Voitures.ci"},
  {label: "Whatsapp", value: "Whatsapp", _id: "Whatsapp"},
  {label: "Sites Marques", value: "Sites Marques", _id: "Sites Marques"},
  {label: "Facebook", value: "Facebook", _id: "Facebook"},
  {label: "Instagram", value: "Instagram", _id: "Instagram"},
  {label: "Téléphone", value: "Téléphone", _id: "Téléphone"},
  {label: "Email", value: "Email", _id: "Email"},
  {label: "Autre", value: "Autre", _id: "Autre"},
];
export const clientList = [
  { label: "Particulier", value: "Particulier", _id: "Particulier" },
  { label: "Professionnel", value: "Professionnel", _id: "Professionnel" }, 
  { label: "Revendeur", value: "Revendeur", _id: "Revendeur" }
];

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
export function getDiffKeys(o1, o2) {
  let diffKeys = [];
  for (const [key, value] of Object.entries(o1)) {
    if (!equal(value, o2[key]) && key !== 'comments')
      diffKeys.push(key);
  }
  return diffKeys;
}