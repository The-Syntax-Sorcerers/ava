import './professorDashboard.css'
import ReactDOM from "react-dom/client";
import React from "react";
import ProfessorDashboard from './professorDashboard.tsx';

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {
        user_type: "teacher",
        random: 69,
        // subjectItems: {
        //     "HIST30004": {
        //         id: "HIST30004",
        //         name: "History",
        //         professor: "Dr. Davis",
        //         students: [9, 23, 45]
        //     }
        //     // .
        //     // .
        //     // .
        // },
        // studentItems: {
        //     9: {
        //         id: 9,
        //         name: "Yash",
        //         submissions: [  {  'assignment_id': 10, 'name': 'Time 1', 'similarity_score': None, 'subject_id': 'TIME10010', 'user_id': 9},
        //                     {  'assignment_id': 7, 'name': 'Time 2', 'similarity_score': None, 'subject_id': 'TIME10010', 'user_id': 9},
        //         ]
        //     },
        // }
        subjectItems: {
            "ARTS10010": {
                id: "ARTS10010",
                name: "Art",
                professor: "Dr. Taylor",
                students: {
                    41: {
                        id: 41,
                        name: "Grace",
                        email: "Grace@gmail.com",
                        submissions: [
                            {
                                subject_id: 'MATH12345',
                                assignment_id: 1,
                                similarity_score: 0.5,
                                name: "Math Assignment 1",
                                description: "Solving equations"
                            },
                            {
                                subject_id: 'MATH12345',
                                assignment_id: 2,
                                similarity_score: 0.6,
                                name: "Math Assignment 2",
                                description: "Graph plotting"
                            },
                            {
                                subject_id: 'BIOL65432',
                                assignment_id: 3,
                                user_id: 41,
                                similarity_score: 0.7,
                                name: "Biology Assignment 1",
                                description: "Cell structure"
                            },
                            {
                                subject_id: 'HIST30004',
                                assignment_id: 4,
                                user_id: 41,
                                similarity_score: 0.4,
                                name: "History Assignment 1",
                                description: "Ancient civilizations"
                            },
                            {
                                subject_id: 'ARTS10010',
                                assignment_id: 5,
                                user_id: 41,
                                similarity_score: null,
                                name: "Art Assignment 1",
                                description: "Canvas painting"
                            },
                        ]
                    },
                    "MATH12345": {
                        id: "MATH12345",
                        name: "Math",
                        professor: "Dr. Smith",
                        students: {
                            101: {
                                id: 101,
                                name: "Alice",
                                email: "Alice@gmail.com",
                                submissions: [
                                    {
                                        subject_id: 'MATH12345',
                                        assignment_id: 1,
                                        similarity_score: 0.8,
                                        name: "Math Assignment 1",
                                        description: "Algebraic Equations"
                                    },
                                    {
                                        subject_id: 'MATH12345',
                                        assignment_id: 2,
                                        similarity_score: null,
                                        name: "Math Assignment 2",
                                        description: "Geometric Shapes"
                                    },
                                    {
                                        subject_id: 'BIOL65432',
                                        assignment_id: 3,
                                        user_id: 101,
                                        similarity_score: null,
                                        name: "Biology Assignment 1",
                                        description: "Cell Structure"
                                    },
                                    {
                                        subject_id: 'HIST30004',
                                        assignment_id: 4,
                                        user_id: 101,
                                        similarity_score: null,
                                        name: "History Assignment 1",
                                        description: "Ancient Civilizations"
                                    },
                                    {
                                        subject_id: 'ARTS10010',
                                        assignment_id: 5,
                                        user_id: 101,
                                        similarity_score: null,
                                        name: "Art Assignment 1",
                                        description: "Canvas Painting"
                                    },
                                ]
                            },
                            102: {
                                id: 102,
                                name: "Bob",
                                email: "Bob@gmail.com",
                                submissions: [
                                    {
                                        subject_id: 'MATH12345',
                                        assignment_id: 1,
                                        user_id: 102,
                                        similarity_score: 0.2,
                                        name: "Math Assignment 1",
                                        description: "Algebraic Equations"
                                    },
                                    {
                                        subject_id: 'MATH12345',
                                        assignment_id: 2,
                                        user_id: 102,
                                        similarity_score: 0.3,
                                        name: "Math Assignment 2",
                                        description: "Geometric Shapes"
                                    },
                                    {
                                        subject_id: 'BIOL65432',
                                        assignment_id: 3,
                                        user_id: 102,
                                        similarity_score: 0.3,
                                        name: "Biology Assignment 1",
                                        description: "Cell Structure"
                                    },
                                    {
                                        subject_id: 'HIST30004',
                                        assignment_id: 4,
                                        user_id: 102,
                                        similarity_score: 0.1,
                                        name: "History Assignment 1",
                                        description: "Ancient Civilizations"
                                    },
                                    {
                                        subject_id: 'ARTS10010',
                                        assignment_id: 5,
                                        user_id: 102,
                                        similarity_score: 0.2,
                                        name: "Art Assignment 1",
                                        description: "Canvas Painting"
                                    },
                                ]
                            },
                        }
                    },
                    "BIOL65432": {
                        id: "BIOL65432",
                        name: "Biology",
                        professor: "Dr. Jones",
                        students: {
                            201: {
                                id: 201,
                                name: "Eleanor",
                                email: "Eleanor@gmail.com",
                                submissions: [
                                    {
                                        subject_id: 'MATH12345',
                                        assignment_id: 1,
                                        user_id: 201,
                                        similarity_score: null,
                                        name: "Math Assignment 1",
                                        description: "Algebraic Equations"
                                    },
                                    {
                                        subject_id: 'MATH12345',
                                        assignment_id: 2,
                                        user_id: 201,
                                        similarity_score: null,
                                        name: "Math Assignment 2",
                                        description: "Geometric Shapes"
                                    },
                                    {
                                        subject_id: 'BIOL65432',
                                        assignment_id: 3,
                                        user_id: 201,
                                        similarity_score: null,
                                        name: "Biology Assignment 1",
                                        description: "Cell Structure"
                                    },
                                    {
                                        subject_id: 'HIST30004',
                                        assignment_id: 4,
                                        user_id: 201,
                                        similarity_score: null,
                                        name: "History Assignment 1",
                                        description: "Ancient Civilizations"
                                    },
                                    {
                                        subject_id: 'ARTS10010',
                                        assignment_id: 5,
                                        user_id: 201,
                                        similarity_score: null,
                                        name: "Art Assignment 1",
                                        description: "Canvas Painting"
                                    },
                                ]
                            },
                            202: {
                                id: 202,
                                name: "Frederick",
                                email: "Frederick@gmail.com",
                                submissions: [
                                    {
                                        subject_id: 'MATH12345',
                                        assignment_id: 1,
                                        user_id: 202,
                                        similarity_score: 0.77,
                                        name: "Math Assignment 1",
                                        description: "Algebraic Equations"
                                    },
                                    {
                                        subject_id: 'MATH12345',
                                        assignment_id: 2,
                                        user_id: 202,
                                        similarity_score: 0.64,
                                        name: "Math Assignment 2",
                                        description: "Geometric Shapes"
                                    },
                                    {
                                        subject_id: 'BIOL65432',
                                        assignment_id: 3,
                                        user_id: 202,
                                        similarity_score: 0.88,
                                        name: "Biology Assignment 1",
                                        description: "Cell Structure"
                                    },
                                    {
                                        subject_id: 'HIST30004',
                                        assignment_id: 4,
                                        user_id: 202,
                                        similarity_score: 0.73,
                                        name: "History Assignment 1",
                                        description: "Ancient Civilizations"
                                    },
                                    {
                                        subject_id: 'ARTS10010',
                                        assignment_id: 5,
                                        user_id: 202,
                                        similarity_score: null,
                                        name: "Art Assignment 1",
                                        description: "Canvas Painting"
                                    },
                                ]}
                        },
                    },
                    "HIST30004": {
                        id: "HIST30004",
                        name: "History",
                        professor: "Dr. Davis",
                        students: {
                            301: {
                                id: 301,
                                name: "Oliver",
                                email: "Oliver@gmail.com",
                                submissions: [
                                    {
                                        subject_id: 'MATH12345',
                                        assignment_id: 1,
                                        user_id: 301,
                                        similarity_score: 0.45,
                                        name: "Math Assignment 1",
                                        description: "Algebraic Equations"
                                    },
                                    {
                                        subject_id: 'MATH12345',
                                        assignment_id: 2,
                                        user_id: 301,
                                        similarity_score: 0.62,
                                        name: "Math Assignment 2",
                                        description: "Geometric Shapes"
                                    },
                                    {
                                        subject_id: 'BIOL65432',
                                        assignment_id: 3,
                                        user_id: 301,
                                        similarity_score: 0.38,
                                        name: "Biology Assignment 1",
                                        description: "Cell Structure"
                                    },
                                    {
                                        subject_id: 'HIST30004',
                                        assignment_id: 4,
                                        user_id: 301,
                                        similarity_score: null,
                                        name: "History Assignment 1",
                                        description: "Ancient Civilizations"
                                    },
                                    {
                                        subject_id: 'ARTS10010',
                                        assignment_id: 5,
                                        user_id: 301,
                                        similarity_score: 0.43,
                                        name: "Art Assignment 1",
                                        description: "Canvas Painting"
                                    },
                                ]
                            },
                            302: {
                                id: 302,
                                name: "Sophia",
                                email: "Sophia@gmail.com",
                                submissions: [
                                    {
                                        subject_id: 'MATH12345',
                                        assignment_id: 1,
                                        user_id: 302,
                                        similarity_score: 0.57,
                                        name: "Math Assignment 1",
                                        description: "Algebraic Equations"
                                    },
                                    {
                                        subject_id: 'MATH12345',
                                        assignment_id: 2,
                                        user_id: 302,
                                        similarity_score: null,
                                        name: "Math Assignment 2",
                                        description: "Geometric Shapes"
                                    },
                                    {
                                        subject_id: 'BIOL65432',
                                        assignment_id: 3,
                                        user_id: 302,
                                        similarity_score: 0.48,
                                        name: "Biology Assignment 1",
                                        description: "Cell Structure"
                                    },
                                    {
                                        subject_id: 'HIST30004',
                                        assignment_id: 4,
                                        user_id: 302,
                                        similarity_score: 0.52,
                                        name: "History Assignment 1",
                                        description: "Ancient Civilizations"
                                    },
                                    {
                                        subject_id: 'ARTS10010',
                                        assignment_id: 5,
                                        user_id: 302,
                                        similarity_score: null,
                                        name: "Art Assignment 1",
                                        description: "Canvas Painting"
                                    },
                                ]
                            }
                        }
                    },
                        
                }
            }
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