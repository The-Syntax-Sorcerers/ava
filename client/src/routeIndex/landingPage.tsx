import { useState } from 'react';
import LoginForm from '../components/loginModal.tsx';
import SignupForm from '../components/signUpModal.tsx';
import AnonymousNavbar from '../components/AnonymousNavbar.tsx';
import DescriptionCards from '../components/descriptionCards.tsx';

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
        <div className="flex justify-center items-center mx-auto overflow-visible">
            <AnonymousNavbar
                handleLoginClick={handleLoginClick}
                handleSignupClick={handleSignupClick}
            />
            <div className="flex flex-col text-center mx-auto pt-28">
                <div className="grid grid-rows-1 grid-cols-2 text-center mx-auto mb-10">
                    <div className="col-span-1">
                        <img className="object-contain h-80 w-auto mx-auto" src={pic} alt="pic1"/>
                    </div>
                    <div className="col-span-1">
                        <div className="grid grid-rows-2 grid-cols-1 gap-4 text-center">
                            <div className="place-content-center">
                                <img className="object-contain h-48 w-48 mx-auto" src={logo} alt="Ava Logo"/>
                            </div>
                            <div className="place-content-center">
                                <h1 className="text-lg font-semibold">Welcome to AVA</h1>
                                <h2>Unlocking Authenticity: Introducing AVA, Your Authorship Verification Algorithm</h2>
                                <button
                                    className="bg-button-blue mt-5 text-slate-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-button-blue-darker outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleLoginClick}
                                > Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <DescriptionCards/>
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
    );
}
