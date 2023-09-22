import React from 'react'
import ReactDOM from 'react-dom/client'
import './privacyPolicy.css'
import PrivacyPolicy from './privacyPolicy'

if ((globalThis as any).template_data === undefined) {
  (globalThis as any).template_data = JSON.stringify({
    result: "No Template Data Received"
  });
}
const template_data: { result: string } = JSON.parse((globalThis as any).template_data);
console.log("Received template_Data ==>", template_data)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      {/* Collects the data-auth value from ./index.html and checks whether it is the string "True", passing a boolean to PrivacyPolicy to indicate
       whether the user has been authenticated */}
      <PrivacyPolicy auth_user={ document.querySelector('#root')!.getAttribute('data-auth') === "true" }/>
    </React.StrictMode>,
)