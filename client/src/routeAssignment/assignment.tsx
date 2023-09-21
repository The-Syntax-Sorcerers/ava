import {useState} from 'react';
import LoggedInNavbar from '../components/navbarComponents/LoggedInNavbar.tsx'
import Dropzone from '../components/assignmentComponents/dropzone.tsx'
import UploadButton from '../components/assignmentComponents/uploadButton.tsx'
import UploadPreview from '../components/assignmentComponents/uploadPreview.tsx'
import VerificationSuccess from '../components/assignmentComponents/verificationSuccessModal.tsx'
import StudentCard, {studentObj} from '../components/subjectComponents/studentCard.tsx'
import Footer from '../components/landingComponents/Footer.tsx'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function AssignmentPage() {
    
    const data = (globalThis as any).template_data
    const assignment = data.assignment
    const user_type = data.user_type

    if(assignment !== undefined && assignment.due_date == null) assignment.due_date = "None"

    console.log("Rendering AssignmentPage with ass, user:", assignment, user_type)
    const [fileUploaded, setFileUploaded] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [fileSubmitted, setFileSubmitted] = useState(false);
    // const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedDocs, setSelectedDocs] = useState<File[]>([]);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 1) {
            setFileUploaded(true);
            setFileSubmitted(false);
            setSelectedDocs(Array.from(e.target.files));
        }
    };
    
    const handleSubmit = () => {
        setFileSubmitted(true);
        setFileUploaded(false);
        setShowSubmitModal(true)
    };

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
                    {data.students.map((student: studentObj) => (
                        <StudentCard stu={student}/>
                    ))}
                    </div>
                    </>
                ) :
                (
                    <>
                        <h1 className="text-2xl font-semibold mb-4 mt-5">Submission</h1>
                        {fileSubmitted ? (
                            <div>
                            <p className="text-base mb-4">Looks Like you've already submitted an assignment. Do you want to submit another one?</p>
                            <Dropzone handleUpload={handleUpload}/>
                            </div>
                        ):(<>
                            {fileUploaded ? (
                                    <div>
                                        <UploadPreview docs={selectedDocs.map((file) => ({
                                            uri: window.URL.createObjectURL(file),
                                            fileName: file.name,
                                        }))}/>
                                        <UploadButton handleUpload={handleUpload}/>
                                        <div className="flex items-center grid grid-cols-1 auto-cols-auto gap-4 mt-10">
                                            <div>
                                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="/privacy_policy" className="text-blue-600 dark:bg-blue-500 hover:underline">Privacy Policy</a>.</label>
                                            </div>
                                            <div>
                                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I hereby acknowledge that all work submitted in this assignment is my original work, created solely by me, unless otherwise indicated.</label>
                                            </div>
                                            <button
                                            className="bg-button-blue rounded-lg px-3 py-2 text-slate-900 font-medium hover:bg-button-blue-darker"
                                            type="button"
                                            onClick={handleSubmit}>
                                                Submit
                                        </button>
                                        </div>
                                        
                                    </div>
                            ):(<Dropzone handleUpload={handleUpload}/>)}
                            </>
                            )
                        }
                        {showSubmitModal ? (
                            <VerificationSuccess setShowSubmitModal={setShowSubmitModal} result={false}/>
                        ):null
                        }
                    </>
                )}
                </div>
            </main>
            <Footer/>
        </div>

    )
}

