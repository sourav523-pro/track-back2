import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

const ListItem = ({ transaction, onDelete }) => {
    let { id, type, amount, note } = transaction
    return (
        <div>
            <span>{type} {amount}</span>
            <p>{note}</p>
            <button className="text-center text-uppercase" onClick={() => onDelete(id)}>Delete</button>
        </div>
    )
}

const Transactions = () => {
    const { transactions, deleteTransaction, getTransactions } = useContext(GlobalContext)
    useEffect(() => {
        getTransactions()
    }, [getTransactions]);
    return (
        <>
            <div>Transactions</div>
            <div className="transaction-list">
                {transactions.map((item, index) => (<ListItem key={index} transaction={item} onDelete={deleteTransaction} />))}
            </div>
        </>
    )
}

export default Transactions