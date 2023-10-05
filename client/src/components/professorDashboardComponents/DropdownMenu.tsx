import { useState } from 'react';

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

function DropdownItems({subtitle}: {subtitle: string}) {
    {/* TODO: Grab the data from the server here? */}
    
    return (
        <>
        <div className="border-2 rounded-b-lg w-full mb-1 mx-auto">
            {/* The list of menu items */}
            <ul className="">
                {menuItems.map((menuItem) => (
                    <DropdownElement menuItem={ menuItem } />
                ))}
            </ul>
            {/* The option to create more of the menu items */}
            <a class="custom-dropdown-menu-creation-button">
                Add new { subtitle }
            </a>
        </div>
        </>
    )
}

export default function DropdownMenu({titles}: {titles: string[]}, {/* Pass in the button name, dropdown function, and the items to show? */}) {
    const title = titles[0];
    const subtitle = titles[1];
    const [showDropdown, setShowDropdown] = useState(false);

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
            { title }
            {/* TODO: Add dropdown arrow
            <img src={ menu } alt="Dropdown Menu"/>
            <img src={${showDropdown ? { collapseIcon } : { expandIcon }}} alt="Expand/Collapse Icon"/>
             */}
        </button>
        
        {/* Dropdown Elements */}
        {showDropdown ?
            (<DropdownItems subtitle={ subtitle }/>) : (null)
        }
        </>
    )
}