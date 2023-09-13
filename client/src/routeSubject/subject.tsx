import { Key } from 'react'
import LoggedInNavbar from '../components/LoggedInNavbar.tsx'
import AssignmentCard, {assignmentObj} from '../components/assignmentCard.tsx'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function SubjectPage({upcoming, past, subject}) {

    console.log("Rendering Ass with Assignments:", upcoming, past)

    return (
        <div className="bg-main bg-cover min-h-screen">
            <LoggedInNavbar />
            <main className="container mx-auto p-8">
                <div className="container mx-auto px-4 py-20">
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
        </div>

    )
}

