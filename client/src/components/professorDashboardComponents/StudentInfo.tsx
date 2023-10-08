import SubmissionTable from "./SubmissionTable";
import TextDivider from "./TextDivider";

// Creates the subsection of the dashboard relating to the information about a selected student
export default function StudentInfo({compare, results, upload}: {compare: (event: any) => void,
                                                                 results: (event: any) => void, 
                                                                 upload: (event: any) => void}) {
    return (
        <>
        <div className="flex justify-center items-center flex-col w-full">
            {/* Current Selection Cards */}
            <div className="flex justify-center items-center w-5/6 gap-2 mb-4">
                <div className="custom-info-card">
                    Current Subject
                </div>
                <div className="custom-info-card">
                    Current Student
                </div>
            </div>

            {/* Page Divider */}
            <TextDivider text="Compare to body-of-work"/>
            <button 
                onClick={ compare }
                className="custom-form-main-button w-5/6">
                Make New Comparrison
            </button>

            {/* Page Divider */}
            <TextDivider text="View previous submissions"/>
            <h1 className="custom-subtitle-text">
            </h1>
            {/* Submission History Table */}
            <SubmissionTable title="Submission History" submittedClick={ results } unsubmittedClick={ upload }/>

            {/* Page Divider */}
            <TextDivider text="Make a new submission"/>
            <h1 className="custom-subtitle-text">
                
            </h1>
            {/* Unsubmitted Assignments Table */}
            <SubmissionTable title="Unsubmitted Assignments" submittedClick={ results } unsubmittedClick={ upload }/>
        </div>
        </>
    )
}