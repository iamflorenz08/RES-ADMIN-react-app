
import { useState, useEffect } from "react"
const StockLogsTable = ({ stockLogs }) => {
    const [sortItemName, setSortItemName] = useState(false)
    const [sortItemTaken, setSortItemTaken] = useState(false)
    const [sortBorrower, setSortBorrower] = useState(false)
    const [sortedStockLogs, setSortedStockLogs] = useState([])

    useEffect(() => {
        setSortedStockLogs(stockLogs)
    }, [stockLogs]);

    const SortItemName = () => {
        const asc = (a, b) => a.requestItem.item_name.toUpperCase() < b.requestItem.item_name.toUpperCase() ? 1 : -1
        const desc = (a, b) => a.requestItem.item_name.toUpperCase() > b.requestItem.item_name.toUpperCase() ? 1 : -1
        const sort = sortedStockLogs ? sortedStockLogs.sort((a, b) => {
            return sortItemName ? desc(a, b) : asc(a, b)
        }) : []
        setSortedStockLogs([...sort])
        setSortItemName(type => !type)
    }

    const SortItemTaken = () => {
        const asc = (a, b) => a.itemQuantity < b.itemQuantity ? 1 : -1
        const desc = (a, b) => a.itemQuantity > b.itemQuantity ? 1 : -1
        const sort = sortedStockLogs ? sortedStockLogs.sort((a, b) => {
            return sortItemTaken ? desc(a, b) : asc(a, b)
        }) : []
        setSortedStockLogs([...sort])
        setSortItemTaken(type => !type)
    }

    const SortBorrower = () => {
        const asc = (a, b) => a.user.full_name.first_name.toUpperCase() < b.user.full_name.first_name.toUpperCase() ? 1 : -1
        const desc = (a, b) => a.user.full_name.first_name.toUpperCase() > b.user.full_name.first_name.toUpperCase() ? 1 : -1
        const sort = sortedStockLogs ? sortedStockLogs.sort((a, b) => {
            return sortBorrower ? desc(a, b) : asc(a, b)
        }) : []
        setSortedStockLogs([...sort])
        setSortBorrower(type => !type)
    }

    return (
        <>
            <table className="w-full bg-blue-200 text-blue-900 shadow-lg">
                <thead className="text-left">
                    <tr>
                        <th className="bg-blue-700 p-2 text-white">
                            <div className="flex items-center justify-start">
                                Item Name
                                <button onClick={SortItemName}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1 h-3 w-3" aria-hidden="true"
                                        fill="currentColor" viewBox="0 0 320 512">
                                        <path
                                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                    </svg>
                                </button>
                            </div>
                        </th>
                        <th className="bg-blue-700 p-2 text-white">
                            <div className="flex items-center justify-start">
                                Items Taken
                                <button onClick={SortItemTaken}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1 h-3 w-3" aria-hidden="true"
                                        fill="currentColor" viewBox="0 0 320 512">
                                        <path
                                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                    </svg>
                                </button>
                            </div>
                        </th>
                        <th className="bg-blue-700 p-2 text-white">
                            <div className="flex items-center justify-start">
                                Borrower
                                <button onClick={SortBorrower}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1 h-3 w-3" aria-hidden="true"
                                        fill="currentColor" viewBox="0 0 320 512">
                                        <path
                                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                    </svg>
                                </button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="tex-left h-72">
                    {sortedStockLogs && sortedStockLogs.map((log, index) => {
                        let user = null
                        let full_name = null
                        if (log.user) {
                            user = log.user
                            full_name = user.full_name.first_name + " " + user.full_name.last_name
                        }
                        else {
                            user = log.userDetails
                            full_name = user.full_name
                        }
                        return (
                            <tr key={index} className={(index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200') + " text-blue-900"}>
                                <td className="p-2">
                                    <div className="flex items-center">
                                        <div>
                                            <img alt="stock" className="w-5 h-5 mr-5 object-contain" src={log.requestItem && log.requestItem.photo_url} />
                                        </div>
                                        <div>{log.requestItem && log.requestItem.item_name}</div>
                                    </div>
                                </td>
                                <td className="py-2 pl-12 text-left">{log.itemQuantity}</td>
                                <td className="py-2 px-4 text-start">{full_name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default StockLogsTable