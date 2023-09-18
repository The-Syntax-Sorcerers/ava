import './profile.css'
import ReactDOM from "react-dom/client";
import React from "react";
import ProfilePage from "./profile.tsx";

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {
        "comparison": [{"due_date": "12/12/2023", "id": "COMP123456", "name": "Automata Worksheet",
                        "link": "/assignnent"},
                        {"due_date": "10/17/2023", "id": "COMP123456",
                        "name": "NFA assignment 2", "link": "/ass"},
                        {"due_date": "10/01/2023", "id": "MAST30026",
                        "name": "Bayesian inference 4", "link": "/ass"}],
        "past": [{"due_date": "08/30/2023", "id": "COMP123456",
                        "name": "Grok Worksheet 1", "link": "/ass"},
                        {"due_date": "02/26/2023", "id": "COMP123456",
                        "name": "Grok Worksheet 2", "link": "/ass"}],
        "id": 1171234,
        "score": 86,
    };
    console.log("Mock data:", (globalThis as any).template_data)
}
else {
    console.log("Received date from server:", (globalThis as any).template_data)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProfilePage 
      id={(globalThis as any).template_data.id}
      comparison={(globalThis as any).template_data.comparison}
      past={(globalThis as any).template_data.past}
      score={(globalThis as any).template_data.score}
    />
  </React.StrictMode>,
)