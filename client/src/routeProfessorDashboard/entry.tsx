import './professorDashboard.css'
import ReactDOM from "react-dom/client";
import React from "react";
import ProfessorDashboard from './professorDashboard.tsx';

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {
      user_type: "teacher",
      random: 69,
      subjectItems: {
        "COMP123456": {
            id: "COMP123456",
            name: "Math",
            professor: "Dr. Smith",
            students: [
              { id: 11, name: "Alice", email: "Alice@gmail.com" },
              { id: 12, name: "Bob", email: "Bob@gmail.com" },
            ],
        },
        "COMP654321": {
            id: "COMP654321",
            name: "Science",
            professor: "Dr. Jones",
            students: [
              { id: 23, name: "Charlie", email: "Charly@gmail.com" },
              { id: 24, name: "David", email: "David@gmail.com" },
            ],
        },
      }
    };
    console.log("Mock data:", (globalThis as any).template_data)
}
else {
    console.log("Received date from server:", (globalThis as any).template_data)
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProfessorDashboard/>
  </React.StrictMode>,
)