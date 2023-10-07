import { useState } from 'react';
import expand from "../../assets/expand.svg";
import collapse from "../../assets/collapse.svg";

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

// Creates the list of previously submitted assignments
function SubmissionList() {
    return (
        <>
        <div>
            <ul className="">
                {submissionHistory.map((submission) => (
                    <SubmissionRowElement title = { submission[0] } valid = { submission[1] } />
                ))}
            </ul>
        </div>
        <div className="border-x-2 border-b-2 rounded-b-lg w-full h-4">
        </div>
        </>
    )
}

// Creates a submission history table for dynamically displaying works based on the selected student
export default function SubmissionTable() {
    const [showDropdown, setShowDropdown] = useState(true);

    {/* Opens and closes the submission history menu */}
    const handleDropdownClick = () => {
        console.log('clicked')
        setShowDropdown(!showDropdown)
    };

    return (
        <div className="flex justify-center align-center flex-col text-sm font-semibold w-5/6">
            <button 
                onClick={handleDropdownClick} 
                className={`border-2 pl-8 flex justify-center items-center uppercase font-semibold w-full px-3 py-2 text-sm
                ${showDropdown ? "rounded-t-lg" : "rounded-lg"} `}>
                Submission History
                {/* Reactive dropdown arrow */}
                {showDropdown ? (
                    <img src={ collapse } alt="Collapse Icon"/>) : (
                    <img src={ expand } alt="Expand Icon"/>)
                }
            </button>
            {/* The list of previous works */}
            {showDropdown ? (
                <SubmissionList/>) : (null)
            }
        </div>
    )
}