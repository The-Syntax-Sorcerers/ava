// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function CreateAssignmentForm({ setShowModal }) {
    const currentURL = window.location.href;
    const sendPost = `${currentURL}/create_assignment`
    return (
        <div onClick={() => setShowModal(false)} className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-shadow bg-opacity-25">
            <div onClick={e => e.stopPropagation()} className="relative w-1/3 p-6 container bg-main rounded-lg shadow-2xl text-center">
                <h1> Add a New Assignment </h1>
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                    <form method="post" action={sendPost}>
                        <input id="csrf_token" name="csrf_token" type="hidden" value={document.getElementById("csrf-token")!.getAttribute("content") || ""}></input>
                        {/* <!-- Assignment Name input--> */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input type="name" name="name" 
                            className="mt-1 px-3 py-2 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                            placeholder="Class Name" />
                        </div>
                        {/* <!-- Due Date input--> */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input type="duedate" name="duedate" 
                            className="mt-1 px-3 py-2 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                            placeholder="Due Date" />
                        </div>
                        {/* <!-- Description input--> */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input type="desc" name="desc" id="desc" 
                            className="mt-1 px-3 py-2 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                            placeholder="Description" />
                        </div>
                        <button
                            className="inline-block w-full rounded px-6 pb-2 pt-2.5 font-semibold text-md 
                            uppercase leading-normal transition duration-200 ease-in-out dark:active:shadow 
                            bg-button-light-blue text-teal-800 hover:bg-violet-300 hover:text-violet-800"
                            type="submit"
                        >
                            Publish
                        </button>
                    </form>
                    <button
                        className="mt-4 mx-auto px-6 py-2 rounded-lg uppercase font-semibold font-sans 
                        text-sm focus:outline-none ease-in-out transition-all duration-200
                        hover:bg-button-light-blue hover:text-teal-800 bg-violet-300 text-violet-800"
                        type="button"
                        onClick={() => setShowModal(false)}
                        >
                        Close
                    </button>
                </div>
            </div>

        </div>
    );
}
