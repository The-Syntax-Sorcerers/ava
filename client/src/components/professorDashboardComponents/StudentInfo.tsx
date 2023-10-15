// import AddNewStudent from "./AddNewStudent";
import AddNewSubject from "./AddNewSubject";
import SubmissionTable from "./SubmissionTable";
import TextDivider from "./TextDivider";

// Creates the subsection of the dashboard relating to the information about a selected student
export default function StudentInfo({allSubjects, currentSubject, currentStudent, compare, results, upload}: {allSubjects: any, currentSubject: any, currentStudent: any, 
    compare: (event: any) => void, results: (event: any) => void, upload: (event: any) => void}) {

        // Find the student with id `currentstudent` in the current subject.students
        // const student = currentSubject.students.find((student: any) => student.id === currentStudent.id);
        console.log("current", currentSubject)
        return (
            <>
            <div className="flex justify-center items-center flex-col w-full">
                {/* Current Selection Cards */}
                <div className="flex justify-center items-center w-5/6 gap-2 mb-4">
                    {/* <button 
                        className="custom-info-card">
                        {currentSubject.id + ": " + currentSubject.name}
                    </button> */}
                    <div className="custom-info-card">
                        <div className="font-bold">{ currentSubject.name }</div>
                        <div className="text-slate-800">{ currentSubject.id }</div>
                    </div>
                    {/* Pass in the keys in `allSubjects` */}
                    {/* <AddNewSubject subjects={Object.keys(allSubjects)}/> */}
                    {/* <button 
                        className="custom-info-card">
                        {currentStudent.id + ": " + currentStudent.name}
                    </button> */}
                    <div className="custom-info-card">
                        <div className="font-bold">{ currentStudent.name }</div>
                        <div className="text-slate-800">{ currentStudent.id }</div>
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
        );
}