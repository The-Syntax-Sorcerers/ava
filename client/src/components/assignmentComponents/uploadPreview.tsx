import DocViewer, {DocViewerRenderers, IDocument } from "@cyntler/react-doc-viewer";
import {useState} from 'react';

export default function uploadPreview({docs}: {docs : any}) {
    const [activeDocument, setActiveDocument] = useState(docs[0]);

    const handleDocumentChange = (document: IDocument) => {
        setActiveDocument(document);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mb-10 max-h-screen">
            <h1 className="text-2xl font-semibold mb-4">{activeDocument.fileName}</h1>
            <div className="container rounded-lg bg-slate-50 overflow-auto overscroll-auto h-96 shadow-inner">
                <DocViewer
                    documents={docs}
                    activeDocument={activeDocument}
                    onDocumentChange={handleDocumentChange}
                    pluginRenderers={DocViewerRenderers}
                    className="p-6"
                    config={{
                        header: {
                          disableHeader: true,
                        },
                    }}
                />

            </div>
        </div> 
    );
}

// import FilePreview from "react-file-preview-latest";
// // dropzone component for assignment upload
// export default function uploadPreview({file}: {file : File | null}) {
//     function onError () {
//         console.log("Error: Invalid file type")
//     }
//     return (
//         <div className="flex flex-col items-center justify-center w-full mb-10">
//         {file ? (
//             <>
            
//             <h1 className="text-2xl font-semibold mb-4">{file.name}</h1>
//             <FilePreview
//                 type={"file"}
//                 file={file}
//                 onError={onError}
//                 className="w-full"
//             />
//             </>
//         ): (<h1 className="text-2xl font-semibold mb-4">Invalid Upload. Please choose another file</h1>)
//         }
//         </div> 
//     );
// }
