import {useEffect, useState} from 'react';
import LoadingIcon from "../Loading";

export default function FileComponent({user_email, subject_id, assignment_id, user_id, previewWidth}: {user_email: any, subject_id: any, assignment_id: any, user_id: any, previewWidth?: any}) {
    console.log("Rendering FileComponent for", subject_id, assignment_id, user_id);

    const [fileUploaded, setFileUploaded] = useState(false);
    const [fileSubmitted, setFileSubmitted] = useState(false);
    const [serverFetched, setServerFetched] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        // Reset selectedDocs when props change
        setSelectedDocs([]);
        setFileSubmitted(false);
        setServerFetched(false);
        setFileUploaded(false); 
    }, [user_email, subject_id, assignment_id, user_id]);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files?.length === 1) {
            setFileUploaded(true);
            setFileSubmitted(false);
            setSelectedDocs(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (event: any) => {

        event.preventDefault();
    
        if (!selectedDocs[0]) {
          alert('Please select a file.');
          return;
        }

        // Disable the submit button
        console.log(event)
        event.target.elements.submitButton.disabled = true;

        let endpoint: string;
        if(user_id !== undefined) {
            endpoint = `/submit_assignment/${subject_id}/${assignment_id}/${user_id}`
        }
        else {
            endpoint = `/submit_assignment/${subject_id}/${assignment_id}`
        }
        

        const formData = new FormData();
        formData.append('form_file', selectedDocs[0]);
        
        event.target.elements.submitButton.innerHTML = 'Finalizing Submission & Running ML Model'
        setShowLoading(true);
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
          });
    
          // Handle the response as needed
          console.log('Server response:', response);

          // Call the Lambda function after submitting the assignment
          await invokeLambdaFunction(user_email, subject_id, assignment_id, user_id);
        } catch (error) {
          console.error('Error:', error);
        }


        setFileSubmitted(true);
        setFileUploaded(false);
    };

    const invokeLambdaFunction = async (
        user_email: string,
        subject_id: string,
        assignment_id: string,
        user_id: string
    ) => {
        try {
            // Lambda function URL
            const lambdaBaseURL =
            'https://venmji33ak3elhyzxs4l7qkahu0nltef.lambda-url.ap-southeast-2.on.aws';
            const lambdaURL = `${lambdaBaseURL}/predict?user_email=${user_email}&subject_id=${subject_id}&assignment_id=${assignment_id}&user_id=${user_id}`;

            // Make a GET request to the Lambda function URL
            const lambdaResponse = await fetch(lambdaURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("lambdaResponse", lambdaResponse)
            // Check if the request was successful based on status code
            if (lambdaResponse.ok) { console.log('Lambda function executed successfully.'); } 
            else { console.error('Error invoking Lambda function:', lambdaResponse.status); }
        } 
        catch (error) { 
            console.error('Error invoking Lambda function:', error); 
        }
    };

    const fetchSubmittedAssignment = async () => {
        console.log("Fetching File")

        let endpoint: string;
        if(user_id !== undefined) {
            endpoint = `/fetch_assignment/${subject_id}/${assignment_id}/${user_id}`
        }
        else {
            endpoint = `/fetch_assignment/${subject_id}/${assignment_id}`
        }
        console.log('getting endpoint', endpoint)

        try {
            const response = await fetch(endpoint);
            if(response.status === 204) { return undefined; }
            const blob = await response.blob();
            
            
            console.log("Response:", response, "Blob", blob, "Blob text", blob.text())
            // Create a File object from the received blob
            console.log("Response headers:", response.headers)
            const filename = response.headers.get('filename') || "Filename Not Found";
            const tempFile = new File([blob], filename, { type: response.headers.get('Content-Type') || undefined});
    
            // Now, you can use the tempFile object as needed
            // Check if selectedDocs is empty list
            return tempFile;
        }catch (error) {
            console.error('Error fetching PDF:', error);
        }
        
    }

    useEffect(() => {
        const fetchData = async () => {
            if (selectedDocs.length === 0) {
                try {
                    let tempFile;
                    if (!serverFetched) {
                        tempFile = await fetchSubmittedAssignment();
                    }
                    
                    if (tempFile !== undefined) {
                        console.log("Setting selectedDocs to", tempFile)
                        setSelectedDocs([tempFile]);
                        setFileSubmitted(true);
                    }
                    setServerFetched(true);
                } catch (error) {
                    console.error('Error fetching submitted assignment:', error);
                }
            }
        };
    
        fetchData();
    }, [selectedDocs, serverFetched]);

    return (
        <>  
            <div className="flex items-center">
                <h1 className="text-2xl font-semibold mb-4 mt-5">Submission</h1>
                <LoadingIcon hasLoaded={serverFetched}/>
            </div>
            

            {fileSubmitted ? (
                <div>
                    <UploadPreview selectedDocs={selectedDocs} previewWidth={previewWidth} />
                    <p className="text-base mb-4">Looks Like you've already submitted an assignment. Do you want to submit another one?</p>
                </div>
            ) : (<></>)}

            {fileUploaded ? (
                <div>
                    <UploadPreview selectedDocs={selectedDocs} previewWidth={previewWidth} />
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
                            id="submitButton"
                            className="rounded-lg px-3 py-3 font-bold text-sm shadow-md hover:shadow-lg custom-form-button
                            flex justify-center items-center"
                            type="submit"
                            >
                            Submit {showLoading ? < LoadingIcon hasLoaded={false} /> : null}
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

function UploadPreview({ selectedDocs, previewWidth }: { selectedDocs: any, previewWidth?: any }) {
    // #view=FitH&scrollbar=0&toolbar=0&statusbar=0&messages=0&navpanes=0
    const docs = selectedDocs.map((file: any) => ({
                uri: window.URL.createObjectURL(file) + '#view=FitH&scrollbar=0&statusbar=0&messages=0&navpanes=0',
                fileName: file.name,
                fileType: file.type
            }))
    const doc = docs.length > 0 ? docs[0] : '';

    if(previewWidth == undefined) {
        previewWidth = '100%'
    }

    if(docs.length > 0) {
        return (
            <>
                <div className="flex flex-col items-center justify-center w-full mb-10 max-h-screen">
                    <h1 className="text-2xl font-semibold mb-4">{doc.fileName}</h1>
                    <iframe
                        src={doc.uri}
                        className="container rounded-3xl overflow-auto overscroll-auto shadow-lg p-6 bg-preview-border"
                        style={{ height: 700, width: previewWidth }}
                        title={doc.fileName}
                    />
                </div>
            </>
        );
    }
    return (
        <>
        </>
    );
    
  }

