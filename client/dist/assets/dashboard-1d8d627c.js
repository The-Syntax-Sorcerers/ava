import{c as l,j as e,R as d}from"./logo-acb7ac67.js";import{L as c}from"./LoggedInNavbar-cd14447c.js";const r=globalThis.template_data;console.log("Dash main: Received template_Data ==>",r);l.createRoot(document.getElementById("root")).render(e.jsx(d.StrictMode,{children:e.jsx(s,{})}));s.defaultProps={subjects:globalThis.template_data.subjects};function s({subjects:a}){return a==null&&(a=s.defaultProps.subjects),console.log("Got Subjects",a),console.log("Def",s.defaultProps),e.jsxs("div",{className:"bg-main bg-cover min-h-screen",children:[e.jsx(c,{}),e.jsx("main",{className:"container mx-auto p-8",children:e.jsxs("div",{className:"container mx-auto px-4 py-20",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:"Dashboard"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",children:a.map((o,t)=>e.jsxs("div",{className:"bg-card rounded shadow p-4",children:[e.jsx("h2",{className:"text-lg font-semibold mb-2",children:o.name}),e.jsx("h3",{className:"text-lg font-semibold mb-2",children:o.id}),e.jsxs("p",{className:"text-gray-600",children:["Due Date: ",o.due_date]})]},t))})]})})]})}