import { Key } from 'react'
import LoggedInNavbar from '../components/LoggedInNavbar.tsx'
import AssignmentCard from '../components/assignmentCard.tsx'


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
        <div className="bg-main bg-cover min-h-screen">
            <LoggedInNavbar />
            <main className="container mx-auto p-8">
                <div className="container mx-auto px-4 py-20">
                    <h1 className="text-2xl font-semibold mb-4">Assignments</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {assignments.map((assignment: assignmentObj, rkey: Key) => (
                            <AssignmentCard ass={assignment} rkey={rkey} />
                        ))}
                    </div>
                </div>
            </main>
        </div>

    )
}

