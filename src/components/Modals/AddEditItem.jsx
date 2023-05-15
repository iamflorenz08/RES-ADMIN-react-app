import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { FaEdit } from "react-icons/fa"
import Compressor from "compressorjs";
import axios from "axios";

const AddEditItem = ({ show, toggleModal, stock, setRefreshKey, showToast }) => {
    const baseURL = process.env.REACT_APP_API
    const [stockDetails, setStockDetails] = useState({})

    useEffect(() => {
        setStockDetails(stock)
    }, [show, stock]);

    const handleChange = (e) => {
        let value = e.target.value
        let total_cost = 0
        if (e.target.name === 'current_supply') value = parseInt(value) || 0
        else if (e.target.name === 'unit_cost') value = parseFloat(value) || 0
        if (stockDetails) {
            total_cost = stockDetails.current_supply * stockDetails.unit_cost
        }
        setStockDetails({ ...stockDetails, [e.target.name]: value, total_cost })
    }

    const handleChangeUnitCost = (e) => {
        const rawValue = e.target.value.replace(/[^0-9.]/g, '');
        setStockDetails({ ...stockDetails, unit_cost: rawValue });
    }

    const handleImageChange = (e) => {
        if (!e.target.files[0]) return
        const image_file = e.target.files[0]
        const file_name = new Date().getTime() + "_" + image_file.name

        new Compressor(image_file, {
            quality: 0.8,
            success(compressedImage) {
                const storageRef = ref(storage, `stock_photos/${file_name}`)
                uploadBytes(storageRef, compressedImage).then(() => {
                    getDownloadURL(storageRef).then((url) => {
                        setStockDetails({ ...stockDetails, photo_url: url })
                    })
                        .catch(error => {
                            console.log(error)
                        })
                })
                    .catch(error => {
                        console.log(error)
                    })
            }
        })

    }

    console.log(stockDetails)

    const addStock = async () => {
        for (let stockKey in stockDetails) {
            if (!stockDetails[stockKey]) {
                showToast(false, "Stock details must not be empty.")
                return
            }
        }
        await axios.post(`${baseURL}/supply/add`, stockDetails)
        toggleModal()
        setRefreshKey(key => key + 1)
        showToast(true, "Stock added")
    }

    const editStock = async () => {
        for (let stockKey in stockDetails) {
            if (stockDetails[stockKey] === '') {
                showToast(false, "Stock details must not be empty.")
                return
            }
        }
        await axios.post(`${baseURL}/supply/edit`, stockDetails)
        toggleModal()
        setRefreshKey(key => key + 1)
        showToast(true, "Stock saved")
    }

    return (
        <>
            {show && (
                <div id="stock-edit" tabIndex="-1" aria-hidden="true"
                    className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden p-4 flex justify-center items-center">
                    <div className="relative h-full w-full max-w-4xl md:h-auto">

                        <div className="fixed inset-0 bg-black z-auto opacity-75" onClick={toggleModal}>
                        </div>


                        <div className="relative rounded-lg bg-white shadow">
                            <div className="ml-4 mt-4 px-6 pt-6">
                                <form action="">
                                    <div
                                        className="grid h-full w-full grid-cols-2 grid-rows-1 gap-2 overflow-hidden">
                                        <div className="box col-start-1 col-end-1 row-start-1 row-end-1">
                                            <div
                                                className="grid-rows-7 grid h-full w-full grid-cols-2 gap-0 overflow-hidden">
                                                <div
                                                    className="box col-span-2 col-start-1 row-start-1 row-end-1">
                                                    <h3 className="text-xl font-bold text-black">
                                                        {stock.item_name ? 'Edit Item' : 'Add Item'}

                                                    </h3>

                                                    <label htmlFor="itemType"
                                                        className="my-1 block text-sm font-medium text-gray-900">
                                                        Item Type </label>

                                                    <div className="my-2 flex justify-around">
                                                        <label className="cursor-pointer">
                                                            <input type="radio" className="peer sr-only"
                                                                name="item_type" id="ris"
                                                                checked={stockDetails.item_type === 'RIS'}
                                                                onChange={handleChange}
                                                                value="RIS" />
                                                            <div
                                                                className="mx-2 rounded-lg border-2 border-blue-600 bg-white px-4 py-1 text-black ring-2 ring-transparent transition-all hover:shadow  peer-checked:text-white peer-checked:ring-blue-600 peer-checked:bg-blue-600 ">
                                                                <p><span className="font-bold">RIS</span>
                                                                </p>
                                                            </div>
                                                        </label>
                                                        <label className="cursor-pointer">
                                                            <input type="radio" className="peer sr-only"
                                                                name="item_type" id="ics"
                                                                checked={stockDetails.item_type === 'ICS'}
                                                                onChange={handleChange}
                                                                value="ICS" />
                                                            <div
                                                                className="mx-2 rounded-lg border-2 border-blue-600 bg-white  px-4 py-1 text-black ring-2 ring-transparent transition-all hover:shadow  peer-checked:text-white peer-checked:ring-blue-600 peer-checked:bg-blue-600 ">
                                                                <p><span className="font-bold">ICS</span>
                                                                </p>
                                                            </div>
                                                        </label>
                                                        <label className="cursor-pointer">
                                                            <input type="radio" className="peer sr-only"
                                                                name="item_type" id="par"
                                                                checked={stockDetails.item_type === 'PAR'}
                                                                onChange={handleChange}
                                                                value="PAR" />
                                                            <div
                                                                className="mx-2 rounded-lg border-2 border-blue-600 bg-white  px-4 py-1 text-black ring-2 ring-transparent transition-all hover:shadow  peer-checked:text-white peer-checked:ring-blue-600 peer-checked:bg-blue-600 ">
                                                                <p><span className="font-bold">PAR</span>
                                                                </p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="box col-start-1 row-start-2 row-end-2">
                                                    <div className="mt-1.5 flex items-center">
                                                        <select id="item_code_type"
                                                            name="item_code_type"
                                                            value={stockDetails.item_code_type}
                                                            onChange={handleChange}
                                                            className="block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-semibold text-black placeholder-transparent focus:border-black focus:ring-black">
                                                            <option value="PropertyNo">Property No.</option>
                                                            <option value="StockNo">Stock No.</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="box col-start-2 row-start-2 row-end-2">
                                                    <div
                                                        className="mt-1.5 flex w-full items-center justify-center">
                                                        <input type="text" name="product_code"
                                                            id="product_code"
                                                            className="block w-full rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                            placeholder="12345678-AC-ASV" value={stockDetails.product_code} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                                <div
                                                    className="box col-span-2 col-start-1 row-start-3 row-end-3">
                                                    <div className="">
                                                        <label htmlFor="item_name"
                                                            className="my-1 block text-sm font-medium text-gray-900">
                                                            Item Name </label>
                                                        <input type="name" name="item_name" id="item_name"
                                                            className="w-100 my-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                            placeholder="Ex. Alcohol" required
                                                            value={stockDetails.item_name}
                                                            onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div
                                                    className="box col-start-1 col-end-1 row-start-4 row-end-4 mr-2">
                                                    <div>
                                                        <label htmlFor="storage_no"
                                                            className="my-1 block text-sm font-medium text-gray-900">
                                                            Storage No. </label>
                                                        <select id="storage_no"
                                                            name="storage_no"
                                                            value={stockDetails.storage_no}
                                                            onChange={handleChange}
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                                                            <option value="">Select</option>
                                                            <option value="1">Storage 1</option>
                                                            <option value="2">Storage 2</option>
                                                            <option value="3">Storage 3</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div
                                                    className="box col-start-2 col-end-2 row-start-4 row-end-4">
                                                    <div className="">
                                                        <label htmlFor="category "
                                                            className="my-1 block text-sm font-medium text-gray-900">
                                                            Category </label>
                                                        <select id="category"
                                                            name="category"
                                                            onChange={handleChange}
                                                            value={stockDetails.category}
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                                                            <option value="">Select</option>
                                                            <option value="Office Supplies">Office Supplies</option>
                                                            <option value="School Supplies">School Supplies</option>
                                                            <option value="Project Free">Project Free</option>
                                                            <option value="Equipment">Equipment</option>
                                                            <option value="Building Maintenance Materials">Building Maintenance Materials</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div
                                                    className="box col-start-1 col-end-1 row-start-5 row-end-5 mr-2">
                                                    <div>
                                                        <label htmlFor="current_supply"
                                                            className="my-1 block text-sm font-medium text-gray-900">
                                                            Quantity </label>
                                                        <input type="number" id="current_supply"
                                                            name="current_supply"
                                                            value={stockDetails.current_supply}
                                                            onChange={handleChange}
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                            placeholder="0" required />
                                                    </div>
                                                </div>

                                                <div
                                                    className="box col-start-2 col-end-2 row-start-5 row-end-5">

                                                    <label htmlFor="buffer"
                                                        className="my-1 block text-sm font-medium text-gray-900">
                                                        Buffer </label>
                                                    <input type="number" id="buffer"
                                                        name="buffer"
                                                        value={stockDetails.buffer}
                                                        onChange={handleChange}
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                        placeholder="0" required />


                                                </div>
                                                <div
                                                    className="box col-start-1 col-end-1 row-start-6 row-end-6 mr-2">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="unit_measurement"
                                                                className="my-1 block text-sm font-medium text-gray-900">
                                                                Unit of Measurement </label>
                                                            <select id="unit_measurement"
                                                                name="unit_measurement"
                                                                onChange={handleChange}
                                                                value={stockDetails.unit_measurement}
                                                                className="my-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                                                                <option value="">Select</option>
                                                                <option value="Gallon">bottle</option>
                                                                <option value="Can">gallon</option>
                                                                <option value="Box">piece</option>
                                                                <option value="pack">pack</option>
                                                                <option value="unit">unit</option>
                                                                <option value="can">can</option>
                                                                <option value="pouch">pouch</option>
                                                                <option value="bundle">bundle</option>
                                                                <option value="box">box</option>
                                                                <option value="roll">roll</option>
                                                                <option value="jar">jar</option>
                                                                <option value="tube">tube</option>
                                                                <option value="set">set</option>
                                                                <option value="pair">pair</option>
                                                                <option value="pad">pad</option>
                                                                <option value="ream">ream</option>
                                                                <option value="book">book</option>
                                                                <option value="cart">cart</option>
                                                                <option value="license">license</option>
                                                            </select>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div
                                                    className="box col-start-2 col-end-2 row-start-6 row-end-6">
                                                    <div>
                                                        <label htmlFor="source_of_fund"
                                                            className="my-1 block text-sm font-medium text-gray-900">
                                                            Source of Fund </label>
                                                        <select id="source_of_fund"
                                                            name="source_of_fund"
                                                            onChange={handleChange}
                                                            value={stockDetails.source_of_fund}
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                                                            <option value="">Select</option>
                                                            <option value="MOEE">MOEE</option>
                                                            <option value="National Fund">National Fund</option>
                                                            <option value="Local Fund">Local Fund</option>
                                                        </select>
                                                        {/* <label htmlFor="unit_cost"
                                                            className="my-1 block text-sm font-medium text-gray-900">
                                                            Unit Cost </label>
                                                        <input type="number" id="unit_cost"
                                                            name="unit_cost"
                                                            onChange={handleChange}
                                                            value={stockDetails.unit_cost}
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                            placeholder="999,999.00" required /> */}
                                                    </div>
                                                </div>
                                                <div className="flex py-4">
                                                    <h3 className="font-bold mr-2">Total Cost:</h3>
                                                    <p>₱ {(stockDetails.current_supply * stockDetails.unit_cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                </div>
                                                <div
                                                    className="box row-start-10 row-end-10 col-span-2 col-start-1">
                                                    <div>
                                                        <label htmlFor="desc"
                                                            className="my-1 block text-sm font-medium text-gray-900">
                                                            Brief Description </label>
                                                        <textarea
                                                            onChange={handleChange}
                                                            value={stockDetails.desc}
                                                            name="desc"
                                                            className="m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-black focus:bg-white focus:text-gray-700 focus:outline-none"
                                                            id="desc" rows="3"
                                                            placeholder="250 Characters..."></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box col-start-2 col-end-2 row-start-1 row-end-1">
                                            <div
                                                className="box col-start-2 col-end-2 row-start-1 row-end-1 ">
                                                <div
                                                    className="mt-10 relative h-56 flex justify-center">

                                                    <div className="p-2 w-56 flex justify-center">
                                                        {stockDetails.photo_url && (
                                                            <img className="h-full bg-cover" alt="product" src={stockDetails.photo_url} />
                                                        )}
                                                    </div>

                                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center">
                                                        <input id="choose_image" className="hidden" type="file" onChange={handleImageChange}></input>
                                                        <label htmlFor="choose_image" className={"group w-56 h-full flex justify-center items-center hover:bg-black hover:bg-opacity-20 rounded-lg hover:text-white cursor-pointer"}>
                                                            <FaEdit size={40} className={(stockDetails.photo_url && 'hidden') + " group-hover:block"} />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div
                                                    className="m-4 flex flex-col items-center justify-center p-4 text-center">
                                                    <h3 className="text-lg font-semibold">Unit Cost</h3>
                                                    <input
                                                        className='text-center text-3xl font-semibold p-0 outline-none border-none active:outline-none'
                                                        type="text"
                                                        onChange={handleChangeUnitCost}
                                                        value={"₱ " + (stockDetails.unit_cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>

                            <div
                                className="mx-4 mt-4 flex items-center justify-end space-x-2 rounded-b border-t border-gray-600 px-2 py-4">
                                {stock.item_name ? (
                                    <button onClick={editStock} type="button"
                                        className="rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-600">
                                        Save
                                    </button>
                                ) : (
                                    <button onClick={addStock} type="button"
                                        className="rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-600">
                                        Add
                                    </button>
                                )}

                                <button onClick={toggleModal} type="button"
                                    className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-600">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddEditItem