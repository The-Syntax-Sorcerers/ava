import React, {useState, useEffect} from 'react'
import styles from "./index.css"
import Dashboard from './dashboard'
import NavBar from './navbar'

export default function AssignmentsPage({ setSwitchPage }) {
    const [data, setData] = useState({ all_assignments: [] })

    // fetch variables from backend
    useEffect(() => {
        fetch("/ass", {
            method: "GET",
            credentials: "include", // Include cookies in the request
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(data => {
            setData(data);
            console.log(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);

    return (
        <div className="bg-main bg-cover min-h-screen">
            <NavBar switchPage={true}/>
            <main className="container mx-auto p-8">
                <div>
                {(data.all_assignments.length === 0)? (
                    <p>Loading....</p>
                ) : (
                    <Dashboard assignments={data.all_assignments} />
                )}
                </div>
            </main>
        </div>
        
    )
}
