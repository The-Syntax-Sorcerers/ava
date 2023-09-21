// Upload another assignment button
export default function UploadButton({handleUpload}: {handleUpload: (event: any) => void}) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload another file</label>
            <input 
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                aria-describedby="file_input_help" 
                id="file_input" 
                type="file"
                accept=".txt, .pdf, .docx"
                onChange={handleUpload}/>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">TXT, PDF, or DOCX (MAX. 2MB)</p>
        </div>
    );
}