
import { useEffect, useState } from 'react';
import axios from "axios";
import NotificationMessage from './NotificationMessage';
import { socket } from '../../socket';
const Notification = ({ isShow }) => {
    const baseURL = process.env.REACT_APP_API
    const [notifications, setNotifications] = useState([])
    const [refresh, setRefrestKey] = useState(0)

    useEffect(() => {
        socket.connect()
        return () => {
            socket.disconnect()
        };
    }, []);

    useEffect(() => {
        const onNotification = (value) => {
            setRefrestKey(key => key + 1)
        }

        socket.on('notify-admin', onNotification)

        return () => {
            socket.off('notify-admin', onNotification)
        };

    }, []);


    useEffect(() => {
        const fetchNotification = async () => {
            let notifications = await axios.get(`${baseURL}/notification`)
            setNotifications(notifications.data)
        }

        fetchNotification()
    }, [baseURL, refresh]);


    return (
        <>
            {isShow && (
                <div className='bg-white shadow-md w-[320px] h-[330px] absolute right-0 top-11 rounded-md flex flex-col overflow-auto'>
                    <div className='p-[11px]'>
                        <h1 className='font-bold text-[20px]'>Notification</h1>
                    </div>
                    <div>
                        {notifications.map((item, index) => <NotificationMessage key={index} notification={item} />)}
                    </div>
                </div>
            )}
        </>
    )
}

export default Notification