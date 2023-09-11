// Extract the SubjectCard into a separate component for better organization
import { Key } from "react";

export default function SubjectCard({ ass, rkey }: { ass: any, rkey: Key }) {
    return (
        <div key={rkey} className="bg-card rounded-lg shadow-md p-4 transform hover:scale-105 transition-transform duration-300 cursor-pointer" >
            <h2 className="text-lg font-semibold mb-2">{ass.name}</h2>
            <h3 className="text-lg font-semibold mb-2">{ass.id}</h3>
            <p className="text-gray-600">Due Date: {ass.due_date}</p>
        </div>
    );
}