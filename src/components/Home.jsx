import { useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { GlobalContext } from '../context/GlobalState'
import Header from "./Header"
import Balance from "./Balance"
import Transactions from "./Transactions"
import AddTransaction from "./AddTransaction"
function Home() {
    const { authtoken } = useContext(GlobalContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!authtoken) {
            navigate('/login')
        }
    }, [])


    return (
        <>
            <div className="container mx-5 my-5">
                {/* <div className="min-h-screen bg-gray-100 flex flex-col justify-center px-10 sm:py-12"> */}
                <Header />
                <Balance />
                <Transactions />
                <AddTransaction />
            </div>
        </>
    )
}

export default Home