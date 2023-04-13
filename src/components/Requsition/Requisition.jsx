import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ViewDetailModal from "../Modals/ViewDetailModal";
import RequisitionTable from "./RequisitionTable";
import AddRequestModal from "../Modals/AddRequestModal";
import Filter from "../Filter";
import Loading from "../Loading";
import toast, { Toaster } from "react-hot-toast"

const Requisition = ({ setActive }) => {
    document.title = "Requisition"
    const [modal, setToggleModal] = useState(false)
    const [modalAdd, setToggleModalAdd] = useState(false)
    const [modalDetails, setModalDetails] = useState('')
    const [requisitions, setRequisitions] = useState(null)
    const [current_page, setPage] = useState(1)
    const [total_request, setTotalRequest] = useState(1)
    const [refreshKey, setRefreshKey] = useState(0)
    const [filterType, setFilterType] = useState(null)
    const [loading, setLoading] = useState(false)
    const row_start = useRef(0)
    const row_end = useRef(0)
    const row_limit = 10
    const baseURL = process.env.REACT_APP_API

    useEffect(() => {
        const loadDashboard = async () => {
            setLoading(true)
            const date = filterType && filterType.date && "&date=" + filterType.date
            const status = filterType && filterType.status && "&status=" + filterType.status
            const sort_by = filterType && filterType.sort_by && "&sort_by=" + filterType.sort_by
            const search = filterType && filterType.search && "&search=" + filterType.search
            const requisitions = await axios.get(`${baseURL}/requisition/page/${current_page}/${row_limit}?type=requisition${date || ''}${status || ''}${sort_by || ''}${search || ''}`)
            const total_request = await axios.get(`${baseURL}/requisition/count?type=requisition${date || ''}${status || ''}${sort_by || ''}${search || ''}`)
            setRequisitions(requisitions.data)
            setTotalRequest(total_request.data.count)
            const limit = Math.ceil(total_request.data.count / row_limit)
            row_start.current = requisitions.data.length > 0 ? ((current_page - 1) * row_limit) + 1 : 0
            row_end.current = current_page >= limit ? total_request.data.count : (row_start.current + row_limit) - 1
            setLoading(false)
        }

        loadDashboard()
    }, [current_page, refreshKey, baseURL, filterType])

    useEffect(() => {
        setActive(() => 'requisition')
    }, [setActive]);

    const showToast = (isSuccess, message) => {
        if (isSuccess) {
            toast.success(message)
            setRefreshKey(key => key + 1)
            setToggleModalAdd(false)
        }
        else {
            toast.error(message)
        }
    }

    const nextPage = () => {
        const limit = Math.ceil(total_request / row_limit)
        if (current_page >= limit) return
        setPage(page => page + 1)
    }

    const prevPage = () => {
        if (current_page <= 1) return
        setPage(page => page - 1)
    }

    const toggleModal = (id) => {
        setModalDetails(requisitions.find(requisition => {
            return requisition._id === id
        }))
        setToggleModal(true)
    }

    const search = (e) => {
        e.preventDefault()
        setFilterType(state=> ({...state, search: e.target[0].value}))
        
    }
    return (
        <>
            <Loading loading={loading} />
            {requisitions && (
                <div className="grid grid-cols-1 grid-rows-1 gap-x-0 gap-y-0">
                    {/* <!-- requisition --> */}
                    <div className="box col-start-1 col-end-4 row-start-1">
                        <div>
                            <div className="mx-4 mt-4 flex items-center justify-between border-b-2 border-black bg-white">
                                <div className="flex items-center">
                                    <svg className="mx-2 h-10 w-10 rounded p-2 bi bi-book-half" xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                                    </svg>

                                    <h2 className="font-bold">Requisition</h2>
                                    <form onSubmit={search} className="ml-10 flex items-center">
                                        <label htmlFor="default-search"
                                            className="sr-only text-sm font-medium text-gray-900">Search</label>
                                        <input
                                            type="search" id="default-search"
                                            className="h-8 w-[250px] rounded-full border border-gray-500 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none"
                                            placeholder="Search ID..." />
                                    </form>
                                    <Filter filterType={filterType} setFilterType={setFilterType} type={'requisition'} />
                                </div>

                                {/* <!-- add request button --> */}
                                <div className="mx-2 flex items-center">
                                    <div className="rounded-full hover:bg-black hover:text-white flex justify-center items-center">
                                        <button onClick={() => setRefreshKey(key => key + 1)}>
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
                                        onClick={() => setToggleModalAdd(true)}
                                        className="mx-2 block rounded-full bg-green-500 px-2 text-center text-white hover:bg-green-300 focus:outline-none focus:ring-4 focus:ring-green-300"
                                        type="button" data-modal-toggle="addRequest">
                                        Add Request
                                    </button>
                                </div>
                            </div>

                            {/* <!-- requisition table --> */}
                            <div className="mx-4">
                                <div>
                                    <RequisitionTable requisitions={requisitions} toggleModal={toggleModal} />
                                    {requisitions && requisitions.length <= 0 && (
                                        <div className="flex justify-center items-center h-80">
                                            Empty
                                        </div>
                                    )}
                                </div>

                                {/* <!-- MODAL AREA  -->
                            <!-- ADD REQUEST MODAL --> */}

                                <AddRequestModal show={modalAdd} toggleModal={() => setToggleModalAdd(false)} showToast={showToast} />
                                <ViewDetailModal show={modal} toggleModal={() => setToggleModal(false)} requisition={modalDetails} setRefreshTable={setRefreshKey} />

                                {/*<!-- PAGINATIONS --> */}
                                {requisitions.length > 0 && (
                                    <div className="bg-grey-50 mx-6 mt-2 mb-1 flex justify-between items-center">
                                        {/* <!-- Help text --> */}
                                        <span className="text-sm text-gray-700 dark:text-gray-400">
                                            Showing
                                            <span className="font-bold text-gray-900 dark:text-gray-900"> {row_start.current} - {row_end.current} </span>
                                            out of
                                            <span className="font-bold text-gray-900 dark:text-gray-900"> {total_request} </span>
                                            Requests
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

export default Requisition