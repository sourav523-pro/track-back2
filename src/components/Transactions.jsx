import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import ProcessingOptions from '../tailwindcomp/ProcessingOptions'

const ListItem = ({ transaction, onDelete }) => {
    let { id, type, amount, note } = transaction
    let bg = 'gray-500'
    if (type === 'expense')
        bg = 'red-500'
    else if (type === 'lend')
        bg = 'green-400'
    else if (type === 'income')
        bg = 'green-500'
    else if (type === 'debt')
        bg = 'yellow-500'
    return (
        <div className={'border-1 rounded bg-' + bg + ' my-2 px-5 py-2 text-white'}>
            <div className="flex justify-between">
                <p className="text-white text-1xl font-bold"><span className="capitalize">{type}</span> ₹{amount}</p>
                <button className="bg-white rounded px-1 py-1" onClick={() => onDelete(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" style={{ fill: '#df1717' }}><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>
                </button>
            </div>
            <p className="text-muted">{note}</p>
        </div>
    )
}

const Transactions = () => {
    const { transactions, deleteTransaction, getTransactions } = useContext(GlobalContext)

    useEffect(() => { getTransactions(); }, []);
    let dateArr = []
    let dateStr = new Date().toLocaleDateString()
    // console.log(transactions)
    dateStr.split('/').forEach((item, index) => {
        let num = parseInt(item)
        dateArr[index] = num < 10 ? '0' + num : num
    })
    dateStr = dateArr.join('/')
    return (
        <>
            <div className="text-center text-2xl font-bold">Transactions</div>
            <div className="px-5 my-10 md:w-50">
                <div className="transaction-list">
                    {transactions ? transactions.map((item, index) => { if (item.createdAt == dateStr) return <ListItem key={index} transaction={item} onDelete={deleteTransaction} /> }) : [1, 2, 3, 4, 5].map((item, index) => (<ProcessingOptions key={index} />))}
                </div>
            </div>
        </>
    )
}

export default Transactions