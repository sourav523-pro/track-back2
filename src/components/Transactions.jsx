import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

const ListItem = ({ transaction, onDelete }) => {
    let { id, type, amount, note } = transaction
    return (
        <div className="flex justify-first">
            <span>{type} ${amount}</span>
            <p className="mx-2 text-muted">{note}</p>
            <button onClick={() => onDelete(id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" style={{ fill: '#FFFFFF' }}><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>
            </button>
        </div>
    )
}

const Transactions = () => {
    const { transactions, error, deleteTransaction, getTransactions } = useContext(GlobalContext)

    useEffect(() => { getTransactions(); }, []);
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