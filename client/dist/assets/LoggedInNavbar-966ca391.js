import{j as e,r as o,l as a}from"./Footer-60fc01bf.js";const i="/assets/menu-e2a44755.svg",r=[["Settings","/settings"],["Log Out","/logout"]];function c({menuItem:s}){const n=s[0],t=s[1];return e.jsx("li",{className:"flex w-full",children:e.jsx("a",{href:t,className:"custom-dropdown-link-element",children:n})})}function d({setShowDropdown:s}){return e.jsx(e.Fragment,{children:e.jsx("div",{onClick:()=>s(!1),className:"fixed inset-0 z-50 outline-none focus:outline-none",children:e.jsx("ul",{onClick:n=>n.stopPropagation(),className:"flex flex-col items-center fixed top-24 right-32 z-50 min-w-max rounded-lg p-2 bg-white drop-shadow-lg list-none divide-y-2 divide-black",children:r.map(n=>e.jsx(c,{menuItem:n}))})})})}const m=[["Subjects","/dashboard"],["Assignments","/assignments"],["Profile","/profile"]];function x({route:s}){const n=s[0],t=s[1];return e.jsx("li",{children:e.jsx("a",{href:t,className:"custom-navbar-link-element",children:n})})}function f(){const[s,n]=o.useState(!1),t=()=>{console.log("clicked"),n(!s)};return e.jsxs(e.Fragment,{children:[e.jsx("nav",{className:"fixed top-5 left-0 w-full flex justify-center items-center",children:e.jsx("div",{className:"w-5/6 px-6 py-3 custom-navbar border-2 border-accent-primary-100",children:e.jsxs("div",{className:"container mx-auto px-4 flex justify-between items-center",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{className:"w-10 h-10",src:a,alt:"Ava Logo"}),e.jsx("div",{className:"text-button-blue text-xl font-bold",children:"AVA"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("ul",{className:"flex space-x-4",children:m.map(l=>e.jsx(x,{route:l}))}),e.jsx("button",{onClick:t,className:`ml-4 px-3 py-2 z-20 custom-navbar-element 
                            ${s?"bg-violet-500":"bg-transparent hover:bg-violet-300"}`,children:e.jsx("img",{src:i,alt:"Dropdown Menu"})})]})]})})}),s?e.jsx(d,{setShowDropdown:n}):null]})}export{f as L};
