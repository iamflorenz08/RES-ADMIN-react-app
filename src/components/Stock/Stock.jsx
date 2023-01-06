import { useState, useEffect } from "react"
import axios from "axios"
import DeleteItem from "../Modals/DeleteItem"
import AddEditItem from "../Modals/AddEditItem"
import StockTable from "./StockTable"
import Loading from "../Loading"
import Filter from "../Filter"
import toast, { Toaster } from "react-hot-toast"

const Stock = ({ setActive }) => {
    const baseURL = process.env.REACT_APP_API
    const [filterType, setFilterType] = useState(null)
    const [addEditModal, setAddEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [stocks, setStocks] = useState(null)
    const [loading, setLoading] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)
    const [stockDetails, setStockDetails] = useState({
        item_type: "",
        product_code: "",
        photo_url: "",
        item_name: "",
        storage_no: "",
        category: "",
        current_supply: "",
        unit_measurement: "",
        source_of_fund: "",
        unit_cost: "",
        desc: ""
    })
    const [stockCount, setStockCount] = useState(0)
    const [rowStart, setRowStart] = useState(0)
    const [rowEnd, setRowEnd] = useState(0)
    const [page, setPage] = useState(1)
    const [pageLimit, setPageLimit] = useState(0)
    const row_limit = 10

    useEffect(() => {
        const loadTable = async () => {
            setLoading(true)
            const item_type = filterType && filterType.item_type && '&item_type=' + filterType.item_type
            const category =  filterType && filterType.category && '&category=' + filterType.category 
            const sort_by =   filterType && filterType.sort_by && '&sort_by=' + filterType.sort_by 
            const stocks = await axios.get(`${baseURL}/supply/details/${page}/${row_limit}?${item_type || ''}${category || ''}${sort_by || ''}`)
            const stock_count = await axios.get(`${baseURL}/supply/count?${item_type || ''}${category || ''}${sort_by || ''}`)
            const pageLimit = Math.ceil(stock_count.data.stock_count / row_limit)
            const rowStart = stocks.data.length > 0 ? ((page - 1) * row_limit) + 1 : 0
            const rowEnd = page >= pageLimit ? stock_count.data.stock_count : (rowStart + row_limit) - 1
            setStocks(stocks.data)
            setStockCount(stock_count.data.stock_count)
            setPageLimit(pageLimit)
            setRowStart(rowStart)
            setRowEnd(rowEnd)
            setLoading(false)
        }
        loadTable()
    }, [page, baseURL, refreshKey,filterType]);

    useEffect(() => {
        setActive(() => 'stock')
    }, [setActive]);

    const AddItem = () => {
        setStockDetails({
            item_type: "",
            product_code: "",
            photo_url: "",
            item_name: "",
            storage_no: "",
            category: "",
            current_supply: "",
            unit_measurement: "",
            source_of_fund: "",
            unit_cost: "",
            desc: ""
        })
        setAddEditModal(true)
    }

    const EditItem = async (id) => {
        const stock = await stocks.find(stock => { return id === stock._id })
        setStockDetails(stock)
        setAddEditModal(true)
    }

    const toggleDeleteModal = async (id) => {
        // const stock = await stocks.find(stock => { return id === stock._id })
        // setStockDetails(stock)
        setDeleteId(id)
        setDeleteModal(true)
    }

    const deleteStock = async () => {
        await axios.post(`${baseURL}/supply/delete?id=${deleteId}`)
    }
    
    const showToast = (isSuccess, message) => {
        if (isSuccess) {
            toast.success(message)
        }
        else {
            toast.error(message)
        }
    }

    const nextPage = () => {
        if (page >= pageLimit) return
        setPage(page => page + 1)
    }

    const prevPage = () => {
        if (page <= 1) return
        setPage(page => page - 1)
    }
    return (
        <>
            <Loading loading={loading} />
            {stocks && (
                <div className="grid grid-cols-1 grid-rows-1 gap-x-0 gap-y-0">
                    <div className="box col-start-1 col-end-4 row-start-1">
                        <div>
                            <div className="mx-4 mt-4 flex justify-between border-b-2 border-black bg-white shadow-lg">
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
                                    <Filter type={'stock'} filterType={filterType} setFilterType={setFilterType} />
                                </div>

                                {/* <!-- add item  button--> */}
                                <div className="flex items-center">
                                    <div className="rounded-full hover:bg-black hover:text-white">
                                        <button onClick={() => setRefreshKey(key => key + 1)} className="flex">
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
                                    <button
                                        onClick={AddItem}
                                        className="mx-4 block rounded-full bg-green-500 px-2 text-center text-white hover:bg-green-300 focus:outline-none focus:ring-4 focus:ring-green-300"
                                        type="button" >
                                        Add Item
                                    </button>
                                </div>
                            </div>

                            {/* <!-- stocks table--> */}
                            <div className="mx-4">
                                <StockTable stocks={stocks} toggleAddEditModal={EditItem} toggleDeleteModal={toggleDeleteModal} />  
                                {/*<!-- add edit items --> */}
                                <AddEditItem
                                    show={addEditModal}
                                    toggleModal={() => setAddEditModal(false)}
                                    stock={stockDetails}
                                    setStockDetails={setStockDetails}
                                    setRefreshKey={setRefreshKey} 
                                    showToast={showToast}/>
                                {/* <!-- add edit end -->

                            <!-- delete item modal --> */}
                                <DeleteItem
                                    show={deleteModal}
                                    toggleModal={() => setDeleteModal(false)}
                                    stockDetails={stockDetails}
                                    deleteStock={deleteStock}
                                    setRefreshKey={setRefreshKey} />
                                {/* <!-- delete end --> */}

                                <div className="mx-6 mt-2 mb-1 flex items-center justify-between">
                                    {/* <!-- Help text --> */}
                                    <span className="text-sm text-gray-700 dark:text-gray-400">
                                        Showing
                                        <span className="font-bold text-gray-900 dark:text-gray-900"> {rowStart} - {rowEnd} </span>
                                        out of
                                        <span className="font-bold text-gray-900 dark:text-gray-900"> {stockCount} </span>
                                        Results
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
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{
                    success: {
                        duration: 8000
                    }
                }} />

        </>
    )
}

export default Stock