
const AppReducer = (state, action) => {
    let res = {}
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            res = {
                ...state, transactions: state.transactions.filter(transaction => transaction.id !== action.delId)
            }
            break
        case 'ADD_TRANSACTION':
            // state.transactions.push(action.addTransaction)
            res = {
                ...state, transactions: [action.addTransaction, ...state.transactions]
            }
            break
        case 'EDIT_TRANSACTION':
            res = state
            break
        default:
            res = state;
    }

    return res
}

export default AppReducer