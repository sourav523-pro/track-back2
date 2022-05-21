//Global provider
import { GlobalProvider } from "./context/GlobalState"
import { BrowserRouter as Router } from "react-router-dom"
import MainRoute from "./routes/MainRoute"

const App = () => {
  window.onload = () => {
    let disclaimer = document.querySelector('.disclaimer')
    if (disclaimer)
      disclaimer.remove()
  }
  return (
    <GlobalProvider>
      <Router basename={'/trackback'}>
        <MainRoute />
      </Router>
    </GlobalProvider>
  )
}

export default App