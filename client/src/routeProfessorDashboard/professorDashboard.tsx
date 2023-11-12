import LoggedInNavbar from '../components/navbarComponents/LoggedInNavbar.tsx'
import Footer from '../components/landingComponents/Footer.tsx'
import DropdownMenu from '../components/professorDashboardComponents/DropdownMenu.tsx'
import StudentInfo from '../components/professorDashboardComponents/StudentInfo.tsx'
import AnalysisSection from '../components/professorDashboardComponents/AnalysisSection.tsx'
import { useState, useEffect } from 'react';

// The different modes of the analysis section, controlled by button clicks in the student section
const buttonModesConfig = {
    idleMode: 'idle',
    compareMode: 'compare',
    resultsMode: 'results',
    uploadMode: 'upload',
};

export default function ProfessorDashboard() {
    // Update the assignments to display based on the current student
    function updateAssignments(assignments: any) {
        // Assignments for the submission history dropdown
        const submittedAssignments = [];
        // Assignments for the unsubmitted assignments dropdown
        const unsubmittedAssignments = [];
    
        // Checking whether the assignment has a submission score to determine set ownership
        for (const submission of assignments) {
            if (submission.similarity_score !== null) {
                submittedAssignments.push(submission);
            } else {
                unsubmittedAssignments.push(submission);
            }
        }
    
        setSubmittedAssignments(submittedAssignments);
        setUnsubmittedAssignments(unsubmittedAssignments);
    }

    // Update current assignment based on assignment clicked
    function updateFocusedAssignment(student_id: number, focus_id: number) {
        const assignments = studentItems[student_id].submissions
        for (const i in assignments) {
            if (assignments[i].assignment_id === focus_id) {
                setFocusedAssignment(assignments[i])
                return;
            }
        }
    }

    // Update current list of students based on subject clicked
    function updateStudentList(subject_id: string) {
        // Student ids stored in the subject
        const student_ids: number[] = subjectItems[subject_id].students;
        // Grabbing students from the list of students by collected ids
        const students: {[key: string]: object} = {};
        for (const i in student_ids) {
            students[student_ids[i]] = studentItems[student_ids[i]];
        }
        setCurrentStudents(students);
    }

    // Reading in the data from the server or the mock data
    const data = (globalThis as any).template_data
    const subjectItems: { [key: string]: { students: number[] } } = data.subjectItems;
    const subjectItemsArray: { students: number[] }[] = Object.values(subjectItems).filter((item: { students: number[] }) => item.students.length > 0);
    const studentItems = data.studentItems;

    // Controls the current state of the analysis section based on which mode has been selected in the student info section
    const [currentState, setCurrentState] = useState(buttonModesConfig.idleMode);

    // Stores the currently selected student, subject, and set of assignments
    const [currentSubject, setCurrentSubject]: any = useState(subjectItemsArray[0]);
    const [currentStudent, setCurrentStudent]: any = useState(studentItems[currentSubject.students[0]]);
    const [submittedAssignments, setSubmittedAssignments]: any = useState([]); // Student's submitted assignments
    const [unsubmittedAssignments, setUnsubmittedAssignments]: any = useState([]); //student's unsubmitted assignments
    const [currentStudents, setCurrentStudents]: any = useState([]); // Students in current subject

    // Stores the currently selected assignment info
    const [focusedAssignment, setFocusedAssignment]: any = useState(null);
    const [focusedAnalytics, setFocusedAnalytics]: any = useState(null);
    const [seed, setSeed] = useState(1);
    const reset = () => {
        setSeed(Math.random());
    }
       

    // Calls the function a single time to initialise assignment and student data on startup
    useEffect(() => {
        if (currentStudent.submissions.length !== 0) {
            updateAssignments(currentStudent.submissions);
        }
        updateStudentList(currentSubject.id);
    }, []);

    // Handles the page logic after the comparrison mode button has been clicked
    const handleCompareButton = () => {
        setCurrentState(buttonModesConfig.compareMode);
    }

    // Handles page logic after the view results button in the submission history section has been clicked
    const handleResultsButton: React.FormEventHandler<HTMLFormElement> = (event) => {
        setCurrentState(buttonModesConfig.resultsMode);
        updateFocusedAssignment(currentStudent.id, parseInt(event.currentTarget.value));
    }

    // Handles the page logic after the upload button in the unsubmitted assignments section has been clicked
    const handleSubmitButton: React.FormEventHandler<HTMLFormElement> = (event) => {
        setCurrentState(buttonModesConfig.uploadMode);
        updateFocusedAssignment(currentStudent.id, parseInt(event.currentTarget.value));
    }

    // Handles the page logic after a new subject is selected based on returned subject_id
    const handleSubjectSelection: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const subject_id = event.currentTarget.value;
        
        setCurrentSubject(subjectItems[subject_id]);
        updateStudentList(subject_id);
        if (subjectItems[subject_id].students.length != 0){
            setCurrentStudent(studentItems[subjectItems[subject_id].students[0]]);
            updateAssignments(studentItems[subjectItems[subject_id].students[0]].submissions);
            setFocusedAnalytics(studentItems[subjectItems[subject_id].students[0]].analytics);
        } else {
            setCurrentStudent(null);
            setFocusedAnalytics(null);
        }
        setFocusedAssignment(null);
        setCurrentState(buttonModesConfig.idleMode);
        reset();
    }

    // Handles the page logic after a new student is selected
    const handleStudentSelection: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const student_id = event.currentTarget.value;

        setCurrentStudent(studentItems[student_id]);
        updateAssignments(studentItems[student_id].submissions);
        setFocusedAssignment(null);
        setCurrentState(buttonModesConfig.idleMode);
        setFocusedAnalytics(studentItems[student_id].analytics);
        reset();
    }

    return (
        <div className="flex flex-col min-h-screen custom-pages">
            <main className="container flex-grow box-border pt-28 pb-12 w-[100vw] min-h-scren min-w-[85vw] mx-auto">
                <div className="flex justify-between min-h-screen rounded-3xl custom-dashboard-background-colouring">
                    {/* Sidebar */}
                    <div className="custom-dashboard-section w-1/5 rounded-l-3xl">
                        <h1 className="custom-instruction-text">1. Select a Student by Subject</h1>
                        {/* Dropdown menus */}
                        <DropdownMenu itemsList={ subjectItems }  titles={ ['Subjects', 'subject'] } click={ handleSubjectSelection }/>
                        <DropdownMenu itemsList={ currentStudents } titles={ ['Students', 'student'] } click={ handleStudentSelection }/>
                    </div>
                    {/* Current selection info */}
                    <div className="custom-dashboard-section w-2/5">
                        <h1 className="custom-instruction-text">2. Select an Existing Piece of Work or Submit a New One</h1>
                        {currentStudent ? (<StudentInfo 
                            subAss={ submittedAssignments }
                            unsubAss={ unsubmittedAssignments }
                            currentSubject={ currentSubject }
                            currentStudent={ currentStudent }
                            compare={ handleCompareButton } 
                            results={ handleResultsButton } 
                            upload={ handleSubmitButton }
                        />) : 
                        (
                            <h1 className="custom-instruction-text">There are no students enrolled in this subject.</h1>
                        )}
                        
                    </div>
                    {/* Result analytics */}
                    <div className="custom-dashboard-section w-2/5 rounded-r-3xl">
                        <h1 className="custom-instruction-text">3. Authorise and View Results</h1>
                        {focusedAnalytics ? (<AnalysisSection 
                            states={ buttonModesConfig } 
                            currentState={ currentState } 
                            assignment={ focusedAssignment }
                            analytics={ focusedAnalytics }
                            key={seed}
                        />):(
                            <h1 className="custom-instruction-text">Nothing to see here &#128064;</h1>
                        )}
                    </div>
                </div>
            </main>
            <LoggedInNavbar/>
            <Footer/>
        </div>
    )
}