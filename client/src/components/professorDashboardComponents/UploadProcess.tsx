import Dropzone from "../assignmentComponents/dropzone";
// import UploadPreview from "../assignmentComponents/uploadPreview";
import UploadButton from "../assignmentComponents/uploadButton";
import { useState } from 'react';
import UploadPreview from "../assignmentComponents/uploadPreview";
import VerificationSuccess from "../assignmentComponents/verificationSuccessModal";

export default function UploadProcess() {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    //const [fileSubmitted, setFileSubmitted] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState<File[]>([]);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 1) {
            setFileUploaded(true);
            //setFileSubmitted(false);
            setSelectedDocs(Array.from(e.target.files));
        }
    };
    
    const handleSubmit = () => {
        //setFileSubmitted(true);
        setFileUploaded(false);
        setShowSubmitModal(true)
    };

    return (
        <>
        <h1 className="text-2xl font-semibold mb-4 mt-5 text-center">Current Assignemnt</h1>
        {fileUploaded ? (
            <div>
            {/* Render the upload preview or upload button */}
            <UploadPreview docs={selectedDocs.map((file) => ({
                uri: window.URL.createObjectURL(file),
                fileName: file.name,
            }))}/>
            <UploadButton handleUpload={ handleUpload } />
            <div className="flex items-center grid grid-cols-1 auto-cols-auto gap-4 mt-10">
                <div>
                    <input
                        id="link-checkbox1"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor="link-checkbox1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        I agree with the <a href="/privacy_policy" className="text-blue-600 dark:bg-blue-500 hover:underline">Privacy Policy</a>.
                    </label>
                    </div>
                    <div>
                    <input
                        id="link-checkbox2"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor="link-checkbox2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        I hereby acknowledge that all work submitted in this assignment is my original work, created solely by me, unless otherwise indicated.
                    </label>
                    </div>
                    <button
                    className="bg-button-blue rounded-lg px-3 py-2 text-slate-900 font-medium hover:bg-button-blue-darker"
                    type="button"
                    onClick={ handleSubmit }
                    >
                    Submit
                    </button>
                </div>
            </div>
        ) : (
            <Dropzone handleUpload={ handleUpload } />
        )}
        {showSubmitModal ? (
                    <VerificationSuccess setShowSubmitModal={setShowSubmitModal} result={false}/>
                ) : ( 
                    null
                )}
        </>
    )
}