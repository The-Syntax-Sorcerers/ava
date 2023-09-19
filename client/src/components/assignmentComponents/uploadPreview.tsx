// import FilePreviewer from 'react-file-previewer';

// dropzone component for assignment upload
export default function uploadPreview() {
    return (
        <div className="flex items-center justify-center w-full mb-10">
            <div className="flex flex-col items-center justify-center w-full h-100 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">DOCUMENT PREVIEW</span></p>
                </div> 
            </div>
        </div> 
    );
}