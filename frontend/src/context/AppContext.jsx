import { createContext } from "react";
import { doctors } from "@/assets/assets_frontend/assets";

export const AppContext = createContext(null);

/** @param {{ children: React.ReactNode }} props */
const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const value = {
    doctors,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
