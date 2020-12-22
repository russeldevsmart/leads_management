export const categories = [
  { name: "BUY CASH", value: "buy_cash" },
  { name: "INSPECTION", value: "inspection" },
  { name: "NEW CARS", value: "new_cars" },
  { name: "OTHER REQUESTS", value: "other_requests" },
  { name: "SERVICES", value: "services" },
  { name: "SPARE PARTS", value: "spare_parts" },
  { name: "USED CARS", value: "used_cars" },
  { name: "VERIFICATION", value: "verification" },
];

export const categoryColumns = {
  "buy_cash": ["listing_link", "make", "model", "year", "mileage", "requested_price", "trade_in_budget", "status"],
  "inspection": ["request_type", "make", "model", "year", "mileage", "listing_link", "status", "inspection_date"],
  "new_cars": ["listing_link", "make", "model", "budget", "status"],
  "other_requests": ["request", "status"],
  "services": ["make", "model", "service", "status", "service_date"],
  "spare_parts": ["make", "model", "spare_part_requested", "details", "status"],
  "used_cars": ["listing_link", "make", "model", "budget", "status"],
  "verification": ["make", "model", "year", "mileage", "listing_link", "status", "verification_date"]
};

export const years = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 
  1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990];

export const clientList = [
  { label: "Particulier", value: "Particulier", _id: "Particulier" },
  { label: "Professionnel", value: "Professionnel", _id: "Professionnel" }, 
  { label: "Revendeur", value: "Revendeur", _id: "Revendeur" }
];

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