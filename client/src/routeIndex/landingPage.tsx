import { useState } from 'react';
import LoginForm from '../components/landingComponents/loginModal.tsx';
import SignupForm from '../components/landingComponents/signUpModal.tsx';
import AnonymousNavbar from '../components/navbarComponents/AnonymousNavbar.tsx';
import DescriptionCards from '../components/landingComponents/descriptionCards.tsx';
import Footer from '../components/landingComponents/Footer.tsx'

import logo from '../assets/logo.svg';
import pic from '../assets/idea2.svg';


export default function LandingPage() {
    const data = (globalThis as any).template_data

    const [showModal, setShowModal] = useState(data.showModal);
    const [showLoginForm, setShowLoginForm] = useState(data.showLogin);


    const handleLoginClick = () => {
        setShowModal(true);
        setShowLoginForm(true);
    };

    const handleSignupClick = () => {
        setShowModal(true);
        setShowLoginForm(false);
    };

    return (
        // For page background use bg-stone-100 OR bg-
        <div className="flex flex-col justify-center items-center mx-auto overflow-visible custom-landing-page">
            <AnonymousNavbar
                handleLoginClick={handleLoginClick}
                handleSignupClick={handleSignupClick}
            />
            <div className="flex flex-col text-center mx-auto pt-28 font-medium text-md text-gray-700 items-center">
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
                                    className="mt-5 mr-1 mb-1 px-6 py-3 font-bold text-sm shadow-md hover:shadow-lg custom-form-button"
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
                        <LoginForm setShowModal={setShowModal} handleSignupClick={handleSignupClick}/>
                    ) : (
                        <SignupForm setShowModal={setShowModal} handleLoginClick={handleLoginClick} />
                    )}
                </div>
            ) : null}
            <Footer />
        </div>
    );
}
