import logo from "../../assets/logo.svg";
import menu from "../../assets/menu.svg";
import DropdownList from "./DropdownList";
import { useState } from 'react';


// The list of link elements to add in [title, url] pairs
const routes = [
    ['Subjects', '/dashboard'],
    ['Assignments', '/assignments'],
    ['Profile', '/profile'],
    ['Log Out', '/logout'],
]

// Allows dynamically adding link elements to the navbar
function NavBarElement({route}: {route: string[]}) {
    const title = route[0];
    const url = route[1];

    return (
        <li>
            <a href={url} className="rounded-lg px-3 py-2 bg-transparent border-button-pink
                text-sm font-medium hover:bg-violet-300 text-slate-900 hover:text-violet-800
                transition duration-200 ease-in-out">
                {title}
            </a>
        </li>
    );
}

// Creates a navbar for authenticated users to naviagte the website quickly and easily
export default function LoggedInNavbar() {
    const [showDropdown, setShowDropdown] = useState(false);

    {/* Opens and closes the dropdown menu */}
    const handleDropdownClick = () => {
        console.log('clicked')
        setShowDropdown(!showDropdown)
    };

    return (
        <>
            <nav className="fixed top-5 left-0 w-full flex justify-center items-center">
                <div className="w-5/6 px-6 py-3 custom-navbar">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img className="w-10 h-10" src={logo} alt="Ava Logo"/>
                        <div className="text-button-blue text-xl font-bold text-button-blue">AVA</div>
                    </div>
                    <div className="flex items-center">
                        {/* Narbar link elements */}
                        <ul className="flex space-x-4">
                            {routes.map((route) => (
                                <NavBarElement route={ route }/>
                            ))}
                        </ul>
                        {/* Dropdown menu button */}
                        <button onClick={handleDropdownClick} className={`ml-4 rounded-lg px-3 py-2 font-medium z-20 focus:bg-button-pink-darker ${showDropdown ? 'bg-button-pink-darker' : 'bg-transparent hover:bg-button-pink'}`}>
                            <img src={ menu } alt="Dropdown Menu"/>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        {/* Dropdown menu */}
        {showDropdown ? (
            <DropdownList setShowDropdown={ setShowDropdown }/>
            ) : (null)
        }
        </>
    );
}

