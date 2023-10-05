import LoggedInNavbar from '../components/navbarComponents/LoggedInNavbar.tsx'
import Footer from '../components/landingComponents/Footer.tsx'
import DropdownMenu from '../components/professorDashboardComponents/dropdownMenu.tsx'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function ProfessorDashboard() {
    // const data = (globalThis as any).template_data
    // console.log("Rendering Ass with Assignments:", data.upcoming, data.past)

    return (
        <div className="flex flex-col min-h-screen custom-pages">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border pt-28 pb-12 w-5/6">
                <div className="flex flex-col min-h-screen bg-white border-2 border-accent-primary-100 w-1/4 fixed top-35 rounded-3xl p-4">
                    {/* Dropdown menus */}
                    <DropdownMenu titles={ ['Subjects', 'subject'] }/>
                    <button id="dropdownUsersButton" data-dropdown-toggle="dropdownUsers" data-dropdown-placement="bottom" class="custom-form-main-button" type="button">
                        {/* TODO: Add dropdown arrow*/}
                        Subjects
                    </button>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

