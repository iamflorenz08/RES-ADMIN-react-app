import side_image from '../images/awdasd.png'
import sms_logo from '../images/smslogo.png'
import bg from '../images/loginbg.png'
import { useState } from 'react'
import axios from 'axios'
const Login = ({setToken}) => {
    document.title = "Login"
    const baseURL = process.env.REACT_APP_API
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCredentials({ ...credentials, [name]: value })
    }

    const login = async() => {
       
        if (!credentials.username) {
            setError("Username field must not be empty.")
            return
        }
        else if (!credentials.password) {
            setError("Password field must not be empty.")
            return
        }

        let token = await (await axios.post(`${baseURL}/auth/admin`, credentials)).data
        token = token.token
        if(!token){
            setError("Invalid Credentials")
            return
        }
        setToken(token)
        sessionStorage.setItem("token", token)
    }

    const handleLogin = (e) =>{
        e.preventDefault()
    }


    return (
        <>
            <div className="fixed -z-10 bg-red-50 w-full h-full">
                <img src={bg} className='w-full h-full object-cover' alt='bg'></img>
            </div>
            <div
                className={"flex h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat select-none"}>
                <div className="py-auto mx-auto flex h-[700px] w-[1100px] items-center justify-center">
                    <div className="h-[620px] w-[550px] bg-[#1A297A]"><img src={side_image} alt=""
                        className="mx-auto my-40 h-auto w-auto" /></div>
                    {/* <!-- login form --> */}
                    <div className="h-[620px] w-[550px] bg-white">
                        <form onSubmit={handleLogin} className="mx-28 mt-20">
                            <h1 className="mb-20 text-left text-5xl font-bold select-none">Sign In</h1>
                            <div className="space-y-10">
                                <div className="flex border-b border-black">
                                    <div className="mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            className="h-8 w-8 pb-1">
                                            <path fillRule="evenodd"
                                                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="relative">
                                        <input value={credentials.username} id="username" name="username" type="text"
                                            className="peer h-10 w-[260px]  placeholder-transparent  border-none focus:ring-0"
                                            placeholder=" "
                                            onChange={handleChange} />
                                        <label htmlFor="username"
                                            className="absolute left-0 -top-3.5 cursor-text text-sm transition-all peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-900 peer-focus:uppercase">Username</label>
                                    </div>
                                </div>
                                <div className="flex border-b border-black">
                                    <div className="mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            className="h-8 w-8 pb-1">
                                            <path fillRule="evenodd"
                                                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="relative">
                                        <input value={credentials.password} id="password" name="password" type="password"
                                            className="peer h-10 w-[260px] placeholder-transparent border-none focus:ring-0"
                                            placeholder=" "
                                            onChange={handleChange} />
                                        <label htmlFor="password"
                                            className="absolute left-0 -top-3.5 cursor-text text-sm transition-all peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-900 peer-focus:uppercase">Password</label>
                                    </div>
                                </div>
                            </div>
                            {error && (
                                <div className=' text-red-600 mt-2'>
                                    {error}
                                </div>
                            )}

                            <div>
                                <button
                                    onClick={login}
                                    className="mt-5 w-full rounded-md bg-[#1A297A] py-1.5 text-lg text-white hover:bg-blue-700 hover:text-white transition-all duration-300">
                                    Log In
                                </button>
                            </div>

                        </form>
                        <div className="flex flex-col items-center mt-5">
                            <img src={sms_logo} alt="" className="my-1 h-[80px] w-[74px]" />
                            <p className="text-xl text-[#1A297A] select-none">Supply Management System</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login