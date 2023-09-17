import './assignment.css'
import ReactDOM from "react-dom/client";
import React from "react";
import AssignmentsPage from "./assignment";

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {
        "assignment": {"due_date": "12/31/2023", "id": "BSBS873295",
                       "name": "Don't Use ChatGPT", 
                       "link": "/assignment",
                       "description": "Write stuff in your own words. Do not use ChatGPT or any AI to assist you. WE CAN TELL!!",
                       "marks": "???/100"},
        "user_type": "student"
    };
    console.log("Mock data:", (globalThis as any).template_data)
}
else {
    console.log("Received date from server:", (globalThis as any).template_data)
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AssignmentsPage 
        assignment={(globalThis as any).template_data.assignment}
        user_type={(globalThis as any).template_data.user_type}
    />
  </React.StrictMode>,
)