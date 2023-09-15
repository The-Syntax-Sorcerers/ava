import LoggedInNavbar from "../components/LoggedInNavbar";
import PolicyList from "../components/PolicyList";
// Import Footer from "../components/Footer";

export default function PrivacyPolicy() {
    // The most recent edit date of the privacy policy
    const editDate = '14/08/23'
   
    return (
        <div className="bg-main bg-cover flex flex-col min-h-screen">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border p-40 min-h-screen">
                <div className="mb-4 flex flex-col justify-center items-center">
                    <h1 className='text-3xl font-bold'>Privacy Policy</h1>
                    <p className='text-lg'>Last updated: {editDate}</p>
                </div>
                <PolicyList />
            </main>
            {/* <Footer /> */}
        </div>
    )
}
