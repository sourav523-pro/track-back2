import Header from "./components/Header"
import Balance from "./components/Balance"
import Transactions from "./components/Transactions"
import AddTransaction from "./components/AddTransaction"
//Global provider
import { GlobalProvider } from "./context/GlobalState"

const App = () => {
  return (
    <GlobalProvider>
      <div className="container px-5 py-2 bg-slate-200">
        <Header />
        <Balance />
        <Transactions />
        <AddTransaction />
      </div>
    </GlobalProvider>
  )
}

export default App