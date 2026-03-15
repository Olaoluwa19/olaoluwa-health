import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const value = {
    // Add any state or functions you want to share across your doctor here
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
