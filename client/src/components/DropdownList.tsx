import { Key } from 'react'

// The list of dropdown menu items and corresponding actions
const menuItems = [
    ['Settings',],
    ['Log Out',],
];

// Creates the dropdown menu items
function DropdownElement({menuItem, rkey}: {menuItem: String[], rkey: Key}) {
    const title = menuItem[0];

    return (
        <li key={ rkey } className="flex justify-center items-center border-2 -mb-2 p-4 border-slate-950">
            <p>
                { title }
            </p>
        </li>
    )
}

export default function DropdownList() {

    return (
        <div className='border-2 p-2 pb-4 z-50 border-slate-950'>
            {menuItems.map((menuItem, rkey: Key) => (
                <DropdownElement menuItem={menuItem} rkey={rkey} />
            ))}
        </div>
    )
}