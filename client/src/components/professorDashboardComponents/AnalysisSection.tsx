import Dropzone from "../assignmentComponents/dropzone";
import UploadPreview from "../assignmentComponents/uploadPreview";
import { useState } from 'react';

// The format the states are stored in
interface StatesDict {
    [key: string]
}

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
                <Dropzone handleUpload={ handleUpload }/>) : (null)
        }

        {/* 3. For uploading for the student */}
        {currentState === states.uploadMode ? (
            <Dropzone handleUpload={ handleUpload }/>) : (null)
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