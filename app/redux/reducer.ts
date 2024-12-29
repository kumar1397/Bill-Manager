import { CREATE, EDIT, DELETE } from "./constants";

interface Bill {
  id: number;
  // add other properties of Bill here
}

const billReducer = (bills: Bill[] = [], action: any) => {
  switch (action.type) {
    case CREATE:
      return [...bills, action.payload];
    case EDIT:
      return bills.map((currbill) =>
        action.payload.id === currbill.id ? action.payload : currbill
      );
    case DELETE:
      return bills.filter((currbill) => currbill.id !== action.payload.id);
    default:
      return bills;
  }
};

export default billReducer;
