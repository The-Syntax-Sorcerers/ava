import './professorDashboard.css'
import ReactDOM from "react-dom/client";
import React from "react";
import ProfessorDashboard from './professorDashboard.tsx';

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {
      user_type: "teacher",
      random: 69,
      subjectItems: {
        "MATH12345": {
            id: "MATH12345",
            name: "Math",
            professor: "Dr. Smith",
            students: [
                { id: 11, name: "Alice", email: "Alice@gmail.com" },
                { id: 12, name: "Bob", email: "Bob@gmail.com" },
                { id: 13, name: "Eve", email: "Eve@gmail.com" },
                { id: 14, name: "Frank", email: "Frank@gmail.com" },
                { id: 15, name: "Grace", email: "Grace@gmail.com" },
                { id: 16, name: "Hank", email: "Hank@gmail.com" },
                { id: 17, name: "Ivy", email: "Ivy@gmail.com" },
                { id: 18, name: "Jack", email: "Jack@gmail.com" },
                { id: 19, name: "Karen", email: "Karen@gmail.com" },
                { id: 20, name: "Liam", email: "Liam@gmail.com" },
            ],
        },
        "BIOL65432": {
            id: "BIOL65432",
            name: "Biology",
            professor: "Dr. Jones",
            students: [
                { id: 21, name: "Mia", email: "Mia@gmail.com" },
                { id: 22, name: "Noah", email: "Noah@gmail.com" },
                { id: 23, name: "Olivia", email: "Olivia@gmail.com" },
                { id: 24, name: "Parker", email: "Parker@gmail.com" },
                { id: 25, name: "Quinn", email: "Quinn@gmail.com" },
                { id: 26, name: "Ryan", email: "Ryan@gmail.com" },
                { id: 27, name: "Sophia", email: "Sophia@gmail.com" },
                { id: 28, name: "Tyler", email: "Tyler@gmail.com" },
                { id: 29, name: "Uma", email: "Uma@gmail.com" },
                { id: 30, name: "Vincent", email: "Vincent@gmail.com" },
            ],
        },
        "HIST30004": {
            id: "HIST30004",
            name: "History",
            professor: "Dr. Davis",
            students: [
                { id: 31, name: "Wendy", email: "Wendy@gmail.com" },
                { id: 32, name: "Xander", email: "Xander@gmail.com" },
                { id: 33, name: "Yasmine", email: "Yasmine@gmail.com" },
                { id: 34, name: "Zane", email: "Zane@gmail.com" },
                { id: 35, name: "Ava", email: "Ava@gmail.com" },
                { id: 36, name: "Ben", email: "Ben@gmail.com" },
                { id: 37, name: "Caleb", email: "Caleb@gmail.com" },
                { id: 38, name: "Daisy", email: "Daisy@gmail.com" },
                { id: 39, name: "Ethan", email: "Ethan@gmail.com" },
                { id: 40, name: "Fiona", email: "Fiona@gmail.com" },
            ],
        },
        "ARTS10010": {
            id: "ARTS10010",
            name: "Art",
            professor: "Dr. Taylor",
            students: [
                { id: 41, name: "Grace", email: "Grace@gmail.com" },
                { id: 42, name: "Harrison", email: "Harrison@gmail.com" },
                { id: 43, name: "Ivy", email: "Ivy@gmail.com" },
                { id: 44, name: "Jack", email: "Jack@gmail.com" },
                { id: 45, name: "Karen", email: "Karen@gmail.com" },
                { id: 46, name: "Liam", email: "Liam@gmail.com" },
                { id: 47, name: "Mia", email: "Mia@gmail.com" },
                { id: 48, name: "Noah", email: "Noah@gmail.com" },
                { id: 49, name: "Olivia", email: "Olivia@gmail.com" },
                { id: 50, name: "Parker", email: "Parker@gmail.com" },
            ],
        },
    }
    
    };
    console.log("Mock data:", (globalThis as any).template_data)
}
else {
    console.log("Received date from server:", (globalThis as any).template_data)
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProfessorDashboard/>
  </React.StrictMode>,
)