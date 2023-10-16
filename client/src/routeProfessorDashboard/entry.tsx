import './professorDashboard.css'
import ReactDOM from "react-dom/client";
import React from "react";
import ProfessorDashboard from './professorDashboard.tsx';

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {
        user_type: "teacher",
        random: 69,
        assignmentItems: {
            1: {
                "id": "1",
                "subject_id": "MATH12345",
                "name": "Math Homework 1",
                "description": "Complete exercises 1-10",
                "due_datetime": "2023-10-18T18:00:00+00:00",
            },
            2: {
                "id": "2",
                "subject_id": "MATH12345",
                "name": "Math Quiz",
                "description": "Take a quiz on chapters 1-3",
                "due_datetime": "2023-10-20T14:30:00+00:00",
            },
            3: {
                "id": "3",
                "subject_id": "BIOL65432",
                "name": "Biology Lab Report",
                "description": "Submit your lab report for experiment 1",
                "due_datetime": "2023-10-22T12:00:00+00:00",
            },
            4: {
                "id": "4",
                "subject_id": "HIST30004",
                "name": "History Essay",
                "description": "Submit your essay on the American Revolution",
                "due_datetime": "2023-10-25T23:59:00+00:00",
            },
            5: {
                "id": "5",
                "subject_id": "ARTS10010",
                "name": "Art Project",
                "description": "Complete your art project on abstract expressionism",
                "due_datetime": "2023-10-28T15:15:00+00:00",
            },
            6: {
                "id": "6",
                "subject_id": "MATH12345",
                "name": "Math Homework 2",
                "description": "Complete exercises 11-20",
                "due_datetime": "2023-11-02T18:00:00+00:00",
            },
            7: {
                "id": "7",
                "subject_id": "MATH12345",
                "name": "Math Exam",
                "description": "Take the midterm exam",
                "due_datetime": "2023-11-10T09:00:00+00:00",
            },
            8: {
                "id": "8",
                "subject_id": "BIOL65432",
                "name": "Biology Research Paper",
                "description": "Submit your research paper",
                "due_datetime": "2023-11-15T17:30:00+00:00",
            },
            9: {
                "id": "9",
                "subject_id": "HIST30004",
                "name": "History Presentation",
                "description": "Give a presentation on a historical topic",
                "due_datetime": "2023-11-20T14:00:00+00:00",
            },
            10: {
                "id": "10",
                "subject_id": "ARTS10010",
                "name": "Art Exhibition",
            },
        },
        subjectItems: {
            "ARTS10010": {
                id: "ARTS10010",
                name: "Art",
                professor: "Dr. Taylor",
                students: [
                    {
                        id: 41,
                        name: "Grace",
                        email: "Grace@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 41, similarity_score: 0.5 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 41, similarity_score: 0.6 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 41, similarity_score: 0.7 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 41, similarity_score: 0.4 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 41, similarity_score: null },
                        ],
                    },
                    {
                        id: 42,
                        name: "Harrison",
                        email: "Harrison@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 41, similarity_score: 0.3 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 41, similarity_score: 0.2 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 41, similarity_score: 0.7 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 41, similarity_score: 0.4 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 41, similarity_score: null },
                        ],
                    },
                    {
                        id: 43,
                        name: "Ivy",
                        email: "Ivy@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 41, similarity_score: 0.5 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 41, similarity_score: 0.6 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 41, similarity_score: 0.7 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 41, similarity_score: 0.4 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 41, similarity_score: null },
                        ],
                    },
                    {
                        id: 44,
                        name: "Jack",
                        email: "Jack@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 41, similarity_score: 0.5 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 41, similarity_score: 0.6 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 41, similarity_score: 0.7 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 41, similarity_score: 0.4 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 41, similarity_score: null },
                        ],
                    },
                    {
                        id: 45,
                        name: "Karen",
                        email: "Karen@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 41, similarity_score: 0.5 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 41, similarity_score: 0.6 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 41, similarity_score: 0.7 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 41, similarity_score: 0.4 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 41, similarity_score: null },
                        ],
                    },
                    {
                        id: 46,
                        name: "Liam",
                        email: "Liam@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 41, similarity_score: 0.5 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 41, similarity_score: 0.6 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 41, similarity_score: 0.7 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 41, similarity_score: 0.4 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 41, similarity_score: null },
                        ],
                    },
                    {
                        id: 47,
                        name: "Mia",
                        email: "Mia@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 41, similarity_score: 0.5 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 41, similarity_score: 0.6 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 41, similarity_score: 0.7 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 41, similarity_score: 0.4 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 41, similarity_score: null },
                        ],
                    },
                ]
            },
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