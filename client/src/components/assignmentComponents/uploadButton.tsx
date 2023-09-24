// Upload another assignment button
export default function UploadButton({handleUpload}: {handleUpload: (event: any) => void}) {
    return (
        <div>
            <form>
                <label className="block overflow-visible">
                    <span className="sr-only">Choose Another File</span>
                    <input 
                        className="block w-full text-sm text-gray-900 file:custom-upload-button" 
                        aria-describedby="file_input_help" 
                        id="file_input" 
                        type="file"
                        accept=".txt, .pdf"
                        onChange={handleUpload}/>
                </label>
            </form>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">TXT or PDF only (MAX. 2MB)</p>
        </div>
    );
}