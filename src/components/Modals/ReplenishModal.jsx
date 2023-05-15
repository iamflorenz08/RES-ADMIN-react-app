import React, { useState, useEffect } from 'react'
import useAddSupply from '../CustomHooks/useAddSupply'
const BASE_URL = process.env.REACT_APP_API
const ReplenishModal = ({ setToggle, supply }) => {
    const [quantity, setQuantity] = useState('')
    const [payload, setPayload] = useState(null)
    const { isSucess, loading, setSuccess } = useAddSupply(`${BASE_URL}/api/v2/supply/add`, payload)

    const handleQuantity = (event) => {
        setQuantity(event.target.value)
    }

    const handleAddClick = () => {
        if (!quantity) return
        setPayload({
            _id: supply._id,
            quantity: quantity
        })
    }

    useEffect(() => {
        const success = () => {
            if(isSucess){
                setToggle(null)
                setSuccess(false)
                setQuantity('')
            }
        }

        success()
    }, [isSucess, setToggle, setSuccess]);

    return (
        supply && (
            <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">

                <div onClick={() => setToggle(null)} className="fixed bg-black opacity-75 w-full h-full top-0 -z-50">

                </div>

                <div className="px-[40px] py-[21px] bg-white">
                    <h1 className='font-bold text-[20px]'>Replenish Item</h1>
                    <div className="flex mt-[20px]">
                        <div className="ml-[35px] mr-[60px] flex-col items-center text-center ">
                            <img src="" alt="item_image" width={225} height={225} />
                            <h2 className='font-bold text-[14px]'>Unit Cost</h2>
                            <h4 className='font-bold text-[25px]'>₱ {(supply.unit_cost).toLocaleString()}</h4>
                        </div>
                        <div className="flex-col items-center ">
                            <h1 className="text-center font-bold text-[16px] mb-[16px]">{supply.item_name}</h1>
                            <div className="flex w-full">
                                <select id="item_code_type"
                                    value={supply.item_code_type}
                                    name="item_code_type" disabled>
                                    <option value="PropertyNo">Property No.</option>
                                    <option value="StockNo">Stock No.</option>
                                </select>
                                <input className="w-full" type="text" value={supply.product_code} readOnly />
                            </div>
                            <div className="flex justify-around gap-[20px]">
                                <div>
                                    <label className="block font-semibold" htmlFor="storage_no">Storage No.</label>
                                    <input type="text" id="storage_no" value={supply.storage_no} readOnly />
                                </div>
                                <div>
                                    <label className="block font-semibold" htmlFor="category">Category</label>
                                    <input type="text" id="category" value={supply.category} readOnly />
                                </div>
                            </div>
                            <div className="flex justify-around gap-[20px]">
                                <div>
                                    <label className="block font-semibold" htmlFor="quantity">Quantity</label>
                                    <input type="text" id="quantity" value={supply.current_supply} readOnly />
                                </div>
                                <div>
                                    <label className="block font-semibold" htmlFor="buffer">Buffer</label>
                                    <input type="text" id="buffer" value={supply.buffer} readOnly />
                                </div>
                            </div>
                            <div className="flex justify-around gap-[20px]">
                                <div>
                                    <label className="block font-semibold" htmlFor="unit_measurement">Unit of Measurement</label>
                                    <input type="text" id="unit_measurement" value={supply.unit_measurement} readOnly />
                                </div>
                                <div>
                                    <label className="block font-semibold" htmlFor="source_of_fund">Source of fund</label>
                                    <input type="text" id="source_of_fund" value={supply.source_of_fund} readOnly />
                                </div>
                            </div>

                            <div className="h-[1px] w-full bg-black my-[15px]"></div>
                            <div>
                                <label className="block font-semibold" htmlFor="new_supplies">No. of New Supplies</label>
                                <input type="number" id="new_supplies" value={quantity} onChange={handleQuantity} placeholder='0' />
                                <div className="flex">
                                    <h1 className='font-semibold'>New Supplies Total Cost:</h1>
                                    <h2 className='text-gray-400 ml-5 '>₱ {(supply.unit_cost * quantity).toLocaleString()}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[1px] w-full bg-black mt-[45px] mb-[12px]"></div>

                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={handleAddClick}
                            className="py-[7px] px-10 rounded-md bg-green-500 text-white hover:bg-green-600">
                            {loading ?
                                (<>
                                    Loading
                                </>) :
                                (<>
                                    Add
                                </>)}
                        </button>
                        <button
                            onClick={() => setToggle(null)}
                            className="py-[7px] px-10 rounded-md bg-red-600 text-white hover:bg-red-700">Cancel</button>
                    </div>
                </div>

            </div>

            
        )
    )
}

export default ReplenishModal