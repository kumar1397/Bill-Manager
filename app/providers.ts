"use client";

import { Provider } from "react-redux";
import store from "./redux/store"; // Adjusted the path for correctness

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
