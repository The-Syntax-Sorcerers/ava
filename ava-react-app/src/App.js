import React, {useState, useEffect} from 'react'
import styles from "./index.css"
import Dashboard from './dashboard'
import NavBar from './navbar'
import AssignmentsPage from './Assignments';
import LandingPage from './landing'

function App() {
    const [switchPage, setSwitchPage] = React.useState(false);

    return (
        <>
        {switchPage ? (
            <AssignmentsPage setSwitchPage={setSwitchPage}/>
        ): 
            <LandingPage setSwitchPage={setSwitchPage} switchPage={true}/>
        };

        </>
    )
}

export default App