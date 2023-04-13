import { useRef, useEffect, useState } from "react"
import { useReactToPrint } from "react-to-print"
import { IoPrintSharp } from 'react-icons/io5'
import axios from "axios"
const StockReport = () => {
    const baseURL = process.env.REACT_APP_API
    const [stocks, setStocks] = useState(null)
    const stock = useRef()

    useEffect(() => {
        const loadReport = async () => {
            let stocks = await axios.get(`${baseURL}/supply/none`)
            stocks = stocks.data
            setStocks(stocks)
        }
        loadReport()
    }, [baseURL]);
    const handlePrint = useReactToPrint({
        content: () => stock.current
    })

    const current_date = () =>{
        const date = new Date()
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    }

    console.log(stocks)
    return (
        <>
            <button className="flex items-center mx-5 mt-5 px-7 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg" onClick={handlePrint}>
                <IoPrintSharp className="mr-2" />
                Print
            </button>
            <div className="flex justify-center bg-red-200 m-5">
                <div ref={stock} className="w-full bg-white p-5 h-full">
                    <div className="flex-row text-center">
                        <p className="text-3xl">Certificate of Non-Availability of Stocks</p>
                        <p className="text-2xl">(CNAS)</p>
                        <p className="mt-5">As of {current_date()}</p>
                        <p className="mt-5 text-end">Total No. of Items: {stocks && stocks.length}</p>
                    </div>
                    <div className="min-w-[27.94cm] min-h-[21.59cm]">
                        <table className="w-full border">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="border">Product Code</th>
                                    <th className="border">Product Description</th>
                                    <th className="border">UOM</th>
                                    <th className="border">Price</th>
                                    <th className="border">Earliest Estimated Date of Availability</th>
                                </tr>
                            </thead>

                            <tbody>
                                {stocks && stocks.map((stock,index)=>(
                                    <tr key={index}>
                                        <td className="border">{stock.product_code}</td>
                                        <td className="border">{stock.item_name}</td>
                                        <td className="border">{stock.unit_measurement}</td>
                                        <td className="border">{stock.unit_cost}</td>
                                        <td contentEditable className="border"></td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>
                        <div>
                            <p className="italic font-bold">This is a computer generated document and it does not require signature.</p>
                            <p className="italic">Date Generated: {current_date()}</p>
                        </div>
                    </div>


                </div>
            </div>


        </>
    )
}

export default StockReport