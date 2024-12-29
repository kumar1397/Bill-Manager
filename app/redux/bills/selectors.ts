import { RootState } from "../store";
export const selectBills = (state: RootState) => state.bills.bills;

export const selectFilteredBills = (state: RootState, category: string) =>
  category
    ? state.bills.bills.filter((bill) => bill.category === category)
    : state.bills.bills;
