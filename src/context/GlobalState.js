import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
//Initial State

const initialState = {
    transactions: [
        { id: 1, type: 'expense', amount: 150, note: 'Full day expense' },
        { id: 2, type: 'income', amount: 1000, note: 'This month income' },
        { id: 3, type: 'debt', amount: 100, note: 'Debt from someone' },
        { id: 4, type: 'lend', amount: 230, note: 'Lend from someone' },
    ]
}

//Create context 

export const GlobalContext = createContext(initialState)

//Provider components
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)
    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', delId: id })
    }
    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', addTransaction: transaction })
    }
    const editTransaction = (id, transaction) => {
        dispatch({ type: 'EDIT_TRANSACTION', editId: transaction, newTransaction: transaction })
    }
    return (
        <GlobalContext.Provider
            value={{
                transactions: state.transactions,
                deleteTransaction,
                addTransaction,
                editTransaction
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
} 