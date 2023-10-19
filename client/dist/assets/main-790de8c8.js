import{j as e,r as l,l as r,F as d,c as m,R as x}from"./Footer-4485b5ea.js";import{A as g,L as h,S as u}from"./AnonymousNavbar-b51c2dc5.js";const p="/assets/hourglass-62489d33.png",f="/assets/chart-619dba42.png",j="/assets/graph-d48d3640.png",v=[[p,"Real-Time Verification","AVA provides lightning-fast results, allowing users to verify authorship in real-time, making it ideal for time-sensitive situations where authenticity matters."],[j,"Advanced Linguistic Analysis","AVA employs state-of-the-art linguistic analysis to examine the intricacies of writing styles, vocabulary usage, and grammatical patterns, ensuring accurate authorship verification."],[f,"Detailed Verification Reports","Receive comprehensive reports outlining the analysis process and verification results, offering transparency and insights into the authenticity assessment."]];function b({card:t}){const a=t[0],s=t[1],i=t[2];return e.jsxs("div",{className:"container mx-auto flex flex-row gap-4 px-5 py-5 mb-10 text-center custom-descriptioncards",children:[e.jsx("div",{className:"basis-1/4 place-content-center",children:e.jsx("img",{className:"object-contain h-25 w-auto mx-auto",src:a,alt:"pic"})}),e.jsxs("div",{className:"basis-3/4 flex flex-col gap-4 text-center px-5",children:[e.jsx("h1",{className:"text-lg font-bold my-4",children:s}),e.jsx("p",{className:"text-md mb-4",children:i})]})]})}function N(){return e.jsx("div",{className:"container flex flex-col gap-4",children:v.map(t=>e.jsx(b,{card:t}))})}const y="/assets/idea2-7991156e.svg";function w(){const t=globalThis.template_data,[a,s]=l.useState(t.showModal),[i,n]=l.useState(t.showLogin),o=()=>{s(!0),n(!0)},c=()=>{s(!0),n(!1)};return e.jsxs("div",{className:"flex flex-col justify-center items-center mx-auto overflow-visible custom-landing-page",children:[e.jsx(g,{handleLoginClick:o,handleSignupClick:c}),e.jsxs("div",{className:"flex flex-col text-center mx-auto pt-28 font-medium text-md text-gray-700 items-center",children:[e.jsxs("div",{className:"grid grid-rows-1 grid-cols-2 text-center mx-auto mb-10",children:[e.jsx("div",{className:"col-span-1",children:e.jsx("img",{className:"object-contain h-80 w-auto mx-auto",src:y,alt:"pic1"})}),e.jsx("div",{className:"col-span-1",children:e.jsxs("div",{className:"grid grid-rows-2 grid-cols-1 gap-4 text-center",children:[e.jsx("div",{className:"place-content-center",children:e.jsx("img",{className:"object-contain h-48 w-48 mx-auto",src:r,alt:"Ava Logo"})}),e.jsxs("div",{className:"place-content-center",children:[e.jsx("h1",{className:"text-lg font-semibold",children:"Welcome to AVA"}),e.jsx("h2",{children:"Unlocking Authenticity: Introducing AVA, Your Authorship Verification Algorithm"}),e.jsx("button",{className:"mt-5 mr-1 mb-1 px-6 py-3 font-bold text-sm shadow-md hover:shadow-lg custom-form-button",type:"button",onClick:o,children:" Get Started"})]})]})})]}),e.jsx(N,{})]}),a?e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50",children:i?e.jsx(h,{setShowModal:s,handleSignupClick:c}):e.jsx(u,{setShowModal:s,handleLoginClick:o})}):null,e.jsx(d,{})]})}globalThis.template_data===void 0?(globalThis.template_data=JSON.stringify({result:"No data from server"}),console.log("Mock data:",globalThis.template_data)):console.log("Received date from server:",globalThis.template_data);m.createRoot(document.getElementById("root")).render(e.jsx(x.StrictMode,{children:e.jsx(w,{})}));
