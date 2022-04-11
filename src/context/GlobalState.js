import React, { createContext, useReducer } from "react"
import AppReducer from "./AppReducer"
//Initial State\
const apiUrl = "https://factstar.000webhostapp.com"
const storedUserAuth = localStorage.getItem('_trackbackauthtoken') || ''
const initialState = {
    transactions: [],
    authtoken: storedUserAuth,
    userData: {},
    error: null,
    loading: true
}

//Create context 

export const GlobalContext = createContext(initialState)

//Provider components
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)
    // const headers = {
    //     "Authorization": "Basic Y2RoYnV5dGdleGpudXVpMnRiMTYzNXg2NGozY2lvMnk4Yzc1OTZxbjl2dDQ2OiQyeSQxMCR2WVRidHN3UG02YWVac01RUmN2akNlS0FvTi5ObVY0WVljdmh3cjRUY2lFY043bG11YnVqQw==",
    //     "Content-Type": "application/json"
    // }
    let email = state.userData.email || ''
    const headers = {
        "Authorization": "Basic " + btoa(email + ':' + state.authtoken),
        "Content-Type": "application/json"
    }
    const callApi = async (url = '', method = 'GET', headers, body = null) => {
        try {
            const res = await fetch(apiUrl + url, {
                method: method,
                body: body,
                headers: headers
            })
            let data = await res.json()
            console.log(data)
            if (data.status)
                return { err: null, data: data.data }
            else
                return { err: data.message, data: data.data }
        } catch (err) {
            return { err: err, data: {} }
        }
    }
    const getAllTransactions = async () => {
        // let userId = atob(state.authtoken).split(':')[2]
        let res = await callApi('/api/v1/transactions.php?duration=month', 'GET', headers)
        return res;
    }
    const getTransactions = async () => {
        let date = new Date().toLocaleDateString()
        // let userId = atob(state.authtoken).split(':')[2]
        let url = '/api/v1/transactions.php?duration=month'
        // let url = '/api/v1/transactions'

        let { err, data } = await callApi(url, 'GET', headers)
        console.log(data)
        if (data) {
            dispatch({
                type: 'GET_TRANSACTIONS',
                transactions: data ?? []
            })
        } else {
            dispatch({
                type: 'ERROR',
                errors: err
            })
        }
    }
    const getTransaction = async (id) => {
        let { err, data } = await callApi('/api/v1/transactions.php?id' + id, 'GET', headers)
        if (data)
            dispatch({
                type: 'GET_TRANSACTION',
                transactions: data
            })
        else
            dispatch({
                type: 'ERROR',
                errors: err
            })

    }
    const deleteTransaction = async (id) => {
        let { err, data } = await callApi('/api/v1/transactions.php?id=' + id, 'DELETE', headers)
        if (data)
            dispatch({
                type: 'DELETE_TRANSACTION',
                delId: id
            })
        else
            dispatch({
                type: 'ERROR',
                errors: err
            })
    }
    const addTransaction = async (transaction) => {
        // console.log(transaction)
        let { err, data } = await callApi('/api/v1/transactions.php', 'POST', headers, JSON.stringify(transaction))
        if (data)
            dispatch({ type: 'ADD_TRANSACTION', addTransaction: transaction })
        else
            dispatch({
                type: 'ERROR',
                errors: err
            })
    }
    const editTransaction = async (id, transaction) => {
        let { err, data } = await callApi('/api/v1/transactions.php?id' + id, 'PUT', headers, JSON.stringify(transaction))
        if (data)
            dispatch({
                type: 'EDIT_TRANSACTION',
                editId: id,
                newTransaction: transaction
            })
        else
            dispatch({
                type: 'ERROR',
                errors: err
            })
    }
    const authorization = async (email, password) => {
        let body = {
            email: email,
            password: password
        }
        let { err, data } = await callApi('/api/v1/login.php', 'POST', {}, JSON.stringify(body))
        if (data) {
            console.log(data)
            localStorage.setItem("_trackbackauthtoken", data.auth_token || '')
            dispatch({
                type: 'AUTH_SUCCESS',
                authToken: data.auth_token,
                userData: data
            })


            // let userDetails = data[0];
            // if (userDetails.password === password) {
            //     let authtoken = btoa(email + ':' + password + ':' + userDetails.id)
            //     localStorage.setItem("authtoken", authtoken)
            //     dispatch({
            //         type: 'AUTH_SUCCESS',
            //         authToken: authtoken
            //     })
            // } else
            dispatch({
                type: 'ERROR',
                errors: 'Invalid password'
            })

        } else
            dispatch({
                type: 'ERROR',
                errors: err
            })
    }

    return (
        <GlobalContext.Provider
            value={{
                transactions: state.transactions,
                error: state.error,
                loading: state.loading,
                authtoken: state.authtoken,
                authorization,
                getAllTransactions,
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