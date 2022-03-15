import {
    Routes,
    Route,
} from "react-router-dom"
import Home from "../components/Home"
import Login from "../components/Login"
import Error from "../components/Error"

const MainRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}
export default MainRoute
