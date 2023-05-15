import { Link } from "react-router-dom"
import RizalLogo from '../images/RES.png'
import ic_dashboard from '../images/ic_dashboard.png'
import ic_requisition from '../images/ic_requisition.png'
import ic_stock from '../images/ic_stock.png'
import ic_employees from '../images/ic_person.png'
import ic_logs from '../images/ic_logs.png'


const Sidebar = ({ active, details }) => {

    const capitalFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className="sticky top-0 h-screen w-fit bg-blue-900 px-2 text-white">
            <div className="flex items-center justify-center space-x-2 border-b-2 py-4">
                <img src={RizalLogo} alt="RES.png" className="h-20 w-24 rounded p-2" />
                <div>
                    <h2 className="font-bold">Rizal Elementary School</h2>
                    <p className="text-sm font-normal">{details && capitalFirst(details.adminType)}</p>
                </div>
            </div>

            <div className="my-4">
                <nav className="space-y-2.5">

                    {details && details.adminType === "custodian" && (
                        <>
                            <Link to="/dashboard"
                                className={(active === 'dashboard' && 'bg-blue-600') + " flex items-center justify-start space-x-4 rounded bg-opacity-50 py-2.5 pl-6 transition-all hover:bg-blue-300 hover:text-black"}>
                                <img src={ic_dashboard} alt="dashboard" />
                                <p>Dashboard</p>
                            </Link>

                            <Link to="/requisition"
                                className={(active === 'requisition' && 'bg-blue-600') + "  flex items-center justify-start space-x-4 rounded bg-opacity-50 py-2.5 pl-6 transition-all hover:bg-blue-300 hover:text-black"}>
                                <img src={ic_requisition} alt="dashboard" />
                                <p>Requisition</p>
                            </Link>
                            <Link to="/stock"
                                className={(active === 'stock' && 'bg-blue-600') + "  flex items-center justify-start space-x-4 rounded bg-opacity-50 py-2.5 pl-6 transition-all hover:bg-blue-300 hover:text-black"}>
                                <img src={ic_stock} alt="dashboard" />
                                <p>Stock</p>
                            </Link>
                            <Link to="/employees"
                                className={(active === 'employees' && 'bg-blue-600') + "   flex items-center justify-start space-x-4 rounded bg-opacity-50 py-2.5 pl-6 transition-all hover:bg-blue-300 hover:text-black"}>
                                <img src={ic_employees} alt="dashboard" />
                                <p>Employees</p>
                            </Link>
                        </>
                    )}

                    <Link to="/logs/requisition"
                        className={(active === 'logs' && 'bg-blue-600') + "  flex items-center justify-start space-x-4 rounded bg-opacity-50 py-2.5 pl-6 transition-all hover:bg-blue-300 hover:text-black"}>
                        <img src={ic_logs} alt="dashboard" />
                        <p>Logs</p>
                    </Link>

                    {/* {details && details.adminType === "custodian" && (
                        <Link to="/settings"
                            className={(active === 'settings' && 'bg-blue-600') + "  flex items-center justify-start space-x-4 rounded bg-opacity-50 py-2.5 pl-6 transition-all hover:bg-blue-300 hover:text-black"}>
                            <svg className="h-10 w-10 rounded p-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>

                            <p>Account Settings</p>
                        </Link>
                    )} */}



                </nav>
            </div>
        </div>
    )
}

export default Sidebar