import React, {useState, useEffect} from 'react'

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
        <div>
            {(typeof data.assignment === 'undefined')? (
                <p>Loading....</p>
            ) : (
                data.assignment.map((assignment, i) => (
                    <p key={i}> {assignment}</p>
                ))
            )}

        </div>
    )
}

export default App