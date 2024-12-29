"use client"
import React from "react";

interface Props {
  bills: {
    id: string;
    name: string;
    amount: number;
    category: string;
    date: string;
  }[];
}

const TimeSeriesChart: React.FC<Props> = ({ bills }) => {
  // Implementation of chart using a library like Chart.js or Recharts.
  return (
    <div>
      <h2>Time Series Chart</h2>
      <ul>
        {bills.map((bill) => (
          <li key={bill.id}>
            {bill.name}: ${bill.amount} - {bill.category} on {bill.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSeriesChart;
