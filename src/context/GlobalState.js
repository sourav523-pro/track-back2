import React, { createContext, useReducer } from "react"
import AppReducer from "./AppReducer"
//Initial State

// const initialState = {
//     transactions: [
//         { id: 1, type: 'expense', amount: 150, note: 'Full day expense' },
//         { id: 2, type: 'income', amount: 1000, note: 'This month income' },
//         { id: 3, type: 'debt', amount: 100, note: 'Debt from someone' },
//         { id: 4, type: 'lend', amount: 230, note: 'Lend from someone' },
//     ]
// }

const initialState = {
    transactions: [],
    error: null,
    loading: true
}

//Create context 

export const GlobalContext = createContext(initialState)

//Provider components
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)
    const headers = {
        "Authorization": "Basic Y2RoYnV5dGdleGpudXVpMnRiMTYzNXg2NGozY2lvMnk4Yzc1OTZxbjl2dDQ2OiQyeSQxMCR2WVRidHN3UG02YWVac01RUmN2akNlS0FvTi5ObVY0WVljdmh3cjRUY2lFY043bG11YnVqQw==",
        "Content-Type": "application/json"
    }
    const callApi = async (url = '', method = 'GET', headers, body = null) => {
        try {
            const res = await fetch(url, {
                method: method,
                body: body,
                headers: headers
            })
            let data = await res.json()
            return { data: data, err: null }
        } catch (err) {
            return { data: null, err: err }
        }
    }
    const getTransactions = () => {
        let { err, data } = callApi('/api/v2/transactions', 'GET', headers)
        if (data) {
            dispatch({
                type: 'GET_TRANSACTIONS',
                transactions: data
            })
        } else {
            dispatch({
                type: 'TRANSACTION_ERROR',
                errors: err
            })
        }
    }
    const getTransaction = (id) => {
        let { err, data } = callApi('/api/v2/transactions/' + id, 'GET', headers)
        if (data)
            dispatch({
                type: 'GET_TRANSACTION',
                transactions: data
            })
        else
            dispatch({
                type: 'TRANSACTION_ERROR',
                errors: err
            })

    }
    const deleteTransaction = (id) => {
        let { err, data } = callApi('/api/v2/transactions/' + id, 'DELETE', headers)
        if (data)
            dispatch({
                type: 'DELETE_TRANSACTION',
                delId: id
            })
        else
            dispatch({
                type: 'TRANSACTION_ERROR',
                errors: err
            })
    }
    const addTransaction = (transaction) => {
        let { err, data } = callApi('/api/v2/transactions', 'POST', headers, transaction)
        if (data)
            dispatch({ type: 'ADD_TRANSACTION', addTransaction: transaction })
        else
            dispatch({
                type: 'TRANSACTION_ERROR',
                errors: err
            })
    }
    const editTransaction = (id, transaction) => {
        let { err, data } = callApi('/api/v2/transactions/' + id, 'PUT', headers, transaction)
        if (data)
            dispatch({
                type: 'EDIT_TRANSACTION',
                editId: id,
                newTransaction: transaction
            })
        else
            dispatch({
                type: 'TRANSACTION_ERROR',
                errors: err
            })
    }
    return (
        <GlobalContext.Provider
            value={{
                transactions: state.transactions,
                error: state.error,
                loading: state.loading,
                getTransactions,
                getTransaction,
                addTransaction,
                editTransaction,
                deleteTransaction
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
} 