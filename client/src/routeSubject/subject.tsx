import { Key } from 'react'
import LoggedInNavbar from '../components/LoggedInNavbar.tsx'
import AssignmentCard, {assignmentObj} from '../components/assignmentCard.tsx'
import Footer from '../components/Footer.tsx'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function SubjectPage({upcoming, past, subject}) {

    console.log("Rendering Ass with Assignments:", upcoming, past)

    return (
        <div className="flex flex-col min-h-screen custom-pages">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border pt-28 pb-12 w-5/6">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-semibold mb-4">{subject.name}</h1>
                    <h2 className="text-xl font-semibold mb-4">{subject.id}</h2>
                    <p className="text-base mb-4">Overview: {subject.description}</p>
                    <p className="text-base mb-4">Instructor: {subject.prof}</p>
                    <h1 className="text-2xl font-semibold mb-4 mt-5">Upcoming Assignments</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {upcoming.map((assignment: assignmentObj, rkey: Key) => (
                            <AssignmentCard ass={assignment} rkey={rkey} inSubject={true} />
                        ))}
                    </div>
                    <h1 className="text-2xl font-semibold mb-4 mt-5">Past Assignments</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {past.map((assignment: assignmentObj, rkey: Key) => (
                            <AssignmentCard ass={assignment} rkey={rkey} inSubject={true} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

