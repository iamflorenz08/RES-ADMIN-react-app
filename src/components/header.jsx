import AppLogo from '../images/smslogo.png'
import Notification from './Notification/Notification'
import ic_logout from '../images/ic_logout.png'
import ic_settings from '../images/ic_settings.png'
import { FaBell } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useDropDown from './CustomHooks/useDropDown'

const Header = ({ setToken, details }) => {
    const settingsRef = useRef()
    const notificationRef = useRef()
    const [settings, toggleSettings] = useDropDown(false, settingsRef)
    const [notification, toggleNotification] = useDropDown(false, notificationRef)

    const logout = () => {
        sessionStorage.clear()
        setToken(null)
    }

    return (
        <div className="sticky top-0 flex justify-between bg-white shadow-lg h-fit w-full p-[10px]">
            <div className="flex items-center">
                <img src={AppLogo} alt="smslogo.png"
                    className="mx-3 my-1 flex h-8 w-8 items-center justify-center rounded" />
                <h2 className="font-bold text-blue-900">Supply Management System</h2>
            </div>

            <div className='flex justify-center items-center gap-2'>
                <div
                    ref={notificationRef}
                    className='relative'>
                    <button className='flex' onClick={() => toggleNotification(state => !state)}>
                        <FaBell size={25} className={(notification && 'text-[#007BFF]')} />
                    </button>

                    <Notification isShow={notification} />
                </div>
                <div
                    ref={settingsRef}
                >
                    <button className='flex' onClick={() => toggleSettings(state => !state)}>
                        <BsThreeDotsVertical size={30} color={settings && '#007BFF'}/>
                    </button>
                    {settings && (
                        <div
                            className='absolute w-[320px] bg-white right-3 mt-5 rounded-[7px] shadow-md pb-[15px]'>
                            <p className='px-[15px] py-[11px] text-[20px] font-bold'>Settings</p>
                            <div className='flex-row w-full p-[4px] gap-2'>
                                {details.adminType === "custodian" && (
                                    <Link
                                        to={'/settings'}
                                        onClick={() => toggleSettings(state => !state)}
                                        className='flex items-center gap-2 px-[8px] h-[50px] w-full shadow-md rounded-[10px] hover:bg-gray-100 mb-2'>
                                        <img src={ic_settings} alt='icon' />
                                        <p className='font-bold'>Account Settings</p>
                                    </Link>
                                )}

                                <button
                                    onClick={() => logout()}
                                    className='flex items-center gap-2 px-[8px] h-[50px] w-full shadow-md rounded-[10px] hover:bg-gray-100'>
                                    <img src={ic_logout} alt='icon' />
                                    <p className='font-bold'>Log out</p>
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Header