import React from 'react';

export default function Dashboard({assignments}){
    return (
        <div className="container mx-auto px-4 py-20">
        <h1 className="text-2xl font-semibold mb-4">Assignments</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {assignments.map((assignment, index) => (
                <div key={index} className="bg-card rounded shadow p-4" >
                    <h2 className="text-lg font-semibold mb-2">{assignment.name}</h2>
                    <h3 className="text-lg font-semibold mb-2">{assignment.id}</h3>
                    <p className="text-gray-600">Due Date: {assignment.due_date}</p>
                </div>
            ))}
        </div>
        </div>
    )
}