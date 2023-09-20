

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function SignupForm({ setShowModal, handleLoginClick }) {

    const data = (globalThis as any).template_data
    const receivedError = Object.prototype.hasOwnProperty.call(data, "signup_error") ? data.signup_error : null;
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
                        
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                type="text"
                                className={`mt-1 px-3 py-2 bg-white shadow-sm placeholder-neutral-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 border-2
                                ${receivedError ? 'border-error-red' : 'border-neutral-300'}`}
                                id="name"
                                name="name"
                                defaultValue={filledName}
                                placeholder="Preferred Name" 
                                required
                            />
                        </div>

                        {/* Email input */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                type="email" name="email"
                                className={`mt-1 px-3 py-2 bg-white shadow-sm placeholder-neutral-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 border-2
                                ${receivedError ? 'border-error-red' : 'border-neutral-300'}`}
                                id="signupEmail"
                                defaultValue={filledEmail}
                                placeholder="Enter Email address" 
                                required
                            />
                        </div>

                        {/* Password input */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                type="password" name="password"
                                className={`mt-1 px-3 py-2 bg-white shadow-sm placeholder-neutral-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 border-2
                                ${receivedError ? 'border-error-red' : 'border-neutral-300'}`}
                                id="signupPassword"
                                placeholder="Password" 
                                required
                            />
                        </div>

                        {/* Confirm Password input */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                type="password" name="confirmPassword"
                                className={`mt-1 px-3 py-2 bg-white shadow-sm placeholder-neutral-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 border-2
                                ${receivedError ? 'border-error-red' : 'border-neutral-300'}`}
                                id="confirmPassword"
                                placeholder="Confirm Password" 
                                required
                            />
                        </div>

                        {/* Privacy Policy */}
                        <div className="flex flex-grow justify-center text-center -mt-4 mb-4 text-sm">
                            <p className="text-lighter">
                                By clicking sign up you agree to our&nbsp; 
                                <a href="/privacy_policy" className="text-button-pink focus:text-button-pink-darker dark:bg-blue-500 hover:underline">
                                    Privacy Policy
                                </a>
                            </p>
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

                        
                        
                    </form>

                    {/* <!--Login link--> */}
                    <div className="mb-5 flex items-center justify-center">
                        <div>
                            <p className="mt-4 text-center text-lighter dark:text-neutral-200 font-size: .875rem line-height: 1.25rem">
                                Already a member?&nbsp;
                                <button
                                    className="rounded-lg text-slate-900 mt-4 hover:text-button-pink focus:text-button-pink-darker font-bold py-2 text-sm mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleLoginClick}
                                    >
                                    Log in
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        className="rounded-lg text-slate-900  w-1/4 mx-auto hover:bg-button-yellow focus:bg-button-yellow-darker font-bold uppercase flex items-center justify-center px-6 py-2 text-sm focus:outline-none mb-1 ease-linear transition-all duration-150"
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
