import{j as e,l as a}from"./Footer-f00bd6fe.js";const r=[["Home","/dashboard"],["Assignments","/assignments"],["Profile","/profile"],["Log Out","/logout"]];function o({route:s,rkey:t}){const n=s[0],l=s[1];return e.jsx("li",{children:e.jsx("a",{href:l,className:"rounded-lg px-3 py-2 font-medium hover:bg-button-pink hover:text-slate-900 bg-transparent border-button-pink",children:n})},t)}function c(){return e.jsx(e.Fragment,{children:e.jsx("nav",{className:"fixed top-5 left-0 w-full flex justify-center items-center",children:e.jsx("div",{className:"w-5/6 bg-main px-6 py-3 drop-shadow-lg rounded-md",children:e.jsxs("div",{className:"container mx-auto px-4 flex justify-between items-center",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{className:"w-10 h-10",src:a,alt:"Ava Logo"}),e.jsx("div",{className:"text-button-blue text-xl font-bold text-button-blue",children:"AVA"})]}),e.jsx("ul",{className:"flex space-x-4",children:r.map((s,t)=>e.jsx(o,{route:s,rkey:t}))})]})})})})}export{c as L};
