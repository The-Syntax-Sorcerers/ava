import{j as e,l}from"./Footer-53861639.js";const a=[["Home","/dashboard"],["Assignments","/assignments"],["Profile","/profile"],["Log Out","/logout"]];function r({route:s}){const t=s[0],n=s[1];return e.jsx("li",{children:e.jsx("a",{href:n,className:"rounded-lg px-3 py-2 font-medium hover:bg-button-pink hover:text-slate-900 bg-transparent border-button-pink",children:t})})}function i(){return e.jsx(e.Fragment,{children:e.jsx("nav",{className:"fixed top-5 left-0 w-full flex justify-center items-center",children:e.jsx("div",{className:"w-5/6 bg-main px-6 py-3 drop-shadow-lg rounded-md",children:e.jsxs("div",{className:"container mx-auto px-4 flex justify-between items-center",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{className:"w-10 h-10",src:l,alt:"Ava Logo"}),e.jsx("div",{className:"text-button-blue text-xl font-bold text-button-blue",children:"AVA"})]}),e.jsx("ul",{className:"flex space-x-4",children:a.map((s,t)=>e.jsx(r,{route:s},t))})]})})})})}export{i as L};