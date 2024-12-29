"use client"

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBill } from "../redux/bills/billsSlice";

const BillForm: React.FC = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (name && amount && category && date) {
      dispatch(
        addBill({
          id: Date.now().toString(),
          name,
          amount: Number(amount),
          category,
          date,
        })
      );
      setName("");
      setAmount(0);
      setCategory("");
      setDate("");
    }
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Bill Name" />
      <input
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        type="number"
      />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" type="date" />
      <button onClick={handleSubmit}>Add Bill</button>
    </div>
  );
};

export default BillForm;
