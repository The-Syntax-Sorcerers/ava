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
        <div className="custom-subject-cards">
            <h2 className="text-lg font-semibold mb-2">{ass.name}</h2>
            { inSubject ? (null) : (<h3 className="text-md font-semibold mb-2">{ass.id}</h3>)}
            <div className="flex justify-start items-center">
                <p className="text-neutral-600">Due Date:&nbsp;</p>
                <p className="text-neutral-600">{ass.due_date}</p>
            </div>
        </div>
        </a>
    );
}