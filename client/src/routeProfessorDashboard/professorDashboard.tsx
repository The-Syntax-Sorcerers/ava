import LoggedInNavbar from '../components/navbarComponents/LoggedInNavbar.tsx'
import Footer from '../components/landingComponents/Footer.tsx'
import DropdownMenu from '../components/professorDashboardComponents/dropdownMenu.tsx'
import StudentInfo from '../components/professorDashboardComponents/StudentInfo.tsx'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function ProfessorDashboard() {
    // const data = (globalThis as any).template_data
    // console.log("Rendering Ass with Assignments:", data.upcoming, data.past)

    return (
        <div className="flex flex-col min-h-screen custom-pages">
            <LoggedInNavbar />
            <main className="container mx-auto flex-grow box-border pt-28 pb-12 w-5/6 min-h-scren">
                <div className="flex justify-between min-h-screen rounded-3xl custom-dashboard-background-colouring">
                    {/* Sidebar */}
                    <div className="custom-dashboard-section w-1/5 rounded-l-3xl">
                        {/* Dropdown menus */}
                        <DropdownMenu titles={ ['Subjects', 'subject'] }/>
                        <DropdownMenu titles={ ['Students', 'student'] }/>
                    </div>
                    {/* Current selection info */}
                    <div className="custom-dashboard-section w-2/5">
                        <StudentInfo/>
                    </div>
                    {/* Result analytics */}
                    <div className="custom-dashboard-section w-2/5 rounded-r-3xl">
                    </div>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

