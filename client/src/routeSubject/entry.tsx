import './subject.css'
import ReactDOM from "react-dom/client";
import React from "react";
import AssignmentsPage from "./subject";

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {
        "upcoming": [{"due_date": "12/31/2023", "id": "BSBS873295", 
                            "name": "Don't Use ChatGPT", "link": "/assignment"},
                            {"due_date": "10/17/2023", "id": "BSBS873295",
                             "name": "Dumb Project", "link": "/ass"},
                            {"due_date": "02/01/2028", "id": "BSBS873295",
                             "name": "Try Not to Procrastinate",  "link": "/ass"}],
        "past":[{"due_date": "08/30/2023", "id": "BSBS873295",
                            "name": "Useless Grok Worksheet", "link": "/ass"},
                            {"due_date": "02/26/2023", "id": "BSBS873295", 
                            "name": "Stupid Assignment 2", "link": "/ass"}],
        "subject": {"id": "BSBS873295", "name": "Intro to BS",
                    "description": "Bullshit is everywhere, and we've had enough. We want to teach people to detect and defuse bullshit where ever it may arise.",
                    "prof": "Carl T. Bergstrom"}
    };
    console.log("Mock data:", (globalThis as any).template_data)
}
else {
    console.log("Received date from server:", (globalThis as any).template_data)
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AssignmentsPage 
        upcoming={(globalThis as any).template_data.upcoming} 
        past={(globalThis as any).template_data.past} 
        subject={(globalThis as any).template_data.subject}

    />
  </React.StrictMode>,
)