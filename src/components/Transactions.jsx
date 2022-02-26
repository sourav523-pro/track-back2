import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const ListItem = ({ transaction }) => {
    let { type, amount, note } = transaction
    return (
        <div>
            <span>{type} {amount}</span>
            <p>{note}</p>
        </div>
    )
}

const Transactions = () => {
    const { transactions } = useContext(GlobalContext)
    console.log(transactions)
    return (
        <>
            <div>Transactions</div>

            <div className="transaction-list">
                {transactions.map((item, index) => (<ListItem key={index} transaction={item} />))}
            </div>
        </>
    )
}

export default Transactions