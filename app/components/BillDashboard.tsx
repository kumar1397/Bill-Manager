"use client"
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectFilteredBills } from "../redux/bills/selectors";
import { RootState } from "../redux/store";
import BillForm from "./BillForm";
import BillFilter from "./BillFilter";
import TimeSeriesChart from "./Chart";

const BillDashboard: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const bills = useSelector((state: RootState) => selectFilteredBills(state, category));
  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div>
      <BillForm />
      <BillFilter category={category} setCategory={setCategory} />
      <h2>Total Monthly Billed Amount: ${totalAmount}</h2>
      <ul>
        {bills.map((bill) => (
          <li key={bill.id}>
            {bill.name} - ${bill.amount} ({bill.category})
          </li>
        ))}
      </ul>
      <TimeSeriesChart bills={bills} />
    </div>
  );
};

export default BillDashboard;
