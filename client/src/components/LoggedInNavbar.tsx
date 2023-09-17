import logo from "../assets/logo.svg";
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
            <a href={url} className="rounded-lg px-3 py-2 font-medium hover:bg-button-pink hover:text-slate-900 bg-transparent border-button-pink">
                {title}
            </a>
        </li>
    );
}

export default function LoggedInNavbar() {
    return (
        <>
            <nav className="fixed top-5 left-0 w-full flex justify-center items-center">
                <div className="w-5/6 bg-main px-6 py-3 drop-shadow-lg rounded-md">
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

