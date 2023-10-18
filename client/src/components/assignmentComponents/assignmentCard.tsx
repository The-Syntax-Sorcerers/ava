// Extract the SubjectCard into a separate component for better organization

export interface assignmentObj {
    name: string;
    id: string;
    due_date: string;
    link: string;
}

export default function AssignmentCard({ ass, inSubject }: { ass: any, inSubject: boolean }) {
    if(ass.due_date == null) ass.due_date = "None";
    return (
        <a href={ass.link}>
        <div className="cursor-pointer custom-assignment-cards">
            <h2 className="text-md font-semibold mb-2">{ass.name}</h2>
            { inSubject ? (null) : (<h3 className=" text-sm font-medium mb-2">{ass.id}</h3>)}
            <p className="text-sm text-gray-500">Due Date: {ass.due_date}</p>
        </div>
        </a>
    );
}