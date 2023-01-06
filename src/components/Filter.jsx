import { GiSettingsKnobs } from "react-icons/gi"
import { useState } from "react"
import { RiCloseFill } from "react-icons/ri"

const Filter = ({ filterType, setFilterType, type }) => {
    const [filter, toggleFilter] = useState(false)

    const setFilter = (accessor, type) => {
        setFilterType(state => ({ ...state, [accessor]: type }))
        toggleFilter(state => !state)
    }

    const delFilter = (accessor) => {
        setFilterType(state => ({ ...state, [accessor]: null }))
        toggleFilter(state => !state)
    }
    return (
        <>
            <div className="ml-5 relative">
                <button
                    onClick={() => toggleFilter((state) => !state)}
                    className="flex items-center gap-1 font-bold ">
                    <GiSettingsKnobs size={20} />
                    Filter
                </button>

                {filter && (
                    <div className="absolute bg-white p-8 flex gap-8 top-9 shadow-lg h-52 rounded-lg" onBlur={() => toggleFilter(false)}>
                        {type === 'requisition' && (
                            <>
                                <div className="w-32">
                                    <h3 className="text-xl">Date</h3>
                                    <div className="border-t border-gray-300 my-1"></div>
                                    <div className="flex-row text-md">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('date', 'today')}
                                                className={
                                                    (filterType && filterType.date === 'today'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>Today</button>

                                            {filterType && filterType.date === 'today' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('date')} />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('date', 'week')}
                                                className={
                                                    (filterType && filterType.date === 'week'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>This week</button>

                                            {filterType && filterType.date === 'week' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('date')} />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('date', 'month')}
                                                className={
                                                    (filterType && filterType.date === 'month'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>This month</button>

                                            {filterType && filterType.date === 'month' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('date')} />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('date', 'year')}
                                                className={
                                                    (filterType && filterType.date === 'year'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>This year</button>

                                            {filterType && filterType.date === 'year' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('date')} />
                                            )}
                                        </div>

                                    </div>
                                </div>

                                <div className="w-40">
                                    <h3 className="text-xl">Status</h3>
                                    <div className="border-t border-gray-300 my-1"></div>
                                    <div className="flex-row text-md">

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('status', 'to_be_approved')}
                                                className={
                                                    (filterType && filterType.status === 'to_be_approved'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>To Be Approved</button>

                                            {filterType && filterType.status === 'to_be_approved' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('status')} />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('status', 'on_going')}
                                                className={
                                                    (filterType && filterType.status === 'on_going'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>On Going</button>

                                            {filterType && filterType.status === 'on_going' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('status')} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {type === 'stock' && (
                            <>
                                <div className="w-32">
                                    <h3 className="text-xl">TYPE</h3>
                                    <div className="border-t border-gray-300 my-1"></div>
                                    <div className="flex-row text-md">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('item_type', 'RIS')}
                                                className={
                                                    (filterType && filterType.item_type === 'RIS'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>RIS</button>

                                            {filterType && filterType.item_type === 'RIS' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('item_type')} />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('item_type', 'ICS')}
                                                className={
                                                    (filterType && filterType.item_type === 'ICS'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>ICS</button>

                                            {filterType && filterType.item_type === 'ICS' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('item_type')} />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('item_type', 'PAR')}
                                                className={
                                                    (filterType && filterType.item_type === 'PAR'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>PAR</button>

                                            {filterType && filterType.item_type === 'PAR' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('item_type')} />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-40">
                                    <h3 className="text-xl">CATEGORY</h3>
                                    <div className="border-t border-gray-300 my-1"></div>
                                    <div className="flex-row text-md">

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('category', 'project_free')}
                                                className={
                                                    (filterType && filterType.category === 'project_free'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>Project Free</button>

                                            {filterType && filterType.category === 'project_free' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('category')} />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('category', 'office_supplies')}
                                                className={
                                                    (filterType && filterType.category === 'office_supplies'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>Office Supplies</button>

                                            {filterType && filterType.category === 'office_supplies' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('category')} />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('category', 'school_supplies')}
                                                className={
                                                    (filterType && filterType.category === 'school_supplies'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>School Supplies</button>

                                            {filterType && filterType.category === 'school_supplies' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('category')} />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('category', 'equipment')}
                                                className={
                                                    (filterType && filterType.category === 'equipment'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>Equipments</button>

                                            {filterType && filterType.category === 'equipment' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('category')} />
                                            )}
                                        </div>

                                    </div>
                                </div>

                                <div className="w-32">
                                    <h3 className="text-xl">SORT BY</h3>
                                    <div className="border-t border-gray-300 my-1"></div>
                                    <div className="flex-row text-md">

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setFilter('sort_by', 'current_supply')}
                                                className={
                                                    (filterType && filterType.sort_by === 'current_supply'
                                                        && 'text-blue-600') + " hover:text-blue-600"
                                                }>Current Supply</button>

                                            {filterType && filterType.sort_by === 'current_supply' && (
                                                <RiCloseFill
                                                    className="cursor-pointer"
                                                    onClick={() => delFilter('sort_by')} />
                                            )}
                                        </div>

                                    </div>
                                </div>

                            </>
                        )}


                    </div>
                )}

            </div>
        </>
    )
}

export default Filter