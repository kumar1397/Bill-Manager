/* eslint-disable @typescript-eslint/no-explicit-any */
import { CREATE, DELETE, EDIT } from "./constants";
import toast from "react-hot-toast";

interface BillDetails {
  id: string;
  // Add other properties of billDetails here
}

export function createBill(billDetails: BillDetails, otherArgs: { billInfo: BillDetails[], navigate: Function }) {
  const { billInfo, navigate } = otherArgs;

  return function (dispatch: any) {
    const checkIfExists = billInfo.find((info) => info.id === billDetails.id);

    if (!checkIfExists) {
      dispatch({ type: CREATE, payload: billDetails });
      toast("Bill Added");
      return navigate({ to: "/", replace: true });
    } else {
      toast("Something wrong happened !!! Please try adding again");
    }
  };
}
export function deleteBill(billDetails: BillDetails) {
  return function (dispatch: any) {
    dispatch({ type: DELETE, payload: billDetails });
    toast("Bill Deleted");
  };
}

export function editBill(billDetails: BillDetails, otherArgs: { navigate: Function }) {
  const { navigate } = otherArgs;

  return function (dispatch: any) {
    dispatch({ type: EDIT, payload: billDetails });
    toast("Bill Edited");
    return navigate({ to: "/", replace: true });
  };
}
