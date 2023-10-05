import './professorDashboard.css'
import ReactDOM from "react-dom/client";
import React from "react";
import ProfessorDashboard from './professorDashboard.tsx';

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {};
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