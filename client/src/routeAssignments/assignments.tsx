import { Key } from 'react'
import LoggedInNavbar from '../components/LoggedInNavbar.tsx'
import AssignmentCard, {assignmentObj} from '../components/assignmentCard.tsx'
import Footer from '../components/Footer.tsx'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function AssignmentsPage({upcoming, past}) {

    console.log("Rendering Ass with Assignments:", upcoming, past)

    return (
        <div className="bg-main bg-cover flex flex-col min-h-screen">
            <LoggedInNavbar />
            <main className="container mx-auto p-8">
                <div className="container mx-auto px-4 py-20">
                    <h1 className="text-2xl font-semibold mb-4">All Assignments</h1>
                    <h2 className="text-xl font-semibold mb-4">Upcoming Assignments</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {upcoming.map((assignment: assignmentObj, rkey: Key) => (
                            <AssignmentCard ass={assignment} rkey={rkey} inSubject={false}/>
                        ))}
                    </div>
                    <h2 className="text-xl font-semibold mb-4 mt-10">Past Assignments</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {past.map((assignment: assignmentObj, rkey: Key) => (
                            <AssignmentCard ass={assignment} rkey={rkey} inSubject={false}/>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

