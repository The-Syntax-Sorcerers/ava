import { Key } from 'react'

// The privacy policy contact email
const contactEmail = '[email]'   

// The list of privacy policies to reder in [title, paragraph] pairs
const policies = [
    ['Introduction', 'Welcome to our AI Text Comparison Tool\'s Privacy Policy. This policy explains how we collect, use, disclose, and safeguard your information when you use our AI tool. Please read this policy carefully to understand our practices.'],
    ['Information We Collect', 'Our AI tool does not collect personal information from you. We store and process the text you provide for comparison. We may collect technical information about your usage, such as IP address, browser type, and operating system, for analytical purposes. This information is aggregated and anonymized.'],
    ['How We Use Your Information', 'The AI Text Comparison Tool uses the provided text solely for the purpose of education.'],
    ['Information Sharing and Disclosure', 'We do not share, sell, or disclose your personal information or the text you provide for comparison to third parties.'],
    ['Data Security', 'We take reasonable precautions to protect the information collected through our AI tool. However, no method of transmission over the internet or electronic storage is completely secure.'],
    ['Changes to this Privacy Policy', 'We may update this Privacy Policy to reflect changes in our practices. We will notify you of any significant changes via email or by placing a prominent notice on our website.'],
    ['Contact Us', `If you have questions about this Privacy Policy, please contact us at ${contactEmail}`],
]

// Allows dynamically adding policy paragraphs to the page
function PolicyElement({policy, rkey}: {policy: string[], rkey: Key}) {
    const title = policy[0]
    const content = policy[1]

    return (
        <div className="bg-slate-100 rounded-lg shadow-md p-4 pl-10">
            <li key={rkey} className="list-decimal pl-2 marker:font-bold">
                <div>
                    <h2 className='font-bold text-1xl'>
                        {title}
                    </h2>
                    <div className='ml-8'>
                        <p className='text-lg'>
                            {content}
                        </p>
                    </div>
                </div>
            </li>
        </div>
    )
}

// Creates a numbered list of policies
export default function PolicyList() {
    return (
        <ul className='space-y-5'>
            {policies.map((policy, rkey: Key) => (
                <PolicyElement policy={policy} rkey={rkey} />
            ))}
        </ul>
    )
}