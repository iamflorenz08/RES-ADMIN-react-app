
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

    useEffect(() => {
        const read_all = async () => {
            await axios.post(`${baseURL}/notification/read-all`)
            setRefrestKey(key => key + 1)
        }
        !isShow && read_all()
    }, [baseURL, isShow]);

    const unread_count = () => {
        let count = 0
        notifications.map(notif => !notif.isAdminRead && count++)
        return count
    }

    return (
        <>
            <div>
                {unread_count() > 0 && (
                    <div className='absolute top-[-8px] right-[-8px] bg-[#FF0000] rounded-full px-1.5 py-0.5 text-white text-xs'>{unread_count()}</div>
                )}

                {isShow && (
                    <>
                        <div className='bg-white shadow-md w-[320px] h-[330px] absolute right-0 top-11 rounded-md flex flex-col overflow-auto'>
                            <div className='p-[11px]'>
                                <h1 className='font-bold text-[20px]'>Notification</h1>
                            </div>
                            <div>
                                {notifications.map((item, index) => <NotificationMessage key={index} notification={item} />)}
                            </div>
                        </div>
                    </>
                )}
            </div>

        </>
    )
}

export default Notification