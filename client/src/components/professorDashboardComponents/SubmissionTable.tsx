import check from "../../assets/check.svg"
import cross from "../../assets/cross.svg"

const submissionHistory = [
    ['Assignment 1', true],
    ['Assignment 2', false],
    ['Assignment 3', false],
    ['Assignment 4', true],
]

function NotSubmittedIndicator() {
    return (
        <div className="flex justify-center items-center w-1/3">
            <div className="text-lg font-semibold text-red-400 mr-4">
                X
            </div>
            <button className="custom-view-submission-button w-full">
                Submit
            </button>
        </div>
    )
}

// Allows dynamically adding elements for previous submissions
function SubmissionRowElement({title, valid}: {title: string, valid: boolean}) {
    return (
        <li className="flex justify-between w-full py-2 border-x-2 border-b-2 pl-8 pr-4">
            <div className="flex justify-center items-center">
                <div>
                    { title }
                </div>
            </div>
            <div className="flex justify-between items-center w-2/5">
                {/* Indicates verification status on submitted works */}
                {valid ? (
                    // Indicates a succesfully verified submission
                    <div className="text-lg font-semibold text-green-400 mr-4">
                        &#10003;
                    </div>) : (
                    // Indicates an unsuccesfully verified submission
                    <div className="text-lg font-semibold text-red-400 mr-4">
                        X
                    </div>)
                }
                <button className="custom-view-submission-button w-full">
                    View Results
                </button>
            </div>
        </li>
    )
}

// Creates a submission history table for dynamically displaying works based on the selected student
export default function SubmissionTable() {
    return (
        <div className="flex justify-center align-center flex-col text-sm font-semibold w-5/6">
            <div className="border-2 pl-8 rounded-t-lg flex justify-center items-center uppercase font-semibold ease-in-out duration-200 w-full px-3 py-2 text-sm">
                Submission History
            </div>
            {/* The list of previous works */}
            <div>
                <ul className="">
                    {submissionHistory.map((submission) => (
                        <SubmissionRowElement title = { submission[0] } valid = { submission[1] } />
                    ))}
                </ul>
            </div>
            <div className="border-x-2 border-b-2 rounded-b-lg flex justify-center items-center uppercase font-semibold ease-in-out duration-200 w-full px-3 py-2 text-sm">
            </div>
        </div>
    )
}