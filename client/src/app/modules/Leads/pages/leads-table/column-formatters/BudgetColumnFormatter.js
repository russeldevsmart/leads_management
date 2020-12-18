export function BudgetColumnFormatter(cellContent, row) {
  return row.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " CFA";
}
