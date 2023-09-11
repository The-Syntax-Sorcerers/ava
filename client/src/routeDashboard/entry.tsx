import React from 'react'
import ReactDOM from 'react-dom/client'
import './dashboard.css'
import Dashboard from './dashboard'

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {
        "subjects": [{"id": "BSBS873295", "name": "Intro to BS"},
                     {"id": "CHEM992376", "name": "Scuffed Chemisty"},
                     {"id": "COMP431242", "name": "Bad Physics"},
                     {"id": "CODD123456", "name": "Call of Duty"},
                     {"id": "CREED42069", "name": "Assiassians Creed"}],
        "random": 69,
    };
    console.log("Mock data:", (globalThis as any).template_data)
}
else {
    console.log("Received date from server:", (globalThis as any).template_data)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <Dashboard subjects={(globalThis as any).template_data.subjects}/>
  </React.StrictMode>,
)

