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
                                <div className="flex items-center">
                                    <img alt="stock" className="w-5 h-5 mr-5 object-contain" src={stock.requestItem.photo_url} />
                                    {stock.requestItem.item_name}
                                </div>
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