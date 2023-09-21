import LoggedInNavbar from "../components/navbarComponents/LoggedInNavbar";
import SubjectCard from "../components/subjectComponents/subjectCard.tsx";
import Footer from '../components/landingComponents/Footer.tsx'
import CreateClassForm from '../components/subjectComponents/createClassModal.tsx'
import { Key, useState } from 'react'

interface SubjectObj {
    name: string;
    id: string;
    link: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function Dashboard({subjects, userType} : {subjects: [SubjectObj], userType:string}) {

    console.log("Rendering Dash with Subjects:", subjects)
    const [showModal, setShowModal] = useState(false);
    const handleAddSubject = () => {
        setShowModal(true);
    };

    return (
        <div className="flex flex-col min-h-screen custom-pages">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border pt-28 pb-10 w-5/6">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-semibold mb-4 mt-5">Upcoming Assignments</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {subjects.map((subject: SubjectObj, rkey: Key) => (
                            <SubjectCard key={subject.id} sub={subject} rkey={rkey} />
                        ))}
                        {userType == "teacher" ? (<button 
                            className="cursor-pointer custom-subject-cards hover:bg-violet-300 text-slate-900 hover:text-violet-800
                            transition duration-200 ease-in-out"
                            type="button"
                            onClick={handleAddSubject}
                        >
                            +
                        </button>):null
                        }
                    </div>
                </div>
                {showModal ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <CreateClassForm setShowModal={setShowModal}/>
                </div>
                ) : null}
            </main>
            <Footer />
        </div>
    );
}




