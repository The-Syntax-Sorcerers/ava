import {useState} from 'react';
import LoggedInNavbar from '../components/LoggedInNavbar.tsx'
import Dropzone from '../components/dropzone.tsx'
import UploadButton from '../components/uploadButton.tsx'
import UploadPreview from '../components/uploadPreview.tsx'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PDF1_URL = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
export default function AssignmentPage({assignment, user_type}: {assignment: any, user_type: any}) {
    console.log("Rendering AssignmentPage with ass, user:", assignment, user_type)
    const [fileUploaded, setFileUploaded] = useState(false);
    // const [file, setFile] = useState({ url: PDF1_URL });
    // const [fileSubmitted, setFileSubmitted] = useState(false);

    const handleUpload = () => {
        setFileUploaded(true);
        // const fileReader = new window.FileReader();
        // const file = event.target.files[0];
        
        // fileReader.onload = fileLoad => {
        //     const { result } = fileLoad.target;
        //     setFile({ url: result });
        // };
        
        // fileReader.readAsDataURL(file);
    };
    // const fileSubmit = () => {
    //     setFileSubmitted(true);
    // };

    return (
        <div className="bg-main bg-cover min-h-screen">
            <LoggedInNavbar />
            <main className="container mx-auto p-8">
                <div className="container mx-auto px-4 py-20">
                    <h1 className="text-2xl font-semibold mb-4">{assignment.name}</h1>
                    <h2 className="text-xl font-semibold mb-4">{assignment.id}</h2>
                    <h2 className="text-lg font-semibold mb-4">Due on {assignment.due_date}</h2>
                    <p className="text-base mb-4">Description: {assignment.description}</p>
                    <p className="text-base mb-4">Marks: {assignment.marks}</p>
                    {fileUploaded ? (
                        <div>
                            <UploadPreview/>
                            <UploadButton handleUpload={handleUpload}/>
                        </div>
                    ):(<Dropzone handleUpload={handleUpload}/>)}
                    
                </div>
            </main>
        </div>

    )
}

