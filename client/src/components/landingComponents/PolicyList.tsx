// The list of privacy policies to reder in [title, paragraph] pairs
const policies = [
    ['Introduction', 'Welcome to our AI Text Comparison Tool\'s Privacy Policy. This policy explains how we collect, use, disclose, and safeguard your information when you use our AI tool. Please read this policy carefully to understand our practices.'],
    ['Information We Collect', 'Our AI tool does not collect personal information from you. We store and process the text you provide for comparison. We may collect technical information about your usage, such as IP address, browser type, and operating system, for analytical purposes. This information is aggregated and anonymized.'],
    ['How We Use Your Information', 'The AI Text Comparison Tool uses the provided text solely for the purpose of education.'],
    ['Information Sharing and Disclosure', 'We do not share, sell, or disclose your personal information or the text you provide for comparison to third parties.'],
    ['Data Security', 'We take reasonable precautions to protect the information collected through our AI tool. However, no method of transmission over the internet or electronic storage is completely secure.'],
    ['Changes to this Privacy Policy', 'We may update this Privacy Policy to reflect changes in our practices. We will notify you of any significant changes via email or by placing a prominent notice on our website.'],
]

// Allows dynamically adding policy paragraphs to the page
function PolicyElement({policy}: {policy: string[]}) {
    const title = policy[0]
    const content = policy[1]

    return (
        <div className="rounded-lg shadow-md p-4 pl-10 
        border-2 border-accent-primary-100">
            <li className="list-decimal pl-2 marker:font-semibold marker:text-gray-700">
                <div>
                    <h2 className='font-semibold text-md text-gray-700'>
                        {title}
                    </h2>
                    <div className='text-sm font-medium text-gray-700'>
                        <p>{content}</p>
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
            {policies.map((policy) => (
                <PolicyElement policy={policy}/>
            ))}
        </ul>
    )
}