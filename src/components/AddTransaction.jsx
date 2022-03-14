import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Alert from '../tailwindcomp/Alert'
const rand = (length = 100) => {
    return Math.floor((Math.random() * 100000) + length)
}
const AddTransaction = () => {
    const [transaction, setTransaction] = useState({
        type: 'expense',
        amount: '',
        note: '',
    })
    const [alert, setAlert] = useState({
        type: '',
        title: '',
        message: ''
    })
    const { addTransaction } = useContext(GlobalContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        let amount = transaction.amount
        if (!(/^\d+$/.test(amount))) {
            setAlert({ type: 'red', title: 'Danger', message: 'Amount must be a number' })
        }
        else if (amount === null || amount === '' || amount <= 0) {
            setAlert({ type: 'yellow', title: 'Alert', message: 'Amount must be graterthan 0' })
        } else {
            let newTransaction = {
                id: rand(1000),
                type: transaction.type,
                amount: parseFloat(amount),
                note: transaction.note,
                userId: 1,
                createdAt: new Date().toLocaleDateString(),
                updatedAt: new Date().toLocaleString(),
            }
            // console.log(newTransaction)
            addTransaction(newTransaction)
            setTransaction({ ...transaction, amount: '', note: '' })
        }
    }
    return (
        <>
            {alert.message !== '' ? <Alert type={alert.type} title={alert.title} message={alert.message} onClose={() => {
                setAlert({
                    type: '',
                    title: '',
                    message: ''
                })
            }} /> : ''}
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
                    <input type="text"
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
                <button type="submit" className="btn bg-blue-600">Add transaction</button>
            </form>
        </>
    )
}

export default AddTransaction