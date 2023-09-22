import { Key } from 'react'
import LoggedInNavbar from '../components/navbarComponents/LoggedInNavbar.tsx'
import AssignmentCard, {assignmentObj} from '../components/assignmentComponents/assignmentCard.tsx'
import Footer from '../components/landingComponents/Footer.tsx'
import { useState } from 'react'
import { Line } from 'react-chartjs-2';

import student from '../assets/student.svg';
import afterdrop from '../assets/afterdrop.svg';
import beforedrop from '../assets/beforedrop.svg';

export default function Profile({ id, comparison, past, score, allscores}: {id: number, comparison: any, past: any, score: number, allscores: [number]}) {
    const [showComparison, setShowComparison] = useState(true);
    const [showPast, setShowPast] = useState(true);
    console.log("Profile page:", id, comparison, past, score)
    
    // Prepare data for line graph
    const data = {
        labels: allscores.map((_: any, index: number) => index), // x-axis labels
        datasets: [
            {
                label: 'Scores',
                data: allscores, // y-axis data
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)', // Transparent green
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };
    
    // Options for line graph
    const options: any = {
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
                max: 100,
            },
        },
        responsive: true, // Make the graph responsive
        maintainAspectRatio: false, // Allow dynamic resizing
        tension: 0.4 // Make the line graph less curvy
    };
    
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
                        <div className="flex flex-col md:flex-row items-start">  {/* Align items to the start */}
                            {/* Line Graph */}
                            <div className="md:w-80 mr-0.5  h-55">  {/* Decrease the width and height of the graph */}
                                <Line data={data} options={options} />
                            </div>
                            <div className="text-right md:w-1/2 flex flex-col justify-center">  {/* Increase the width of the average score and align score to the center */}
                                <span className="text-2xl">Average Score</span>
                                <div className="text-5xl font-semibold text-center"> {score}%</div>
                            </div>
                        </div>
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