import {useState} from 'react';
import LoggedInNavbar from '../components/LoggedInNavbar.tsx'
import Dropzone from '../components/dropzone.tsx'
import UploadButton from '../components/uploadButton.tsx'
import UploadPreview from '../components/uploadPreview.tsx'
import VerificationSuccess from '../components/verificationSuccessModal.tsx'
import Footer from '../components/Footer.tsx'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function AssignmentPage({assignment, user_type}: {assignment: any, user_type: any}) {
    console.log("Rendering AssignmentPage with ass, user:", assignment, user_type)
    const [fileUploaded, setFileUploaded] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [fileSubmitted, setFileSubmitted] = useState(false);
    // const [file, setFile] = useState({ url: PDF1_URL });
 

    const handleUpload = () => {
        setFileUploaded(true);
        setFileSubmitted(false);
        // const fileReader = new window.FileReader();
        // const file = event.target.files[0];
        
        // fileReader.onload = fileLoad => {
        //     const { result } = fileLoad.target;
        //     setFile({ url: result });
        // };
        
        // fileReader.readAsDataURL(file);
    };
    
    const handleSubmit = () => {
        setFileSubmitted(true);
        setFileUploaded(false);
        setShowSubmitModal(true)
    };

    return (
        <div className="bg-main bg-cover min-h-screen flex flex-col">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border pt-28 pb-12 w-5/6">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-semibold mb-4">{assignment.name}</h1>
                    <h2 className="text-xl font-semibold mb-4">{assignment.id}</h2>
                    <h2 className="text-lg font-semibold mb-4">Due on {assignment.due_date}</h2>
                    <p className="text-base mb-4">Description: {assignment.description}</p>
                    <p className="text-base mb-4">Marks: {assignment.marks}</p>
                    <h1 className="text-2xl font-semibold mb-4 mt-5">Submission</h1>
                    {fileSubmitted ? (
                        <div>
                        <p className="text-base mb-4">Looks Like you've already submitted an assignment. Do you want to submit another one?</p>
                        <Dropzone handleUpload={handleUpload}/>
                        </div>
                    ):(<>
                        {fileUploaded ? (
                                <div>
                                    <UploadPreview/>
                                    <UploadButton handleUpload={handleUpload}/>
                                    <div className="flex items-center grid grid-cols-1 auto-cols-auto gap-4 mt-10">
                                        <div>
                                            <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="/privacy_policy" className="text-blue-600 dark:bg-blue-500 hover:underline">Privacy Policy</a>.</label>
                                        </div>
                                        <div>
                                            <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I hereby acknowledge that all work submitted in this assignment is my original work, created solely by me, unless otherwise indicated.</label>
                                        </div>
                                        <button
                                        className="bg-button-blue rounded-lg px-3 py-2 text-slate-900 font-medium hover:bg-button-blue-darker"
                                        type="button"
                                        onClick={handleSubmit}>
                                            Submit
                                    </button>
                                    </div>
                                    
                                </div>
                        ):(<Dropzone handleUpload={handleUpload}/>)}
                        </>
                        )
                        
                    }
                    {showSubmitModal ? (
                        <VerificationSuccess setShowSubmitModal={setShowSubmitModal} result={false}/>
                    ):null
                    }
                </div>
            </main>
            <Footer/>
        </div>

    )
}

