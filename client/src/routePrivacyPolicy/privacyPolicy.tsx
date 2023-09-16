import { useState } from 'react';
import LoggedInNavbar from "../components/LoggedInNavbar";
import AnonymousNavbar from "../components/AnonymousNavbar";
import PolicyList from "../components/PolicyList";
import LoginForm from "../components/loginModal";
import SignupForm from "../components/signUpModal";
import Footer from "../components/Footer";

export default function PrivacyPolicy({ auth_user }: { auth_user: boolean }) {
    // The most recent edit date of the privacy policy
    const editDate = '14/08/23'

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
        <div className="bg-cover flex flex-col min-h-screen">
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
                    <div className="mb-4 flex flex-col justify-center items-center">
                        <h1 className='text-3xl font-bold'>Privacy Policy</h1>
                        <p className='text-lg'>Last updated: { editDate }</p>
                    </div>
                    <PolicyList />
                </div>
            </main>
            { showModal ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {showLoginForm ? (
                        <LoginForm setShowModal={setShowModal}/>
                    ) : (
                        <SignupForm setShowModal={setShowModal} />
                    )}
                </div>
            ) : null }
            <Footer />
        </div>
    )
}
