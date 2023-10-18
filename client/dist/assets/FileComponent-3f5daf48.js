import{j as e,r as m}from"./Footer-edf931a3.js";function g({hasLoaded:r}){return e.jsx(e.Fragment,{children:r?e.jsx("svg",{className:"w-5 h-5 ml-2 mt-2 text-green-500 flex-shrink-0","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"})}):e.jsxs("svg",{"aria-hidden":"true",className:"w-5 h-5 ml-2 mt-2 text-gray-50 animate-spin fill-accent-secondary-500",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),e.jsx("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]})})}function S({subject_id:r,assignment_id:o,user_id:l,previewWidth:n}){console.log("Renderinf FileComponent for",r,o,l);const[i,x]=m.useState(!1),[b,h]=m.useState(!1),[y,j]=m.useState(!1),[c,u]=m.useState([]),w=t=>{var s;t.preventDefault(),((s=t.target.files)==null?void 0:s.length)===1&&(x(!0),h(!1),u(Array.from(t.target.files)))},v=async t=>{if(t.preventDefault(),!c[0]){alert("Please select a file.");return}let s;l!==void 0?s=`/submit_assignment/${r}/${o}/${l}`:s=`/submit_assignment/${r}/${o}`,console.log(t),t.target.elements.submitButton.disabled=!0;const a=new FormData;a.append("form_file",c[0]);try{const d=await fetch(s,{method:"POST",body:a});console.log("Server response:",d)}catch(d){console.error("Error:",d)}h(!0),x(!1)},k=async()=>{console.log("Fetching File");let t;l!==void 0?t=`/fetch_assignment/${r}/${o}/${l}`:t=`/fetch_assignment/${r}/${o}`,console.log("getting endpoint",t);try{const s=await fetch(t);if(s.status===204)return;const a=await s.blob();console.log("Response:",s,"Blob",a,"Blob text",a.text()),console.log("Response headers:",s.headers);const d=s.headers.get("filename")||"Filename Not Found";return new File([a],d,{type:s.headers.get("Content-Type")||void 0})}catch(s){console.error("Error fetching PDF:",s)}};c.length===0&&k().then(t=>{t!==void 0&&(console.log("Setting selectedDocs to",t),u([t]),h(!0)),j(!0)});var f=document.getElementById("submitButton");return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4 mt-5",children:"Submission"}),e.jsx(g,{hasLoaded:y})]}),b?e.jsxs("div",{children:[e.jsx(p,{selectedDocs:c,previewWidth:n}),e.jsx("p",{className:"text-base mb-4",children:"Looks Like you've already submitted an assignment. Do you want to submit another one?"})]}):e.jsx(e.Fragment,{}),i?e.jsxs("div",{children:[e.jsx(p,{selectedDocs:c,previewWidth:n}),e.jsxs("form",{onSubmit:v,className:"flex items-center grid grid-cols-1 auto-cols-auto gap-4 mt-10",children:[e.jsx("input",{id:"form_file",name:"form_file",type:"file",className:"hidden",accept:"text/plain"}),e.jsxs("div",{children:[e.jsx("input",{id:"link-checkbox1",type:"checkbox",className:"w-4 h-4 rounded",required:!0}),e.jsxs("label",{htmlFor:"link-checkbox1",className:"ml-2 text-sm font-medium",children:["I agree with the ",e.jsx("a",{href:"/privacy_policy",className:"text-blue-600 hover:text-accent-secondary-600 transition duration-200",children:"Privacy Policy"})]})]}),e.jsxs("div",{children:[e.jsx("input",{id:"link-checkbox2",type:"checkbox",className:"w-4 h-4 rounded",required:!0}),e.jsx("label",{htmlFor:"link-checkbox2",className:"ml-2 text-sm font-medium",children:"I hereby acknowledge that all work submitted in this assignment is my original work, created solely by me, unless otherwise indicated."})]}),e.jsxs("button",{id:"submitButton",className:`rounded-lg px-3 py-3 font-bold text-sm shadow-md hover:shadow-lg custom-form-button
                            flex justify-center items-center`,type:"submit",children:["Submit",f&&f.disabled?e.jsx(g,{hasLoaded:!1}):null]})]})]}):e.jsx(e.Fragment,{children:e.jsx(C,{handleUpload:w})})]})}function C({handleUpload:r}){return e.jsx("div",{className:"flex items-center justify-center w-full",children:e.jsxs("label",{htmlFor:"dropzone-file",className:"flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600",children:[e.jsxs("div",{className:"flex flex-col items-center justify-center pt-5 pb-6",children:[e.jsx("svg",{className:"w-8 h-8 mb-4 text-gray-500 dark:text-gray-400","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 16",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"})}),e.jsx("p",{className:"mb-2 text-sm text-gray-500 dark:text-gray-400",children:e.jsx("span",{className:"font-semibold",children:"Click to upload"})}),e.jsx("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"TXT or PDF only(MAX. 2MB)"})]}),e.jsx("input",{id:"dropzone-file",type:"file",className:"hidden",accept:".txt, .pdf",onChange:r})]})})}function p({selectedDocs:r,previewWidth:o}){const l=r.map(i=>({uri:window.URL.createObjectURL(i)+"#view=FitH&scrollbar=0&statusbar=0&messages=0&navpanes=0",fileName:i.name,fileType:i.type})),n=l.length>0?l[0]:"";return o==null&&(o="100%"),l.length>0?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col items-center justify-center w-full mb-10 max-h-screen",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:n.fileName}),e.jsx("iframe",{src:n.uri,className:"container rounded-3xl overflow-auto overscroll-auto shadow-lg p-6 bg-preview-border",style:{height:700,width:o},title:n.fileName})]})}):e.jsx(e.Fragment,{})}export{S as F};
