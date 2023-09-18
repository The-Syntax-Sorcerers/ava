import { Key } from 'react'
import NavBarElement from './LoggedInNavbar';

// The list of dropdown menu items and corresponding actions
const menuItems = [
    ['Profile', '/profile'],
    ['Settings', '/settings'],
    ['Log Out', '/logout'],
];

// Creates the dropdown menu items
function DropdownElement({menuItem, rkey}: {menuItem: string[], rkey: Key}) {
    const title = menuItem[0];
    const url = menuItem[1];

    return (
        <li key={ rkey }>
            <a href={ url } className="rounded-lg px-3 py-2 font-medium hover:bg-button-pink hover:text-slate-900 bg-transparent border-button-pink">
                { title }
            </a>
        </li>
    );
}

export default function DropdownList({ setShowDropdown }) {

    return (
        <div onClick={() => setShowDropdown(false)} className="fixed inset-0 z-50 outline-none focus:outline-none">
            <ul onClick={e => e.stopPropagation()} className='flex flex-col fixed top-24 right-32 z-50 rounded-lg p-4 gap-4 bg-main drop-shadow-lg list-none'>
                {menuItems.map((menuItem, rkey: Key) => (
                    //<NavBarElement route={ menuItem } rkey={ rkey } />
                    <DropdownElement menuItem={menuItem} rkey={rkey} />
                ))}
            </ul>
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
