import './assignments.css'
import ReactDOM from "react-dom/client";
import React from "react";
import AssignmentsPage from "./assignments";

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {
        "all_assignments": [{"due_date": "12/12/2023", "id": "COMP123456", "name": "Some BS Assignment"},
                         {"due_date": "10/17/2023", "id": "COMP123456",
                          "name": "Another BS assignment"},
                         {"due_date": "10/01/2023", "id": "COMP123456",
                          "name": "What is this Assignment?!?!?!?"},
                         {"due_date": "08/30/2023", "id": "COMP123456",
                          "name": "Grok Worksheet 1"},
                         {"due_date": "02/26/2023", "id": "COMP123456", "name": "Grok Worksheet 2"}],
        "random": 69,
    };
    console.log("Mock data:", (globalThis as any).template_data)
}
else {
    console.log("Received date from server:", (globalThis as any).template_data)
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AssignmentsPage assignments={(globalThis as any).template_data.all_assignments}/>
  </React.StrictMode>,
)