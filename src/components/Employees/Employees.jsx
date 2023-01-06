import axios from "axios";
import { useState, useEffect } from "react"
import EditEmployee from "../Modals/EditEmployee"
import EmployeeTable from "./EmployeeTable";
const Employees = ({ setActive }) => {
    const baseURL = process.env.REACT_APP_API
    const [editModal, setEditModal] = useState(false)
    const [employeeInfo, setEmployeeInfo] = useState({})
    const [employees, setEmployees] = useState([])
    const [employeeCount, setEmployeeCount] = useState(0)
    const [rowStart, setRowStart] = useState(0)
    const [rowEnd, setRowEnd] = useState(0)
    const [page, setPage] = useState(1)
    const [pageLimit, setPageLimit] = useState(0)
    const [refreshKey, setRefreshKey] = useState(0)
    const rowLimit = 10

    useEffect(() => {
        const loadEmployeeTable = async () => {
            let employees = await axios.get(`${baseURL}/users/${page}/${rowLimit}`)
            let employee_count = await axios.get(`${baseURL}/user/count`)
            employees = employees.data
            employee_count = employee_count.data.user_count
            const pageLimit = Math.ceil(employee_count / rowLimit)
            const rowStart = ((page - 1) * rowLimit) + 1
            const rowEnd = page >= pageLimit ? employee_count : (rowStart + rowLimit) - 1

            setEmployees(employees)
            setEmployeeCount(employee_count)
            setPageLimit(pageLimit)
            setRowStart(rowStart)
            setRowEnd(rowEnd)
        }

        loadEmployeeTable()
    }, [page, baseURL, refreshKey])

    useEffect(() => {
        setActive(() => 'employees')
    }, [setActive]);

    const EditModal = (id) => {
        setEmployeeInfo(() => employees.find(employee => { return id === employee._id }))
        setEditModal(true)
    }

    const save = async(id) => {
        await axios.post(`${baseURL}/user/edit`, employeeInfo)
        setRefreshKey(key=> key + 1)
        setEditModal(false)
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
            <div>
                <div className="mx-4 mt-4">
                    <div className="grid grid-cols-1 grid-rows-1 gap-x-0 gap-y-0 overflow-hidden">
                        <div className="box col-start-1 col-end-4 row-start-1">
                            <div>
                                <div className="x-4 flex justify-between border-b-2 border-black bg-white shadow-lg">
                                    <div className="flex items-center">
                                        <svg className="mx-2 h-10 w-10 rounded p-2 bi bi-people-fill" xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                        </svg>

                                        <h2 className="font-bold">Employees</h2>
                                    </div>
                                </div>

                                {/* <!-- table --> */}
                                <div>
                                    <table className="w-full bg-white text-gray-900 shadow-lg">
                                        <thead>
                                            <tr>
                                                <th className="bg-blue-700 px-2 text-white">
                                                    <div className="flex items-center">
                                                        ID No.
                                                        <a href="/">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                className="ml-1 h-3 w-3" aria-hidden="true"
                                                                fill="currentColor" viewBox="0 0 320 512">
                                                                <path
                                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </th>
                                                <th className="bg-blue-700 py-2 pl-10 text-left text-white">
                                                    <div className="flex items-center">
                                                        Name
                                                        <a href="/">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                className="ml-1 h-3 w-3" aria-hidden="true"
                                                                fill="currentColor" viewBox="0 0 320 512">
                                                                <path
                                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </th>
                                                <th className="bg-blue-700 p-2 text-left text-white">
                                                    <div className="flex items-center">
                                                        Position
                                                        <a href="/">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                className="ml-1 h-3 w-3" aria-hidden="true"
                                                                fill="currentColor" viewBox="0 0 320 512">
                                                                <path
                                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </th>
                                                <th className="bg-blue-700 p-2 text-left text-white">
                                                    <div className="flex items-center">
                                                        Faculty
                                                        <a href="/">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                className="ml-1 h-3 w-3" aria-hidden="true"
                                                                fill="currentColor" viewBox="0 0 320 512">
                                                                <path
                                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </th>
                                                <th className="bg-blue-700 p-2 text-left text-white">
                                                    <div className="flex items-center">
                                                        Whitelist
                                                        <a href="/">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                className="ml-1 h-3 w-3" aria-hidden="true"
                                                                fill="currentColor" viewBox="0 0 320 512">
                                                                <path
                                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </th>
                                                <th className="bg-blue-700 p-2 text-left text-white">
                                                    <div className="flex items-center">
                                                        Joined
                                                        <a href="/">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                className="ml-1 h-3 w-3" aria-hidden="true"
                                                                fill="currentColor" viewBox="0 0 320 512">
                                                                <path
                                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </th>
                                                <th className="bg-blue-700 p-2 text-left text-white"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <EmployeeTable employees={employees} toggleModal={EditModal} />
                                        </tbody>
                                    </table>

                                    {/* <!-- MODAL AREA -->

                                    <!-- Edit modal --> */}
                                    <EditEmployee
                                        show={editModal}
                                        toggleModal={() => setEditModal(false)}
                                        employee={employeeInfo}
                                        setEmployeeInfo={setEmployeeInfo} 
                                        save={save}/>
                                    {/* <!-- modal end -->

                                    <!-- Delete modal --> */}

                                </div>
                            </div>
                            {/* <!-- modal end -->

                            <!-- pagination --> */}
                            <div className="mx-6 mt-2 mb-1 flex items-center justify-between">
                                {/* <!-- Help text --> */}
                                <span className="text-sm text-gray-700 dark:text-gray-400">
                                    Showing
                                    <span className="font-bold text-gray-900 dark:text-gray-900"> {rowStart} - {rowEnd} </span>
                                    out of
                                    <span className="font-bold text-gray-900 dark:text-gray-900"> {employeeCount} </span>
                                    Employees
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
        </>
    )
}

export default Employees