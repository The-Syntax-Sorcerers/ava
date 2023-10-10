import Dropzone from "../assignmentComponents/dropzone";
// import UploadPreview from "../assignmentComponents/uploadPreview";
import UploadButton from "../assignmentComponents/uploadButton";
import { useState } from 'react';
import UploadPreview from "../assignmentComponents/uploadPreview";
import VerificationSuccess from "../assignmentComponents/verificationSuccessModal";

// The format the states are stored in
interface StatesDict {
    [key: string]: string
}


//{/* Add a tick button & keep trak of the selected ones */}
{/* <input id="link-checkbox" type="checkbox"
className="w-4 h-4 rounded" /> */}

export default function AnalysisSection({states, currentState, store}: {states: StatesDict,currentState: string, store: boolean}) {

    const [fileUploaded, setFileUploaded] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [fileSubmitted, setFileSubmitted] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState<File[]>([]);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 1) {
            setFileUploaded(true);
            setFileSubmitted(false);
            setSelectedDocs(Array.from(e.target.files));
        }
    };
    
    const handleSubmit = () => {
        setFileSubmitted(true);
        setFileUploaded(false);
        setShowSubmitModal(true)
    };

    return (
        <>
        {/* TODO: Wrap all of these options into their own components */}
        <h1>state = { currentState }, store = { store ? 'true' : 'false' }</h1>

        {/* TODO: 1. Make new type that just asks for user to select choice from number 2 */}
        {currentState === states.IdleMode ? (
            <div className="flex justify-center items-center h-48 border-gray-400 border-2 border-dashed">
                <h1>
                    Please select a file action (Section 2)
                </h1>
            </div>) : (null)
        }

        {/* 2. For comparing against the student */}
        {currentState === states.compareMode ? (
            <>
                <h1 className="text-2xl font-semibold mb-4 mt-5">Submission</h1>
                {fileSubmitted ? (
                    <div>
                    <p className="text-base mb-4">Looks Like you've already submitted an assignment. Do you want to submit another one?</p>
                    <Dropzone handleUpload={handleUpload}/>
                    </div>
                ):(<>
                    {fileUploaded ? (
                            <div>
                                <UploadPreview docs={selectedDocs.map((file) => ({
                                    uri: window.URL.createObjectURL(file),
                                    fileName: file.name,
                                }))}/>
                                <UploadButton handleUpload={handleUpload}/>
                                <div className="flex items-center grid grid-cols-1 auto-cols-auto gap-4 mt-10">
                                    
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
            </>
        ) : (null)
        }

        {/* 3. For uploading for the student */}
        {currentState === states.uploadMode ? (
            fileUploaded ? (
                <div>
                {/* Render the upload preview or upload button */}
                {/* <UploadPreview docs={selectedDocs.map((file) => ({
                    uri: window.URL.createObjectURL(file),
                    fileName: file.name,
                }))}/> */}
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
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
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
                )
            ) : (
            null
            )
        }


        {/* 4. For looking at previously submitted works */}
        {/*<UploadPreview/>*/}
        {/* TODO: Add all of the statistical components */}
        {/* TODO: Add a re-analyse button */}
        {currentState === states.resultsMode ? (
            <div className="flex flex-col justify-center">
                <div className="flex justify-center items-center h-12 border-gray-400 border-2 border-dashed">
                    <h1>
                        The score given to the work
                    </h1>
                </div>
                <div className="flex justify-center items-center h-80 border-gray-400 border-2 border-dashed">
                    <h1>
                        Placeholder showing the uploaded text
                    </h1>
                </div>
                <div className="flex justify-center">
                    <button className="custom-form-button w-1/2 my-4">
                        Re-Analyse on current body-of-work
                    </button>
                </div>
                <div className="flex justify-center items-center h-64 border-gray-400 border-2 border-dashed">
                    <h1>
                        Just imagine there's hella stats and stuff here
                    </h1>
                </div>
            </div>) : (null)
        }
        </>
    )
}