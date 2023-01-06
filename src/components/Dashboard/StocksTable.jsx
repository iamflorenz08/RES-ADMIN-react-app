import { useState, useEffect } from "react";
const StocksTable = ({ stocks }) => {
    const [sortedStock, setSortedStock] = useState([])
    const [sortItemName, setSortItemName] = useState(false)
    const [sortSupplies, setSortSupplies] = useState(false)

    useEffect(() => {
        setSortedStock(stocks)
    }, [stocks]);


    const SortItemName = () => {
        const asc = (a,b) => a.item_name.toUpperCase() < b.item_name.toUpperCase() ? 1 :-1
        const desc = (a,b) => a.item_name.toUpperCase() > b.item_name.toUpperCase() ? 1 :-1
        const sort = sortedStock ? sortedStock.sort((a,b)=>{
            return sortItemName ? desc(a,b) : asc(a,b)
        }) : []
        setSortedStock([...sort])
        setSortItemName(type=> !type)   
    }

    const SortSupplies = () => {
        const asc = (a,b) => a.current_supply < b.current_supply ? 1 :-1
        const desc = (a,b) => a.current_supply > b.current_supply ? 1 :-1
        const sort = sortedStock ? sortedStock.sort((a,b)=>{
            return sortSupplies ? desc(a,b) : asc(a,b)
        }) : []
        setSortedStock([...sort])
        setSortSupplies(type=> !type)   
    }

    
    return (
        <>
            <table className="w-full  text-blue-900 shadow-lg">
                <thead>
                    <tr>
                        <th className="bg-blue-700  p-2 text-white">
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
                            <div className="flex items-center justify-center">
                                Current Supplies
                                <button onClick={SortSupplies}>
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
                            <div className="flex items-center justify-center">
                                Unit Of Measurement
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedStock && sortedStock.map((stock, index) => (
                        <tr key={index} className={(index % 2 === 0 ? "bg-blue-100" : "bg-blue-200") + " text-blue-900"}>
                            <td className="p-2">
                                <div className="flex items-center">
                                    <img alt="stock" className="w-5 h-5 mr-5 object-contain" src={stock.photo_url}/>
                                    {stock.item_name}
                                </div>
                            </td>
                            <td className="py-2 text-center">{stock.current_supply}</td>
                            <td className="p-2 text-center">{stock.unit_measurement}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default StocksTable