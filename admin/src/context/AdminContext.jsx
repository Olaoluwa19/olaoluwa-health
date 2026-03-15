import { createContext } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const value = {
    // Add any state or functions you want to share across your admin here
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
