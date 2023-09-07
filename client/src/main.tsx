import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


const template_data: { my_data: string } = JSON.parse((globalThis as any).template_data);
console.log("Received template_Data ==>", template_data)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
