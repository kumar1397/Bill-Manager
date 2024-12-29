import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BudgetState {
  budget: number;
}

const initialState: BudgetState = {
  budget: 0,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudget(state, action: PayloadAction<number>) {
      state.budget = action.payload;
    },
  },
});

export const { setBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
