import { Key } from 'react'
import LoggedInNavbar from '../components/LoggedInNavbar.tsx'
import AssignmentCard from '../components/assignmentCard.tsx'
import Footer from '../components/Footer.tsx'


interface assignmentObj {
    name: string;
    id: string;
    due_date: string;
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function AssignmentsPage({assignments}) {

    console.log("Rendering Ass with Assignments:", assignments)

    return (
        <div className="bg-main bg-cover flex flex-col min-h-screen">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border p-40 min-h-screen">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4">Assignments</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {assignments.map((assignment: assignmentObj, rkey: Key) => (
                            <AssignmentCard ass={assignment} rkey={rkey} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>

    )
}

