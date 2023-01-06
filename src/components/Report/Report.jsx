import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
import { IoPrintSharp } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import ReportForm from './ReportForm'
const Report = () => {
    const { id } = useParams()
    const baseURL = process.env.REACT_APP_API
    const [requisition, setRequisition] = useState(null)
    const [ris, setRIS] = useState(null)
    const [ics, setICS] = useState(null)
    const [par, setPAR] = useState(null)
    const RISref = useRef()
    const ICSref = useRef()
    const PARref = useRef()

    const handleRISPrint = useReactToPrint({
        content: () => RISref.current
    })

    const handleICSPrint = useReactToPrint({
        content: () => ICSref.current
    })

    const handlePARPrint = useReactToPrint({
        content: () => PARref.current
    })

    useEffect(() => {
        const loadContent = async () => {
            let requisition = await axios.get(`${baseURL}/requisition/${id}`)
            requisition = requisition.data
            setRequisition(requisition)
            setRIS(() => requisition.items.filter(item => item.item_type === 'RIS'))
            setICS(() => requisition.items.filter(item => item.item_type === 'ICS'))
            setPAR(() => requisition.items.filter(item => item.item_type === 'PAR'))
        }

        loadContent()
    }, [id, baseURL]);

    return (
        <>
            {requisition && (
                <>
                    <div className='w-full mt-10'>
                        {ris.length > 0 && (
                            <div className='flex justify-center mb-10'>
                                <div ref={RISref} className="w-[30cm]">
                                    <ReportForm title={'REQUISITION AND ISSUE SLIP'} requisition={requisition} items={ris} />
                                </div>
                            </div>
                        )}

                        {ics.length > 0 && (
                            <div className='flex justify-center mb-10'>
                                <div ref={ICSref} className="w-[30cm]">
                                    <ReportForm title={'INVENTORY CUSTODIAN SLIP'} requisition={requisition} items={ics} />
                                </div>
                            </div>
                        )}


                        {par.length > 0 && (
                            <div className='flex justify-center mb-10'>
                                <div ref={PARref} className="w-[30cm]">
                                    <ReportForm title={'PROPERTY ACKNOWLEDGEMENT RECEIPT'} requisition={requisition} items={par} />
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="m-4 flex gap-5 fixed bottom-0 right-0">
                        <button
                            className=" shadow-lg px-6 py-3 bg-blue-900 hover:bg-blue-800 rounded-lg text-white flex items-center gap-2"
                            onClick={handleRISPrint}>
                            <IoPrintSharp /> RIS
                        </button>
                        <button
                            className=" shadow-lg px-6 py-3 bg-blue-900 hover:bg-blue-800 rounded-lg text-white flex items-center gap-2"
                            onClick={handleICSPrint}>
                            <IoPrintSharp /> ICS
                        </button>
                        <button
                            className=" shadow-lg px-6 py-3 bg-blue-900 hover:bg-blue-800 rounded-lg text-white flex items-center gap-2"
                            onClick={handlePARPrint}>
                            <IoPrintSharp /> PAR
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

export default Report