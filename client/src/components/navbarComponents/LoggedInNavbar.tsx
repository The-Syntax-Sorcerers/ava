import logo from "../../assets/logo.svg";
import { Key } from 'react';


// The list of link elements to add in [title, url] pairs
const routes = [
    ['Admin Dashboard', '/AdminDashboard', "teacher"],
    ['Subjects', '/dashboard', "student"],
    ['Assignments', '/assignments', "student"],
    ['Log Out', '/logout', 'student']
]

// Allows dynamically adding link elements to the navbar
function NavBarElement({route}: {route: string[]}) {
    const data = (globalThis as any).template_data;
    const user_type = data.user_type;

    const title = route[0];
    const url = route[1];
    const routeType = route[2];

    if(routeType === "teacher" && user_type !== "teacher") {
        return null;
    }

    return (
        <li>
            <a href={url} className="custom-navbar-link-element">
                {title}
            </a>
        </li>
    );
}

// Creates a navbar for authenticated users to naviagte the website quickly and easily
export default function LoggedInNavbar() {

    return (
        <>
            <nav className="fixed top-5 left-0 w-full flex justify-center items-center">
                <div className="w-5/6 px-6 py-3 custom-navbar border-2 border-gray-100">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img className="w-10 h-10" src={logo} alt="Ava Logo"/>
                        <div className="text-button-blue text-xl font-bold">AVA</div>
                    </div>
                    <div className="flex items-center">
                        {/* Narbar link elements */}
                        <ul className="flex space-x-4">
                            {routes.map((route: any, k: Key) => (
                                <NavBarElement route={ route } key={k}/>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        </>
    );
}

