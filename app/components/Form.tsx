import { selectOptions } from "../data";
import { useDispatch } from "react-redux";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useMatch } from "@tanstack/react-location";
import { getHandlerArgs, inputValidator } from "../util";
import toast from "react-hot-toast";

interface Bill {
  id: string;
  description: string;
  amount: string;
  category: string;
  date?: string;
}

export default function Form({
  type,
  handler,
}: {
  type: string;
  handler: (...args: unknown[]) => { type: string; payload?: any };
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const billInfo = useSelector((state: { bills: Bill[] }) => state.bills);

  const match = useMatch();
  const id = match.data?.id;

  const values = billInfo.find((bill) => bill.id === id);

  const defaultValues: Bill = values ?? {
    id: "",
    description: "",
    amount: "",
    category: selectOptions[0],
    date: "",
  };

  const [formData, setFormData] = React.useState<Bill>(defaultValues);

  const handlerargs = getHandlerArgs(
    type,
    {
      date: new Date().toLocaleDateString("en-GB").toString(),
      ...formData,
      id:
        type === "edit"
          ? id
          : Math.floor(1000 + Math.random() * 9000).toString(),
    },
    { navigate, billInfo }
  );

  const handleInsert = () => {
    const { error } = inputValidator(formData);

    if (error) {
      toast(error);
    } else {
      dispatch(handler.apply(undefined, handlerargs));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div
      style={{
        backgroundColor: "aliceblue",
        textAlign: "center",
        margin: "50px",
        padding: "50px",
        borderRadius: "20px",
      }}
    >
      <h3>{type === "edit" ? "Edit" : "Add"} Bill Details</h3>
      <br />
      <div className="addBillForm">
        <input
          onChange={handleChange}
          value={formData.description}
          name="description"
          type="text"
          placeholder="Description"
        />
        <input
          onChange={handleChange}
          value={formData.amount}
          name="amount"
          type="text"
          placeholder="Amount"
        />
        <select
          className="filterSelect"
          name="category"
          value={formData.category}
          onChange={handleChange}
          id="category"
        >
          {selectOptions.map((option) => (
            <option
              key={option}
              style={{ fontFamily: "Helvetica" }}
              value={`${option}`}
            >
              {option}
            </option>
          ))}
        </select>
        <button className="addBill" onClick={handleInsert}>
          {type === "edit" ? "EDIT" : "ADD"} BILL
        </button>
        <button
          className="addBill"
          onClick={() => navigate({ to: "/", replace: false })}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}
