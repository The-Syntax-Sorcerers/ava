import LoggedInNavbar from '../components/navbarComponents/LoggedInNavbar.tsx'
import Footer from '../components/landingComponents/Footer.tsx'
import DropdownMenu from '../components/professorDashboardComponents/DropdownMenu.tsx'
import StudentInfo from '../components/professorDashboardComponents/StudentInfo.tsx'
import AnalysisSection from '../components/professorDashboardComponents/AnalysisSection.tsx'
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function ProfessorDashboard() {
    // const data = (globalThis as any).template_data
    // console.log("Rendering Ass with Assignments:", data.upcoming, data.past)

    // The different modes of the analysis section, controlled by button clicks in the student section
    const buttonModesConfig = {
        idleMode: 'idle',
        compareMode: 'compare',
        resultsMode: 'results',
        uploadMode: 'upload',
    };

    // Controls the current state of the analysis section based on which mode has been selected in the student info section
    const [currentState, setCurrentState] = useState(buttonModesConfig.idleMode);

    // Determines whether the analysis will save to the student's profile or not
    const [storeResults, setStoreResults] = useState(false);

    // Handles the page logic after the comparrison mode button has been clicked
    const handleCompareButton = () => {
        setStoreResults(false);
        setCurrentState(buttonModesConfig.compareMode);
        console.log('compare');
    }

    // Handles page logic after the view results button in the submission history section has been clicked
    const handleResultsButton = () => {
        setStoreResults(false);
        setCurrentState(buttonModesConfig.resultsMode);
        console.log('results');
    }

    // Handles the page logic after the upload button in the unsubmitted assignments section has been clicked
    const handleSubmitButton = () => {
        setStoreResults(true);
        setCurrentState(buttonModesConfig.uploadMode);
        console.log('submit');
    }

    // Handles the page logic after a new subject is selected
    const handleSubjectSelection = () => {

    }

    // Handles the page logic after a new student is selected
    const handleStudentSelection = () => {
        setCurrentState(buttonModesConfig.idleMode);
    }


    return (
        <div className="flex flex-col min-h-screen custom-pages">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border pt-28 pb-12 w-5/6 min-h-scren">
                <div className="flex justify-between min-h-screen rounded-3xl custom-dashboard-background-colouring">
                    {/* Sidebar */}
                    <div className="custom-dashboard-section w-1/5 rounded-l-3xl">
                        <h1 className="custom-intruction-text">1. Select a Student by Subject</h1>
                        {/* Dropdown menus */}
                        <DropdownMenu titles={ ['Subjects', 'subject'] } click={ handleSubjectSelection }/>
                        <DropdownMenu titles={ ['Students', 'student'] } click={ handleStudentSelection }/>
                    </div>
                    {/* Current selection info */}
                    <div className="custom-dashboard-section w-2/5">
                        <h1 className="custom-intruction-text">2. Select an existing piece of work or submit a new one</h1>
                        <StudentInfo 
                            compare={ handleCompareButton } 
                            results={ handleResultsButton } 
                            upload={ handleSubmitButton }
                        />
                    </div>
                    {/* Result analytics */}
                    <div className="custom-dashboard-section w-2/5 rounded-r-3xl">
                        <h1 className="custom-intruction-text">3. Authorise and View Results</h1>
                        <AnalysisSection states={ buttonModesConfig } currentState={ currentState } store={ storeResults } />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

