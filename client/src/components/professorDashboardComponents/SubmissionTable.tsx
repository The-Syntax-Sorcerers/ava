import { useState } from 'react';
import expand from "../../assets/expand.svg";
import collapse from "../../assets/collapse.svg";


// The type of objects being passed in
type currAssType = {
    assignment_id: number;
    description: string;
    name: string;
    similarity_score: number;
    subject_id: string;
    user_id: number;
};

// Creates the validity indicator and view results button for submitted pieces of work
function SubmittedIndicator({valid, click, id}: {valid: string | boolean, click: (event: any) => void, id: number}) {
    return (
        <div className="flex justify-between items-center w-2/5">
            {/* Indicates verification status on submitted works */}
            {valid ? (
                // Indicates a succesfully verified submission
                <div className="text-lg font-semibold text-green-400 mr-6 max-w-[1px]">
                    &#10003;
                </div>) : (
                // Indicates an unsuccesfully verified submission
                <div className="text-lg font-semibold text-red-400 mr-6 max-w-[1px]">
                    X
                </div>)
            }
            <button 
                value={ id }
                onClick={ click }
                className="custom-view-submission-button w-full">
                View Results
            </button>
        </div>
    )
}

// Creates the unverified indicator and submit button for assignments with open submissions
function NotSubmittedIndicator({click, id}: {click: (event: any) => void, id: number}) {
    return (
        <div className="flex justify-center items-center w-2/5">
            <div className="text-lg font-semibold mr-6 max-w-[1px]">
                -
            </div>
            <button 
                value={ id }
                onClick={ click }
                className="custom-view-submission-button w-full">
                Submit
            </button>
        </div>
    )
}

// Indicates there is nothing to put in the table
function EmptyListElement() {
    return (
        <li className="w-full py-2 border-x-2 border-b-2 pl-8 pr-4 text-center">
            Nothing to see here &#128064;
        </li>
    )
}

// Allows dynamically adding elements for previous submissions
function SubmissionRowElement({click, name, score, id}: {
    click: (event: any) => void, name: string, score: number | null, id: number}) {
    
    // Parsing whether the current assignment has been submitted or not
    const submitted = score !== null;
    const valid = (submitted) && (score >= 0.5) ? true : false;

    return (
        <li className="flex justify-between w-full py-2 border-x-2 border-b-2 pl-8 pr-4">
            <div className="flex justify-center items-center">
                <div>
                    { name }
                </div>
            </div>
            {/* Changes action button and verification indicator based on whether assignment has been submitted or not */}
            {submitted ? (
                <SubmittedIndicator click={ click } valid={ valid } id={ id }/>) : (
                <NotSubmittedIndicator click={ click } id={ id }/>)
            }
        </li>
    )
}

// Creates the list of previously submitted assignments
function SubmissionList({title, submittedClick, unsubmittedClick, currAss}: {
    title: string, submittedClick: (event: any) => void, unsubmittedClick: (event: any) => void, currAss: currAssType[]}) {
    return (
        <>
        <div className="overflow-auto max-h-[30vh]">
            <ul>
                {currAss.length === 0 ? (
                    <EmptyListElement />
                    ) : (
                    title === "Unsubmitted Assignments" ? (
                        currAss.map((a) => (
                        <SubmissionRowElement click={unsubmittedClick} name={a.name} score={a.similarity_score} id={a.assignment_id}/>
                        ))
                    ) : (
                        currAss.map((a) => (
                        <SubmissionRowElement click={submittedClick} name={a.name} score={a.similarity_score} id={a.assignment_id}/>
                        ))
                    )
                )}
            </ul>
        </div>
        <div className="border-x-2 border-b-2 rounded-b-lg w-full h-4">
        </div>
        </>
    )
}

// Creates a submission history table for dynamically displaying works based on the selected student
export default function SubmissionTable({title, submittedClick, unsubmittedClick, currAss}: {
    title: string, submittedClick: (event: any) => void, unsubmittedClick: (event: any) => void, currAss: currAssType[]}) {

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
                <SubmissionList title={ title } submittedClick={ submittedClick } unsubmittedClick={ unsubmittedClick } currAss={ currAss }/>) : (null)
            }
        </div>
    )
}