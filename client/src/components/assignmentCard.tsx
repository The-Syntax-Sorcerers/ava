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
        <div className="bg-card rounded-lg shadow-md p-4 transform hover:bg-card-hover hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h2 className="text-lg font-semibold mb-2">{ass.name}</h2>
            { inSubject ? (null) : (<h3 className="text-md font-semibold mb-2">{ass.id}</h3>)}
            <p className="text-gray-600">Due Date: {ass.due_date}</p>
        </div>
        </a>
    );
}