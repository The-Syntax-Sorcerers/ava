import LoggedInNavbar from "../components/LoggedInNavbar";
import PolicyList from "../components/PolicyList";
// Import Footer from "../components/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="bg-main bg-cover flex flex-col min-h-screen">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border p-40 min-h-screen">
                <PolicyList />
            </main>
            {/* <Footer /> */}
        </div>
    )
}

/*
<div class="privacy-policy-container">
        <h1>Privacy Policy</h1>
        <p>Last updated: [Date]</p>

        <h2>1. Introduction</h2>
        <p>Welcome to our AI Text Comparison Tool's Privacy Policy. This policy explains how we collect, use, disclose, and safeguard your information when you use our AI tool. Please read this policy carefully to understand our practices.</p>

        <h2>2. Information We Collect</h2>
        <p>Our AI tool does not collect personal information from you. We store and process the text you provide for comparison.</p>
        <p>We may collect technical information about your usage, such as IP address, browser type, and operating system, for analytical purposes. This information is aggregated and anonymized.</p>

        <h2>3. How We Use Your Information</h2>
        <p>The AI Text Comparison Tool uses the provided text solely for the purpose of education.</p>

        <h2>4. Information Sharing and Disclosure</h2>
        <p>We do not share, sell, or disclose your personal information or the text you provide for comparison to third parties.</p>

        <h2>5. Data Security</h2>
        <p>We take reasonable precautions to protect the information collected through our AI tool. However, no method of transmission over the internet or electronic storage is completely secure.</p>

        <h2>6. Changes to this Privacy Policy</h2>
        <p>We may update this Privacy Policy to reflect changes in our practices. We will notify you of any significant changes via email or by placing a prominent notice on our website.</p>

        <h2>7. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at privacy@example.com.</p>
    </div>
*/