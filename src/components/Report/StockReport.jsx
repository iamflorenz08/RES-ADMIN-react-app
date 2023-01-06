import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
const StockReport = () => {
    const stock = useRef()

    const handlePrint = useReactToPrint({
        content: () => stock.current
    })
    return (
        <>
            <button onClick={handlePrint}>
                Print
            </button>
            <div className="flex justify-center">
                <div ref={stock} className="flex justify-center w-full">
                    <div className="flex justify-center bg-white p-5">
                        <table className="w-full border">
                            <tr>
                                <th className="border">Product Code</th>
                                <th className="border">Product Description</th>
                                <th className="border">UOM</th>
                                <th className="border">Price</th>
                                <th className="border">Earliest Estimated Date of Availability</th>
                            </tr>
                            <tr>
                                <td className="border">13111203-AC-F01</td>
                                <td className="border">ACETATE</td>
                                <td className="border">ROLL</td>
                                <td className="border">969.88</td>
                                <td className="border">31-Oct-22</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>


        </>
    )
}

export default StockReport