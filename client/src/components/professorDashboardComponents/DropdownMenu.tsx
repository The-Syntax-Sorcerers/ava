import { useState } from 'react';
import expand from "../../assets/expand.svg";
import collapse from "../../assets/collapse.svg";

const menuItems = [
    ['COMP10010'],
    ['COMP10020'],
];

// Allows dynamically adding dropdown menu items
function DropdownElement({menuItem, click}: {menuItem: string[], click: (event: any) => void}) {
    const title = menuItem[0];

    return (
        <>
        <li className='flex w-full'>
            <button 
                onClick={ click }
                className="custom-dropdown-menu-element">
                { title }
            </button>
        </li>
        </>
    );
}

// Allows dynamically adding the dropdown menu of items 
function DropdownItems({subtitle, click}: {subtitle: string, click: (event: any) => void}) {
    {/* TODO: Grab the data from the server here? */}
    
    return (
        <>
        <div className="custom-dropdown-menu">
            {/* The list of menu items */}
            <ul className="">
                {menuItems.map((menuItem) => (
                    <DropdownElement menuItem={ menuItem } click={ click }/>
                ))}
            </ul>
            {/* The option to create more of the menu items */}
            <button 
                className="custom-dropdown-menu-creation-button">
                Add new { subtitle }
            </button>
        </div>
        </>
    )
}

// Creates a dropdown menu of a given item type with the ability to add more of that item
export default function DropdownMenu({titles, click}: {titles: string[], click: (event: any) => void}) {
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
                {/* Reactive dropdown arrow */}
                {showDropdown ? (
                    <img src={ collapse } alt="Collapse Icon"/>) : (
                    <img src={ expand } alt="Expand Icon"/>)
                }
            </div>
        </button>
        
        {/* Dropdown Elements */}
        {showDropdown ? (
            <DropdownItems subtitle={ subtitle } click={ click }/>) : (null)
        }
        </>
    )
}