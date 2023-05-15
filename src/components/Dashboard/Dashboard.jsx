
import { useState, useEffect } from "react";
// import { MdPendingActions } from 'react-icons/md'
// import { WiTime4 } from 'react-icons/wi'
// import { BsCheck2All } from 'react-icons/bs'
import { Link } from "react-router-dom";
import axios from "axios";
import StocksTable from "./StocksTable";
import RequisitionTable from "./RequisitionTable";
import StockLogsTable from "./StockLogsTable";
import Loading from "../Loading";
import ic_to_be_approved from "../../images/ic_to_be_approved.png"
import ic_for_pick_up from "../../images/ic_for_pick_up.png"
import ic_completed from "../../images/ic_completed.png"

const Dashboard = ({ setActive }) => {
    document.title = "Dashboard"
    const baseURL = process.env.REACT_APP_API
    const [requisitions, setRequisitions] = useState(null);
    const [stocks, setStocks] = useState(null);
    const [stockLogs, setStockLogs] = useState(null)
    const [count, setCount] = useState(null)
    const [refreshTable, setRefreshTable] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const loadDashboard = async () => {
            let requisitions = await axios.get(`${baseURL}/requisition/page/1/5?type=dashboard`)
            let stocks = await axios.get(`${baseURL}/supply/details/1/5`)
            let stock_logs = await axios.get(`${baseURL}/log/stock/1/5/dashboard`)
            const counts = await axios.get(`${baseURL}/log/requisition/count/all`)

            requisitions = requisitions.data
            stocks = stocks.data
            stock_logs = stock_logs.data

            setRequisitions(requisitions)
            setStocks(stocks)
            setStockLogs(stock_logs)
            setCount(() => {
                return {
                    pendingCount: counts.data.pendingCount,
                    ongoingCount: counts.data.ongoingCount,
                    completedCount: counts.data.completedCount
                }
            })

            setLoading(false)
        }
        loadDashboard()
    }, [refreshTable, baseURL]);


    useEffect(() => {
        setActive(() => 'dashboard')
    }, [setActive]);

    return (
        <>
            <Loading loading={loading} />

            {requisitions && stocks && stockLogs && count && (
                <div className="m-4 bg-blue-50">
                    <div className="flex justify-between gap-8 mb-4">
                        <div className="flex items-center justify-around w-full  bg-white py-10 shadow-md">
                            <img src={ic_to_be_approved} alt="icon" />
                            {/* <MdPendingActions size={100} className="text-[#FFB717]" /> */}
                            <div className="text-center">
                                <p className="text-6xl">{count && count.pendingCount}</p>
                                <p className="text-xl text-gray-300">To Be Approved</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-around w-full  bg-white py-10 shadow-md">
                            <img src={ic_for_pick_up} alt="icon" />
                            {/* <WiTime4 size={110} className="text-[#006DEE]" /> */}
                            <div className="text-center">
                                <p className="text-6xl">{count && count.ongoingCount}</p>
                                <p className="text-xl text-gray-300">Ready for Pick Up</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-around w-full  bg-white py-10 shadow-md">
                            <img src={ic_completed} alt="icon" />
                            {/* <BsCheck2All size={110} className="text-[#32A05F]" /> */}
                            <div className="text-center">
                                <p className="text-6xl">{count && count.completedCount}</p>
                                <p className="text-xl text-gray-300">Completed</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-0 gap-x-4 gap-y-4 overflow-hidden">
                        <div className="box col-start-1 col-end-3 row-start-1 row-end-1 ">
                            {/* <!-- requisition --> */}
                            <div className="flex justify-between border-b-2 border-black bg-white shadow-lg">
                                <div className="flex items-center">
                                    <svg className="mx-2 h-10 w-10 rounded p-2 bi bi-book-half" xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                                    </svg>

                                    <h2 className="font-bold">Requisition</h2>
                                </div>

                                <div className="flex items-center">

                                    <div className="flex rounded-full hover:bg-black hover:text-white">
                                        <button onClick={() => setRefreshTable(key => key + 1)}>
                                            <svg className="h-6 w-6 p-0.5 bi bi-arrow-clockwise" xmlns="http://www.w3.org/2000/svg" width="16"
                                                height="16" fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                                <path
                                                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <Link to="/requisition" className="mx-2 flex items-center">
                                        <button className="rounded-full bg-green-500 px-2 text-white">See All</button>
                                    </Link>
                                </div>
                            </div>

                            {/* <!-- requisition table --> */}
                            <div className="">
                                <RequisitionTable requisitions={requisitions} setRefreshTable={setRefreshTable} />
                            </div>

                            {requisitions && requisitions.length <= 0 && (
                                <div className="flex justify-center items-center h-52">
                                    Empty
                                </div>
                            )}

                        </div>



                        {/* <!-- stocks --> */}
                        <div className="box col-start-1 col-end-1 row-start-2 row-end-2 mb-5">
                            <div>
                                <div className="flex justify-between border-b-2 border-black bg-white">
                                    <div className="flex items-center">
                                        <svg className="mx-2 h-10 w-10 rounded p-2 bi bi-stack" xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z" />
                                            <path
                                                d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z" />
                                        </svg>

                                        <h2 className="font-bold">Stocks</h2>
                                    </div>

                                    <div className="mx-2">
                                        <Link to="/stock" className="m-2 flex items-center">
                                            <button className="rounded-full bg-green-500 px-2 text-white">See All</button>
                                        </Link>
                                    </div>
                                </div>

                                {/* <!-- stocks table --> */}
                                <div className="">
                                    <StocksTable stocks={stocks} />
                                </div>
                            </div>
                        </div>

                        {/* <!-- logs --> */}
                        <div className="box col-start-2 col-end-2 row-start-2 row-end-2 mb-5">
                            <div>
                                <div className="flex justify-between border-b-2 border-black bg-white">
                                    <div className="flex items-center">
                                        <svg className="mx-2 h-10 w-10 rounded p-2" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" fill="currentColor" >
                                            <path fillRule="evenodd"
                                                d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z"
                                                clipRule="evenodd" />
                                            <path
                                                d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                                        </svg>

                                        <h2 className="font-bold">Logs</h2>
                                    </div>

                                    <div className="mx-2">
                                        <Link to="/logs/stock" className="m-2 flex items-center">
                                            <button className="rounded-full bg-green-500 px-2 text-white">See All</button>
                                        </Link>
                                    </div>
                                </div>
                                {/* <!-- logs content --> */}
                                <div className="h-full bg-blue-500">
                                    <StockLogsTable stockLogs={stockLogs} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Dashboard