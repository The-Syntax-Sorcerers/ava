import FileComponent from "../assignmentComponents/FileComponent";
import AnalyticsResults from "./AnalyticsResults";

// The format the states are stored in
interface StatesDict {
    [key: string]: string
}

export default function AnalysisSection({states, currentState, assignment}: {states: StatesDict, currentState: string, assignment: any}) {

    return (
        <>
        {/* TODO: 1. Make new type that just asks for user to select choice from number 2 */}
        {currentState === states.idleMode ? (
            <div className="flex justify-center items-center h-full border-gray-400 border-2 border-dashed rounded-lg">
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
                {/* <FileComponent subject_id={} assignment_id={} user_id={}/> */}
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
                        { assignment.description }
                    </p>
                </p>
                <FileComponent subject_id={assignment.subject_id} assignment_id={assignment.assignment_id} user_id={assignment.user_id} />
            </>
        ) : (
            null
        )}

        {/* 4. For looking at previously submitted works */}
        {currentState === states.resultsMode ? (
            <AnalyticsResults ass={ assignment }/>) : (null)
        }
        </>
    )
}