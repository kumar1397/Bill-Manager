"use client"
import React from "react";

interface Props {
  category: string;
  setCategory: (category: string) => void;
}

const BillFilter: React.FC<Props> = ({ category, setCategory }) => {
  return (
    <div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Utilities">Utilities</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
      </select>
    </div>
  );
};

export default BillFilter;
