import axios from "axios";
import { useState, useEffect } from "react";
const AddRequestModal = ({ show, toggleModal, showToast }) => {
    const baseURL = process.env.REACT_APP_API
    const [itemlists, setItemLists] = useState([])
    const [requests, setRequest] = useState([]);
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        setRequest([
            {
                id: 1,
                product_code: '',
                item_type: '',
                item_name: '',
                quantity: '',
                unit_measurement: '',
                total_cost: '',
                buffer: ''
            }
        ])

        setUserDetails({
            full_name: '',
            position: '',
            department: '',
            id_no: '',
            mobile_number: '',
        })
    }, [show]);

    useEffect(() => {
        const loadItemLists = async () => {
            const item_lists = await axios.get(`${baseURL}/supply/details`)
            setItemLists(item_lists.data)
        }
        loadItemLists()
    }, [baseURL]);


    const addItem = () => {
        setRequest(request => [...requests, {
            id: request[request.length - 1].id + 1,
            product_code: '',
            item_type: '',
            item_name: '',
            quantity: '',
            unit_measurement: '',
            total_cost: '',
            buffer: ''
        }])
    }

    const deleteItem = (id) => {
        if (requests.length <= 1) return
        setRequest(request => request.filter(item => { return id !== item.id }))
    }

    const handleChange = id => (e) => {
        const name = e.target.name
        const value = e.target.value
        const newValue = (obj) => {
            let newValue = { ...obj, [name]: value }
            if (name === 'item_type') {
                newValue = {
                    ...obj,
                    [name]: value,
                    product_code: '',
                    item_name: '',
                    quantity: '',
                    unit_measurement: 'N/A',
                    total_cost: '',
                    current_supply: 0,
                    buffer: 0
                }
            }

            if (name === 'item_name') {
                let item_info = itemlists.find(item => { return item.item_name === value })
                item_info = item_info ? item_info : ''
                newValue = {
                    ...obj,
                    [name]: value,
                    product_code: item_info.product_code || '',
                    unit_measurement: item_info.unit_measurement || '',
                    total_cost: item_info.unit_cost * obj.quantity,
                    current_supply: item_info.current_supply,
                    buffer: item_info.buffer
                }
            }

            if (name === 'quantity') {
                let product_code = obj.product_code
                let item_info = product_code && itemlists.find(item => { return item.product_code === product_code })
                if (item_info) {
                    newValue = {
                        ...obj,
                        [name]: value,
                        total_cost: parseFloat(value) * item_info.unit_cost,
                    }
                }
            }

            return newValue
        }

        setRequest(current =>
            current.map(obj => {
                if (obj.id === id) {
                    return newValue(obj);
                }
                return obj;
            }),
        );
    }

    const userHandleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUserDetails(details => { return { ...details, [name]: value } })
    }

    const submit = async () => {
        const new_requests = JSON.parse(JSON.stringify(requests))

        new_requests.map(obj => {
            return delete obj.id
        })

        for (let user_key in userDetails) {
            if (!userDetails[user_key]) {
                showToast(false, "User details must not be blank.")
                return
            }
        }

        for (let request of new_requests) {
            for (let request_keys in request) {
                if (!request[request_keys]) {
                    showToast(false, "Request details must not be blank.")
                    return
                }
            }

            if (parseInt(request.quantity) > request.current_supply) {
                showToast(false, "Not enough supply")
                return
            }
        }

        await axios.post(`${baseURL}/requisition/add`, {
            userDetails,
            status: 'On going',
            items: new_requests
        })

        showToast(true, "Request success!")
    }

    return (
        <>
            {show && (
                <div id="addRequest" tabIndex="-1" aria-hidden="true"
                    className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden p-4 flex justify-center items-center">

                    <div className="fixed inset-0 bg-black z-auto opacity-75" onClick={toggleModal}>

                    </div>

                    <div className="relative h-full w-full max-w-3xl md:h-auto">
                        {/* <!-- Modal content --> */}
                        <div className="relative rounded-lg bg-white shadow">
                            <div className="py-6 px-6">
                                {/* <!-- modal header --> */}
                                <h3 className="border-b border-black py-2 text-xl font-bold text-black">Add
                                    Request</h3>
                                <form action="">
                                    <div className="grid h-full w-full grid-cols-1 grid-rows-1 gap-2 py-2">
                                        <div className="box">
                                            <div
                                                className="grid h-full w-full grid-cols-4 grid-rows-1 gap-2">
                                                <div
                                                    className="box col-span-2 col-start-1 row-start-1 row-end-1">
                                                    <div>
                                                        <label htmlFor="name"
                                                            className="mb-2 block text-sm font-medium text-gray-900">
                                                            Name </label>
                                                        <input type="name" name="full_name" id="full_name"
                                                            onChange={userHandleChange}
                                                            value={userDetails.full_name}
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                            placeholder="John Lilki" required />
                                                    </div>
                                                </div>
                                                <div
                                                    className="box col-start-3 col-end-3 row-start-1 row-end-1">
                                                    <div>
                                                        <label htmlFor="position"
                                                            className="mb-2 block text-sm font-medium text-gray-900">
                                                            Position </label>
                                                        <input type="tel" name="position" id="position"
                                                            onChange={userHandleChange}
                                                            value={userDetails.position}
                                                            placeholder="Teacher"
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                            required />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="department"
                                                        className="mb-2 block text-sm font-medium text-gray-900">
                                                        Faculty</label>
                                                    <select id="department" name="department"
                                                        onChange={userHandleChange}
                                                        value={userDetails.deparment}
                                                        className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                                                        <option value="">Select</option>
                                                        <option value="Kindergarten">Kindergarten</option>
                                                        <option value="Grade 1">Grade 1</option>
                                                        <option value="Grade 2">Grade 2</option>
                                                        <option value="Grade 3">Grade 3</option>
                                                        <option value="Grade 4">Grade 4</option>
                                                        <option value="Grade 5">Grade 5</option>
                                                        <option value="Grade 6">Grade 6</option>
                                                    </select>
                                                </div>
                                                <div
                                                    className="box col-start-1 col-end-1 row-start-2 row-end-2">
                                                    <div>
                                                        <label htmlFor="id_no"
                                                            className="mb-2 block text-sm font-medium text-gray-900">
                                                            ID No.</label>
                                                        <input type="tel" name="id_no" id="id_no"
                                                            onChange={userHandleChange}
                                                            value={userDetails.id_no}
                                                            placeholder="51423"
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
                                                    </div>
                                                </div>
                                                <div
                                                    className="box col-span-2 col-start-2 row-start-2 row-end-3">
                                                    <div>
                                                        <label htmlFor="mobile_number"
                                                            className="mb-2 block text-sm font-medium text-gray-900">
                                                            Mobile Number</label>
                                                        <input type="tel" name="mobile_number"
                                                            onChange={userHandleChange}
                                                            value={userDetails.mobile_number}
                                                            id="mobile_number" placeholder="09876543219"
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container mt-2 h-60 overflow-y-auto">
                                        <table className="w-full">
                                            <thead
                                                className="bg-blue-700 text-white">
                                                <tr className="">
                                                    <th className="bg-blue-700 text-white">No.</th>
                                                    <th className="bg-blue-700  text-white">Type</th>
                                                    <th className="bg-blue-700  text-white">Item Name
                                                    </th>
                                                    <th className="bg-blue-700  text-white">
                                                        Quantity</th>
                                                    <th className="bg-blue-700  text-white">UOM
                                                    </th>
                                                    <th className="bg-blue-700 text-white">Total Cost</th>
                                                    <th className="bg-blue-700 text-white"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {requests.length > 0 && requests.map((request, index) => (
                                                    <tr key={index} className={(index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200') + " text-blue-900"}>
                                                        <td className="py-1 pl-2 pr-4">{index + 1}</td>
                                                        <td className="py-1 pr-2 flex justify-center">
                                                            <select name="item_type" id="item_type"
                                                                onChange={handleChange(request.id)}
                                                                value={request.item_type}
                                                                className="w-20 rounded-lg border border-gray-300 bg-gray-50 px-1 text-sm text-gray-900">
                                                                <option value="">Select</option>
                                                                <option value="RIS">RIS</option>
                                                                <option value="ICS">ICS</option>
                                                                <option value="PAR">PAR</option>
                                                            </select>
                                                        </td>
                                                        <td className="py-1">
                                                            <input type="text" name="item_name" list={('list-') + index} id="item_name"
                                                                onChange={handleChange(request.id)}
                                                                value={request.item_name}
                                                                className="w-100 block w-full rounded-lg border border-gray-300 bg-gray-50 px-1 text-sm text-gray-900"
                                                                placeholder="Ex. Alcohol" autoComplete="off" required />
                                                            <datalist id={('list-') + index}>
                                                                {itemlists && itemlists.map((item, index) => {
                                                                    return item.item_type === request.item_type && (<option key={index} value={item.item_name}>{item.item_name}</option>)
                                                                })}
                                                            </datalist>
                                                        </td>
                                                        <td className="p-1 flex justify-center items-center">
                                                            <input type="number" id="quantity" name="quantity"
                                                                onChange={handleChange(request.id)}
                                                                value={request.quantity}
                                                                autoComplete="off"
                                                                className="mr-1 block w-14 text-center rounded-lg border border-gray-300 bg-gray-50 px-1 text-sm text-gray-900"
                                                                placeholder="0" required />
                                                            <p className={(request.quantity > request.current_supply ? 'text-red-600' : 'text-green-600')}>
                                                                / {request.current_supply}
                                                            </p>
                                                        </td>
                                                        <td className="p-1 text-center">{request.unit_measurement || 'N/A'}</td>
                                                        <td className="p-1 text-center">{request.total_cost || 0}</td>
                                                        <td className="py-1 pr-2">
                                                            <div className="flex items-center justify-center">
                                                                <button type="button"
                                                                    onClick={() => deleteItem(request.id)}
                                                                    className="rounded bg-red-700 pr-0.5 text-center text-sm text-white hover:bg-red-800 focus:outline-none focus:ring-4">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none" viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                        stroke="currentColor"
                                                                        className="h-6 w-6">
                                                                        <path strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <div className="flex items-center mt-3">
                                            <button
                                                onClick={addItem}
                                                className="flex items-center rounded-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        fill="none" viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="h-6 w-6">
                                                        <path strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div className="mx-1 px-1 font-bold">Add
                                                    Item</div>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div
                                    className="mt-4 flex items-center justify-end space-x-2 rounded-b border-t border-black px-2 py-4">
                                    <button onClick={submit} type="button"
                                        className="rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-600">
                                        Submit
                                    </button>
                                    <button onClick={toggleModal} type="button"
                                        className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-600">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </>
    )
}

export default AddRequestModal