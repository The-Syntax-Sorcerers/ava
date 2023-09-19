// The list of dropdown menu items to add in [title, url] pairs
const menuItems = [
    ['Profile', '/profile'],
    ['Settings', '/settings'],
    ['Log Out', '/logout'],
];

// Allows dynamically adding link elements to the dropdown menu
function DropdownElement({menuItem}: {menuItem: string[]}) {
    const title = menuItem[0];
    const url = menuItem[1];

    return (
        <li className='flex w-full'>
            <a href={ url } className="flex justify-center items-center rounded-lg px-5 py-2 w-full my-1 font-medium hover:bg-button-pink hover:text-slate-900 bg-transparent border-button-pink">
                { title }
            </a>
        </li>
    );
}


// Creates a dropdown menu of extra links for website nevaigation
export default function DropdownList({ setShowDropdown }) {

    return (
        <>
        {/* Allows closing the dropdown menu by clicking anywhere on the screen */}
        <div onClick={() => setShowDropdown(false)} className="fixed inset-0 z-50 outline-none focus:outline-none">
            <ul onClick={e => e.stopPropagation()} className='flex flex-col items-center fixed top-24 right-32 z-50 min-w-max rounded-lg p-2 bg-main drop-shadow-lg list-none divide-y-2 divide-lighter divide-double'>
                {/* Dropdown Link Elements */}
                {menuItems.map((menuItem) => (
                    <DropdownElement menuItem={ menuItem } />
                ))}
            </ul>
        </div>
        </>
    )
}
