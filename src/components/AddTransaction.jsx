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
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-2xl mb-5">Add transaction</h1>
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <form onSubmit={handleSubmit} className="px-5 py-7">
                        <div className="form-group">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Type</label>
                            <select
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                onChange={e => setTransaction({ ...transaction, type: e.target.value })} name="type">
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                                <option value="debt">Debt</option>
                                <option value="lend">Lend</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Amount</label>
                            <input
                                type="text"
                                value={transaction.amount}
                                onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
                                placeholder="Enter amount"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            />
                        </div>
                        <div className="form-group">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Description</label>
                            <input
                                type="text"
                                value={transaction.note}
                                onChange={(e) => setTransaction({ ...transaction, note: e.target.value })}
                                placeholder="Enter description"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                <span className="inline-block mr-2">Add</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <h3>Add new transaction</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="">Type</label>
                    <select onChange={e => setTransaction({ ...transaction, type: e.target.value })} name="type" className="form-select">
                        <option value="expense">Expense</option>
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
            </form> */}
        </>
    )
}

// const AddTransaction2 = () => {
//     return (
//         <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
//             <h1 className="font-bold text-center text-2xl mb-5">Add transaction</h1>
//             <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
//                 <form onSubmit={handleSubmit} className="px-5 py-7">
//                     <div className="form-group">
//                         <label className="font-semibold text-sm text-gray-600 pb-1 block">Type</label>
//                         <select
//                             className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
//                             onChange={e => setTransaction({ ...transaction, type: e.target.value })} name="type">
//                             <option value="expense">Expense</option>
//                             <option value="income">Income</option>
//                             <option value="debt">Debt</option>
//                             <option value="lend">Lend</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label className="font-semibold text-sm text-gray-600 pb-1 block">Amount</label>
//                         <input
//                             type="text"
//                             value={transaction.amount}
//                             onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
//                             placeholder="Enter amount"
//                             className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label className="font-semibold text-sm text-gray-600 pb-1 block">Description</label>
//                         <input
//                             type="text"
//                             value={transaction.note}
//                             onChange={(e) => setTransaction({ ...transaction, note: e.target.value })}
//                             placeholder="Enter description"
//                             className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
//                             <span className="inline-block mr-2">Add</span>
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

export default AddTransaction