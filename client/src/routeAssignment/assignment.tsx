import {Key, useState} from 'react';
import LoggedInNavbar from '../components/navbarComponents/LoggedInNavbar.tsx'
import VerificationSuccess from '../components/assignmentComponents/verificationSuccessModal.tsx'
import StudentCard, {studentObj} from '../components/subjectComponents/studentCard.tsx'
import Footer from '../components/landingComponents/Footer.tsx'
import FileComponent from '../components/assignmentComponents/FileComponent.tsx';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function AssignmentPage() {
    
    const data = (globalThis as any).template_data
    const assignment = data.assignment
    const user_type = data.user_type

    const [showSubmitModal, setShowSubmitModal] = useState(data.showSubmitModal);
    const serverVerificationSuccess = data.verificationSuccess;
    if(assignment !== undefined && assignment.due_date == null) assignment.due_date = "None"


    console.log("Rendering AssignmentPage with ass, user:", assignment, user_type)

    return (
        <div className="min-h-screen flex flex-col custom-pages">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border pt-28 pb-12 w-5/6">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-semibold mb-4">{assignment.id} - {assignment.name}</h1>
                    <h2 className="text-lg font-semibold mb-4">Due on: {assignment.due_date}</h2>
                    <p className="text-base mb-4">Description: {assignment.description}</p>
                    <p className="text-base mb-4">Marks: {assignment.marks}</p>
                
                    {user_type == "teacher" ? (
                        <>
                            <h1 className="text-2xl font-semibold mb-4 mt-5">Student Submissions</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {data.students.map((student: studentObj, k: Key) => (
                                    <StudentCard stu={student} key={k}/>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <FileComponent />
                            {showSubmitModal ? (
                                <VerificationSuccess setShowSubmitModal={setShowSubmitModal} result={serverVerificationSuccess}/>
                            ) : null
                            }
                        </>
                    )}
                </div>
            </main>
            <Footer/>
        </div>

    )
}

