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
        <li key={ rkey } className="flex justify-center items-center border-2 -mb-0.5 p-4 w-32 border-slate-950 bg-main">
            <p>
                { title }
            </p>
        </li>
    )
}

export default function DropdownList() {

    return (
        <div className='absolute inline-block top-16 right-0 z-50'>
            {menuItems.map((menuItem, rkey: Key) => (
                <DropdownElement menuItem={menuItem} rkey={rkey} />
            ))}
        </div>
    )
}

{/*
Drop down menu
.dropdown {
    position: relative;
    display: inline-block;
}
  
Dropdown Content (Hidden by Default)
.dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}
  
Links inside the dropdown
.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    z-index: 1;
}
  
Change color of dropdown links on hover
.dropdown-content a:hover {background-color: #ddd;}

Show the dropdown menu on hover
.dropdown:hover .dropdown-content {display: block;}
*/}
