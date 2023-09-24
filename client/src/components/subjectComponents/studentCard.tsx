export interface studentObj {
    name: string;
    link: string;
}

// Extract the SubjectCard into a separate component for better organization
export default function SubjectCard({ stu }: { stu: any}) {
    return (
        <a href={stu.link}>
        <div className="cursor-pointer custom-subject-cards">
            <h3 className="text-base font-semibold mb-1">{stu.name}</h3>
        </div>
        </a>
    );
}
