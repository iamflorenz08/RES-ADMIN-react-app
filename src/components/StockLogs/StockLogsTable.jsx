const StockLogsTable = ({ stockLogs }) => {
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
            {stockLogs && stockLogs.map((stock, index) => {
                let user = null
                let full_name = null
                if (stock.user) {
                    user = stock.user
                    full_name = user.full_name.first_name + " " + user.full_name.last_name
                }
                else {
                    user = stock.userDetails
                    full_name = user.full_name
                }
                return (
                    <tr key={index} className={(index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200') + " text-blue-900"}>
                        <td className="p-2 text-left">{stock.requestItem.product_code}</td>
                        <td className="p-2 text-left">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor" className="mr-1 h-5 w-5">
                                    <path fillRule="evenodd"
                                        d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z"
                                        clipRule="evenodd" />
                                </svg>
                                {stock.requestItem.item_name}
                            </div>
                        </td>
                        <td className="p-2 text-left">{stock.requestItem.unit_measurement}</td>

                        <td className="p-2 text-left">{full_name}</td>
                        <td className="p-3">
                            <p>{convertDate(stock.requestID.createdAt)}</p>
                            <p>{convertTime(stock.requestID.createdAt)}</p>
                        </td>

                        <td className="p-2 text-left">
                            {stock.isReturned && stock.requestItem.item_type !== 'RIS' ?
                                (<>
                                    <p>{convertDate(stock.requestID.updatedAt)}</p>
                                    <p>{convertTime(stock.requestID.updatedAt)}</p>
                                </>)
                                : 'N/A'}
                        </td>
                        <td className="p-2 text-left">{stock.itemQuantity}</td>
                        <td className="p-2 text-left">{stock.remainingItem}</td>
                    </tr>
                )
            })}
        </>
    )
}

export default StockLogsTable