import { Key, useState } from 'react';
import expand from "../../assets/expand.svg";
import collapse from "../../assets/collapse.svg";


// Allows dynamically adding dropdown menu items
function DropdownElement({menuItem, click}: {menuItem: any, click: (event: any) => void}) {
    return (
        <>
        <li className='flex w-full'>
            <button 
                onClick={ click }
                value={ menuItem.id }
                className="custom-dropdown-menu-element disabled">
                <div className="flex justify-between w-full gap-1">
                    <div className="font-semibold">{ menuItem.name }</div>
                    <div className="">{ menuItem.id }</div>
                </div>
            </button>
        </li>
        </>
    );
}

// Allows dynamically adding the dropdown menu of items 
function DropdownItems({menuItems, subtitle, click}: {menuItems: object[], subtitle: string, click: (event: any) => void}) {
    return (
        <>
        <div className="custom-dropdown-menu">
            {/* The list of menu items */}
            {/* Sets max height based on content type */}
            <ul className={`overflow-auto ${subtitle === 'student' ? "max-h-[80vh]" : "max-h-[30vh]"}`}>
                {menuItems.map((menuItem: any, k: Key) => (
                    <DropdownElement menuItem={ menuItem } click={ click } key={k}/>
                ))}
            </ul>
            <div className="border-t-2 rounded-b-lg w-full h-4">
            </div>
        </div>
        </>
    )
}

// Creates a dropdown menu of a given item type with the ability to add more of that item
export default function DropdownMenu({itemsList, titles, click}: {itemsList: any, titles: string[], click: (event: any) => void}) {
    const title = titles[0];
    const subtitle = titles[1];
    const [showDropdown, setShowDropdown] = useState(true);
    const menuItems: object[] = Object.values(itemsList);

    {/* Opens and closes the dropdown menu */}
    const handleDropdownClick = () => { setShowDropdown(!showDropdown) };

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
            <DropdownItems menuItems={ menuItems } subtitle={ subtitle } click={ click }/>) : (null)
        }
        </>
    )
}