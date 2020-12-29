import equal from 'fast-deep-equal'
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "10", value: 10 },
  { text: "25", value: 25 },
  { text: "50", value: 50 },
  { text: "100", value: 100 }
];
export const initialFilter = {
  sortOrder: "-1",
  sortField: "edited_on",
  pageNumber: 1,
  pageSize: 10
};
export const statusList = [
  { label: "Nouveau", value: "Nouveau", _id: "Nouveau", color: "primary" },
  { label: "Froid", value: "Froid", _id: "Froid", color: "light-primary" }, 
  { label: "Tiède", value: "Tiède", _id: "Tiède", color: "success" },
  { label: "Chaud", value: "Chaud", _id: "Chaud", color: "info" },
  { label: "RDV", value: "RDV", _id: "RDV", color: "warning" },
  { label: "Transmis", value: "Transmis", _id: "Transmis", color: "danger" },
  { label: "Gagné", value: "Gagné", _id: "Gagné", color: "light" },
  { label: "Perdu", value: "Perdu", _id: "Perdu", color: "dark" },
];
export const categories = [
  { name: "Voitures Neuves", value: "new_cars" },
  { name: "Voitures Occasion", value: "used_cars" },
  { name: "Rachat/Reprise", value: "buyout_takeover" },
  { name: "Inspections", value: "inspection" },
  { name: "Vérifications", value: "verification" },
  { name: "Services", value: "services" },
  { name: "Pièces de Rechange", value: "spare_parts" },
  { name: "Demandes Supplémentaires", value: "other_requests" },
];
export const categoryColumns = {
  "new_cars": ["make", "model", "budget"],
  "used_cars": ["make", "model", "budget"],
  "buyout_takeover": ["listing_link", "make", "model", "year", "mileage", "desired_price", "offered_price", "reprise"],
  "inspection": ["make", "model", "year", "mileage", "desired_price", "listing_link", "inspection_date"],
  "verification": ["make", "model", "year", "mileage", "desired_price", "listing_link"],
  "services": ["make", "model", "year", "service", "date_maintenance"],
  "spare_parts": ["make", "model", "year", "wanted_part"],
  "other_requests": ["request_details"],
};
export const years = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 
  1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990];
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
export const serviceOptions = [
  { label: "Climatisation", value: "Climatisation", _id: "Climatisation" },
  { label: "Batterie", value: "Batterie", _id: "Batterie" }, 
  { label: "Pneus", value: "Pneus", _id: "Pneus" },
  { label: "Vidange", value: "Vidange", _id: "Vidange" },
  { label: "Moteur", value: "Moteur", _id: "Moteur" }, 
  { label: "Freinage", value: "Freinage", _id: "Freinage" },
  { label: "Essuies-Glace", value: "Essuies-Glace", _id: "Essuies-Glace" },
  { label: "Autre", value: "Autre", _id: "Autre" }
];
export const getCategoryName = (value) => {
  let findObj = categories.find(x => x.value === value);
  if (findObj && findObj.name) return findObj.name;
  else return "";
}
export const getTimeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return { number: Math.floor(interval), unit: "YEARS" };
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return { number: Math.floor(interval), unit: "MONTHS" };
  }
  interval = seconds / 604800;
  if (interval > 1) {
    return { number: Math.floor(interval), unit: "WEEKS" };
  }
  interval = seconds / 86400;
  if (interval > 1) {
    
    if (Math.floor(interval) === 1)
      return { number: Math.floor(interval), unit: "DAY" };
    return { number: Math.floor(interval), unit: "DAYS" };
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return { number: Math.floor(interval), unit: "HOURS" };
  }
  interval = seconds / 60;
  if (interval > 1) {
    return { number: Math.floor(interval), unit: "MINUTES" };
  }
  return { number: Math.floor(seconds), unit: "SECONDS" };
}
export function getDiffKeys(o1, o2) {
  let diffKeys = [];
  for (const [key, value] of Object.entries(o1)) {
    if (!equal(value, o2[key]) && key !== 'comments')
      diffKeys.push(key);
  }
  return diffKeys;
}
export function thousandsSeperator(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}