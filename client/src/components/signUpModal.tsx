

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function SignupForm({ setShowModal }) {

    
    const filledForm = (globalThis as any).template_data.LoginForm
    console.log("filled form Signup: ", filledForm)
    if(filledForm !== undefined) {
        
        // Init Form here

        


    }


    return (
        <div onClick={() => setShowModal(false)} className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-shadow bg-opacity-25">
            <div onClick={e => e.stopPropagation()} className="relative w-1/3 p-6 container bg-main rounded shadow-2xl">
                <h1 className="text-xl font-semibold"> Sign Up </h1>
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                    <form method="post" action="/signup">
                        {/* First Name input */}
                        <input name="csrf_token" type="hidden" value={document.getElementById("csrf-token")!.getAttribute("content") || ""}></input>
                        
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                type="text"
                                className="mt-1 px-3 py-2 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                id="name"
                                name="name"
                                placeholder="Preferred Name" required
                            />
                        </div>

                        {/* Email input */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                type="email" name="email"
                                className="mt-1 px-3 py-2 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                id="signupEmail"
                                placeholder="Enter Email address" required
                            />
                        </div>

                        {/* Password input */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                type="password" name="password"
                                className="mt-1 px-3 py-2 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                id="signupPassword"
                                placeholder="Password" required
                            />
                        </div>

                        {/* Confirm Password input */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                type="password" name="confirmPassword"
                                className="mt-1 px-3 py-2 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                id="confirmPassword"
                                placeholder="Confirm Password" required
                            />
                        </div>

                        {/* Sign up button */}
                        <button
                            type="submit"
                            className="dark:active:shadow inline-block w-full rounded bg-button-blue px-6 pb-2 pt-2.5 font-semibold text-lg uppercase leading-normal text-slate-900 transition duration-150 ease-in-out hover:bg-button-blue-darker"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            // onClick={() => HANDLE FORM SUBMISSION}
                        >
                            Sign up
                        </button>

                        {/* Close button */}
                        <button
                            className="rounded-lg text-slate-900 mt-4 bg-button-yellow hover:bg-button-yellow-darker font-bold uppercase px-6 py-2 text-sm focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
