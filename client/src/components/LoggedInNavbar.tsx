import logo from "../assets/logo.svg";
import menu from "../assets/menu.svg";
import { Key } from 'react';
import { useState } from 'react';

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
    const [isClicked, setIsClicked] = useState(false);

    const handleButtonClick = () => {
        if (isClicked === true) {
            console.log("set to false")
            setIsClicked(false);
        }
        else {
            console.log("set to true")
            setIsClicked(true);
        }
    };

    return (
        <>
            <nav className="fixed top-5 left-0 w-full flex justify-center items-center">
                <div className="w-5/6 bg-main px-6 py-3 drop-shadow-lg rounded-md">
                <div className="flex container mx-auto px-4 justify-between items-center">
                    <div className="flex items-center">
                        <img className="w-10 h-10" src={logo} alt="Ava Logo"/>
                        <div className="text-button-blue text-xl font-bold">AVA</div>
                    </div>
                    <div className="flex items-center">
                        <ul className="flex space-x-4">
                            {routes.map((route, rkey: Key) => (
                                <NavBarElement route={route} rkey={rkey} />
                            ))}
                        </ul>
                        {/* Dropdown menu element */}
                        <button onClick={handleButtonClick} className={`ml-4 rounded-lg px-3 py-2 font-medium ${isClicked ? 'bg-button-pink-darker' : 'bg-transparent hover:bg-button-pink'}`}>
                            <img className="" src={menu} alt="Ava Logo"/>
                            {isClicked ? (
                                <div className="dropdown-content">
                                    <div>Light/Dark Mode</div>
                                    <a href="#Settings">Settings</a>
                                    <a href="#logout">Log Out</a>
                                </div>
                            ) : null }
                        </button>
                    </div>
                </div>
                </div>
            </nav>
        </>
    );
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
