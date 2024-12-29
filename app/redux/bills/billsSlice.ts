import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Bill {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface BillsState {
  bills: Bill[];
}

const initialState: BillsState = {
  bills: [],
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill(state, action: PayloadAction<Bill>) {
      state.bills.push(action.payload);
    },
    editBill(state, action: PayloadAction<Bill>) {
      const index = state.bills.findIndex((bill) => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index] = action.payload;
      }
    },
    removeBill(state, action: PayloadAction<string>) {
      state.bills = state.bills.filter((bill) => bill.id !== action.payload);
    },
  },
});

export const { addBill, editBill, removeBill } = billsSlice.actions;

export default billsSlice.reducer;
