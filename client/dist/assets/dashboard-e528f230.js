import{j as e,F as t,c as n,R as i}from"./Footer-47447d43.js";import{L as l}from"./LoggedInNavbar-dba2d0c8.js";function r({sub:s,rkey:a}){return e.jsx("a",{href:s.link,children:e.jsxs("div",{className:"bg-card rounded-lg shadow-md p-4 transform hover:bg-card-hover hover:scale-105 transition-transform duration-300 cursor-pointer",children:[e.jsx("h3",{className:"text-base font-bold mb-1",children:s.name}),e.jsx("h2",{className:"text-sm font-semibold",children:s.id})]},a)})}function d({subjects:s}){return console.log("Rendering Dash with Subjects:",s),e.jsxs("div",{className:"bg-main bg-cover flex flex-col min-h-screen",children:[e.jsx(l,{}),e.jsx("main",{className:"container mx-auto flex-grow box-border pt-28 pb-10 w-5/6",children:e.jsxs("div",{className:"container mx-auto",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:"Dashboard"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",children:s.map((a,o)=>e.jsx(r,{sub:a,rkey:o},a.id))})]})}),e.jsx(t,{})]})}globalThis.template_data===void 0?(globalThis.template_data={subjects:[{id:"BSBS873295",name:"Intro to BS",link:"/subject"},{id:"CHEM992376",name:"Scuffed Chemisty",link:"/assignments"},{id:"COMP431242",name:"Bad Physics",link:"/assignments"},{id:"CODD123456",name:"Call of Duty",link:"/assignments"},{id:"CREED42069",name:"Assiassians Creed",link:"/assignments"}],random:69},console.log("Mock data:",globalThis.template_data)):console.log("Received date from server:",globalThis.template_data);n.createRoot(document.getElementById("root")).render(e.jsx(i.StrictMode,{children:e.jsx(d,{subjects:globalThis.template_data.subjects})}));
