// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function CreateClassForm({ setShowModal }) {


    return (
        <div onClick={() => setShowModal(false)} className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-shadow bg-opacity-25">
            <div onClick={e => e.stopPropagation()} className="relative w-1/3 p-6 container bg-main rounded-lg shadow-2xl">
                <h1> Add a New Class </h1>
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                    <form method="post" action="/createClass">
                        {/* <!-- Class Name input--> */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input type="email" name="email" 
                            className="mt-1 px-3 py-2 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                            placeholder="Class Name" />
                        </div>

                        {/* <!--Description input--> */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input type="password" name="password" id="password" 
                            className="mt-1 px-3 py-2 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                            placeholder="Description" />
                        </div>
                        <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                            Publish
                        </button>
                        <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}
