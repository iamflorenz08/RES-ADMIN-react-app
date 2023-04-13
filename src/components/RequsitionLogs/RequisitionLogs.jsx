import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ViewDetailModal from "../Modals/ViewDetailModal"
import ReqLogsTable from "./ReqLogsTable"

const RequisitionLogs = ({ setActive }) => {
    document.title = "Requisition Logs"
    const baseURL = process.env.REACT_APP_API
    const [filter, setFilter] = useState({})
    const [requisitionLogs, setRequisitionLogs] = useState([])
    const [viewDetailModal, setViewDetailModal] = useState(false)
    const [requsitionDetails, setRequisitionDetail] = useState({})
    const [reqLogsCount, setReqLogsCount] = useState(0)
    const [rowStart, setRowStart] = useState(0)
    const [rowEnd, setRowEnd] = useState(0)
    const [page, setPage] = useState(1)
    const [pageLimit, setPageLimit] = useState(0)
    const rowLimit = 10

    useEffect(() => {
        const loadTable = async () => {
            const search = filter && filter.search ? '&search=' + filter.search : ''
            let requisition_logs = await axios.get(`${baseURL}/requisition/page/${page}/${rowLimit}?type=logs${search}`)
            let requisition_logs_count = await axios.get(`${baseURL}/requisition/count?type=logs${search}`)
            requisition_logs = requisition_logs.data
            requisition_logs_count = requisition_logs_count.data.count
            const pageLimit = Math.ceil(requisition_logs_count / rowLimit)
            const rowStart = ((page - 1) * rowLimit) + 1
            const rowEnd = page >= pageLimit ? requisition_logs_count : (rowStart + rowLimit) - 1

            setRequisitionLogs(requisition_logs)
            setReqLogsCount(requisition_logs_count)
            setPageLimit(pageLimit)
            setRowStart(rowStart)
            setRowEnd(rowEnd)
        }

        loadTable()
    }, [page, baseURL, filter])

    useEffect(() => {
        setActive(() => 'logs')
    }, [setActive]);

    const nextPage = () => {
        if (page >= pageLimit) return
        setPage(page => page + 1)
    }

    const prevPage = () => {
        if (page <= 1) return
        setPage(page => page - 1)
    }

    const toggleViewDetail = (id) => {
        setRequisitionDetail(() => requisitionLogs.find(requisition => { return id === requisition._id }))
        setViewDetailModal(true)
    }

    const search = (e) => {
        e.preventDefault()
        setFilter(state => ({ ...state, search: e.target[0].value }))
    }

    return (
        <>
            <div className="m-4">
                {/* <!-- REQUISITION LOGS --> */}
                <div className="grid grid-cols-1 grid-rows-1 gap-4 overflow-hidden">
                    <div className="box col-start-1 col-end-1 row-start-1 row-end-1">
                        {/* <!-- tabs --> */}
                        <div>
                            <div className="flex flex-row">
                                <Link to="/logs/requisition"
                                    className="z-10 mr-0.5 -mb-1 w-1/6 rounded-t-2xl border-x-4 border-t-4 border-blue-600 bg-white text-center">
                                    <div className="flex items-center">
                                        <svg className="mx-2 h-10 w-10 rounded p-2" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd"
                                                d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z"
                                                clipRule="evenodd" />
                                            <path
                                                d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                                        </svg>

                                        <h2 className="font-bold">Requisition Logs</h2>
                                    </div>
                                </Link>
                                <Link to="/logs/stock"
                                    className="w-1/6 rounded-t-2xl bg-blue-700 pt-1 text-center text-white">
                                    <div className="flex items-center">
                                        <svg className="mx-2 h-10 w-10 rounded p-2" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd"
                                                d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z"
                                                clipRule="evenodd" />
                                            <path
                                                d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                                        </svg>

                                        <h2 className="font-bold">Stock Logs</h2>
                                    </div>
                                </Link>
                            </div>

                            <div
                                className="flex items-center justify-between border-x-4 border-t-4 border-blue-600 bg-white">
                                <div className="flex items-center">
                                    <form onSubmit={search} className="ml-2 flex items-center py-1.5">
                                        <label htmlFor="default-search"
                                            className="sr-only text-sm font-medium text-gray-900">Search</label>
                                        <input type="search" id="default-search"
                                            className="h-8 w-[250px] rounded-full border border-gray-500 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none"
                                            placeholder="Search ID..." />
                                    </form>
                                </div>


                            </div>

                            {/* <!-- REQUISITION LOGS TABLE --> */}
                            <div>
                                <div>
                                    <table className="w-full border-t-2 border-black text-gray-900 shadow-lg">
                                        <thead>
                                            <tr>
                                                <th className="bg-blue-700 p-2 text-white">
                                                    <div className="flex items-center">
                                                        ID No.
                                                        <a href="/">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                className="ml-1 h-3 w-3" aria-hidden="true" fill="currentColor"
                                                                viewBox="0 0 320 512">
                                                                <path
                                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </th>
                                                <th className="bg-blue-700 p-2 text-left text-white">
                                                    <div className="flex items-center">
                                                        Name
                                                        <a href="/">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                className="ml-1 h-3 w-3" aria-hidden="true" fill="currentColor"
                                                                viewBox="0 0 320 512">
                                                                <path
                                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </th>
                                                <th className="bg-blue-700 p-2 text-left text-white">
                                                    <div className="flex items-center">
                                                        Borrowed
                                                        <a href="/">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                className="ml-1 h-3 w-3" aria-hidden="true" fill="currentColor"
                                                                viewBox="0 0 320 512">
                                                                <path
                                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </th>
                                                <th className="bg-blue-700 p-2 text-left text-white">
                                                    <div className="flex items-center">
                                                        Returned
                                                        <a href="/">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                className="ml-1 h-3 w-3" aria-hidden="true" fill="currentColor"
                                                                viewBox="0 0 320 512">
                                                                <path
                                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </th>

                                                <th className="bg-blue-700 p-2 text-left text-white">Mobile Number</th>
                                                <th className="bg-blue-700 p-2 text-left text-white">
                                                    <div className="flex items-center">
                                                        Status
                                                        <a href="/">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                className="ml-1 h-3 w-3" aria-hidden="true" fill="currentColor"
                                                                viewBox="0 0 320 512">
                                                                <path
                                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </th>
                                                <th className="bg-blue-700 p-2 text-left text-white"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <ReqLogsTable logs={requisitionLogs} toggleModal={toggleViewDetail} />
                                        </tbody>
                                    </table>
                                    {requisitionLogs <= 0 && (
                                        <div className="flex justify-center items-center h-96 ">
                                            <p>Empty</p>
                                        </div>
                                    )}
                                </div>



                                {/* <!-- VIEW DETAILS MODAL --> */}
                                <ViewDetailModal show={viewDetailModal} toggleModal={() => setViewDetailModal(false)} requisition={requsitionDetails} />
                                {/* <!-- END MODAL -->
                                
                                <!-- PAGINATIONS --> */}
                                {requisitionLogs.length > 0 && (
                                    <div className="bg-grey-50 mx-6 mt-2 mb-1 flex items-center justify-between">
                                        {/* <!-- Help text --> */}
                                        <span className="text-sm text-gray-700 dark:text-gray-400">
                                            Showing
                                            <span className="font-bold text-gray-900 dark:text-gray-900"> {rowStart} - {rowEnd} </span>
                                            out of
                                            <span className="font-bold text-gray-900 dark:text-gray-900"> {reqLogsCount} </span>
                                            Logs
                                        </span>

                                        <div className="xs:mt-0 mt-2 inline-flex">
                                            {/* <!-- Buttons --> */}
                                            <button
                                                onClick={prevPage}
                                                className="inline-flex items-center rounded-l bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <svg aria-hidden="true" className="mr-2 h-5 w-5" fill="currentColor"
                                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                                        clipRule="evenodd"></path>
                                                </svg>
                                                Prev
                                            </button>
                                            <button
                                                onClick={nextPage}
                                                className="inline-flex items-center rounded-r border-0 border-l border-gray-700 bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 dark:border-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                Next
                                                <svg aria-hidden="true" className="ml-2 h-5 w-5" fill="currentColor"
                                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                                        clipRule="evenodd"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequisitionLogs