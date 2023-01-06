import AppLogo from '../images/smslogo.png'
const header = () => {

    const logout = () => {
        sessionStorage.clear()
    }
    return (
        <div className="sticky top-0 flex justify-between bg-white shadow-lg h-fit w-full">
            <div className="flex items-center">
                <img src={AppLogo} alt="smslogo.png"
                    className="mx-3 my-1 flex h-8 w-8 items-center justify-center rounded" />
                <h2 className="font-bold text-blue-900">Supply Management System</h2>
            </div>

            <div className="mx-4">
                <a 
                onClick={logout}
                href="/" className="mx-2 flex items-center">
                    Logout
                    <svg className="my-2 mx-2 flex h-8 w-8 items-center rounded bg-red-600 p-2 hover:bg-red-400 bi bi-box-arrow-right"
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                        viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                        <path fillRule="evenodd"
                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default header