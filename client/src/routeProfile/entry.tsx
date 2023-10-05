import './profile.css'
import ReactDOM from "react-dom/client";
import React from "react";
import ProfilePage from "./profile.tsx";

if ((globalThis as any).template_data === undefined) {
    (globalThis as any).template_data = {
        "comparison": [{"due_date": "12/12/2023", "id": "COMP123456", "name": "Automata Worksheet",
                        "link": "/assignnent"},
                        {"due_date": "10/17/2023", "id": "COMP123456",
                        "name": "NFA assignment 2", "link": "/ass"},
                        {"due_date": "10/01/2023", "id": "MAST30026",
                        "name": "Bayesian inference 4", "link": "/ass"}],
        "past": [{"due_date": "08/30/2023", "id": "COMP123456",
                        "name": "Grok Worksheet 1", "link": "/ass"},
                        {"due_date": "02/26/2023", "id": "COMP123456",
                        "name": "Grok Worksheet 2", "link": "/ass"}],
        "id": 1171234,
        "allScores":[{name: "All Scores",
            data: [76, 82, 62, 56, 42, 91]}],
        "allScoresLabels": ["A1", "A2", "A3", "P4", "A5", "P6"],
        "avgScore": 86,
        "submissionPie":  [63, 25, 12],
        "submissionCategories": ["Success", "Failed", "Not Yet Submitted"],
        "linePunctuation": [
            {
              name: "Periods",
              data: [50, 64, 48, 66, 49, 68],
              color: "#4318FF",
            },
            {
              name: "Commas",
              data: [30, 40, 24, 46, 20, 46],
              color: "#6AD2FF",
            },
        ],
        "lineSentences": [
            {
                name: "Count Sentences Under",
                data: [30, 40, 24, 46, 20, 46],
                color: "#255C99",
            },
            {
              name: "Count Sentences Over",
              data: [50, 64, 48, 66, 49, 68],
              color: "#4318FF",
            },
            {
                name: "Num Average Sentences",
                data: [3, 11, 5, 8, 14, 9],
                color: "#6AD2FF",
              },
            {
              name: "Average Sentence Length",
              data: [11, 16, 12, 13, 9, 7],
              color: "#6AD2FF",
            },
        ]

    };
    // Calculate average of allscores and round to whole number
   const temp = (globalThis as any).template_data
    let total = 0;
    for(let i = 0; i < temp.allscores.length; i++){
        total += temp.allscores[i];
    }
    temp.score = Math.round(total / temp.allscores.length);

    console.log("Mock data:", (globalThis as any).template_data)
}
else {
    console.log("Received date from server:", (globalThis as any).template_data)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProfilePage data={(globalThis as any).template_data}/>
  </React.StrictMode>,
)