import './assignments.css'
import ReactDOM from "react-dom/client";
import React from "react";
import AssignmentsPage from "./assignments";

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {
        "upcoming": [{"due_date": "12/12/2023", "id": "COMP123456", "name": "Some BS Assignment", 
                        "link": "/assignment"},
                        {"due_date": "10/17/2023", "id": "COMP123456",
                        "name": "Another BS assignment", "link": "/ass"},
                        {"due_date": "10/01/2023", "id": "COMP123456",
                        "name": "What is this Assignment?!?!?!?", "link": "/ass"}],
        "past": [{"due_date": "08/30/2023", "id": "COMP123456",
                        "name": "Grok Worksheet 1", "link": "/ass"},
                        {"due_date": "02/26/2023", "id": "COMP123456", 
                        "name": "Grok Worksheet 2", "link": "/ass"}],
        "user_type": "student",
    };
    console.log("Mock data:", (globalThis as any).template_data)
}
else {
    console.log("Received date from server:", (globalThis as any).template_data)
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AssignmentsPage upcoming={(globalThis as any).template_data.upcoming} past={(globalThis as any).template_data.past}/>
  </React.StrictMode>,
)