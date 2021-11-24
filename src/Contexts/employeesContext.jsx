import React, { useState } from "react";

export const EmployeesContext = React.createContext(null);

export default function EmployeesContextProvider({ children }) {

    const [contextEmployees, setContextEmployees] = useState(false);

    return (
        <EmployeesContext.Provider value={{
            contextEmployees, setContextEmployees
        }} >
            {children}
        </EmployeesContext.Provider>
    );
}