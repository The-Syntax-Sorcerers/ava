import LoggedInNavbar from "../components/LoggedInNavbar";
import SubjectCard from "../components/subjectCard";
import Footer from '../components/Footer.tsx'
import { Key } from 'react'

interface SubjectObj {
    name: string;
    id: string;
    link: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function Dashboard({subjects} : {subjects: [SubjectObj]}) {

    console.log("Rendering Dash with Subjects:", subjects)

    return (
        <div className="bg-main bg-cover flex flex-col min-h-screen">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border pt-28">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {subjects.map((subject: SubjectObj, rkey: Key) => (
                            <SubjectCard key={subject.id} sub={subject} rkey={rkey} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}




