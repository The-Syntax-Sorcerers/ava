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
            {/* Page Divider */}
            <div className="relative flex items-center w-5/6 m-4">
                <div className="flex-grow h-0 border-t border-black"></div>
                <div className="flex justify-center items-center">
                    <h1 className="px-2 text-xs font-semibold">
                        compare to body of work
                    </h1>
                </div>
                <div className="flex-grow h-0 border-t border-black"></div>
            </div>
            <button className="custom-form-main-button w-5/6">
                Make New Comparrison
            </button>
            {/* Page Divider */}
            <div className="relative flex items-center w-5/6 m-4">
                <div className="flex-grow h-0 border-t border-black"></div>
                <div className="flex justify-center items-center">
                    <h1 className="px-2 text-xs font-semibold">
                        or
                    </h1>
                </div>
                <div className="flex-grow h-0 border-t border-black"></div>
            </div>
            {/* Submission History Table */}
            <SubmissionTable/>
        </div>
        </>
    )
}