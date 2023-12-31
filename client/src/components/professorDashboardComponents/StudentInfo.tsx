import SubmissionTable from "./SubmissionTable";
import TextDivider from "./TextDivider";

// Creates the subsection of the dashboard relating to the information about a selected student
export default function StudentInfo({subAss, unsubAss, currentSubject, currentStudent, compare, results, upload}: {
    subAss: any, unsubAss: any, currentSubject: any, currentStudent: any, 
    compare: (event: any) => void, results: (event: any) => void, upload: (event: any) => void}) {

    // Find the student with id `currentstudent` in the current subject.students
    // const student = currentSubject.students.find((student: any) => student.id === currentStudent.id);
    return (
        <>
        <div className="flex justify-center items-center flex-col w-full">
            {/* Current Selection Cards */}
            <div className="flex justify-center items-stretch w-5/6 gap-2 mb-4">
                <div className="custom-info-card whitespace-normal">
                    <div className="font-bold custom-info-card-content">
                        { currentSubject.name }
                    </div>
                    <div className="text-slate-800 custom-info-card-content">
                        { currentSubject.id }
                    </div>
                </div>
                <div className="custom-info-card">
                    <div className="font-bold custom-info-card-content">
                        { currentStudent.name }
                    </div>
                    <div className="text-slate-800 custom-info-card-content">
                        { currentStudent.id }
                    </div>
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
            <SubmissionTable title="Submission History" submittedClick={ results } unsubmittedClick={ upload } currAss={ subAss }/>

            {/* Page Divider */}
            <TextDivider text="Make a new submission"/>
            <h1 className="custom-subtitle-text">
                
            </h1>
            {/* Unsubmitted Assignments Table */}
            <SubmissionTable title="Unsubmitted Assignments" submittedClick={ results } unsubmittedClick={ upload } currAss={ unsubAss }/>
        </div>
        </>
    );
}