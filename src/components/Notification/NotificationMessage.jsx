import {MdOutlineSyncProblem} from 'react-icons/md'
const NotificationMessage = ({notification}) => {
    return (
        <>
            <div className={(notification.isAdminRead ? 'bg-white' : 'bg-[#C9E0FE]') + ' h-[50px] flex items-center pr-[15px] cursor-pointer hover:bg-[#C9E0FE]'}>
                <MdOutlineSyncProblem size={25} color='#1A297A' className='mx-[15px]' />
                <div>
                    <p className='text-[12px]'>{notification.user.full_name.first_name} {notification.user.full_name.last_name} is Requesting {notification.request.items.length} Item/s.</p>
                    <p className='text-[#8F8F8F] text-[11px]'>1d ago</p>
                </div>
            </div>
        </>
    )
}

export default NotificationMessage