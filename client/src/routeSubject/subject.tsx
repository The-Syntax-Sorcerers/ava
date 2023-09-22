import { Key } from 'react'
import LoggedInNavbar from '../components/navbarComponents/LoggedInNavbar.tsx'
import AssignmentCard, {assignmentObj} from '../components/assignmentComponents/assignmentCard.tsx'
import Footer from '../components/landingComponents/Footer.tsx'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function SubjectPage() {
    const data = (globalThis as any).template_data
    console.log("Rendering Ass with Assignments:", data.upcoming, data.past)

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
                    </div>
                    <h1 className="text-2xl font-semibold mb-4 mt-5">Past Assignments</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.past.map((assignment: assignmentObj, rkey: Key) => (
                            <AssignmentCard ass={assignment} key={rkey} inSubject={true} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

