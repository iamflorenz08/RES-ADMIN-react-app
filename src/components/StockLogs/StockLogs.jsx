import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios";
import StockLogsTable from "./StockLogsTable";
const StockLogs = ({ setActive }) => {
    document.title = "Stock Logs"
    const baseURL = process.env.REACT_APP_API
    const [filter, setFilter] = useState(null)
    const [stockLogs, setStockLogs] = useState(null)
    const [count, setCount] = useState(0)
    const [rowStart, setRowStart] = useState(0)
    const [rowEnd, setRowEnd] = useState(0)
    const [page, setPage] = useState(1)
    const [pageLimit, setPageLimit] = useState(0)
    const rowLimit = 10


    useEffect(() => {
        const loadTable = async () => {
            const search = filter && filter.search ? '?search=' + filter.search : ''
            let stock_logs = await axios.get(`${baseURL}/log/stock/1/10${search}`)
            let stock_count = await axios.get(`${baseURL}/log/stock/count${search}`)

            stock_logs = stock_logs.data
            stock_count = stock_count.data.count

            const pageLimit = Math.ceil(stock_count / rowLimit)
            const rowStart = ((page - 1) * rowLimit) + 1
            const rowEnd = page >= pageLimit ? stock_count : (rowStart + rowLimit) - 1

            setStockLogs(stock_logs)
            setCount(stock_count)
            setPageLimit(pageLimit)
            setRowStart(rowStart)
            setRowEnd(rowEnd)
        }
        loadTable()
    }, [baseURL, filter, page]);


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

    const search = (e) => {
        e.preventDefault()
        setFilter(state => ({ ...state, search: e.target[0].value }))
    }
    return (
        <>
            <div className="m-4">
                {/* <!-- STOCKS LOGS --> */}
                <div className="grid grid-cols-1 grid-rows-1 gap-4 overflow-hidden">
                    <div className="box col-start-1 col-end-1 row-start-1 row-end-1">
                        <div>
                            <div className="flex flex-row">
                                <Link to="/logs/requisition"
                                    className="mr-0.5 w-1/6 rounded-t-2xl bg-blue-700 pt-1 text-center text-white">
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
                                    className="z-10 -mb-1 w-1/6 rounded-t-2xl border-x-4 border-t-4 border-blue-600 bg-white text-center">
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
                                            placeholder="Search..." />
                                    </form>
                                </div>

                                {/* <!-- generate report btn --> */}
                                <Link
                                    to={'/report/stock'}
                                    className="my-2 mr-2 flex rounded-lg bg-orange-600 px-5 py-1.5 text-center text-sm font-medium text-white hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        className="h-6 w-6 pr-2 pb-1">
                                        <path fillRule="evenodd"
                                            d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5zM15 9.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75H15z"
                                            clipRule="evenodd" />
                                    </svg>
                                    Generate Report
                                </Link>
                            </div>

                            {/* <!-- STOCKS LOGS TABLE --> */}
                            <div>
                                <div>
                                    <table className="w-full border-t-2 border-black text-gray-900 shadow-lg">
                                        <thead>
                                            <tr>
                                                <th className="bg-blue-700 p-2 text-white">
                                                    <div className="flex items-center">
                                                        Product Code
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
                                                        Item Name
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
                                                        UOM
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
                                                        Borrower
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

                                                <th className="bg-blue-700 p-2 text-left text-white">
                                                    <div className="flex items-center">
                                                        Items Taken
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
                                                        Remaining
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <StockLogsTable stockLogs={stockLogs} />
                                        </tbody>
                                    </table>
                                    {stockLogs && stockLogs.length <= 0 && (
                                        <div className="flex justify-center items-center h-96 ">
                                            <p>Empty</p>
                                        </div>
                                    )}
                                </div>

                                {/* <!-- PAGINATIONS --> */}
                                {stockLogs && stockLogs.length > 0 && (
                                    <div className="bg-grey-50 mx-6 mt-2 mb-1 flex items-center justify-between">
                                        {/* <!-- Help text --> */}
                                        <span className="text-sm text-gray-700 dark:text-gray-400">
                                            Showing
                                            <span className="font-bold text-gray-900 dark:text-gray-900"> {rowStart} - {rowEnd} </span>
                                            out of
                                            <span className="font-bold text-gray-900 dark:text-gray-900"> {count} </span>
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

export default StockLogs