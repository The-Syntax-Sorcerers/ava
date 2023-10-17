import './professorDashboard.css'
import ReactDOM from "react-dom/client";
import React from "react";
import ProfessorDashboard from './professorDashboard.tsx';

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {
        user_type: "teacher",
        random: 69,
        // assignmentItems: {
        //     1: {
        //         "id": "1",
        //         "subject_id": "MATH12345",
        //         "name": "Math Homework 1",
        //         "description": "Complete exercises 1-10",
        //         "due_datetime": "2023-10-18T18:00:00+00:00",
        //     },
        //     2: {
        //         "id": "2",
        //         "subject_id": "MATH12345",
        //         "name": "Math Quiz",
        //         "description": "Take a quiz on chapters 1-3",
        //         "due_datetime": "2023-10-20T14:30:00+00:00",
        //     },
        //     3: {
        //         "id": "3",
        //         "subject_id": "BIOL65432",
        //         "name": "Biology Lab Report",
        //         "description": "Submit your lab report for experiment 1",
        //         "due_datetime": "2023-10-22T12:00:00+00:00",
        //     },
        //     4: {
        //         "id": "4",
        //         "subject_id": "HIST30004",
        //         "name": "History Essay",
        //         "description": "Submit your essay on the American Revolution",
        //         "due_datetime": "2023-10-25T23:59:00+00:00",
        //     },
        //     5: {
        //         "id": "5",
        //         "subject_id": "ARTS10010",
        //         "name": "Art Project",
        //         "description": "Complete your art project on abstract expressionism",
        //         "due_datetime": "2023-10-28T15:15:00+00:00",
        //     },
        //     6: {
        //         "id": "6",
        //         "subject_id": "MATH12345",
        //         "name": "Math Homework 2",
        //         "description": "Complete exercises 11-20",
        //         "due_datetime": "2023-11-02T18:00:00+00:00",
        //     },
        //     7: {
        //         "id": "7",
        //         "subject_id": "MATH12345",
        //         "name": "Math Exam",
        //         "description": "Take the midterm exam",
        //         "due_datetime": "2023-11-10T09:00:00+00:00",
        //     },
        //     8: {
        //         "id": "8",
        //         "subject_id": "BIOL65432",
        //         "name": "Biology Research Paper",
        //         "description": "Submit your research paper",
        //         "due_datetime": "2023-11-15T17:30:00+00:00",
        //     },
        //     9: {
        //         "id": "9",
        //         "subject_id": "HIST30004",
        //         "name": "History Presentation",
        //         "description": "Give a presentation on a historical topic",
        //         "due_datetime": "2023-11-20T14:00:00+00:00",
        //     },
        //     10: {
        //         "id": "10",
        //         "subject_id": "ARTS10010",
        //         "name": "Art Exhibition",
        //     },
        // },
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
                    {
                        id: 101,
                        name: "Alice",
                        email: "Alice@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 101, similarity_score: 0.8 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 101, similarity_score: null },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 101, similarity_score: null },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 101, similarity_score: null },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 101, similarity_score: null },
                        ],
                    },
                    {
                        id: 102,
                        name: "Bob",
                        email: "Bob@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 102, similarity_score: 0.2 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 102, similarity_score: 0.3 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 102, similarity_score: 0.3 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 102, similarity_score: 0.1 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 102, similarity_score: 0.2 },
                        ]
                    },
                    {
                        id: 103,
                        name: "Charlie",
                        email: "Charlie@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 103, similarity_score: 0.9 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 103, similarity_score: 0.8 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 103, similarity_score: 0.7 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 103, similarity_score: 0.6 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 103, similarity_score: 0.2 },
                        ]
                    },
                    {
                        id: 104,
                        name: "David",
                        email: "David@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 104, similarity_score: 0.6 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 104, similarity_score: 0.9 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 104, similarity_score: 0.5 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 104, similarity_score: null },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 104, similarity_score: null },
                        ]
                    },
                    {
                        id: 105,
                        name: "Ella",
                        email: "Ella@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 105, similarity_score: null },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 105, similarity_score: null },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 105, similarity_score: 0.9 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 105, similarity_score: 0.8 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 105, similarity_score: null },
                        ]
                    },
                    {
                        id: 106,
                        name: "Fiona",
                        email: "Fiona@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 106, similarity_score: 0.7 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 106, similarity_score: 0.49 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 106, similarity_score: 0.44 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 106, similarity_score: 0.6 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 106, similarity_score: null },
                        ]
                    },
                ]
                
            },
            "BIOL65432": {
                id: "BIOL65432",
                name: "Biology",
                professor: "Dr. Jones",
                students: [
                    {
                        id: 201,
                        name: "Eleanor",
                        email: "Eleanor@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 201, similarity_score: null },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 201, similarity_score: null },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 201, similarity_score: null },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 201, similarity_score: null },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 201, similarity_score: null },
                        ],
                    },
                    {
                        id: 202,
                        name: "Frederick",
                        email: "Frederick@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 202, similarity_score: 0.77 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 202, similarity_score: 0.64 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 202, similarity_score: 0.88 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 202, similarity_score: 0.73 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 202, similarity_score: null },
                        ]
                    },
                    {
                        id: 203,
                        name: "Gabriella",
                        email: "Gabriella@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 203, similarity_score: 0.92 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 203, similarity_score: 0.81 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 203, similarity_score: 0.95 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 203, similarity_score: 0.87 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 203, similarity_score: null },
                        ]
                    },
                    {
                        id: 204,
                        name: "Henry",
                        email: "Henry@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 204, similarity_score: 0.69 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 204, similarity_score: 0.56 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 204, similarity_score: 0.75 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 204, similarity_score: 0.61 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 204, similarity_score: null },
                        ]
                    },
                    {
                        id: 205,
                        name: "Isabella",
                        email: "Isabella@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 205, similarity_score: 0.86 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 205, similarity_score: 0.74 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 205, similarity_score: 0.91 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 205, similarity_score: 0.79 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 205, similarity_score: null },
                        ]
                    },
                    {
                        id: 206,
                        name: "James",
                        email: "James@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 206, similarity_score: 0.78 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 206, similarity_score: 0.65 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 206, similarity_score: 0.87 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 206, similarity_score: 0.72 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 206, similarity_score: null },
                        ]
                    },
                ]
                
            },
            "HIST30004": {
                id: "HIST30004",
                name: "History",
                professor: "Dr. Davis",
                students: [
                    {
                        id: 301,
                        name: "Oliver",
                        email: "Oliver@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 301, similarity_score: 0.45 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 301, similarity_score: 0.62 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 301, similarity_score: 0.38 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 301, similarity_score: null },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 301, similarity_score: 0.43 },
                        ],
                    },
                    {
                        id: 302,
                        name: "Sophia",
                        email: "Sophia@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 302, similarity_score: 0.57 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 302, similarity_score: null },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 302, similarity_score: 0.48 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 302, similarity_score: 0.52 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 302, similarity_score: null },
                        ]
                    },
                    {
                        id: 303,
                        name: "William",
                        email: "William@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 303, similarity_score: null },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 303, similarity_score: 0.42 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 303, similarity_score: 0.53 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 303, similarity_score: null },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 303, similarity_score: 0.49 },
                        ]
                    },
                    {
                        id: 304,
                        name: "Charlotte",
                        email: "Charlotte@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 304, similarity_score: 0.47 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 304, similarity_score: null },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 304, similarity_score: 0.36 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 304, similarity_score: 0.58 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 304, similarity_score: null },
                        ]
                    },
                    {
                        id: 305,
                        name: "Benjamin",
                        email: "Benjamin@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 305, similarity_score: 0.49 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 305, similarity_score: 0.51 },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 305, similarity_score: null },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 305, similarity_score: 0.44 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 305, similarity_score: 0.46 },
                        ],
                    },
                    {
                        id: 306,
                        name: "Ava",
                        email: "Ava@gmail.com",
                        submissions: [
                            { subject_id: 'MATH12345', assignment_id: 1, user_id: 306, similarity_score: 0.55 },
                            { subject_id: 'MATH12345', assignment_id: 2, user_id: 306, similarity_score: null },
                            { subject_id: 'BIOL65432', assignment_id: 3, user_id: 306, similarity_score: 0.41 },
                            { subject_id: 'HIST30004', assignment_id: 4, user_id: 306, similarity_score: 0.47 },
                            { subject_id: 'ARTS10010', assignment_id: 5, user_id: 306, similarity_score: 0.53 },
                        ]
                    },
                ]
                
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