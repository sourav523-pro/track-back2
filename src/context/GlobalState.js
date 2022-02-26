import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
//Initial State

const initialState = {
    transactions: []
}

//Create context 

export const GlobalContext = createContext(initialState)

//Provider components
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    return (
        <GlobalContext.Provider
            value={{
                transactions: state.transactions
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
} 