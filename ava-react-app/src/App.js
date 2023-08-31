import React, {useState, useEffect} from 'react'
import styles from "./index.css"
import Dashboard from './dashboard'
import NavBar from './navbar'




function App() {
    const [data, setData] = useState([{}])

    // fetch variables from backend
    useEffect(() => {
        fetch("/ass")
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
        <div className="bg-main bg-cover">
            <NavBar />
            <main className="container mx-auto p-8">
                <div>
                {(typeof data.assignment === 'undefined')? (
                    <p>Loading....</p>
                ) : (
                    <Dashboard assignments={data.assignment} />
                )}
                </div>
            </main>
        </div>
        
    )
}

export default App