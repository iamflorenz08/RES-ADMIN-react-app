const EditEmployee = ({ show, toggleModal, employee, setEmployeeInfo,save }) => {
    const handleChange = (e) => {
        let value = e.target.value
        if(e.target.name === 'isApproved'){
            if(e.target.value === 'true')
                value = true
            else 
                value = false
        }
        setEmployeeInfo({ ...employee, [e.target.name]: value })
    }
    console.log(employee)
    return (
        <>
            {show && (
                <div id="employ-edit" tabIndex="-1" aria-hidden="true"
                    className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden p-4 flex justify-center items-center">
                    <div className="relative h-full w-full max-w-2xl md:h-auto">

                        <div className="fixed inset-0 bg-black z-auto opacity-75" onClick={toggleModal}>
                        </div>

                        {/* <!-- Modal content --> */}
                        <div className="relative rounded-lg bg-white shadow">
                            <div className="p-6">
                                <form className=" " action="#">
                                    <h3 className="text-xl font-bold text-black">Edit Employee</h3>
                                    <div className="flex space-x-2">
                                        <div
                                            className="grid h-full w-full grid-cols-2 grid-rows-4 gap-0 overflow-hidden">
                                            <div
                                                className="box col-span-2 col-start-1 row-start-1 row-end-1">
                                                <div>
                                                    <label htmlFor="employeeName"
                                                        className="my-2 block text-sm font-medium text-gray-900">
                                                        Employee Name </label>
                                                    <input type="name" name="employeeName"
                                                        value={employee.full_name.first_name + " " + employee.full_name.last_name}
                                                        id="employ-edit"
                                                        readOnly
                                                        className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                        placeholder="John Doe" required />
                                                </div>
                                            </div>
                                            <div
                                                className="box col-span-2 col-start-1 row-start-2 row-end-2">
                                                <div>
                                                    <label htmlFor="mobile_number"
                                                        className="mb-2 block text-sm font-medium text-gray-900">
                                                        Mobile Number (Optional) </label>
                                                    <input type="tel" name="mobile_number"
                                                        value={employee.mobile_number}
                                                        onChange={handleChange}
                                                        id="mobile_number" placeholder="09876543219"
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                        required />
                                                </div>
                                            </div>
                                            <div
                                                className="box col-start-1 col-end-1 row-start-3 row-end-3">
                                                <div>
                                                    <label htmlFor="position"
                                                        className="mb-2 block text-sm font-medium text-gray-900">
                                                        Position </label>
                                                    <input type="text" id="position"
                                                        name="position"
                                                        value={employee.position}
                                                        onChange={handleChange}
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                        required>
                                                    </input>
                                                </div>
                                            </div>
                                            <div
                                                className="box col-start-2 col-end-2 row-start-3 row-end-3">
                                                <div className="ml-2">
                                                    <label htmlFor="department"
                                                        className="mb-2 block text-sm font-medium text-gray-900">
                                                        Faculty </label>
                                                    <select id="department"
                                                        name="department"
                                                        value={employee.department}
                                                        onChange={handleChange}
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                        required>
                                                        <option value="Kinder">Kinder</option>
                                                        <option value="Grade 1">Grade 1</option>
                                                        <option value="Grade 2">Grade 2</option>
                                                        <option value="Grade 3">Grade 3</option>
                                                        <option value="Grade 4">Grade 4</option>
                                                        <option value="Grade 5">Grade 5</option>
                                                        <option value="Grade 6">Grade 6</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div
                                                className="box col-span-2 col-start-1 row-start-4 row-end-4 -mt-2.5">
                                                <label htmlFor="faculty"
                                                    className="mb-2 block text-sm font-medium text-gray-900">
                                                    Whitelist </label>
                                                <div className="flex">
                                                    <label className="cursor-pointer">
                                                        <input type="radio" className="peer sr-only"
                                                            name="isApproved" id="allowed" 
                                                            defaultChecked={employee.isApproved && true}
                                                            onChange={handleChange}
                                                            value="true"/>
                                                        <div
                                                            className="mx-2 space-x-2 rounded-lg border-2 border-green-600 bg-white p-2 text-black ring-2 ring-transparent transition-all hover:shadow peer-checked:bg-green-600 peer-checked:text-white peer-checked:ring-green-600">
                                                            <p>
                                                                <span className="font-bold">
                                                                    Allow
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </label>
                                                    <label className="cursor-pointer">
                                                        <input type="radio" className="peer sr-only"
                                                            name="isApproved" id="notallowed"
                                                            defaultChecked={!employee.isApproved && true}
                                                            onChange={handleChange}
                                                            value="false"/>
                                                        <div
                                                            className="mx-2 space-x-2 rounded-lg border-2 border-red-600 bg-white p-2 text-black ring-2 ring-transparent transition-all hover:shadow peer-checked:bg-red-600 peer-checked:text-white peer-checked:ring-red-600">
                                                            <p>
                                                                <span className="font-bold">
                                                                    Don't Allow
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="my-4">
                                            {/* <div className="ml-10 flex items-baseline justify-center bi bi-image-fill">
                                                <div className="flex items-baseline justify-center">
                                                    <svg className="h-auto w-56"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16" height="16" fill="currentColor"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
                                                    </svg>
                                                    <a href="/">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24" fill="currentColor"
                                                            className="h-6 w-6">
                                                            <path
                                                                d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                                            <path
                                                                d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center justify-between border-t border-black pt-4">
                                        <div>
                                            <span className="text-sm font-medium text-gray-900"> Date
                                                Created: {employee.createdAt} </span>
                                        </div>
                                        <div className="inline-flex">
                                            <button onClick={()=>save(employee._id)} type="button"
                                                className="mr-2 rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-600">
                                                Save
                                            </button>
                                            <button onClick={toggleModal} type="button"
                                                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-600">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default EditEmployee