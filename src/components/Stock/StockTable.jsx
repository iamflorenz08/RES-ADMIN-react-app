import { useState } from 'react'
import ic_replenish from '../../images/ic_replenish.png'
import ReplenishModal from '../Modals/ReplenishModal'
import { isCritical } from '../../utils/SupplyCritical'
import { BsExclamationLg } from 'react-icons/bs'
const StockTable = ({ stocks, toggleAddEditModal, toggleDeleteModal }) => {
    const [supplyDetails, setSupplyDetails] = useState(null)

    const handleReplenishClick = (stock) => {
        setSupplyDetails(stock)
    }
    return (
        <>
            <table className="w-full table-auto bg-blue-200 text-left text-blue-900">
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
                        <th className="bg-blue-700 p-2 text-white">
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
                        <th className="bg-blue-700 p-2 text-white">
                            <div className="flex items-center">
                                Available Supplies
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
                        <th className="bg-blue-700 p-2 text-white">
                            <div className="flex items-center">
                                Units Of Measurement
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
                        <th className="bg-blue-700 p-2 text-white">
                            <div className="flex items-center">
                                Unit Cost
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
                        <th className="bg-blue-700 p-2 text-white">
                            <div className="flex items-center">
                                Type
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
                        <th className="bg-blue-700 p-2 text-white">
                            <div className="flex items-center">
                                Category
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
                        <th className="bg-blue-700 p-2 text-white"></th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock, index) => (
                        <tr key={index} className={(index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200') + " text-blue-900"}>
                            <td className="p-2">{stock.product_code}</td>
                            <td className="p-2">
                                <div className="flex items-center gap-2">
                                    <img alt="stock" className="w-6 h-6 object-contain" src={stock.photo_url} />
                                    {stock.item_name}
                                </div>
                            </td>
                            <td className="py-2 px-10">
                                <div className="flex relative">
                                    <div className={(isCritical(stock.current_supply, stock.buffer) && 'text-[#FF0000]') + " flex"}>
                                        {(stock.current_supply - stock.buffer) >= 0 ? (stock.current_supply - stock.buffer) : 0}
                                    </div>
                                    <div className="flex items-center h-full absolute right-0">
                                        <div className='relative'>
                                            {isCritical(stock.current_supply, stock.buffer) && (
                                                <div className='absolute -top-1 -right-1 bg-[#FF0000] text-white rounded-full p-0.5'>
                                                    <BsExclamationLg size={10} />
                                                </div>
                                            )}

                                            <button
                                                onClick={() => handleReplenishClick(stock)}
                                            >
                                                <img src={ic_replenish} alt='replenish' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-2 px-10">{stock.unit_measurement}</td>
                            <td className="p-2">₱ {(stock.unit_cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td className="py-2 px-5">{stock.item_type}</td>
                            <td className="p-2">{stock.category}</td>
                            <td className="p-2 text-center">
                                {/* <!-- EDIT button --> */}
                                <button
                                    onClick={() => toggleAddEditModal(stock._id)}
                                    className="rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-2   "
                                    type="button">
                                    Edit
                                </button>
                                {/* <!-- DELETE MODAL --> */}
                                <button type="button"
                                    onClick={() => toggleDeleteModal(stock._id)}
                                    className="rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table >

            <ReplenishModal supply={supplyDetails} setToggle={setSupplyDetails} />
        </>
    )
}

export default StockTable