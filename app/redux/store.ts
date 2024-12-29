import { configureStore } from "@reduxjs/toolkit";
import billsReducer from "./bills/billsSlice";
import budgetReducer from "./budget/budgetSlice";

const store = configureStore({
  reducer: {
    bills: billsReducer,
    budget: budgetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
