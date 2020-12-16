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

export const years = [ 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 
  2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021 ];