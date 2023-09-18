import logo from "../assets/logo.svg";
import menu from "../assets/menu.svg";
import DropdownList from "./DropdownList";
import { Key } from 'react';
import { useState, useEffect, useRef} from 'react';

const routes = [  
    ['Home', '/dashboard'],
    ['Assignments', '/assignments'],
    ['Profile', '/profile'],
    ['Log Out', '/logout'],
]

function NavBarElement({route, rkey}: {route: string[], rkey: Key}) {
    const title = route[0];
    const url = route[1];

    return (
        <li key={rkey}>
            <a href={url} className="rounded-lg px-3 py-2 font-medium hover:bg-button-pink hover:text-slate-900 bg-transparent border-button-pink">
                {title}
            </a>
        </li>
    );
}

export default function LoggedInNavbar() {
    // The reference objects for the dropdown menu
    const dropdownMenuButtonRef = useRef(null)
    const dropdownMenuRef = useRef(null)

    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownClick = () => {
        console.log('clicked')
        setShowDropdown(!showDropdown)
    };

    //document.addEventListener('mousedown', handlePageClick)
    //document.querySelector('#navbar-menu-button')?.addEventListener('mousedown', handleDropdownClick)

    return (
        <>
            <nav className="fixed top-5 left-0 w-full flex justify-center items-center z-10">
                <div className="w-5/6 bg-main px-6 py-3 drop-shadow-lg rounded-md">
                <div className="flex container mx-auto px-4 justify-between items-center">
                    <div className="flex items-center">
                        <img className="w-10 h-10" src={logo} alt="Ava Logo"/>
                        <div className="text-button-blue text-xl font-bold">AVA</div>
                    </div>
                    <div className="flex items-center">
                        <ul className="flex space-x-4">
                            {routes.map((route, rkey: Key) => (
                                <NavBarElement route={ route } rkey={ rkey } />
                            ))}
                        </ul>
                        {/* Dropdown menu element */}
                        <button id='navbar-menu-button' ref={ dropdownMenuButtonRef } onClick={handleDropdownClick} className={`ml-4 rounded-lg px-3 py-2 font-medium z-20 focus:bg-button-pink-darker ${showDropdown ? 'bg-button-pink-darker' : 'bg-transparent hover:bg-button-pink'}`}>
                            <img className="" src={ menu } alt="Ava Logo"/>
                        </button>
                    </div>
                </div>
                </div>
            </nav>
            {showDropdown ? (
                <DropdownList setShowDropdown={ setShowDropdown }/>
                ) : (null)
            }
        </>
    );
}
