import SubmissionTable from "./SubmissionTable";

export default function StudentInfo() {
    return (
        <>
        <div className="flex justify-center items-center flex-col w-full">
            {/* Current Selection Cards */}
            <div className="flex justify-center items-center flex-col w-5/6 gap-2">
                <div className="custom-info-card">
                    Current Subject
                </div>
                <div className="custom-info-card">
                    Current Student
                </div>
            </div>
            <button className="custom-form-main-button mt-4 w-5/6">
                Make New Comparrison
            </button>
            {/* Page Divider */}
            <div className="custom-text-divider">
                 or
             </div>
            {/* Submission History Table */}
            <SubmissionTable/>
        </div>
        </>
    )
}