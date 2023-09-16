import React from 'react'
import ReactDOM from 'react-dom/client'
import "./App.css"
import LandingPage from './landingPage.tsx'

if ((globalThis as any).template_data === undefined) {
  (globalThis as any).template_data = JSON.stringify({
    result: "No Template Data Received"
  });
  console.log("Mock data:", (globalThis as any).template_data)
}
else {
    console.log("Received date from server:", (globalThis as any).template_data)
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
)

