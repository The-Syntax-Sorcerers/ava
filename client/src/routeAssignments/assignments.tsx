import './assignments.css'
import LoggedInNavbar from '../components/LoggedInNavbar.tsx'
import ReactDOM from "react-dom/client";
import React, {Key} from "react";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AssignmentsPage />
  </React.StrictMode>,
)

AssignmentsPage.defaultProps = {
    assignments: (globalThis as any).template_data.all_assignments,
};

interface assignmentObj {
    name: string;
    id: string;
    due_date: string;
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function AssignmentsPage({assignments}) {
    if(assignments == undefined) {
        assignments = AssignmentsPage.defaultProps.assignments
    }

    return (
        <div className="bg-main bg-cover min-h-screen">
            <LoggedInNavbar />
            <main className="container mx-auto p-8">
                <div className="container mx-auto px-4 py-20">
                    <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {assignments.map((assignment: assignmentObj, index: Key) => (
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

