import SubmissionTable from "./SubmissionTable";

export default function StudentInfo() {
    return (
        <>
        {/* Current Selection Cards */}
        <div className="flex justify-center items-center flex-col w-full gap-2">
            <div className="custom-info-card">
                Current Subject
            </div>
            <div className="custom-info-card">
                Current Student
            </div>
        </div>
        {/* Submission History Table */}
        <SubmissionTable/>
        </>
    )
}