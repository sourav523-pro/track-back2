import React, { createContext, useReducer } from "react"
import AppReducer from "./AppReducer"
// import axios from "axios"
//Initial State
const apiUrl = "https://json-base.herokuapp.com/api/v3/"
// const apiUrl = "http://127.0.0.1:8000"
// const storedUserAuth = localStorage.getItem('_trackbackauthtoken') ?? ''
const storedUser = localStorage.getItem('_trackbackuserdatawithtoken') ? JSON.parse(atob(localStorage.getItem('_trackbackuserdatawithtoken'))) : {}
const initialState = {
    transactions: [],
    userData: storedUser,
    authtoken: storedUser ? storedUser.auth_token : null,
    error: null,
    loading: true
}

//Create context 

export const GlobalContext = createContext(initialState)

//Provider components
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)
    // let email = state.userData.email || ''
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(state.userData.email + ':' + state.authtoken)
    }
    const callApi = async (url = '', method = 'GET', headers, body = null) => {
        try {
            // let res = await axios({
            //     method: method,
            //     url: apiUrl + url,
            //     data: method === 'POST' ? body : null,
            //     headers: headers
            // })
            let res = await fetch(apiUrl + url, {
                method: method,
                body: method === "POST" || method === 'PUT' ? JSON.stringify(body) : null,
                headers: headers,
                redirect: 'follow'
            })
            let data = await res.json()
            // console.log(data)
            if (data.status)
                return { err: null, data: data.data }
            else {
                let msg = data.message
                return { err: Array.isArray(msg) ? msg.join(' ') : msg, data: null }
            }
        } catch (err) {
            return { err: err, data: {} }
        }
    }
    const getAllTransactions = async () => {
        // let userId = atob(state.authtoken).split(':')[2]
        let res = await callApi('transactions?duration=month', 'GET', headers)
        return res;
    }
    const getTransactions = async () => {

        let { err, data } = await callApi('transactions?duration=month', 'GET', headers)
        // console.log(data)
        if (data) {
            dispatch({
                type: 'GET_TRANSACTIONS',
                transactions: Array.isArray(data) ? data : []
            })
        } else {
            dispatch({
                type: 'ERROR',
                errors: err
            })
        }
    }
    const getTransaction = async (id) => {
        let { err, data } = await callApi('transactions?id=' + id, 'GET', headers)
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
        let { err, data } = await callApi('transactions?id=' + id, 'DELETE', headers)
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
        let { err, data } = await callApi('transactions', 'POST', headers, transaction)
        if (data)
            dispatch({ type: 'ADD_TRANSACTION', addTransaction: data })
        else
            dispatch({
                type: 'ERROR',
                errors: err
            })
    }
    const editTransaction = async (id, transaction) => {
        let { err, data } = await callApi('transactions?id=' + id, 'PUT', headers, transaction)
        if (data)
            dispatch({
                type: 'EDIT_TRANSACTION',
                editId: id,
                newTransaction: data
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
        let { err, data } = await callApi('login', 'POST', { "Content-Type": "application/json" }, body)
        if (data) {
            // console.log(data)
            // localStorage.setItem("_trackbackauthtoken", data.auth_token ?? '')
            localStorage.setItem("_trackbackuserdatawithtoken", btoa(JSON.stringify(data) ?? null))
            dispatch({
                type: 'AUTH_SUCCESS',
                authToken: data.auth_token,
                userData: data
            })
        } else
            dispatch({
                type: 'ERROR',
                errors: err
            })
    }
    const logoutAction = () => {
        let authEnd = localStorage.removeItem('_trackbackuserdatawithtoken')
        dispatch({
            type: 'AUTH_END',
            authToken: null,
            userData: null
        })
        return authEnd ? true : false
    }

    return (
        <GlobalContext.Provider
            value={{
                transactions: state.transactions,
                error: state.error,
                loading: state.loading,
                authtoken: state.authtoken,
                userData: state.userData,
                authorization,
                getAllTransactions,
                getTransactions,
                getTransaction,
                addTransaction,
                editTransaction,
                deleteTransaction,
                logoutAction
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
} 