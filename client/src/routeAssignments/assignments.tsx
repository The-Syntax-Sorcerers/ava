import { Key } from 'react'
import LoggedInNavbar from '../components/navbarComponents/LoggedInNavbar.tsx'
import AssignmentCard, {assignmentObj} from '../components/assignmentComponents/assignmentCard.tsx'
import Footer from '../components/landingComponents/Footer.tsx'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function AssignmentsPage({upcoming, past}) {

    console.log("Rendering Ass with Assignments:", upcoming, past)

    return (
        <div className="flex flex-col min-h-screen custom-pages">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border pt-28 w-5/6">
                <div className="container mx-auto">
                    <h1 className="text-xl font-semibold mb-4">All Assignments</h1>
                    <h2 className="text-lg font-medium mb-4">Upcoming Assignments</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {upcoming.map((assignment: assignmentObj, rkey: Key) => (
                            <AssignmentCard ass={assignment} key={rkey} inSubject={false}/>
                        ))}
                    </div>
                    <h2 className="text-xl font-medium mb-4 mt-10">Past Assignments</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {past.map((assignment: assignmentObj, rkey: Key) => (
                            <AssignmentCard ass={assignment} key={rkey} inSubject={false}/>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

