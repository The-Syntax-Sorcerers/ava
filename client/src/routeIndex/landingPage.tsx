import { useState } from 'react';
import LoginForm from '../components/loginModal.tsx';
import SignupForm from '../components/signUpModal.tsx';
import AnonymousNavbar from '../components/AnonymousNavbar.tsx';
import Footer from '../components/Footer.tsx'

import logo from '../assets/logo.svg';
import pic from '../assets/idea.png';


export default function LandingPage() {
    const [showModal, setShowModal] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);


    const handleLoginClick = () => {
        setShowModal(true);
        setShowLoginForm(true);
    };

    const handleSignupClick = () => {
        setShowModal(true);
        setShowLoginForm(false);
    };


    return (
        <>
            <div className="flex flex-col min-h-screen">
                <AnonymousNavbar
                    handleLoginClick={handleLoginClick}
                    handleSignupClick={handleSignupClick}
                />
                <main className="flex-grow box-border p-40">
                    <div className="content-container grid grid-rows-1 grid-cols-2 gap-x-8 text-center mx-8">
                        <div className="col-span-1">
                            <img
                            className="object-contain h-80 w-auto mx-auto"
                            src={pic}
                            alt="Ava Logo"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="grid grid-rows-2 grid-cols-1 gap-4 text-center">
                                <div className="place-content-center">
                                    <img
                                    className="object-contain h-48 w-48 mx-auto"
                                    src={logo}
                                    alt="Ava Logo"
                                    />
                                </div>
                                <div className="place-content-center">
                                    <h1>Welcome to AVA</h1>
                                    <h2>The world's best authorship verification algorithm</h2>
                                </div>
                                <div className="place-content-center">
                                    <button
                                    className="bg-button-blue text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover-bg-button-blue-darker outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    >
                                    Get Started
                                    </button>
                                </div>
                                {showModal ? (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        {showLoginForm ? (
                                            <LoginForm setShowModal={setShowModal}/>
                                        ) : (
                                            <SignupForm setShowModal={setShowModal} />
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
