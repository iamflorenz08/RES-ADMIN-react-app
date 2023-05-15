import { useState, useEffect } from "react"
import ViewDetailModal from "../Modals/ViewDetailModal";
const RequisitionTable = ({ requisitions, setRefreshTable }) => {
    const [modal, setToggleModal] = useState(false);
    const [modalDetails, setModalDetails] = useState('')

    const [sort, setSort] = useState('asc')
    const [sortedRequisitions, setSortedRequisitions] = useState([])

    useEffect(() => {
        setSortedRequisitions(requisitions)
    }, [requisitions]);

    const sortDetails = (accessor) => {
        const sorted = [...sortedRequisitions].sort((a, b) => {


            if (accessor === 'first_name') {
                a = a.user_id.full_name[accessor].toUpperCase()
                b = b.user_id.full_name[accessor].toUpperCase()
            }
            else if (accessor === 'position' || accessor === 'department') {
                a = a.user_id[accessor]
                b = b.user_id[accessor]
            }


            if (sort === 'asc') {
                return a < b ? 1 : -1
            }

            if (sort === 'desc') {
                return a > b ? 1 : -1
            }

            return 0
        })

        setSort(state => state === 'asc' ? 'desc' : 'asc')
        setSortedRequisitions(sorted)
    }

    const toggleModal = (id) => {
        setModalDetails(() => requisitions.find(requisition => {
            return requisition._id === id
        }))
        setToggleModal(true)
    }


    return (
        <>
            <table className="border-grey-50 w-full text-gray-900 shadow-lg overflow-auto">
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-3 w-3"
                                        aria-hidden="true" fill="currentColor"
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
                        <th className="bg-blue-700 p-2 text-left text-white">Status</th>
                        <th className="bg-blue-700 p-2 text-left text-white"></th>
                    </tr>
                </thead>
                <tbody>

                    {sortedRequisitions && sortedRequisitions.map((requisition, index) => (
                        <tr key={index} className={(index % 2 === 0 ? "bg-blue-100" : "bg-blue-200") + " text-blue-900"}>
                            <td className="p-2 text-left">{requisition.user_id.id_no || 'Empty'}</td>
                            <td className="p-2 text-left">
                                <div className="flex items-center">
                                    <div className="align-items-center flex">
                                        <img className="h-12 w-12 rounded-full object-cover"
                                            src={requisition.user_id.photo_URL || 'https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png'}
                                            alt="unsplash" />
                                        <div className="ml-3">
                                            <div className="text-gray-500">{requisition.user_id.full_name.first_name} {requisition.user_id.full_name.last_name}</div>
                                            <div className="text-gray-500">{requisition.user_id.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-2 text-left">{requisition.user_id.position}</td>
                            <td className="p-2 text-left">{requisition.user_id.department}</td>
                            <td className="p-2 text-left">
                                <span className="rounded-md bg-yellow-400 px-2 text-gray-50">To Be
                                    Approved</span>
                            </td>
                            <td className="p-2 text-left">
                                {/* <!-- view details btn --> */}
                                <button
                                    className="block rounded bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-900"
                                    type="button" onClick={() => toggleModal(requisition._id)}>
                                    View Request
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <ViewDetailModal
                show={modal}
                toggleModal={() => setToggleModal(false)}
                requisition={modalDetails}
                setRefreshTable={setRefreshTable} />
        </>
    )
}

export default RequisitionTable