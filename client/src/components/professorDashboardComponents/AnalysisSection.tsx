import {useEffect, useState} from 'react';
import FileComponent from "../assignmentComponents/FileComponent";
import AnalyticsResults from "./AnalyticsResults";
import GraphCard from "../analysisComponents/graphCard";
import PieChartCard from "../analysisComponents/pieCard";
import CircleProgressCard from "../analysisComponents/circleProgressCard";

// The format the states are stored in
interface StatesDict {
    [key: string]: string
}

// Creates the subsection of the dashboard relating to the assignment upload status and results
export default function AnalysisSection({states, currentState, assignment, analytics}: 
        {states: StatesDict, currentState: string, assignment: any, analytics: any}) {
    
    const [userEmail, setUserEmail] = useState('');

    // Reading in the data from the server or the mock data
    const data = (globalThis as any).template_data
    const studentItems = data.studentItems;

    useEffect(() => {
        // Reset selectedDocs when props change
        if(assignment !== undefined && assignment !== null) {
            setUserEmail(studentItems[assignment.user_id].email);
        }
    }, [assignment]);
    
    
    return (
        <>
        {/* When idle just display student stats */}
        {currentState === states.idleMode ? (
            <div className="flex justify-center items-center h-full flex-wrap">
                <h1 className="text-2xl font-semibold mb-4 mt-4 text-center">
                    Student Analytics
                </h1>
                <GraphCard data={analytics.linePunctuation} optionsCategories={analytics.assignmentLabels} title="Punctuation Frequency"/>
                <GraphCard data={analytics.lineSentences} optionsCategories={analytics.assignmentLabels} title="Sentence Analysis"/>
                <GraphCard data={analytics.allScores}  optionsCategories={analytics.assignmentLabels} title="All Scores"/> 
                <PieChartCard data={analytics.submissionPie} title="Submission History"/>
                <CircleProgressCard data={analytics.avgScore} title="Average Score"/>
                <GraphCard data={analytics.lineWords} optionsCategories={analytics.assignmentLabels} title="Word Analysis"/>
                <GraphCard data={analytics.wordCounts} optionsCategories={analytics.assignmentLabels} title="Word Counts"/>
            </div>

        ) : (null)
        }

        {/* 2. For comparing against the student */}
        {currentState === states.compareMode ? (
            <>
                <h1 className="text-2xl font-semibold mb-4 mt-4 text-center">
                    Comparison Mode
                </h1>
                <p className="text-base mb-2 pl-2 flex flex-col">
                    Upload a document to compare against the student's body of work without uploading it to their profile
                </p>
                {/* <FileComponent subject_id={} assignment_id={} user_id={}/> */}
            </>
        ) : (
            null
        )}

        {/* 3. For uploading for the student */}
        {currentState === states.uploadMode ? (
            <>
                <h1 className="text-2xl font-semibold mb-4 mt-4 text-center">
                    { assignment.name }
                </h1>
                <p className="text-base font-semibold mb-2 pl-2 flex flex-col">
                    Description:
                    <p className="pl-4 font-normal">
                        { assignment.description }
                    </p>
                </p>
                <FileComponent user_email={userEmail} subject_id={assignment.subject_id} assignment_id={assignment.assignment_id} user_id={assignment.user_id} />
            </>
        ) : (
            null
        )}

        {/* 4. For looking at previously submitted works */}
        {currentState === states.resultsMode ? (
            <AnalyticsResults ass={ assignment }/>) : (null)
        }
        </>
    )
}