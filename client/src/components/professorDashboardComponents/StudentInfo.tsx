import SubmissionTable from "./SubmissionTable";
import TextDivider from "./TextDivider";

// Creates the subsection of the dashboard relating to the information about a selected student
export default function StudentInfo() {
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

            <h1 className="custom-subtitle-text">
                Compare to body of work
            </h1>
            {/* Submission History Table */}
            <SubmissionTable title="Submission History"/>

            {/* Page Divider */}
            <TextDivider text="or"/>
            <h1 className="custom-subtitle-text">
                Make a new submission
            </h1>
            {/* Unsubmitted Assignments Table */}
            <SubmissionTable title="Unsubmitted Assignments"/>

            {/* Page Divider */}
            <TextDivider text="or"/>
            <h1 className="custom-subtitle-text">
                Make a one off comparrsion  
            </h1>
            <button className="custom-form-main-button w-5/6">
                Make New Comparrison
            </button>
        </div>
        </>
    )
}