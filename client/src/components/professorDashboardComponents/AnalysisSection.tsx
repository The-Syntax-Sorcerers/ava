import UploadProcess from "./UploadProcess";

// The format the states are stored in
interface StatesDict {
    [key: string]: string
}


//{/* Add a tick button & keep trak of the selected ones */}
{/* <input id="link-checkbox" type="checkbox"
className="w-4 h-4 rounded" /> */}

export default function AnalysisSection({states, currentState}: {states: StatesDict,currentState: string}) {
    return (
        <>
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
            <UploadProcess/>
        ) : (
            null
        )}

        {/* 3. For uploading for the student */}
        {currentState === states.uploadMode ? (
            <UploadProcess/>
        ) : (
            null
        )}


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
                    {/* Render the uploaded assignment */}
                    {/* <UploadPreview docs={selectedDocs.map((file) => ({
                        uri: window.URL.createObjectURL(file),
                        fileName: file.name,
                    }))}/> */}
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