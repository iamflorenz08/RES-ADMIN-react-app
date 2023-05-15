import { useState, useEffect } from "react"
import axios from "axios"

const useAddSupply = (url, payload) => {
    const [loading, setLoading] = useState(false)
    const [isSucess, setSuccess] = useState(false)

    useEffect(() => {
        const put_data = async () => {
            if(!payload) return
            setLoading(true)
            axios.put(url, payload)
                .then(response => {
                    setSuccess(true)
                    setLoading(false)
                })
                .catch(err => {
                    setSuccess(false)
                    setLoading(false)
                })
        }

        put_data()
    }, [url, payload]);

    return { loading, isSucess, setSuccess }
}

export default useAddSupply