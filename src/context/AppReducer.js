
const AppReducer = (state, action) => {
    let res = { ...state }
    switch (action.type) {
        case 'GET_TRANSACTIONS':
            res = {
                ...state,
                loading: false,
                transactions: action.transactions
            }
            break
        case 'DELETE_TRANSACTION':
            res = {
                ...state, transactions: state.transactions.filter(transaction => transaction.id !== action.delId)
            }
            break
        case 'ADD_TRANSACTION':
            res = {
                ...state, transactions: [action.addTransaction, ...state.transactions]
            }
            break
        case 'EDIT_TRANSACTION':
            res = {
                ...state, transactions: state.transactions.map(item => item.id === action.editId ? { id: action.editId, ...action.newTransaction } : item)
            }
            break
        case 'AUTH_SUCCESS':
            res = {
                ...state, authtoken: action.authToken
            }
            break
        case 'ERROR':
            return {
                ...state,
                error: action.errors
            }
        default:
            res = state;
    }

    return res
}

export default AppReducer