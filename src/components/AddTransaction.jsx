import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const rand = (length = 100) => {
    return Math.floor((Math.random() * 100000) + length)
}
const AddTransaction = () => {
    const [transaction, setTransaction] = useState({
        type: 'expense',
        amount: '',
        note: '',
    })
    const { addTransaction } = useContext(GlobalContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        let newTransaction = {
            id: rand(1000),
            ...transaction,
            userId: 1,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
        }
        // console.log(newTransaction)

        addTransaction(newTransaction)
    }
    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="">Type</label>
                    <select onChange={e => setTransaction({ ...transaction, type: e.target.value })} name="type" className="form-select">
                        <option defaultValue="expense">Expense</option>
                        <option value="income">Income</option>
                        <option value="debt">Debt</option>
                        <option value="lend">Lend</option>
                    </select>
                </div>

                <div className="form-control">
                    <label htmlFor="amount">Amount</label>
                    <input type="number"
                        value={transaction.amount}
                        onChange={(e) => setTransaction({ ...transaction, amount: parseFloat(e.target.value) })}
                        placeholder="Enter amount..."
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text"
                        value={transaction.note}
                        onChange={(e) => setTransaction({ ...transaction, note: e.target.value })}
                        placeholder="Enter text..."
                    />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}

export default AddTransaction