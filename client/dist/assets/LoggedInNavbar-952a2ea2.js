import{j as e,r,l as i}from"./Footer-55776eb0.js";const a="/assets/menu-e2a44755.svg",c=[["Settings","/settings"],["Log Out","/logout"]];function d({menuItem:n}){const s=n[0],t=n[1];return e.jsx("li",{className:"flex w-full",children:e.jsx("a",{href:t,className:"flex justify-center items-center rounded-lg px-5 py-2 w-full my-1 font-medium hover:bg-button-pink hover:text-slate-900 bg-transparent border-button-pink",children:s})})}function u({setShowDropdown:n}){return e.jsx(e.Fragment,{children:e.jsx("div",{onClick:()=>n(!1),className:"fixed inset-0 z-50 outline-none focus:outline-none",children:e.jsx("ul",{onClick:s=>s.stopPropagation(),className:"flex flex-col items-center fixed top-24 right-32 z-50 min-w-max rounded-lg p-2 bg-main drop-shadow-lg list-none divide-y-2 divide-lighter divide-double",children:c.map(s=>e.jsx(d,{menuItem:s}))})})})}const x=[["Subjects","/dashboard"],["Assignments","/assignments"],["Profile","/profile"]];function m({route:n,rkey:s}){const t=n[0],o=n[1];return e.jsx("li",{children:e.jsx("a",{href:o,className:"rounded-lg px-3 py-2 font-medium hover:bg-button-pink hover:text-slate-900 bg-transparent border-button-pink",children:t})},s)}function f(){const[n,s]=r.useState(!1),t=()=>{console.log("clicked"),s(!n)};return e.jsxs(e.Fragment,{children:[e.jsx("nav",{className:"fixed top-5 left-0 w-full flex justify-center items-center z-10",children:e.jsx("div",{className:"w-5/6 bg-main px-6 py-3 drop-shadow-lg rounded-md",children:e.jsxs("div",{className:"flex container mx-auto px-4 justify-between items-center",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{className:"w-10 h-10",src:i,alt:"Ava Logo"}),e.jsx("div",{className:"text-button-blue text-xl font-bold",children:"AVA"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("ul",{className:"flex space-x-4",children:x.map((o,l)=>e.jsx(m,{route:o,rkey:l}))}),e.jsx("button",{onClick:t,className:`ml-4 rounded-lg px-3 py-2 font-medium z-20 focus:bg-button-pink-darker ${n?"bg-button-pink-darker":"bg-transparent hover:bg-button-pink"}`,children:e.jsx("img",{src:a,alt:"Dropdown Menu"})})]})]})})}),n?e.jsx(u,{setShowDropdown:s}):null]})}export{f as L};