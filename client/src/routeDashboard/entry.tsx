import React from 'react'
import ReactDOM from 'react-dom/client'
import './dashboard.css'
import Dashboard from './dashboard'

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {
        "subjects": [{"id": "BSBS873295", "name": "Intro to BS", "link": "/subject"},
                     {"id": "CHEM992376", "name": "Scuffed Chemisty", "link": "/assignments"},
                     {"id": "COMP431242", "name": "Bad Physics", "link": "/assignments"},
                     {"id": "CODD123456", "name": "Call of Duty", "link": "/assignments"},
                     {"id": "CREED42069", "name": "Assiassians Creed", "link": "/assignments"}],
        "random": 69,
    };
    console.log("Mock data:", (globalThis as any).template_data)
}
else {
    console.log("Received date from server:", (globalThis as any).template_data)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Dashboard subjects={(globalThis as any).template_data.subjects} userType={(globalThis as any).template_data.user_type}/>
  </React.StrictMode>,
)

