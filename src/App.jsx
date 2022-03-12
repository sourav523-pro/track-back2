import Header from "./components/Header";
import Balance from "./components/Balance";
import Transactions from "./components/Transactions";
import AddTransaction from "./components/AddTransaction";
//Global provider
import { GlobalProvider } from "./context/GlobalState";
//  Global style sheet  
// import './css/style.css';

const App = () => {
  return (
    <GlobalProvider>
      <div className="container">
        <Header />
        <Balance />
        <Transactions />
        <AddTransaction />
      </div>
    </GlobalProvider>
  )
}

export default App