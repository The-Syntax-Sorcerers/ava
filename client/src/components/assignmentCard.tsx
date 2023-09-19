// Extract the SubjectCard into a separate component for better organization
import { Key } from "react";

export interface assignmentObj {
    name: string;
    id: string;
    due_date: string;
    link: string;
}

export default function AssignmentCard({ ass, rkey, inSubject }: { ass: any, rkey: Key, inSubject: boolean }) {
    return (
        <a href={ass.link}>
        <div key={rkey} className="cursor-pointer custom-assignment-cards">
            <h2 className="text-md font-semibold mb-2">{ass.name}</h2>
            { inSubject ? (null) : (<h3 className=" text-sm font-medium mb-2">{ass.id}</h3>)}
            <p className="text-sm text-gray-500">Due Date: {ass.due_date}</p>
        </div>
        </a>
    );
}