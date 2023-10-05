import { Key } from 'react'
import LoggedInNavbar from '../components/navbarComponents/LoggedInNavbar.tsx'
import AssignmentCard, {assignmentObj} from '../components/assignmentComponents/assignmentCard.tsx'
import Footer from '../components/landingComponents/Footer.tsx'
import { useState } from 'react'
import GraphCard from '../components/analysisComponents/graphCard.tsx'
import BarChartCard from '../components/analysisComponents/barCard.tsx'
import PieChartCard from '../components/analysisComponents/pieCard.tsx'
import CircleProgressCard from '../components/analysisComponents/circleProgressCard.tsx'

import student from '../assets/student.svg';
import afterdrop from '../assets/afterdrop.svg';
import beforedrop from '../assets/beforedrop.svg';

export default function Profile({ data}: {data:any}) {
    const [showComparison, setShowComparison] = useState(true);
    const [showPast, setShowPast] = useState(true);
    const id = data.id
    const comparison = data.comparison
    const past = data.past
    console.log("Profile page:", id, comparison, past)
    
    return (
        <div className="flex flex-col min-h-screen custom-pages">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border pt-28 w-5/6">
                {/* ID and Score Display */}
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-12">
                        <div className="flex items-center mb-4 md:mb-0">
                            <img src={student} alt="ID Icon" className="mr-4"/>
                            <span className="text-6xl font-bold mr-24">{id}</span>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto flex flex-row flex-wrap gap-2 mb-5">
                    <div className="container basis-1/3">
                        <GraphCard data={data.linePunctuation} optionsCategories={data.allScoresLabels} title="Punctuation Frequency"/>
                    </div>
                    <div className="container basis-1/3">
                        <BarChartCard data={data.allScores}  /*optionsCategories={data.allScoresLabels}*/ title="All Scores"/> 
                    </div>
                    <div className="container basis-1/3">
                        <PieChartCard data={data.submissionPie} title="Submission History"/>
                    </div>
                    <div className="container basis-1/3">
                    </div>
                        <CircleProgressCard data={data.avgScore} title="Average Score"/>
                    <div className="container basis-1/3">
                        <GraphCard data={data.lineSentences} optionsCategories={data.allScoresLabels} title="Sentence Analysis"/>
                    </div>
                    

                </div>
                <div className="container mx-auto">
                    {/*<h1 className="text-2xl font-semibold mb-4">All Assignments</h1>*/}
                    <div className="flex items-center mb-4">
                        <h2 className="text-3xl" onClick={() => setShowComparison(!showComparison)}>
                            Make Comparison for
                        </h2>
                        <img src={showComparison ? afterdrop : beforedrop} alt="Dropdown Icon" className="ml-2" onClick={() => setShowComparison(!showComparison)}/>
                    </div>
                    {showComparison && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {comparison.map((assignment: assignmentObj, rkey: Key) => (
                                <AssignmentCard ass={assignment} key={rkey} inSubject={false} />
                            ))}
                        </div>
                    )}
                    <div className="flex items-center mb-4 mt-10">
                        <h2 className="text-3xl" onClick={() => setShowPast(!showPast)}>
                            Past Submissions
                        </h2>
                        <img src={showPast ? afterdrop : beforedrop} alt="Dropdown Icon" className="ml-2" onClick={() => setShowPast(!showPast)}/>
                    </div>
                    {showPast && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {past.map((assignment: assignmentObj, rkey: Key) => (
                                <AssignmentCard ass={assignment} key={rkey} inSubject={false} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}