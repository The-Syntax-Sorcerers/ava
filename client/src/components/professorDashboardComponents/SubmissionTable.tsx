import check from "../../assets/check.svg"
import cross from "../../assets/cross.svg"

const submissionHistory = [
    ['Ass1', true],
    ['Ass2', false],
    ['Ass3', false],
    ['Ass4', true],
]

function SubmittedIndicator() {
    return (
        <div className="flex justify-between items-center w-1/3">
            <div className="text-lg font-semibold text-green-400 mr-4">
                &#10003;
            </div>
            <button className="custom-view-submission-button w-full">
                View Results
            </button>
        </div>
    )
}

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

//
function SubmissionRowElement({title, valid}: {title: string, valid: boolean}) {
    return (
        <li className="flex justify-between w-full py-2 border-x-2 border-b-2 pl-8 pr-4">
            <div className="">
                <div className="">
                    COMP10010
                </div>
                <div>
                    { title }
                </div>
            </div>
                {valid ? (
                    <SubmittedIndicator/>) : (
                        <NotSubmittedIndicator/>)
                }
        </li>
    )
}

//
export default function SubmissionTable() {
    return (
        <div className="flex justify-center align-center flex-col text-sm font-semibold w-5/6">
            <div className="border-2 pl-8 rounded-t-lg flex justify-center items-center uppercase font-semibold ease-in-out duration-200 w-full px-3 py-2 text-sm">
                Submission History
            </div>
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