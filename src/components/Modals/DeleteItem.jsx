import React from 'react'

const DeleteItem = ({ show, toggleModal, deleteStock, setRefreshKey }) => {
    const deleteItem = () => {
        deleteStock()
        setRefreshKey(key => key + 1)
        toggleModal()
    }
    return (
        <>
            {show && (
                <div id="stock-del" tabIndex="-1"
                    className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden p-4 flex justify-center items-center">

                    <div className="fixed inset-0 bg-black z-auto opacity-75" onClick={toggleModal}>
                    </div>
                    <div className="relative h-full w-full max-w-md md:h-auto">
                        <div className="relative rounded-lg bg-white shadow">
                            <div className="p-6 text-center">
                                <svg aria-hidden="true" className="mx-auto mb-4 h-14 w-14 text-gray-400"
                                    fill="none" stroke="black" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <h2 className="font-bold text-black">DELETE ITEM</h2>
                                <h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-700">
                                    Are you sure you want to delete this item?</h3>
                                <button onClick={deleteItem} type="button"
                                    className="mr-2 inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800">
                                    Yes, I'm sure
                                </button>
                                <button type="button"
                                    onClick={toggleModal}
                                    className="bg-red-700 rounded-lg border border-red-200 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-red-200 dark:border-red-500 dark:bg-red-700 dark:text-white dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-600">
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeleteItem