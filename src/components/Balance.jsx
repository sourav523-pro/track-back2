import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const numberFormat = (number, symbol = '₹') => {
    let sign = ''
    let num = parseFloat(number)
    if (number < 0) {
        num = Math.abs(number)
        sign = '-'
    }
    return sign + symbol + num
}
const Balance = () => {
    const { transactions } = useContext(GlobalContext)
    // let expences = transactions.map(transaction => transaction.type == 'expense' ? transaction.amount : 0)
    // let incomes = transactions.map(transaction => transaction.type == 'income' ? transaction.amount : 0)
    // let debts = transactions.map(transaction => transaction.type == 'debt' ? transaction.amount : 0)

    let totalExpences = 0, totalIncomes = 0, totalDebts = 0, totalLends = 0
    if (transactions)
        transactions.forEach(({ type, amount }) => {
            let num = parseFloat(amount)
            if (type === 'income')
                totalIncomes += num
            else if (type === 'expense')
                totalExpences += num
            else if (type === 'debt')
                totalDebts += num
            else if (type === 'lend')
                totalLends += num
        })

    return (
        <>
            <div className="row mx-4 my-3 sm:grid md:grid-cols-3 xl:grid-cols-5 3xl:flex flex-wrap justify-center">
                <div className="bg-gray-500 border-1 rounded p-4 mx-4 my-3 text-white text-1xl font-bold">
                    <span>Total Balance <br /> {numberFormat(totalIncomes + totalDebts - totalLends - totalExpences)} </span>
                </div>
                <div className="bg-green-500 border-1 rounded p-4 mx-4 my-3 text-white text-1xl font-bold">
                    <span>Total Income <br /> {numberFormat(totalIncomes)}</span>
                </div>
                <div className="bg-green-300 border-1 rounded p-4 mx-4 my-3 text-white text-1xl font-bold">
                    <span>Total Lend <br /> {numberFormat(totalLends)}</span>
                </div>
                <div className="bg-red-500 border-1 rounded p-4 mx-4 my-3 text-white text-1xl font-bold">
                    <span>Total Expense <br /> {numberFormat(totalExpences)}</span>
                </div>
                <div className="bg-yellow-500 border-1 rounded p-4 mx-4 my-3 text-white text-1xl font-bold">
                    <span>Total Debt <br /> {numberFormat(totalDebts)}</span>
                </div>
            </div>
        </>
    )
}

export default Balance