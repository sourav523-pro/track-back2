import Header from "./components/Header";
import Balance from "./components/Balance";
import Transaction from "./components/Transaction";
import AddTransaction from "./components/AddTransaction";
//Global provider
import { GlobalProvider } from "./context/GlobalState";
//  Global style sheet  
import './css/style.css';

const App = () => {
  return (
    <GlobalProvider>
      <div class="container">
        <Header />
        <Balance />
        <Transaction />
        <AddTransaction />
      </div>
    </GlobalProvider>
  )
}

export default App