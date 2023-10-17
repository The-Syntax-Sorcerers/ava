import AnalyticsResults from "./AnalyticsResults";
import UploadProcess from "./UploadProcess";

// The format the states are stored in
interface StatesDict {
    [key: string]: string
}


//{/* Add a tick button & keep trak of the selected ones */}
{/* <input id="link-checkbox" type="checkbox"
className="w-4 h-4 rounded" /> */}

export default function AnalysisSection({states, currentState, assignment}: {states: StatesDict,currentState: string, assignment: any}) {
    console.log('state', currentState);
    console.log('states', states);
    return (
        <>
        {/* TODO: 1. Make new type that just asks for user to select choice from number 2 */}
        {currentState === states.idleMode ? (
            <div className="flex justify-center items-center h-80 border-gray-400 border-2 border-dashed">
                <h1>
                    Please select a file action (Section 2)
                </h1>
            </div>) : (null)
        }

        {/* 2. For comparing against the student */}
        {currentState === states.compareMode ? (
            <>
            <h1 className="text-2xl font-semibold mb-4 mt-4 text-center">
                Comparrison Mode
            </h1>
            <p className="text-base mb-2 pl-2 flex flex-col">
                Upload a document to compare against the student's body of work without uploading it to their profile
            </p>
            <UploadProcess/>
            </>
        ) : (
            null
        )}

        {/* 3. For uploading for the student */}
        {currentState === states.uploadMode ? (
            <>
            <h1 className="text-2xl font-semibold mb-4 mt-4 text-center">
                { assignment.name }
            </h1>
            <p className="text-base font-semibold mb-2 pl-2 flex flex-col">
                Description:
                <p className="pl-4 font-normal">
                    { assignment.desc }
                </p>
            </p>
            <UploadProcess/>
            </>
        ) : (
            null
        )}


        {/* 4. For looking at previously submitted works */}
        {/*<UploadPreview/>*/}
        {/* TODO: Add all of the statistical components */}
        {/* TODO: Add a re-analyse button */}
        {currentState === states.resultsMode ? (
            <AnalyticsResults ass={ assignment }/>) : (null)
        }
        </>
    )
}