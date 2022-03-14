import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const numberFormat = (number, symbol = '$') => {
    let sign = ''
    let num = number
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
    transactions.forEach(({ type, amount }) => {
        if (type === 'income')
            totalIncomes += amount
        else if (type === 'expense')
            totalExpences += amount
        else if (type === 'debt')
            totalDebts += amount
        else if (type === 'lend')
            totalLends += amount
    })
    return (
        <div>
            <h3>Balance</h3>
            <p>
                Total: {numberFormat(totalIncomes + totalDebts - totalLends - totalExpences)}
            </p>
            <div className="row flex justify-evenly">
                <div>
                    <span>Total Income <br /> {numberFormat(totalIncomes)}</span>
                </div>
                <div>
                    <span>Total Lend <br /> {numberFormat(totalLends)}</span>
                </div>
                <div>
                    <span>Total Expense <br /> {numberFormat(totalExpences)}</span>
                </div>
                <div>
                    <span>Total Debt <br /> {numberFormat(totalDebts)}</span>
                </div>
            </div>
        </div>
    )
}

export default Balance