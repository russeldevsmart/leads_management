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
}