
const ReqLogsTable = ({ logs, toggleModal }) => {
    const convertDate = (dateString) => {
        const date = new Date(dateString)
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
    }

    const convertTime = (dateString) => {
        const date = new Date(dateString).toLocaleString([], { hour: 'numeric', minute: 'numeric', hour12: true })
        return date
    }

    return (
        <>
            {logs.map((log, index) => {
                let user = null
                let full_name = null
                if (log.user_id) {
                    user = log.user_id
                    full_name = user.full_name.first_name + " " + user.full_name.last_name
                }
                else {
                    user = log.userDetails
                    full_name = user.full_name
                }

                return (
                    <tr key={index} className={(index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200') + " text-blue-900"}>
                        <td className="p-2 text-left">{user.id_no || 'Empty'}</td>
                        <td className="p-2 text-left">
                            <div className="flex items-center">
                                <div className="align-items-center flex">
                                    <img className="h-12 w-12 rounded-full object-cover"
                                        src={user.photo_URL ? user.photo_URL : 'https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png'}
                                        alt="unsplash" />
                                    <div className="ml-3">
                                        <div className="text-gray-500">{full_name}</div>
                                        <div className="text-gray-500">{user.email || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="p-2 text-left">
                            <p>{convertDate(log.createdAt)}</p>
                            <p>{convertTime(log.createdAt)}</p>
                        </td>
                        <td className="p-2 text-left">
                            {log.status === 'Completed' ?
                                (<>
                                    <p>{convertDate(log.updatedAt)}</p>
                                    <p>{convertTime(log.updatedAt)}</p>
                                </>)
                                : 'N/A'}
                        </td>
                        <td className="p-2 text-left">{user.mobile_number}</td>
                        <td className="p-3">
                            {log.status === 'Completed' && (
                                <span className="rounded-md bg-green-400 px-2 text-gray-50">
                                    Completed
                                </span>
                            )}

                            {log.status === 'Rejected' && (
                                <span className="rounded-md bg-red-400 px-2 text-gray-50">
                                    Rejected
                                </span>
                            )}
                        </td>
                        <td className="p-2 text-left">
                            {/* <!-- Modal toggle --> */}
                            <button
                                className="block rounded bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-900"
                                type="button" onClick={() => toggleModal(log._id)}>
                                VIEW DETAILS
                            </button>
                        </td>
                    </tr>
                )
            })}

        </>
    )
}

export default ReqLogsTable