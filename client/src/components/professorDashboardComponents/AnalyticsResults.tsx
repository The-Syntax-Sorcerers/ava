export default function AnalyticsResults({ass}: {ass: any}) {
    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-semibold mb-4 mt-4 text-center">
                { ass.name }
            </h1>
            <p className="text-base font-semibold mb-2 pl-2 flex flex-col">
                Description:
                <p className="pl-4 font-normal">
                    { ass.description }
                </p>
            </p>
            <div className="flex justify-center items-center h-80 border-gray-400 border-2 border-dashed">
                {/* Render the uploaded assignment */}
                {/* <UploadPreview docs={selectedDocs.map((file) => ({
                    uri: window.URL.createObjectURL(file),
                    fileName: file.name,
                }))}/> */}
            </div>
            <div className="flex justify-center">
                <h1 className="flex justify-center items-center h-12 border-gray-100 border-2 border-solid rounded-full w-3/4 mt-1">
                    Similarity Score:&#160;
                    { ass.similarity_score }
                </h1>
            </div>
            <div className="flex justify-center">
                <button className="custom-form-button w-1/2 my-4">
                    Re-Analyse on current body-of-work
                </button>
            </div>
            <div className="flex justify-center items-center h-64 border-gray-400 border-2 border-dashed">
                <h1>
                    Just imagine there's hella stats and stuff here
                </h1>
            </div>
        </div>
    )
}