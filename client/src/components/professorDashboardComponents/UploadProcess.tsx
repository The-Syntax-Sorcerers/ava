import Dropzone from "../assignmentComponents/dropzone";
import UploadButton from "../assignmentComponents/uploadButton";
import { useState } from 'react';
import UploadPreview from "../assignmentComponents/uploadPreview";
import VerificationSuccess from "../assignmentComponents/verificationSuccessModal";

export default function UploadProcess() {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState<File[]>([]);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 1) {
            setFileUploaded(true);
            setSelectedDocs(Array.from(e.target.files));
        }
    };
    
    const handleSubmit = () => {
        setFileUploaded(false);
        setShowSubmitModal(true)
    };

    return (
        <>
        {fileUploaded ? (
            <div>
            {/* Render the upload preview or upload button */}
            <div className="border-2 border-slate-100 mb-2">
                <UploadPreview docs={selectedDocs.map((file) => ({
                    uri: window.URL.createObjectURL(file),
                    fileName: file.name,
                }))}/>
            </div>
            <UploadButton handleUpload={ handleUpload } />
            <div className="items-center grid grid-cols-1 auto-cols-auto gap-4 mt-4">
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
                        I agree with the&#160; 
                        <a href="/privacy_policy" className="text-blue-600 dark:bg-blue-500 hover:underline">
                            Privacy Policy
                        </a>
                        .
                    </label>
                    </div>
                    <div>
                    <input
                        id="link-checkbox2"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label
                        htmlFor="link-checkbox2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        I hereby acknowledge that all work submitted in this assignment is my original work, created solely by me, unless otherwise indicated.
                    </label>
                    </div>
                    <button
                        className="bg-button-blue rounded-lg px-3 py-2 text-slate-900 font-medium hover:bg-button-blue-darker"
                        type="button"
                        onClick={ handleSubmit }>
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