import {
    Routes,
    Route,
} from "react-router-dom"
import Home from "../components/Home"
import Login from "../components/Login"
import Error from "../components/Error"
import Logout from "../components/Logout"

const MainRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}
export default MainRoute
