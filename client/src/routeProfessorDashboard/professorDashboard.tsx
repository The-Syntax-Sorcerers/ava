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
    // Update the assignments based on the current student
    function updateAssignments(assignments: any) {
        const submittedAssignments = [];
        const unsubmittedAssignments = [];
    
        for (const submission of assignments) {
            if (submission.similarity_score !== null) {
                submittedAssignments.push({ id: submission.assignment_id, score: submission.similarity_score, name: assignmentItems[submission.assignment_id].name });
            } else {
                unsubmittedAssignments.push({ id: submission.assignment_id, score: null, name: assignmentItems[submission.assignment_id].name });
            }
        }
    
        setSubmittedAssignments(submittedAssignments);
        setUnsubmittedAssignments(unsubmittedAssignments);

        console.log("sub", submittedAssignments);
        console.log("unsub", unsubmittedAssignments);
    }

    // Update current assignment based on assignment clicked
    function updateFocusedAssignment(value: any[]) {
        const focus_id = value[0];
        const score = value[1];

        for (const a in unsubmittedAssignments) {
            if (unsubmittedAssignments[a].id === focus_id) {
                setFocusedAssignment({id: focus_id, name: unsubmittedAssignments[a].name})
                if (score !== null) {
                    updateFocusedResults(value);
                }
                return;
            }
        }
    }

    // Update current assignment score based on assignment clicked
    function updateFocusedResults(value: any[]) {
        const focus_id = value[0];
        const score = value[1];

        for (const a in currentAssignments) {
            if (currentAssignments[a].assignment_id === focus_id) {
                setFocusAssignmentScore(score)
                return;
            }
        }
    }

    const data = (globalThis as any).template_data
    const subjectItems = data.subjectItems;
    const subjectItemsArray = Object.values(subjectItems);
    const assignmentItems = data.assignmentItems;
    console.log("Rendering AdminDash with Data:", data)

    // Controls the current state of the analysis section based on which mode has been selected in the student info section
    const [currentState, setCurrentState] = useState(buttonModesConfig.idleMode);

    // Stores the currently selected student and subject
    const [currentSubject, setCurrentSubject]: any = useState(subjectItemsArray[0]);
    const [currentStudent, setCurrentStudent]: any = useState(currentSubject.students[0]);
    const [currentAssignments, setCurrentAssignments]: any = useState(currentStudent.submissions);

    // Stores the currently selected assignment info
    const [focusedAssignment, setFocusedAssignment]: any = useState(null);
    const [focusedAssignmentScore, setFocusAssignmentScore]: any = useState(null);

    // Stores the currently selected student's assignments as submitted and unsubmitted groups
    const [submittedAssignments, setSubmittedAssignments]: any = useState([]);
    const [unsubmittedAssignments, setUnsubmittedAssignments]: any = useState([]);
    // Calls the function a single time to initialise assignments
    useEffect(() => {
        updateAssignments(currentAssignments);
    }, []);

    // Handles the page logic after the comparrison mode button has been clicked
    const handleCompareButton = () => {
        setCurrentState(buttonModesConfig.compareMode);
        console.log('compare');
    }

    // Handles page logic after the view results button in the submission history section has been clicked
    const handleResultsButton: React.FormEventHandler<HTMLFormElement> = (event) => {
        setCurrentState(buttonModesConfig.resultsMode);
        setFocusedAssignment(currentAssignments[event.currentTarget.value]);
        setFocusAssignmentScore();
        console.log('results', event.currentTarget.value);
    }

    // Handles the page logic after the upload button in the unsubmitted assignments section has been clicked
    const handleSubmitButton: React.FormEventHandler<HTMLFormElement> = (event) => {
        setCurrentState(buttonModesConfig.uploadMode);
        setFocusedAssignment(currentAssignments[event.currentTarget.value]);
        console.log('submit');
    }

    // console.log("current subject is set to", currentSubject)
    // console.log(currentSubject.id)
    // console.log("Active", currentSubject)

    // Handles the page logic after a new subject is selected
    const handleSubjectSelection: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setCurrentSubject(subjectItems[event.currentTarget.value]);
        setCurrentStudent(subjectItems[event.currentTarget.value].students[0])
        setCurrentAssignments(currentStudent.submissions);
        updateAssignments(subjectItems[event.currentTarget.value].students[0].submissions);
        // console.log("current subject is set to", currentSubject)
        // console.log("SubjectHandler", event.currentTarget);
    }

    // Handles the page logic after a new student is selected
    const handleStudentSelection: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const student = currentSubject.students.find((s: any) => s.id == event.currentTarget.value);
        setCurrentStudent(student);
        console.log("before", currentAssignments);
        console.log("student", student);
        console.log("adding", student.submissions);
        setCurrentAssignments(student.submissions);
        updateAssignments(student.submissions);
        console.log("after", currentAssignments);
        // console.log("current student is set to", currentStudent)
        // console.log("StudentHandler", event.currentTarget.value);
        setCurrentState(buttonModesConfig.idleMode);
    }

    console.log("============================================================")
    return (
        <div className="flex flex-col min-h-screen custom-pages">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border pt-28 pb-12 w-5/6 min-h-scren">
                <div className="flex justify-between min-h-screen rounded-3xl custom-dashboard-background-colouring">
                    {/* Sidebar */}
                    <div className="custom-dashboard-section w-1/5 rounded-l-3xl">
                        <h1 className="custom-intruction-text">1. Select a Student by Subject</h1>
                        {/* Dropdown menus */}
                        <DropdownMenu currentSubject={currentSubject} subjectItems={subjectItems}  titles={ ['Subjects', 'subject'] } click={ handleSubjectSelection }/>
                        <DropdownMenu currentSubject={currentSubject} subjectItems={subjectItems} titles={ ['Students', 'student'] } click={ handleStudentSelection }/>
                    </div>
                    {/* Current selection info */}
                    <div className="custom-dashboard-section w-2/5">
                        <h1 className="custom-intruction-text">2. Select an Existing Piece of Work or Submit a New One</h1>
                        <StudentInfo 
                            subAss={ submittedAssignments }
                            unsubAss={ unsubmittedAssignments }
                            currentSubject={currentSubject}
                            currentStudent={currentStudent}
                            compare={ handleCompareButton } 
                            results={ handleResultsButton } 
                            upload={ handleSubmitButton }
                        />
                    </div>
                    {/* Result analytics */}
                    <div className="custom-dashboard-section w-2/5 rounded-r-3xl">
                        <h1 className="custom-intruction-text">3. Authorise and View Results</h1>
                        <AnalysisSection states={ buttonModesConfig } currentState={ currentState }/>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

