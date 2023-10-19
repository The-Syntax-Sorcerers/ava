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
                students: [41, 42, 44, 46, 48, 49]
            },
            "MATH12345": {
                id: "MATH12345",
                name: "Math",
                professor: "Dr. Smith",
                students: [43, 44, 45, 47, 49, 50]
            },
            "BIOL65432": {
                id: "BIOL65432",
                name: "Biology",
                professor: "Dr. Jones",
                students: [41, 42, 43, 45, 47, 48]
            },
            "HIST30004": {
                id: "HIST30004",
                name: "History",
                professor: "Dr. Davis",
                students: [42, 44, 45, 46, 49, 50]
            },
        },
        studentItems: {
            41: {
                id: 41,
                name: "Alice",
                submissions: [
                    {
                        assignment_id: 1,
                        name: "Math Challenge",
                        description: "Solve complex mathematical problems",
                        similarity_score: 0.75,
                        subject_id: 'MATH12345',
                        user_id: 41,
                    },
                    {
                        assignment_id: 2,
                        name: "Science Exploration",
                        description: "Investigate scientific phenomena",
                        similarity_score: 0.62,
                        subject_id: 'SCIENCE20001',
                        user_id: 41,
                    },
                    {
                        assignment_id: 3,
                        name: "History Quest",
                        description: "Explore historical events and figures",
                        similarity_score: 0.45,
                        subject_id: 'HIST30004',
                        user_id: 41,
                    },
                    {
                        assignment_id: 4,
                        name: "Literary Odyssey",
                        description: "Analyze classic literature",
                        similarity_score: null,
                        subject_id: 'LIT10010',
                        user_id: 41,
                    },
                    {
                        assignment_id: 5,
                        name: "Artistic Expression",
                        description: "Create original artworks",
                        similarity_score: 0.88,
                        subject_id: 'ARTS10010',
                        user_id: 41,
                    },
                    {
                        assignment_id: 6,
                        name: "Biology Challenge",
                        description: "Explore the wonders of life",
                        similarity_score: 0.3,
                        subject_id: 'BIOL65432',
                        user_id: 41,
                    },
                ],
            },
            42: {
                id: 42,
                name: "Bob",
                submissions: [
                    {
                        assignment_id: 1,
                        name: "Math Puzzles",
                        description: "Solve intricate math puzzles",
                        similarity_score: 0.58,
                        subject_id: 'MATH12345',
                        user_id: 42,
                    },
                    {
                        assignment_id: 2,
                        name: "Chemistry Exploration",
                        description: "Investigate chemical reactions",
                        similarity_score: 0.71,
                        subject_id: 'SCIENCE20001',
                        user_id: 42,
                    },
                    {
                        assignment_id: 3,
                        name: "Historical Analysis",
                        description: "Analyze historical documents",
                        similarity_score: 0.4,
                        subject_id: 'HIST30004',
                        user_id: 42,
                    },
                    {
                        assignment_id: 4,
                        name: "Literary Journey",
                        description: "Explore famous literary works",
                        similarity_score: null,
                        subject_id: 'LIT10010',
                        user_id: 42,
                    },
                    {
                        assignment_id: 5,
                        name: "Creative Artwork",
                        description: "Produce original artwork",
                        similarity_score: 0.82,
                        subject_id: 'ARTS10010',
                        user_id: 42,
                    },
                    {
                        assignment_id: 6,
                        name: "Biology Quest",
                        description: "Investigate biological phenomena",
                        similarity_score: 0.35,
                        subject_id: 'BIOL65432',
                        user_id: 42,
                    },
                ],
            },
            43: {
                id: 43,
                name: "Charlie",
                submissions: [
                    {
                        assignment_id: 1,
                        name: "Science Challenge",
                        description: "Solve challenging science problems",
                        similarity_score: 0.7,
                        subject_id: 'SCIENCE20001',
                        user_id: 43,
                    },
                    {
                        assignment_id: 2,
                        name: "Historical Exploration",
                        description: "Explore historical events and figures",
                        similarity_score: 0.55,
                        subject_id: 'HIST30004',
                        user_id: 43,
                    },
                    {
                        assignment_id: 3,
                        name: "Literary Analysis",
                        description: "Analyze classic literature",
                        similarity_score: 0.6,
                        subject_id: 'LIT10010',
                        user_id: 43,
                    },
                    {
                        assignment_id: 4,
                        name: "Artistic Creation",
                        description: "Create original artworks",
                        similarity_score: null,
                        subject_id: 'ARTS10010',
                        user_id: 43,
                    },
                    {
                        assignment_id: 5,
                        name: "Biology Challenge",
                        description: "Solve challenging biology problems",
                        similarity_score: 0.72,
                        subject_id: 'BIOL65432',
                        user_id: 43,
                    },
                    {
                        assignment_id: 6,
                        name: "Math Puzzles",
                        description: "Solve intricate math puzzles",
                        similarity_score: 0.65,
                        subject_id: 'MATH12345',
                        user_id: 43,
                    },
                ],
            },
            44: {
                id: 44,
                name: "David",
                submissions: [
                    {
                        assignment_id: 1,
                        name: "Math Challenges",
                        description: "Solve challenging math problems",
                        similarity_score: 0.78,
                        subject_id: 'MATH12345',
                        user_id: 44,
                    },
                    {
                        assignment_id: 2,
                        name: "Science Discovery",
                        description: "Discover scientific phenomena",
                        similarity_score: null,
                        subject_id: 'SCIENCE20001',
                        user_id: 44,
                    },
                    {
                        assignment_id: 3,
                        name: "Historical Quest",
                        description: "Embark on a historical journey",
                        similarity_score: 0.6,
                        subject_id: 'HIST30004',
                        user_id: 44,
                    },
                    {
                        assignment_id: 4,
                        name: "Literary Exploration",
                        description: "Explore classic literature",
                        similarity_score: 0.45,
                        subject_id: 'LIT10010',
                        user_id: 44,
                    },
                    {
                        assignment_id: 5,
                        name: "Artistic Expression",
                        description: "Express creativity through art",
                        similarity_score: 0.82,
                        subject_id: 'ARTS10010',
                        user_id: 44,
                    },
                    {
                        assignment_id: 6,
                        name: "Biology Journey",
                        description: "Journey through the world of biology",
                        similarity_score: 0.4,
                        subject_id: 'BIOL65432',
                        user_id: 44,
                    },
                ],
            },
            45: {
                id: 45,
                name: "Ella",
                submissions: [
                    {
                        assignment_id: 1,
                        name: "Physics Challenge",
                        description: "Take on challenging physics problems",
                        similarity_score: 0.65,
                        subject_id: 'PHYSICS20001',
                        user_id: 45,
                    },
                    {
                        assignment_id: 2,
                        name: "Geography Exploration",
                        description: "Explore geographical phenomena",
                        similarity_score: null,
                        subject_id: 'GEOG10010',
                        user_id: 45,
                    },
                    {
                        assignment_id: 3,
                        name: "Art Appreciation",
                        description: "Appreciate various forms of art",
                        similarity_score: 0.73,
                        subject_id: 'ARTS10010',
                        user_id: 45,
                    },
                    {
                        assignment_id: 4,
                        name: "Environmental Studies",
                        description: "Study the environment and ecology",
                        similarity_score: 0.54,
                        subject_id: 'ENVSCI12345',
                        user_id: 45,
                    },
                    {
                        assignment_id: 5,
                        name: "Math Puzzles",
                        description: "Solve intricate math puzzles",
                        similarity_score: 0.69,
                        subject_id: 'MATH12345',
                        user_id: 45,
                    },
                    {
                        assignment_id: 6,
                        name: "Literary Journey",
                        description: "Embark on a literary adventure",
                        similarity_score: 0.48,
                        subject_id: 'LIT10010',
                        user_id: 45,
                    },
                ],
            },
            46: {
                id: 46,
                name: "Fiona",
                submissions: [
                    {
                        assignment_id: 1,
                        name: "Chemistry Challenges",
                        description: "Take on challenging chemistry problems",
                        similarity_score: 0.78,
                        subject_id: 'CHEM20001',
                        user_id: 46,
                    },
                    {
                        assignment_id: 2,
                        name: "Cultural Exploration",
                        description: "Explore diverse cultures and traditions",
                        similarity_score: null,
                        subject_id: 'CULTSTUDY10010',
                        user_id: 46,
                    },
                    {
                        assignment_id: 3,
                        name: "Creative Writing",
                        description: "Express creativity through writing",
                        similarity_score: 0.67,
                        subject_id: 'CREATIVEWRITING12345',
                        user_id: 46,
                    },
                    {
                        assignment_id: 4,
                        name: "History and Society",
                        description: "Explore the history of societies",
                        similarity_score: 0.58,
                        subject_id: 'HISTSOCIETY20001',
                        user_id: 46,
                    },
                    {
                        assignment_id: 5,
                        name: "Artistic Expression",
                        description: "Express creativity through art",
                        similarity_score: 0.62,
                        subject_id: 'ARTS10010',
                        user_id: 46,
                    },
                    {
                        assignment_id: 6,
                        name: "Biology Journey",
                        description: "Journey through the world of biology",
                        similarity_score: 0.44,
                        subject_id: 'BIOL65432',
                        user_id: 46,
                    },
                ],
            },
            47: {
                id: 47,
                name: "William",
                submissions: [
                    {
                        assignment_id: 1,
                        name: "Physics Adventure",
                        description: "Embark on a physics adventure",
                        similarity_score: 0.62,
                        subject_id: 'PHYSICS20001',
                        user_id: 47,
                    },
                    {
                        assignment_id: 2,
                        name: "Geology Expedition",
                        description: "Explore the wonders of geology",
                        similarity_score: null,
                        subject_id: 'GEOLOGY10010',
                        user_id: 47,
                    },
                    {
                        assignment_id: 3,
                        name: "Creative Arts Showcase",
                        description: "Showcase your creativity through art",
                        similarity_score: 0.73,
                        subject_id: 'ARTS10010',
                        user_id: 47,
                    },
                    {
                        assignment_id: 4,
                        name: "Environmental Exploration",
                        description: "Explore the environment and its mysteries",
                        similarity_score: 0.54,
                        subject_id: 'ENVSCI12345',
                        user_id: 47,
                    },
                    {
                        assignment_id: 5,
                        name: "Math Challenges",
                        description: "Take on challenging math problems",
                        similarity_score: 0.69,
                        subject_id: 'MATH12345',
                        user_id: 47,
                    },
                    {
                        assignment_id: 6,
                        name: "Literature Voyage",
                        description: "Embark on a literary voyage of discovery",
                        similarity_score: 0.48,
                        subject_id: 'LIT10010',
                        user_id: 47,
                    },
                ],
            },
            48: {
                id: 48,
                name: "Olivia",
                submissions: [
                    {
                        assignment_id: 1,
                        name: "Chemistry Quest",
                        description: "Embark on a quest to master chemistry",
                        similarity_score: 0.78,
                        subject_id: 'CHEM20001',
                        user_id: 48,
                    },
                    {
                        assignment_id: 2,
                        name: "Cultural Insights",
                        description: "Gain insights into diverse cultures",
                        similarity_score: null,
                        subject_id: 'CULTSTUDY10010',
                        user_id: 48,
                    },
                    {
                        assignment_id: 3,
                        name: "Creative Writing Challenge",
                        description: "Challenge your creative writing skills",
                        similarity_score: 0.67,
                        subject_id: 'CREATIVEWRITING12345',
                        user_id: 48,
                    },
                    {
                        assignment_id: 4,
                        name: "Societal History",
                        description: "Explore the history of societies and civilizations",
                        similarity_score: 0.58,
                        subject_id: 'HISTSOCIETY20001',
                        user_id: 48,
                    },
                    {
                        assignment_id: 5,
                        name: "Artistic Expression Showcase",
                        description: "Showcase your artistic expressions",
                        similarity_score: 0.62,
                        subject_id: 'ARTS10010',
                        user_id: 48,
                    },
                    {
                        assignment_id: 6,
                        name: "Biology Odyssey",
                        description: "Embark on a biology odyssey of discovery",
                        similarity_score: 0.44,
                        subject_id: 'BIOL65432',
                        user_id: 48,
                    },
                ],
            },   
            49: {
                id: 49,
                name: "Henry",
                submissions: [
                    {
                        assignment_id: 1,
                        name: "Physics Challenges",
                        description: "Take on challenging physics problems",
                        similarity_score: 0.71,
                        subject_id: 'PHYSICS20001',
                        user_id: 49,
                    },
                    {
                        assignment_id: 2,
                        name: "Art Exploration",
                        description: "Explore the world of art and creativity",
                        similarity_score: null,
                        subject_id: 'ARTS10010',
                        user_id: 49,
                    },
                    {
                        assignment_id: 3,
                        name: "History Mysteries",
                        description: "Uncover mysteries from the pages of history",
                        similarity_score: 0.59,
                        subject_id: 'HIST30004',
                        user_id: 49,
                    },
                    {
                        assignment_id: 4,
                        name: "Math Puzzles",
                        description: "Solve intriguing math puzzles and riddles",
                        similarity_score: 0.62,
                        subject_id: 'MATH12345',
                        user_id: 49,
                    },
                    {
                        assignment_id: 5,
                        name: "Biology Insights",
                        description: "Gain insights into the world of biology",
                        similarity_score: 0.67,
                        subject_id: 'BIOL65432',
                        user_id: 49,
                    },
                    {
                        assignment_id: 6,
                        name: "Literary Explorations",
                        description: "Embark on explorations of literary classics",
                        similarity_score: 0.53,
                        subject_id: 'LIT10010',
                        user_id: 49,
                    },
                ],
            },
            50: {
                id: 50,
                name: "Sophia",
                submissions: [
                    {
                        assignment_id: 1,
                        name: "Chemistry Challenges",
                        description: "Take on challenging chemistry assignments",
                        similarity_score: 0.74,
                        subject_id: 'CHEM20001',
                        user_id: 50,
                    },
                    {
                        assignment_id: 2,
                        name: "Cultural Studies",
                        description: "Explore the rich tapestry of cultures worldwide",
                        similarity_score: null,
                        subject_id: 'CULTSTUDY10010',
                        user_id: 50,
                    },
                    {
                        assignment_id: 3,
                        name: "Creative Writing Journey",
                        description: "Embark on a creative writing journey of discovery",
                        similarity_score: 0.68,
                        subject_id: 'CREATIVEWRITING12345',
                        user_id: 50,
                    },
                    {
                        assignment_id: 4,
                        name: "Societal Transformations",
                        description: "Examine transformations in societies over time",
                        similarity_score: 0.56,
                        subject_id: 'HISTSOCIETY20001',
                        user_id: 50,
                    },
                    {
                        assignment_id: 5,
                        name: "Artistic Expressions",
                        description: "Express your creativity through various art forms",
                        similarity_score: 0.61,
                        subject_id: 'ARTS10010',
                        user_id: 50,
                    },
                    {
                        assignment_id: 6,
                        name: "Biology Discoveries",
                        description: "Discover fascinating biological phenomena",
                        similarity_score: 0.49,
                        subject_id: 'BIOL65432',
                        user_id: 50,
                    },
                ],
            },                     
        }
    };


    (globalThis as any).template_data = {
        "studentItems": {
            "9": {
                "analytics": {
                    "allScores": [
                        {
                            "color": "#e21bd2",
                            "data": [
                                100
                            ],
                            "name": "Score"
                        }
                    ],
                    "assignmentLabels": [
                        "1"
                    ],
                    "avgScore": 100,
                    "linePunctuation": [
                        {
                            "color": "#ffc1c5",
                            "data": [
                                12
                            ],
                            "name": "Periods"
                        },
                        {
                            "color": "#e08d82",
                            "data": [
                                1
                            ],
                            "name": "Commas"
                        },
                        {
                            "color": "#31006b",
                            "data": [
                                0
                            ],
                            "name": "Semicolons"
                        },
                        {
                            "color": "#f884ff",
                            "data": [
                                0
                            ],
                            "name": "Colons"
                        },
                        {
                            "color": "#a1dde0",
                            "data": [
                                0
                            ],
                            "name": "Exclamations"
                        },
                        {
                            "color": "#c7bcf4",
                            "data": [
                                0
                            ],
                            "name": "Question Marks"
                        },
                        {
                            "color": "#43e8df",
                            "data": [
                                0
                            ],
                            "name": "Dashes"
                        },
                        {
                            "color": "#9cdee5",
                            "data": [
                                0
                            ],
                            "name": "Open Parentheses"
                        },
                        {
                            "color": "#23ffe5",
                            "data": [
                                0
                            ],
                            "name": "Close Parentheses"
                        },
                        {
                            "color": "#56ce06",
                            "data": [
                                0
                            ],
                            "name": "Double Quotes"
                        },
                        {
                            "color": "#a5291c",
                            "data": [
                                0
                            ],
                            "name": "Apostrophe"
                        },
                        {
                            "color": "#f8ffaf",
                            "data": [
                                0
                            ],
                            "name": "Tilda"
                        },
                        {
                            "color": "#6aa6c9",
                            "data": [
                                0
                            ],
                            "name": "Forward Slash"
                        }
                    ],
                    "lineSentences": [
                        {
                            "color": "#d6068d",
                            "data": [
                                2
                            ],
                            "name": "Count of Sentences Over Average"
                        },
                        {
                            "color": "#c5f27d",
                            "data": [
                                2
                            ],
                            "name": "Count of Sentences Under Average"
                        },
                        {
                            "color": "#877add",
                            "data": [
                                0
                            ],
                            "name": "Count of Average Sentences"
                        },
                        {
                            "color": "#a9c6e8",
                            "data": [
                                29.8
                            ],
                            "name": "Average Sentence Length"
                        }
                    ],
                    "lineWords": [
                        {
                            "color": "#bb2bff",
                            "data": [
                                23
                            ],
                            "name": "Rare Word Count"
                        },
                        {
                            "color": "#54f792",
                            "data": [
                                30
                            ],
                            "name": "Long Word Count"
                        },
                        {
                            "color": "#b2750c",
                            "data": [
                                36
                            ],
                            "name": "Count Over Average"
                        },
                        {
                            "color": "#ac49e5",
                            "data": [
                                36
                            ],
                            "name": "Count Under Average"
                        },
                        {
                            "color": "#4af795",
                            "data": [
                                10
                            ],
                            "name": "Count Average"
                        },
                        {
                            "color": "#03ad1c",
                            "data": [
                                5
                            ],
                            "name": "Average Word Length"
                        },
                        {
                            "color": "#8ea9f9",
                            "data": [
                                0.4
                            ],
                            "name": "Token Type Ratio"
                        }
                    ],
                    "submissionCategories": [
                        "Failed",
                        "Success"
                    ],
                    "submissionPie": [
                        0,
                        1
                    ],
                    "wordCounts": [
                        {
                            "color": "#e8bf96",
                            "data": [
                                119
                            ],
                            "name": "Word Count"
                        }
                    ]
                },
                "email": "test@gmail.com",
                "id": 9,
                "name": "Test",
                "submissions": [
                    {
                        "assignment_id": 10,
                        "description": "Write stuff in your own words. Do not use ChatGPT or any AI to assist you. WE CAN TELL!!",
                        "name": "Time 1",
                        "punc_vec": [
                            {
                                "data": null,
                                "name": "Punctuation Counts"
                            }
                        ],
                        "sent_vec": [
                            {
                                "data": null,
                                "name": "Sentence Analysis"
                            }
                        ],
                        "similarity_score": null,
                        "subject_id": "TIME10010",
                        "user_id": 9,
                        "word_count": null,
                        "word_vec": [
                            {
                                "data": null,
                                "name": "Word Analysis"
                            }
                        ]
                    },
                    {
                        "assignment_id": 7,
                        "description": "Write stuff in your own words. Do not use ChatGPT or any AI to assist you. WE CAN TELL!!",
                        "name": "Time 2",
                        "punc_vec": [
                            {
                                "data": null,
                                "name": "Punctuation Counts"
                            }
                        ],
                        "sent_vec": [
                            {
                                "data": null,
                                "name": "Sentence Analysis"
                            }
                        ],
                        "similarity_score": null,
                        "subject_id": "TIME10010",
                        "user_id": 9,
                        "word_count": null,
                        "word_vec": [
                            {
                                "data": null,
                                "name": "Word Analysis"
                            }
                        ]
                    },
                    {
                        "assignment_id": 1,
                        "description": "Write stuff in your own words. Do not use ChatGPT or any AI to assist you. WE CAN TELL!!",
                        "name": "Some BS Assignment",
                        "punc_vec": [
                            {
                                "data": [
                                    12,
                                    1,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0
                                ],
                                "name": "Punctuation Counts"
                            }
                        ],
                        "sent_vec": [
                            {
                                "data": [
                                    2,
                                    2,
                                    0,
                                    29.8
                                ],
                                "name": "Sentence Analysis"
                            }
                        ],
                        "similarity_score": 1,
                        "subject_id": "COMP123456",
                        "user_id": 9,
                        "word_count": 119,
                        "word_vec": [
                            {
                                "data": [
                                    23,
                                    30,
                                    36,
                                    36,
                                    10,
                                    5,
                                    0.4
                                ],
                                "name": "Word Analysis"
                            }
                        ]
                    },
                    {
                        "assignment_id": 23,
                        "description": "no",
                        "name": "we want to hire a salesman.",
                        "punc_vec": [
                            {
                                "data": null,
                                "name": "Punctuation Counts"
                            }
                        ],
                        "sent_vec": [
                            {
                                "data": null,
                                "name": "Sentence Analysis"
                            }
                        ],
                        "similarity_score": null,
                        "subject_id": "COMP123456",
                        "user_id": 9,
                        "word_count": null,
                        "word_vec": [
                            {
                                "data": null,
                                "name": "Word Analysis"
                            }
                        ]
                    },
                    {
                        "assignment_id": 2,
                        "description": "Write stuff in your own words. Do not use ChatGPT or any AI to assist you. WE CAN TELL!!",
                        "name": "Assignment 2",
                        "punc_vec": [
                            {
                                "data": null,
                                "name": "Punctuation Counts"
                            }
                        ],
                        "sent_vec": [
                            {
                                "data": null,
                                "name": "Sentence Analysis"
                            }
                        ],
                        "similarity_score": null,
                        "subject_id": "COMP123456",
                        "user_id": 9,
                        "word_count": null,
                        "word_vec": [
                            {
                                "data": null,
                                "name": "Word Analysis"
                            }
                        ]
                    }
                ],
                "user_type": "student"
            }
        },
        "subjectItems": {
            "COMP123456": {
                "description": "This is a basic Description.",
                "id": "COMP123456",
                "name": "Intro to DSA",
                "professor_email": "prof@gmail.com",
                "students": [
                    9
                ]
            },
            "TIME10010": {
                "description": "This is a basic Description.",
                "id": "TIME10010",
                "name": "Intro to Time Management",
                "professor_email": "prof@gmail.com",
                "students": [
                    9
                ]
            }
        },
        "user_type": "teacher"
    }

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