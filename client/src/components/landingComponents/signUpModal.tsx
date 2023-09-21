interface ErrorLookup {
    [key: number]: string[];
}
const error_lookup: ErrorLookup = {
    23505: ['email'],
    400: ['password', 'confirmPassword'],
    422: ['password', 'confirmPassword'],
    403: ['name', 'email', 'password', 'confirmPassword'],
    500: [],
}



// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function SignupForm({ setShowModal, handleLoginClick }) {

    const data = (globalThis as any).template_data
    const receivedError = Object.prototype.hasOwnProperty.call(data, "signup_error") ? data.signup_error : null;
    const highlight = receivedError ? error_lookup[data.status as number] || []: [];    // Ask Talym
    console.log("Received error:", receivedError);
    
    const filledForm = Object.prototype.hasOwnProperty.call(data, "signupform") ? data.signupform : null;
    let filledName = "", filledEmail = "";
    if(filledForm) {
        filledName = Object.prototype.hasOwnProperty.call(filledForm, "name") ? filledForm.name : "";
        filledEmail = Object.prototype.hasOwnProperty.call(filledForm, "email") ? filledForm.email : "";
    }

    return (
        <div onClick={() => setShowModal(false)} className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-shadow bg-opacity-25 backdrop-blur-sm">
            <div onClick={e => e.stopPropagation()} className="relative w-1/3 p-6 container bg-main rounded-lg shadow-2xl text-center">
                <div className="relative w-auto my-6 mx-auto max-w-sm text-center">
                    <h1 className="text-xl font-semibold">Sign Up</h1>
                </div>
                <div className="relative w-auto my-6 mx-auto max-w-sm">

                    {/* Error message */}
                    {receivedError ? (
                        <div className="relative mb-6">
                            <p className="text-error-red">{receivedError}</p>
                        </div>
                    ) : null}
                
                    {/* Sign up form */}
                    <form method="post" action="/signup">
                        {/* First Name input */}
                        <input name="csrf_token" type="hidden" value={document.getElementById("csrf-token")!.getAttribute("content") || ""}></input>
                        
                        <div className="relative mb-6">
                            <input
                                type="text"
                                className={`mt-1 px-3 py-2 bg-white shadow-sm placeholder-slate-400 
                                focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md 
                                sm:text-sm focus:ring-1 
                                ${highlight.includes('name') ? 'border-2 border-red-300' : null}`}
                                id="name"
                                name="name"
                                defaultValue={highlight.includes('name') ? "" : filledName}
                                placeholder="Preferred Name" 
                                required
                            />
                        </div>

                        {/* Email input */}
                        <div className="relative mb-6">
                            <input
                                type="email" name="email"
                                className={`mt-1 px-3 py-2 bg-white shadow-sm placeholder-slate-400 
                                focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md 
                                sm:text-sm focus:ring-1 ${highlight.includes('email') ? 'border-2 border-red-400' : null}`}
                                id="signupEmail"
                                defaultValue={highlight.includes('email') ? "" :filledEmail}
                                placeholder="Enter Email address" 
                                required
                            />
                        </div>

                        {/* Password input */}
                        <div className="relative mb-6">
                            <input
                                type="password" name="password"
                                className={`mt-1 px-3 py-2 bg-white shadow-sm placeholder-slate-400 
                                focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md 
                                sm:text-sm focus:ring-1 ${highlight.includes('password') ? 'border-2 border-red-400' : null}`}
                                id="signupPassword"
                                placeholder="Password" 
                                required
                            />
                        </div>

                        {/* Confirm Password input */}
                        <div className="relative mb-6">
                            <input
                                type="password" name="confirmPassword"
                                className={`mt-1 px-3 py-2 bg-white shadow-sm placeholder-slate-400 
                                focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md 
                                sm:text-sm focus:ring-1 ${highlight.includes('confirmPassword') ? 'border-2 border-red-400' : null}`}
                                id="confirmPassword"
                                placeholder="Confirm Password" 
                                required
                            />
                        </div>

                        {/* Privacy Policy */}
                        <div className="flex flex-grow justify-center text-center mt-4 mb-4 text-gray-500 dark:text-gray-500
                            text-sm font-medium">
                                
                            <div>
                                <p>
                                    By clicking sign up you agree to our&nbsp; 
                                    <a href="/privacy_policy" className="text-accent-violet-500 hover:text-accent-violet-700">
                                        Privacy Policy
                                    </a>
                                </p>
                                {/* <p> By clicking sign up you agree to our&nbsp; </p>
                                <a href="/privacy_policy" className="text-blue-600">Privacy Policy</a> */}
                            </div>
                        </div>

                        {/* Sign up button */}
                        <button
                            className="inline-block w-full rounded px-6 pb-2 pt-2.5 font-semibold text-md 
                            uppercase leading-normal transition duration-200 ease-in-out dark:active:shadow 
                            bg-button-light-blue text-teal-800 hover:bg-violet-300 hover:text-violet-800"
                            type="submit"
                        >
                            Sign up
                        </button>

                        
                        
                    </form>

                    {/* <!--Login link--> */}
                    <div className="mb-5 flex items-center justify-center ">
                        <div>
                            <p className="mt-4 text-center text-gray-500 dark:text-gray-500
                            text-sm font-medium">
                                Already a member?
                            </p>
                        </div>
                            
                        <div>
                            <button
                                // className="rounded-lg text-slate-900 bg-button-yellow hover:bg-button-yellow-darker font-bold uppercase px-6 py-2 text-sm focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                className="rounded-lg mt-4 ml-5 mx-auto uppercase px-6 py-2 text-sm font-semibold 
                                focus:outline-none mr-1 ease-linear transition-all duration-200
                                bg-button-light-blue text-teal-800 hover:bg-violet-300 hover:text-violet-800"
                                type="button"
                                onClick={handleLoginClick}
                                >
                                Log In
                            </button>
                        </div>
                            
                        
                    </div>

                    {/* Close button */}
                    {/* <button
                        className="rounded-lg text-slate-900 bg-button-light-yellow hover:bg-button-yellow-darker font-bold uppercase px-6 py-2 text-sm focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button> */}
                </div>
            </div>
        </div>
    );
}