import React from 'react'
import ReactDOM from 'react-dom/client'
import "./App.css"


const template_data: { my_data: string } = JSON.parse((globalThis as any).template_data);
console.log("Received template_Data ==>", template_data)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
)

/* =================================   Render DOM above   ========================================= */
/* ================================= Page Structure below ========================================= */

import { useState } from 'react';
import LoginForm from '../components/login.tsx';
import AnonymousNavbar from '../components/AnonymousNavbar.tsx';

import logo from '../assets/logo.svg';
import pic from '../assets/idea.png';


export default function LandingPage() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="flex justify-center items-center h-screen">
            <AnonymousNavbar/>
            <div className="grid grid-rows-1 grid-cols-2 gap-x-8 text-center mx-8">
                <div className="col-span-1">
                    <img className="object-contain h-80 w-auto mx-auto" src={pic} alt="Ava Logo"/>
                </div>
                <div className="col-span-1">
                    <div className="grid grid-rows-2 grid-cols-1 gap-4 text-center">
                        <div className="place-content-center">
                            <img className="object-contain h-48 w-48 mx-auto" src={logo} alt="Ava Logo"/>
                        </div>
                        <div className="place-content-center">
                            <h1>Welcome to AVA</h1>
                            <h2>The world's best authorship verification algorithm</h2>
                        </div>
                        <div className="place-content-center">
                            <button
                                className="bg-button-blue text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-button-blue-darker outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(true)}
                            > Get Started
                            </button>
                        </div>
                        {showModal ? (
                            <>
                            {/* <div className="container opacity-25 fixed bg-black"></div> */}
                            <LoginForm setShowModal={setShowModal}/>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
