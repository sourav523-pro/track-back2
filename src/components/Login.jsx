import { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { GlobalContext } from '../context/GlobalState'
import Alert from '../tailwindcomp/Alert'
import {
    ArrowNarrowRightIcon,
    LockOpenIcon,
    SupportIcon
} from '@heroicons/react/solid'
const Login = () => {
    const [login, setLogin] = useState({
        email: '',
        password: '',
        clicked: false,
        alert: ''
    })
    const { authorization, authtoken, error } = useContext(GlobalContext)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        let { email, password } = login
        if (!email) {
            setLogin({ ...login, alert: 'Please enter your email' })
        } else if (!password) {
            setLogin({ ...login, alert: 'Please enter your password' })
        } else {
            authorization(email, password)
            setLogin({
                ...login,
                email: '',
                password: '',
                clicked: true
            })
        }
    }
    useEffect(() => {
        if (authtoken) {
            navigate('/')
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            {login.alert !== '' ? <Alert type='yellow' title='Alert' message={login.alert} onClose={() => { setLogin({ ...login, alert: '' }) }} /> : ''}
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-2xl mb-5">Track Back</h1>
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <form onSubmit={handleSubmit} className="px-5 py-7">
                        <div className="form-group">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                            <input
                                type="email"
                                value={login.email}
                                onChange={e => setLogin({ ...login, email: e.target.value })}
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            />
                        </div>
                        <div className="form-group">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                            <input
                                type="password"
                                value={login.password}
                                onChange={e => setLogin({ ...login, password: e.target.value })}
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                <span className="inline-block mr-2">Login</span>
                                {
                                    login.clicked ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg> : <ArrowNarrowRightIcon className="w-4 h-4 inline-block" />
                                }
                            </button>
                        </div>
                    </form>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <LockOpenIcon className="w-4 h-4 inline-block align-text-top" />
                                    <span className="inline-block ml-1">Forgot Password</span>
                                </button>
                            </div>
                            <div className="text-center sm:text-right  whitespace-nowrap">
                                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <SupportIcon className="w-4 h-4 inline-block align-text-bottom" />
                                    <span className="inline-block ml-1">Help</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login