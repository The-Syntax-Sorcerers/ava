import Dropzone from "../assignmentComponents/dropzone";
import UploadPreview from "../assignmentComponents/uploadPreview";
import { useState } from 'react';

export default function AnalysisSection({idle, upload, results, store}: {idle: boolean, upload: boolean, results: boolean, store: boolean}) {

    // const [recordComparrison, setRecordComparrison] = useState(false);
    // const [showAnalysis, setShowAnalysis] = useState(false);

    // const [fileUploaded, setFileUploaded] = useState(false);
    // const [showSubmitModal, setShowSubmitModal] = useState(false);
    // const [fileSubmitted, setFileSubmitted] = useState(false);
    // const [selectedDocs, setSelectedDocs] = useState<File[]>([]);

    // const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files?.length === 1) {
    //         setFileUploaded(true);
    //         setFileSubmitted(false);
    //         setSelectedDocs(Array.from(e.target.files));
    //     }
    // };

    return (
        <>
        {/* TODO: Wrap all of these options into their own components */}

        {/* TODO: 1. Make new type that just asks for user to select choice from number 2 */}
        <div className="flex justify-center items-center h-48 border-gray-400 border-2 border-dashed">
            <h1>
                Please select a file action (Section 2)
            </h1>
        </div>

        {/* 2. For comparing against the student */}
        {/*<Dropzone handleUpload={ handleUpload }/>*/}

        {/* 3. For uploading for the student */}
        {/*<Dropzone handleUpload={ handleUpload }/>*/}

        {/* 4. For looking at previously submitted works */}
        {/*<UploadPreview/>*/}
        {/* TODO: Add all of the statistical components */}
        {/* TODO: Add a re-analyse button */}
        </>
    )
}