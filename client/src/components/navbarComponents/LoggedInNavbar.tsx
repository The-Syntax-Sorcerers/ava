import logo from "../../assets/logo.svg";
import { Key } from 'react'

const routes = [  
    ['Home', '/dashboard'],
    ['Assignments', '/assignments'],
    ['Profile', '/profile'],
    ['Log Out', '/logout'],
]

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

export default function LoggedInNavbar() {
    return (
        <>
            <nav className="fixed top-5 left-0 w-full flex justify-center items-center">
                <div className="w-5/6 px-6 py-3 custom-navbar">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img className="w-10 h-10" src={logo} alt="Ava Logo"/>
                        <div className="text-button-blue text-xl font-bold text-button-blue">AVA</div>
                    </div>
                    <ul className="flex space-x-4">
                        {routes.map((route, key: Key) => (
                            <NavBarElement route={route} key={key} />
                        ))}
                    </ul>
                </div>
                </div>
            </nav>
        </>
    );
}

