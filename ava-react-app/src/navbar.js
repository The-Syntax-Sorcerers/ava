import React from 'react';
import logo from './logo.svg';


export default function NavBar() {
    return (
        <nav className="fixed top-5 left-0 w-full flex justify-center items-center">
        <div className="w-5/6 bg-main px-6 py-3 drop-shadow-lg rounded-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img className="w-10 h-10" src={logo} alt="Ava Logo"/>
                    <div className="text-white text-xl font-bold text-button-blue">AVA</div>
                </div>
                <ul className="flex space-x-4">
                {[    ['Home', '/dashboard'],
                        ['Classes', '/classes'],
                        ['Assignments', '/assignments'],
                        ['History', '/history'],
                    ].map(([title, url]) => (
                        <li><a href={url} className="rounded-lg px-3 py-2 text-slate-50 font-medium hover:bg-button-pink hover:text-slate-50">
                            {title}
                            </a>
                        </li>
                    ))}
                </ul>
            
            </div>
        </div>
        </nav>
        
    );
  }