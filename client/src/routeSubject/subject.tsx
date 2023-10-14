import { Key, useState} from 'react'
import LoggedInNavbar from '../components/navbarComponents/LoggedInNavbar.tsx'
import AssignmentCard, {assignmentObj} from '../components/assignmentComponents/assignmentCard.tsx'
import StudentCard, {studentObj} from '../components/subjectComponents/studentCard.tsx'
import Footer from '../components/landingComponents/Footer.tsx'
import CreateAssignmentForm from '../components/assignmentComponents/createAssignmentModal.tsx'
import AddStudentForm from '../components/subjectComponents/addStudentModal.tsx'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function SubjectPage() {
    const data = (globalThis as any).template_data
    console.log("Rendering Ass with Assignments:", data.upcoming, data.past)
    const [showModal, setShowModal] = useState(false);
    const handleAddAssignment = () => {
        setShowModal(true);
    };
    const [showStudModal, setShowStudentModal] = useState(false);
    const handleAddStudent = () => {
        setShowStudentModal(true);
    };
    return (
        <div className="flex flex-col min-h-screen custom-pages">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border pt-28 pb-12 w-5/6">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-semibold mb-4">{data.subject.name}</h1>
                    <h2 className="text-xl font-semibold mb-4">{data.subject.id}</h2>
                    <p className="text-base mb-4">Overview: {data.subject.description}</p>
                    <p className="text-base mb-4">Instructor: {data.subject.prof}</p>
                    <h1 className="text-2xl font-semibold mb-4 mt-5">Upcoming Assignments</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.upcoming.map((assignment: assignmentObj, rkey: Key) => (
                            <AssignmentCard ass={assignment} key={rkey} inSubject={true} />
                        ))}
                        {data.user_type == "teacher" ? (<button 
                            className="cursor-pointer custom-subject-cards
                            hover:bg-violet-300 text-slate-900 hover:text-violet-800
                            transition duration-200 ease-in-out"
                            type="button"
                            onClick={handleAddAssignment}
                        >
                            +
                        </button>):null
                        }
                    </div>
                    <h1 className="text-2xl font-semibold mb-4 mt-5">Past Assignments</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.past.map((assignment: assignmentObj, rkey: Key) => (
                            <AssignmentCard ass={assignment} key={rkey} inSubject={true} />
                        ))}
                    </div>
                </div>
                
                {data.user_type == "teacher" ? (
                
                <div className="container mx-auto">
                    <h1 className="text-2xl font-semibold mb-4 mt-5">Students</h1>
                    <div className="grid grid-cols-1 gap-4">
                    {data.students.map((student: studentObj) => (
                        <StudentCard stu={student}/>
                    ))}
                    <button 
                        className="cursor-pointer custom-subject-cards
                        hover:bg-violet-300 text-slate-900 hover:text-violet-800
                        transition duration-200 ease-in-out"
                        type="button"
                        onClick={handleAddStudent}
                    >
                        +
                    </button>
                    </div>
                </div>
                ):null
                }
                {showModal ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <CreateAssignmentForm setShowModal={setShowModal}/>
                </div>
                ) : null}
                {showStudModal ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <AddStudentForm setShowModal={setShowStudentModal}/>
                </div>
                ) : null}
            </main>
            <Footer/>
        </div>

    )
}

