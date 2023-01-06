const EmployeeTable = ({ employees, toggleModal }) => {
    const convertDate = (dateString) =>{
        const date = new Date(dateString)
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
    }

    
    return (
        <>
            {employees.map((employee, index) => (
                <tr key={index} className={(index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200') + " text-blue-900"}>
                    <td className="p-2 text-left">{employee.id_no || 'Empty'}</td>
                    <td className="p-2 text-left">
                        <div className="align-items-center flex">
                            <img className="h-12 w-12 rounded-full object-cover"
                                src={employee.photo_URL || 'https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png'}
                                alt="unsplash" />
                            <div className="ml-3">
                                <div className="text-gray-500"> {employee.full_name.first_name} {employee.full_name.last_name}</div>
                                <div className="text-gray-500">{employee.email}</div>
                            </div>
                        </div>
                    </td>
                    <td className="p-2 text-left">{employee.position}</td>
                    <td className="p-2 text-left">{employee.department}</td>
                    <td className="p-2 text-left">
                        {employee.isApproved ? (
                            <span
                                className="bg-green-500 px-1 py-0.5 rounded-lg text-sm text-white font-semibold">
                                ALLOWED
                            </span>
                        ) : (
                            <span
                                className="bg-red-500 text-sm text-white px-1 py-0.5 rounded-lg font-semibold">
                                NOT ALLOWED
                            </span>
                        )}



                    </td>
                    <td className="p-2 text-left">{convertDate(employee.createdAt)}</td>
                    <td className="p-2 text-left">
                        {/* <!-- EDIT btn --> */}
                        <button type="button"
                            onClick={() => toggleModal(employee._id)}
                            className="mr-2 mb-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Edit
                        </button>
                        {/* <!-- DELETE btn --> */}
                        <button type="button" data-modal-toggle="employ-del"
                            className="mr-2 mb-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default EmployeeTable