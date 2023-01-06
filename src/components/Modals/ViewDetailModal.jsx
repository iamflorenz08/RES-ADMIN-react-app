import axios from "axios"
import { useNavigate } from "react-router-dom"

const ViewDetailModal = ({ show, toggleModal, requisition, setRefreshTable }) => {
    const baseURL = process.env.REACT_APP_API
    const navigate = useNavigate()
    let user = null

    if (requisition.user_id) {
        user = requisition.user_id
    }
    else {
        user = requisition.userDetails
    }

    const setApproval = async (approval, id) => {
        const isApprove = await axios.post(`${baseURL}/requisition/${id}/${approval}`)
        if (isApprove.data.isError) return
        toggleModal()
        setRefreshTable(key => key + 1)
    }

    const markComplete = async (id) => {
        const mark_complete = await axios.post(`${baseURL}/requisition/complete?id=${id}`)
        if (mark_complete.data.isError) return
        toggleModal()
        setRefreshTable(key => key + 1)
    }

    const generateReport = (id) => {
        navigate(`/report/requisition/${id}`, { replace: true })
    }


    return (
        <>
            {show && (
                <>
                    <div id="dash-modal"
                        className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden p-4 flex justify-center items-center"
                    >

                        <div className="fixed inset-0 bg-black z-auto opacity-75" onClick={toggleModal}>

                        </div>

                        <div className="relative h-full w-full max-w-3xl md:h-auto">
                            <div className="relative rounded-lg bg-white shadow">
                                <div className="py-6 px-6">
                                    <h3 className="border-b border-black py-2 text-xl font-bold text-black">View Details
                                    </h3>
                                    <form action="">
                                        <div className="grid h-full w-full grid-cols-1 grid-rows-1 gap-2 py-2">
                                            <div className="box">
                                                <div className="grid h-full w-full grid-cols-4 grid-rows-1 gap-2">
                                                    <div className="box col-span-2 col-start-1 row-start-1 row-end-1">
                                                        <div>
                                                            <label htmlFor="name"
                                                                className="mb-2 block text-sm font-medium text-gray-900">
                                                                Name </label>
                                                            <input type="name" name="name" id="name"
                                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                                value={user.full_name.first_name ? user.full_name.first_name + ' ' + user.full_name.last_name : user.full_name} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="box col-start-3 col-end-3 row-start-1 row-end-1">
                                                        <div>
                                                            <label htmlFor="position"
                                                                className="mb-2 block text-sm font-medium text-gray-900">
                                                                Position </label>
                                                            <input type="tel" name="position" id="position"
                                                                value={user.position}
                                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                                disabled />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="faculty"
                                                            className="mb-2 block text-sm font-medium text-gray-900">
                                                            Faculty</label>
                                                        <select id="faculty"
                                                            value={user.department}
                                                            className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                            disabled>
                                                            <option value="Kindergarten">Kindergarten</option>
                                                            <option value="Grade 1">Grade 1</option>
                                                            <option value="Grade 2">Grade 2</option>
                                                            <option value="Grade 3">Grade 3</option>
                                                            <option value="Grade 4">Grade 4</option>
                                                            <option value="Grade 5">Grade 5</option>
                                                            <option value="Grade 6">Grade 6</option>
                                                        </select>
                                                    </div>
                                                    <div className="box col-start-1 col-end-1 row-start-2 row-end-2">
                                                        <div>
                                                            <label htmlFor="IDNo"
                                                                className="mb-2 block text-sm font-medium text-gray-900">
                                                                ID No.</label>
                                                            <input type="tel" name="IDNo" id="IDNo"
                                                                placeholder="51423"
                                                                value={user.id_no || 'Empty'}
                                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                                disabled />
                                                        </div>
                                                    </div>
                                                    <div className="box col-span-2 col-start-2 row-start-2 row-end-3">
                                                        <div>
                                                            <label htmlFor="mobileNumber"
                                                                className="mb-2 block text-sm font-medium text-gray-900">
                                                                Mobile Number</label>
                                                            <input type="tel" name="mobileNumber" id="mobileNumber"
                                                                value={user.mobile_number}
                                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                                disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container mt-2 h-60 overflow-y-auto">
                                            <table className="table-auto w-full">
                                                <thead className=" bg-blue-700 text-white">
                                                    <tr className="">
                                                        <th className="bg-blue-700text-white">No.</th>
                                                        <th className="bg-blue-700 text-white">Type</th>
                                                        <th className="bg-blue-700 text-white">Item Name</th>
                                                        <th className="bg-blue-700 text-white">Quantity</th>
                                                        <th className="bg-blue-700 text-white">UOM</th>
                                                        <th className="bg-blue-700 text-white">Total Cost</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {requisition.items.map((item, index) => (
                                                        <tr key={index} className=" bg-blue-100 text-blue-900">
                                                            <td className="py-1 pl-2 pr-8">{index + 1}</td>
                                                            <td className="py-1 pr-6">{item.item_type}</td>
                                                            <td className="py-1">
                                                                <input type="text" name="itemName" id="itemName"
                                                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-1 text-sm text-gray-900"
                                                                    value={item.item_name} disabled />
                                                            </td>
                                                            <td className="p-1">
                                                                <input type="text" id="quantity"
                                                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-1 text-sm text-gray-900"
                                                                    value={item.quantity} disabled />
                                                            </td>
                                                            <td className="p-1">{item.unit_measurement}</td>
                                                            <td className="p-1">
                                                                <input type="text" id="total_cost"
                                                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-1 text-sm text-gray-900"
                                                                    value={item.total_cost} disabled />
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </form>
                                    {requisition.status === 'On going' || requisition.status === 'Completed' || requisition.status === 'Rejected' || requisition.status === 'Cancelled' ? (
                                        <div
                                            className={(requisition.status === 'On going' || requisition.status === 'Completed' ? 'justify-between' : 'justify-end') + " mt-4 flex items-center  space-x-2 rounded-b border-t border-gray-600 px-2 py-4"}>
                                            {(requisition.status === 'On going' || requisition.status === 'Completed') && (
                                                <button
                                                    onClick={() => generateReport(requisition._id)}
                                                    type="button"
                                                    className="flex rounded-lg bg-orange-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-900 focus:outline-none focus:ring-4 focus:ring-orange-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                        fill="currentColor" className="h-6 w-6 pr-2 pb-1">
                                                        <path fillRule="evenodd"
                                                            d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5zM15 9.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75H15z"
                                                            clipRule="evenodd" />
                                                    </svg>
                                                    Generate Report
                                                </button>
                                            )}

                                            <div className="space-x-4">
                                                <button onClick={toggleModal} type="button"
                                                    className="rounded-lg bg-white border-2 border-red-500 px-5 py-2 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white focus:outline-none">
                                                    Close
                                                </button>
                                                {requisition.status === 'On going' && (
                                                    <button onClick={() => markComplete(requisition._id)} type="button"
                                                        className="rounded-lg bg-green-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900 focus:outline-none ">
                                                        Mark as completed
                                                    </button>
                                                )}

                                            </div>
                                        </div>
                                    ) : (

                                        <div
                                            className="mt-4 flex items-center justify-end space-x-2 rounded-b border-t border-gray-600 px-2 py-4">

                                            <button onClick={() => { setApproval(true, requisition._id) }} type="button"
                                                className="rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-600">
                                                Approve
                                            </button>
                                            <button onClick={() => setApproval(false, requisition._id)} type="button"
                                                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-600">
                                                Reject
                                            </button>
                                        </div>

                                    )}

                                </div>
                            </div>
                        </div>


                    </div>


                </>
            )}

        </>
    )
}

export default ViewDetailModal