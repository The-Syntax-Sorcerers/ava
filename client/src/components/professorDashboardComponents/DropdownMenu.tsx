import { useState } from 'react';
import expand from "../../assets/expand.svg";
import collapse from "../../assets/collapse.svg";

const menuItems = [
    ['COMP10010'],
    ['COMP10020'],
];

// Allows dynamically adding dropdown menu items
function DropdownElement({menuItem}: {menuItem: string[]}) {
    const title = menuItem[0];

    return (
        <>
        <li className='flex w-full'>
            <a className="custom-dropdown-menu-element">
                { title }
            </a>
        </li>
        </>
    );
}

// Allows dynamically adding the dropdown menu of items 
function DropdownItems({subtitle}: {subtitle: string}) {
    {/* TODO: Grab the data from the server here? */}
    
    return (
        <>
        <div className="custom-dropdown-menu">
            {/* The list of menu items */}
            <ul className="">
                {menuItems.map((menuItem) => (
                    <DropdownElement menuItem={ menuItem } />
                ))}
            </ul>
            {/* The option to create more of the menu items */}
            <a className="custom-dropdown-menu-creation-button">
                Add new { subtitle }
            </a>
        </div>
        </>
    )
}

// Creates a dropdown menu of a given item type with the ability to add more of that item
export default function DropdownMenu({titles}: {titles: string[]}, {/* Pass in the items to show? */}) {
    const title = titles[0];
    const subtitle = titles[1];
    const [showDropdown, setShowDropdown] = useState(true);

    {/* Opens and closes the dropdown menu */}
    const handleDropdownClick = () => {
        console.log('clicked')
        setShowDropdown(!showDropdown)
    };

    return (
        <>
        {/* Dropdown button */}
        <button 
            onClick={handleDropdownClick} 
            className={`custom-dropdown-menu-button-styling
            ${showDropdown ? 'custom-dropdown-menu-button-selected rounded-t-lg' : 'custom-dropdown-menu-button-colouring rounded-lg'}`}>
            <div className="flex justify-center align-items">
                { title }
                {/* TODO: Add dropdown arrow */}
                {showDropdown ? (
                    <img src={ collapse } alt="Collapse Icon"/>) : (
                    <img src={ expand } alt="Expand Icon"/>)
                }
            </div>
        </button>
        
        {/* Dropdown Elements */}
        {showDropdown ? (
            <DropdownItems subtitle={ subtitle }/>) : (null)
        }
        </>
    )
}