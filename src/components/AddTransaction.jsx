import React, { useState } from 'react'

const AddTransaction = () => {
    const [transaction, setTransaction] = useState({
        type: null,
        amount: null,
        note: null,
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(transaction)
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
                    </select>
                </div>

                <div className="form-control">
                    <label htmlFor="amount">Amount</label>
                    <input type="number"
                        value={transaction.amount}
                        onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
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