import { useState } from 'react';
import LoggedInNavbar from "../components/navbarComponents/LoggedInNavbar";
import AnonymousNavbar from "../components/navbarComponents/AnonymousNavbar";
import PolicyList from "../components/landingComponents/PolicyList";
import LoginForm from "../components/landingComponents/loginModal";
import SignupForm from "../components/landingComponents/signUpModal";
import Footer from "../components/landingComponents/Footer";

export default function PrivacyPolicy({ auth_user }: { auth_user: boolean }) {
    // The most recent edit date of the privacy policy
    const editDate = '18/09/23'

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
        <div className="flex flex-col min-h-screen custom-pages">
            { auth_user ? (
                <LoggedInNavbar />
            ) : (
                <AnonymousNavbar
                    handleLoginClick={handleLoginClick}
                    handleSignupClick={handleSignupClick}
                />
            )}
            
            <main className="container mx-auto flex-grow box-border pt-28 pb-10 w-5/6">
                <div className="mb-4 flex flex-col justify-center items-center bg-slate-50 rounded-lg shadow-md p-4">
                    <div className="mb-4 flex flex-col justify-center items-center text-gray-700">
                        <h1 className='text-xl font-bold'>Privacy Policy</h1>
                        <p className='text-sm font-medium'>Last updated: {editDate}</p>
                    </div>
                    <PolicyList />
                </div>
            </main>
            { showModal ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {showLoginForm ? (
                        <LoginForm setShowModal={setShowModal} handleSignupClick={handleSignupClick}/>
                    ) : (
                        <SignupForm setShowModal={setShowModal} handleLoginClick={handleLoginClick} />
                    )}
                </div>
            ) : null }
            <Footer />
        </div>
    )
}
