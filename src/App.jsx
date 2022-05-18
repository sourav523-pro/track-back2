//Global provider
import { GlobalProvider } from "./context/GlobalState"
import { BrowserRouter as Router } from "react-router-dom"
import MainRoute from "./routes/MainRoute"

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <MainRoute />
      </Router>
    </GlobalProvider>
  )
}

export default App