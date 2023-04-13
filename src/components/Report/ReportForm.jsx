const ReportForm = ({ title, requisition, items }) => {
    console.log(requisition)
    const formatDate = (strDate) => {
        const date = new Date(strDate)

        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    }
    return (
        <>
            <div className='bg-gray-200 flex justify-center'>
                <div className="w-[65cm] bg-white p-5">
                    <div className="flex flex-col font-bold  ">
                        <h2 className="text-lg text-center mt-5 mb-6">{title}</h2>

                        <div className="flex justify-between font-semibold">
                            <div>
                                <h4 className="text-lefts font-semibold">Entity: RIZAL ELEMENTARY SCHOOL</h4>
                            </div>
                            <div className="text-right">
                                <h4>DATE: {formatDate(requisition.createdAt)}</h4>
                            </div>
                        </div>
                    </div>
                    <table className="w-full border border-solid border-black">
                        <thead className='border border-solid border-black'>
                            <tr className='border border-solid border-black'>
                                <th className="w-[60px] border border-solid border-black" rowSpan="2">Quantity</th>
                                <th className="w-[50px] border border-solid border-black" rowSpan="2">Unit</th>
                                <th className="border border-solid border-black" colSpan="2">Amount</th>
                                <th className="w-[100px] border border-solid border-black" rowSpan="2">Description</th>
                                <th className="w-[135px] border border-solid border-black" rowSpan="2">Inventory Item No.</th>
                                <th className="w-[70px] border border-solid border-black" rowSpan="2">Estimated Useful Life</th>
                            </tr>
                            <tr>
                                <th className="w-[90px]">Unit Cost</th>
                                <th className="w-[90px]">Total Cost</th>
                            </tr>
                        </thead>
                        <tbody className='border border-solid border-black'>

                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-center align-top border-r border-black pb-5">{item.quantity}</td>
                                    <td className="text-center align-top border-r border-black">{item.unit_measurement}</td>
                                    <td className="text-center align-top border-r border-black">{item.total_cost / item.quantity}</td>
                                    <td className="text-center align-top border-r border-black">{item.total_cost}</td>
                                    <td className="align-top border-r border-black">{item.item_name}</td>
                                    <td className="align-top text-center border-r border-black">{item.product_code}</td>
                                    <td className="text-center border-r border-black"></td>
                                </tr>
                            ))}


                            <tr className='border border-solid border-black'>
                                <td className="h-[150px] border border-solid border-black align-top" colSpan="4">
                                    Received from:
                                </td>
                                <td className="h-[150px] border border-solid border-black align-top" colSpan="4">
                                    Received by:
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}

export default ReportForm