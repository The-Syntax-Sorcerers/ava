import { Key, useState } from 'react';
import expand from "../../assets/expand.svg";
import collapse from "../../assets/collapse.svg";
// import { title } from 'process';

const submissionHistory = [
    ['Assignment 1', true, true],
    ['Assignment 2', true, true],
    ['Assignment 3', false, true],
    ['Assignment 4', true, true],
]

const assignments = [
    ['Assignment 5', true, false],
    ['Assignment 6', false, false],
    ['Assignment 7', false, false],
    ['Assignment 8', true, false],
]

// Creates the validity indicator and view results button for submitted pieces of work
function SubmittedIndicator({valid, click}: {valid: string | boolean, click: (event: any) => void}) {
    return (
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
            <button 
                onClick={ click }
                className="custom-view-submission-button w-full">
                View Results
            </button>
        </div>
    )
}

// Creates the unverified indicator and submit button for assignments with open submissions
function NotSubmittedIndicator({click}: {click: (event: any) => void}) {
    return (
        <div className="flex justify-center items-center w-2/5">
            <div className="text-lg font-semibold mr-4">
                -
            </div>
            <button 
                onClick={ click }
                className="custom-view-submission-button w-full">
                Submit
            </button>
        </div>
    )
}

// Allows dynamically adding elements for previous submissions
function SubmissionRowElement({click, inAssignment}: {click: (event: any) => void, inAssignment: (string | boolean)[]}) {
    
    const title = inAssignment[0];
    const valid = inAssignment[1];
    const submitted = inAssignment[2];

    return (
        <li className="flex justify-between w-full py-2 border-x-2 border-b-2 pl-8 pr-4">
            <div className="flex justify-center items-center">
                <div>
                    { title }
                </div>
            </div>
            {/* Changes action button and verification indicator based on whether assignment has been submitted or not */}
            {submitted ? (
                <SubmittedIndicator click={ click } valid={ valid }/>) : (
                <NotSubmittedIndicator click={ click }/>)
            }
        </li>
    )
}

// Creates the list of previously submitted assignments
function SubmissionList({title, submittedClick, unsubmittedClick}: {title: string, 
                                                                    submittedClick: (event: any) => void,
                                                                    unsubmittedClick: (event: any) => void}) {
    return (
        <>
        <div>
            <ul>
                {/* TODO: Remove this washed logic check when implementing backend */}
                {title==="Unsubmitted Assignments" ? (
                    assignments.map((assignment, k: Key) => (
                        <SubmissionRowElement click={ unsubmittedClick } inAssignment={assignment} key={k} />
                    ))
                ) : (
                    submissionHistory.map((submission, k: Key) => (
                        <SubmissionRowElement click={ submittedClick }  inAssignment={submission} key={k} />
                    ))
                )}
            </ul>
        </div>
        <div className="border-x-2 border-b-2 rounded-b-lg w-full h-4">
        </div>
        </>
    )
}

// Creates a submission history table for dynamically displaying works based on the selected student
export default function SubmissionTable({title, submittedClick, unsubmittedClick}: {title: string, 
                                                                                   submittedClick: (event: any) => void,
                                                                                   unsubmittedClick: (event: any) => void}) {
    const [showDropdown, setShowDropdown] = useState(true);

    {/* Opens and closes the submission history menu */}
    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown)
    };

    return (
        <div className="flex justify-center align-center flex-col text-sm font-semibold w-5/6">
            <button 
                onClick={handleDropdownClick} 
                className={`custom-collapsable-menu-button
                ${showDropdown ? "custom-collapsable-menu-button-selected rounded-t-lg" : "rounded-lg"} `}>
                { title }
                {/* Reactive dropdown arrow */}
                {showDropdown ? (
                    <img src={ collapse } alt="Collapse Icon"/>) : (
                    <img src={ expand } alt="Expand Icon"/>)
                }
            </button>
            {/* The list of previous works */}
            {showDropdown ? (
                <SubmissionList title={ title } submittedClick={ submittedClick } unsubmittedClick={ unsubmittedClick }/>) : (null)
            }
        </div>
    )
}