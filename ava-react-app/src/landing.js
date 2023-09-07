import React, { useState } from 'react';
import Modal from 'react-modal';
import LoginForm from './login';
import logo from './logo.svg';
import pic from './idea.png';
import NavBar from './navbar';

export default function LandingPage() {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <div className="flex justify-center items-center h-screen">
            <NavBar/>
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
};