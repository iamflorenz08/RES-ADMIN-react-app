import { useState, useEffect } from 'react'

const useDropDown = (state, ref) => {
    const [toggle, setToggle] = useState(state)

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (toggle && ref.current && !ref.current.contains(event.target)) {
                setToggle(false);
            }
        };
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };

    }, [ref, toggle]);

    return [toggle, setToggle]
}

export default useDropDown