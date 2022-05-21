import { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { GlobalContext } from '../context/GlobalState'

const Logout = () => {
    const { logoutAction, authtoken } = useContext(GlobalContext)
    const navigate = useNavigate()
    useEffect(() => {
        logoutAction()
        if (authtoken == null) {
            navigate('/login')
        } else {
            navigate('/')
        }
    }, [authtoken, navigate, logoutAction])

    return (
        <div>Logout</div>
    )
}

export default Logout