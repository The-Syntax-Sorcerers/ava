import logo from '../assets/logo.svg';
import { Key } from 'react';


function NavBarElement({route}: {route: any[]}) {
    const title = route[0];
    const func = route[1];

    return (
        <li>
            <button 
                className="rounded-lg px-3 py-2 bg-transparent border-button-pink text-slate-900 font-medium hover:bg-button-pink hover:text-slate-900"
                type="button"
                onClick={func}
            >
                {title}
            </button>
        </li>
    );
}

export default function AnonymousNavbar({ handleLoginClick, handleSignupClick }: { handleLoginClick: () => void, handleSignupClick: () => void }) {
    
    const routes = [  
        ['Log In', handleLoginClick],
        ['Sign Up', handleSignupClick],
    ]
    
    return (
        <>
            <nav className="fixed top-5 left-0 w-full flex justify-center items-center">
                <div className="w-5/6 px-6 py-3 custom-navbar">
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <img className="w-10 h-10" src={logo} alt="Ava Logo" />
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
