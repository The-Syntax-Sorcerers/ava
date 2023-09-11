import React from 'react'
import ReactDOM from 'react-dom/client'
import "./App.css"
import LandingPage from './landingPage.tsx'

if ((globalThis as any).template_data === undefined) {
  (globalThis as any).template_data = JSON.stringify({
    result: "No Template Data Received"
  });
}
const template_data: { result: string } = JSON.parse((globalThis as any).template_data);
console.log("Received template_Data ==>", template_data)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
)

