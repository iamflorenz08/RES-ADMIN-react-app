import { useState, useEffect } from "react";
const RequisitionTable = ({ requisitions, toggleModal }) => {
    const [sortedReq, setSortedReq] = useState([])
    const [sort, setSort] = useState('asc')

    useEffect(() => {
        setSortedReq(requisitions)
    }, [requisitions]);

    const sortDetails = (accessor) => {
        const sorted = [...sortedReq].sort((a, b) => {

            if (accessor === 'first_name') {
                a = a.user_id ? a.user_id.full_name[accessor].toUpperCase() : a.userDetails.full_name.toUpperCase()
                b = b.user_id ? b.user_id.full_name[accessor].toUpperCase() : b.userDetails.full_name.toUpperCase()
            }
            else if (accessor === 'position' || accessor === 'department') {
                a = a.user_id ? a.user_id[accessor] : a.userDetails[accessor]
                b = b.user_id ? b.user_id[accessor] : b.userDetails[accessor]
            }
            else if(accessor === 'createdAt' || accessor === 'status'){
                a = a[accessor]
                b = b[accessor]
            }


            if (sort === 'asc') {
                return a < b ? 1 : -1
            }
            else if (sort === 'desc') {
                return a > b ? 1 : -1
            }

            return 0
        })

        setSort(state => state === 'asc' ? 'desc' : 'asc')
        setSortedReq(sorted)
    }

    const convertDate = (dateString) =>{
        const date = new Date(dateString)
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
    }

    const convertTime = (dateString) =>{
        const date = new Date(dateString).toLocaleString([] ,{hour: 'numeric', minute: 'numeric', hour12:true})
        return date
    }

    return (
        <>
            <table className="w-full text-gray-900 shadow-lg">
                <thead>
                    <tr>
                        <th className="bg-blue-700 p-2 text-white">
                            <div className="flex items-center">
                                ID No.
                                <a href="/">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1 h-3 w-3" aria-hidden="true" fill="currentColor"
                                        viewBox="0 0 320 512">
                                        <path
                                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                    </svg>
                                </a>
                            </div>
                        </th>
                        <th className="bg-blue-700 p-2 text-left text-white">
                            <div className="flex items-center">
                                Name
                                <button
                                    onClick={() => sortDetails('first_name')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1 h-3 w-3" aria-hidden="true" fill="currentColor"
                                        viewBox="0 0 320 512">
                                        <path
                                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                    </svg>
                                </button>
                            </div>
                        </th>
                        <th className="bg-blue-700 p-2 text-left text-white">
                            <div className="flex items-center">
                                Position
                                <button
                                    onClick={() => sortDetails('position')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1 h-3 w-3" aria-hidden="true" fill="currentColor"
                                        viewBox="0 0 320 512">
                                        <path
                                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                    </svg>
                                </button>
                            </div>
                        </th>
                        <th className="bg-blue-700 p-2 text-left text-white">
                            <div className="flex items-center">
                                Faculty
                                <button
                                onClick={() => sortDetails('department')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1 h-3 w-3" aria-hidden="true" fill="currentColor"
                                        viewBox="0 0 320 512">
                                        <path
                                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                    </svg>
                                </button>
                            </div>
                        </th>

                        <th className="bg-blue-700 p-2 text-left text-white">
                            <div className="flex items-center">
                                Date
                                <button
                                 onClick={() => sortDetails('createdAt')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1 h-3 w-3" aria-hidden="true" fill="currentColor"
                                        viewBox="0 0 320 512">
                                        <path
                                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                    </svg>
                                </button>
                            </div>
                        </th>
                        <th className="bg-blue-700 p-2 text-left text-white">
                            <div className="flex items-center">
                                Status
                                <button
                                onClick={() => sortDetails('status')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1 h-3 w-3" aria-hidden="true" fill="currentColor"
                                        viewBox="0 0 320 512">
                                        <path
                                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                    </svg>
                                </button>
                            </div>
                        </th>
                        <th className="bg-blue-700 p-2 text-left text-white"></th>
                    </tr>
                </thead>
                <tbody>
                    {sortedReq && sortedReq.map((requisition, index) => {
                        let user = null

                        if (requisition.user_id) {
                            user = requisition.user_id
                        }
                        else {
                            user = requisition.userDetails
                        }

                        return (
                            <tr key={index} className={(index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200') + " text-blue-900"}>
                                <td className="p-2 text-left">{user.id_no ||'Empty'}</td>
                                <td className="p-2 text-left">
                                    <div className="flex items-center">
                                        <div className="align-items-center flex">
                                            <img className="h-12 w-12 rounded-full object-cover"
                                                src={user.photo_URL || 'https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png'}
                                                alt="unsplash" />
                                            <div className="ml-3">
                                                <div className="text-gray-500">{user.full_name.first_name ? user.full_name.first_name + " " + user.full_name.last_name : user.full_name}</div>
                                                <div className="text-gray-500">{user.email || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-2 text-left">{user.position}</td>
                                <td className="p-2 text-left">{user.department}</td>
                                <td className="p-2 text-left">
                                    <div>{convertDate(requisition.createdAt)}</div>
                                    <div>{convertTime(requisition.createdAt)}</div>
                                </td>
                                <td className="p-3">
                                    {(() => {
                                        if (requisition.status === 'To be approved') {
                                            return (<span className="rounded-md bg-yellow-400 px-2 text-gray-50">To Be
                                                Approved</span>)
                                        }
                                        else if (requisition.status === 'On going') {
                                            return (<span className="rounded-md bg-green-400 px-2 text-gray-50">Ongoing</span>)
                                        }
                                    })()}
                                </td>
                                <td className="p-2 text-left">
                                    <button
                                        className="block rounded bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-900"
                                        type="button" onClick={() => toggleModal(requisition._id)}>
                                        VIEW DETAILS
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>


        </>
    )
}

export default RequisitionTable