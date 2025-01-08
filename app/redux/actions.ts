import { CREATE, DELETE, EDIT } from "./constants";
import toast from "react-hot-toast";

interface BillDetails {
  id: string;
  // Add other properties of billDetails here
}

interface OtherArgs {
  billInfo: BillDetails[];
  navigate: ({ to, replace }: { to: string; replace: boolean }) => void;
}

export function createBill(billDetails: BillDetails, otherArgs: OtherArgs) {
  const { billInfo, navigate } = otherArgs;

  return function (dispatch: (action: { type: string; payload: BillDetails }) => void) {
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
interface DeleteBillArgs {
  billDetails: BillDetails;
}

export function deleteBill({ id }: { id: number }) {

  return {

    type: DELETE,

    payload: { id }

  };

}

// export function deleteBill({ billDetails }: DeleteBillArgs) {
//   return function (dispatch: (action: { type: string; payload: BillDetails }) => void) {
//     dispatch({ type: DELETE, payload: billDetails });
//     toast("Bill Deleted");
//   };
// }

interface EditBillArgs {
  billDetails: BillDetails;
  otherArgs: OtherArgs;
}

export function editBill(billDetails: BillDetails, otherArgs: OtherArgs) {
  const { navigate } = otherArgs;

  return function (dispatch: (action: { type: string; payload: BillDetails }) => void) {
    dispatch({ type: EDIT, payload: billDetails });
    toast("Bill Edited");
    return navigate({ to: "/", replace: true });
  };
}
