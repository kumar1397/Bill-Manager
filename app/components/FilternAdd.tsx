import { filterOptions } from "../data";
import { Link } from "@tanstack/react-location";
import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

interface Bill {
  id: number;
  category: string;
  amount: number;
  // Add other properties of a bill here
}

export default function FilterandAdd({
  setCurrBills,
}: {
  setCurrBills: React.Dispatch<React.SetStateAction<Bill[]>>;
}) {
  const [currFilter, setCurrFilter] = React.useState("All");

  const allBills = useSelector((state: { bills: Bill[] }) => state.bills);

  const updateBills = useCallback(() => {
    if (currFilter === "All") {
      setCurrBills(allBills);
    } else {
      setCurrBills(allBills.filter((bill) => bill.category === currFilter));
    }
  }, [currFilter, allBills, setCurrBills]);

  useEffect(() => {
    updateBills();
  }, [updateBills]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0px",
      }}
    >
      <select
        className="filterSelect"
        name="Filter results"
        id="filter"
        value={currFilter}
        style={{ padding: "10px" }}
        onChange={(e) => setCurrFilter(e.target.value)}
      >
        {filterOptions.map((option) => (
          <option
            key={option}
            style={{ fontFamily: "Helvetica" }}
            value={`${option}`}
          >
            {option}
          </option>
        ))}
      </select>
      <Link to="addbill">
        <button className="addBtn">ADD BILL</button>
      </Link>
    </div>
  );
}
