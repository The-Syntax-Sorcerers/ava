import React from 'react'
import ReactDOM from 'react-dom/client'
import './dashboard.css'


const template_data = (globalThis as any).template_data;
console.log("Dash main: Received template_Data ==>", template_data)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
)

/* =================================   Render DOM above   ========================================= */
/* ================================= Page Structure below ========================================= */

import {Key} from "react";
import LoggedInNavbar from "../components/LoggedInNavbar";

Dashboard.defaultProps = {
  subjects: (globalThis as any).template_data.subjects,
};

interface assignmentObj {
    name: string;
    id: string;
    due_date: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function Dashboard({subjects}) {

    if(subjects == undefined) {
        subjects = Dashboard.defaultProps.subjects
    }
    console.log("Got Subjects", subjects)
    console.log("Def", Dashboard.defaultProps)

    return (
        <div className="bg-main bg-cover min-h-screen">
            <LoggedInNavbar />
            <main className="container mx-auto p-8">
                <div className="container mx-auto px-4 py-20">
                    <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {subjects.map((assignment: assignmentObj, index: Key) => (
                            <div key={index} className="bg-card rounded shadow p-4" >
                                <h2 className="text-lg font-semibold mb-2">{assignment.name}</h2>
                                <h3 className="text-lg font-semibold mb-2">{assignment.id}</h3>
                                <p className="text-gray-600">Due Date: {assignment.due_date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}




