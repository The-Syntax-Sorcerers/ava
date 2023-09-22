import { Key } from "react";

// Extract the SubjectCard into a separate component for better organization
export default function SubjectCard({ sub, rkey }: { sub: any, rkey: Key }) {
    return (
        <a href={sub.link}>
        <div key={rkey} className="cursor-pointer custom-subject-cards">
            <h3 className="text-base font-semibold mb-1">{sub.name}</h3>
            <h2 className="text-xs text-gray font-medium">{sub.id}</h2>
        </div>
        </a>
    );
}
