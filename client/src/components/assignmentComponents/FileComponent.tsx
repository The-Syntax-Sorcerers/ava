import DocViewer, {DocViewerRenderers } from "@cyntler/react-doc-viewer";
import {useState} from 'react';
import LoadingIcon from "../Loading";

export default function FileComponent() {

    // const data = (globalThis as any).template_data

    const [fileUploaded, setFileUploaded] = useState(false);
    const [fileSubmitted, setFileSubmitted] = useState(false);
    const [serverFetched, setServerFetched] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
    const file_bytes = document.getElementById("file-bytes")!.getAttribute("content") || "";
    console.log("File bytes:", file_bytes)
    // log the type of variable file_bytes
    console.log(typeof file_bytes)

    // if assignment is submitted, show the submitted file
    // if (data.file) {
    //     //setSelectedDocs([data.file]);
    //     setFileUploaded(false);
    //     setFileSubmitted(true);
    // }

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 1) {
            setFileUploaded(true);
            setFileSubmitted(false);
            setSelectedDocs(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {

        event.preventDefault();
    
        if (!selectedDocs[0]) {
          alert('Please select a file.');
          return;
        }
    
        const formData = new FormData();
        formData.append('form_file', selectedDocs[0]);
        
        const endpoint = window.location.pathname + "/submit_assignment"
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
          });
    
          // Handle the response as needed
          console.log('Server response:', response);
        } catch (error) {
          console.error('Error:', error);
        }


        setFileSubmitted(true);
        setFileUploaded(false);
    };

    const fetchSubmittedAssignment = async () => {
        console.log("Fetching File")
        try {
            const response = await fetch(window.location.pathname + "/fetch_assignment_file");
            
            if(response.status === 204) { return undefined; }
            const blob = await response.blob();
            
            
            console.log("Response:", response, "Blob", blob, "Blob text", blob.text())
            // Create a File object from the received blob
            console.log("Response headers:", response.headers)
            const filename = response.headers.get('filename') || "default.txt";
            const tempFile = new File([blob], filename, { type: response.headers.get('Content-Type') || undefined});
    
            // Now, you can use the tempFile object as needed
            // Check if selectedDocs is empty list
            return tempFile;
        }catch (error) {
            console.error('Error fetching PDF:', error);
        }
        
    }

    if (selectedDocs.length === 0) {
        fetchSubmittedAssignment().then((tempFile) => {
            if(tempFile !== undefined) {
                console.log("Setting selectedDocs to", tempFile)
                setSelectedDocs([tempFile]);
                setFileSubmitted(true);
            }
            setServerFetched(true);
        })
    }
    
    
    return (
        <>  
            <div className="flex items-center">
                <h1 className="text-2xl font-semibold mb-4 mt-5">Submission</h1>
                <LoadingIcon hasLoaded={serverFetched}/>
            </div>
            

            {fileSubmitted ? (
                <div>
                    <UploadPreview selectedDocs={selectedDocs}/>
                    <p className="text-base mb-4">Looks Like you've already submitted an assignment. Do you want to submit another one?</p>
                </div>
            ) : (<></>)}

            {fileUploaded ? (
                <div>
                    <UploadPreview selectedDocs={selectedDocs}/>
                    <form onSubmit={handleSubmit} className="flex items-center grid grid-cols-1 auto-cols-auto gap-4 mt-10">
                        <input id="form_file" name="form_file" type="file" className="hidden" accept="text/plain"/>
                        <div>
                            <input id="link-checkbox1" type="checkbox" className="w-4 h-4 rounded" required />
                            <label htmlFor="link-checkbox1" className="ml-2 text-sm font-medium">I agree with the <a href="/privacy_policy" className="text-blue-600 hover:text-accent-secondary-600 transition duration-200">Privacy Policy</a></label>
                        </div>
                        <div>
                            <input id="link-checkbox2" type="checkbox" className="w-4 h-4 rounded" required />
                            <label htmlFor="link-checkbox2" className="ml-2 text-sm font-medium">I hereby acknowledge that all work submitted in this assignment is my original work, created solely by me, unless otherwise indicated.</label>
                        </div>
                        <button
                            className="rounded-lg px-3 py-3 font-bold text-sm shadow-md hover:shadow-lg custom-form-button"
                            type="submit"
                            >
                                Submit
                        </button>
                    </form>
                </div>
            ) : (
                <>
                    <Dropzone handleUpload={handleUpload}/>
                </>
            )}

        </>
        
    );
}


// dropzone component for assignment upload
function Dropzone({handleUpload }: {handleUpload: (event: any) => void}) {
    return (
        <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">TXT or PDF only(MAX. 2MB)</p>
                </div> 
                <input id="dropzone-file" type="file" className="hidden" accept=".txt, .pdf" onChange={handleUpload}/>
            </label>
        </div> 
    );
}

function UploadPreview({selectedDocs}: {selectedDocs : any}) {

    const docs = selectedDocs.map((file: any) => ({
        uri: window.URL.createObjectURL(file),
        fileName: file.name,
        fileType: file.type,
        f: file,
    }))
    console.log(docs)

    return (
        <div className="flex flex-col items-center justify-center w-full mb-10 max-h-screen">
            <h1 className="text-2xl font-semibold mb-4">{docs[0].fileName}</h1>
                <DocViewer
                    documents={docs}

                    pluginRenderers={DocViewerRenderers}
                    className="container rounded-lg bg-slate-50 overflow-auto overscroll-auto shadow-inner p-6"
                    style={{ height: 700 }}
                    config={{
                        header: {
                            disableHeader: true,
                            disableFileName: false,
                            retainURLParams: true,
                        },
                        pdfVerticalScrollByDefault: false,
                    }}
                />

        </div> 
    );
}

