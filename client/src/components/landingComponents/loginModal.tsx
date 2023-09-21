// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function LoginForm({ setShowModal, handleSignupClick }) {

    const data = (globalThis as any).template_data
    const receivedError = Object.prototype.hasOwnProperty.call(data, "login_error") ? data.login_error : null;
    const filledForm = Object.prototype.hasOwnProperty.call(data, "loginform") ? data.loginform : null;
    let filledEmail = "";
    if(filledForm){
        filledEmail = Object.prototype.hasOwnProperty.call(filledForm, "email") ? filledForm.email : "";
    } 
    
    return (
        <div onClick={() => setShowModal(false)} className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 custom-login">
            <div onClick={e => e.stopPropagation()} className="relative w-1/3 p-5 container bg-main rounded-lg shadow-2xl text-center">
                <div className="relative w-auto my-6 mx-auto max-w-sm text-center">
                    <h1 className="text-xl font-semibold"> Log In </h1>
                </div>
                <div className="relative w-auto my-6 mx-auto max-w-sm">

                    {/* Error message */}
                    {receivedError ? (
                        <div className="relative mb-6">
                            <p className="text-error-red">{receivedError}</p>
                        </div>
                    ) : null}

                    {/* Login form */}
                    <form method="post" action="/login">
                        <input id="csrf_token" name="csrf_token" type="hidden" value={document.getElementById("csrf-token")!.getAttribute("content") || ""}></input>
                        {/* <!--E-mail input--> */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input type="email" name="email" 
                            className={`mt-1 px-3 py-2 bg-white shadow-sm placeholder-slate-400 
                            focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md 
                            sm:text-sm focus:ring-1
                            ${receivedError ? 'border-2 border-red-400' : null}`} /* Highlights the input field on errors */
                            placeholder="Email" 
                            defaultValue={filledEmail} 
                            required />
                        </div>

                        {/* <!--Password input--> */}
                        <div className="relative mb-6">
                            <input type="password" name="password" id="password" 
                            className={`mt-1 px-3 py-2 bg-white shadow-sm placeholder-slate-400 
                            focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md 
                            sm:text-sm focus:ring-1
                            ${receivedError ? 'border-2 border-red-400' : null}`} /* Highlights the input field on errors */
                            placeholder="Password" 
                            required />
                        </div>

                        {/* <!--Remember me checkbox--> */}
                        <div className="mb-6 flex items-center justify-between">

                        <div className="flex items-center">
                            <input id="link-checkbox" type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
                            focus:ring-none dark:bg-gray-700" />
                            
                            <label htmlFor="link-checkbox" 
                                className="ml-1 text-sm font-medium hover:text-accent-violet-500 focus:text-accent-violet-700 text-gray-500
                                hover:cursor-pointer"
                                > Remember Me 
                            </label>
                        </div>

                            {/* <!--Forgot password link--> */}
                            <a
                                href="#!"
                                className="text-primary transition duration-200 ease-in-out 
                                text-sm font-medium text-gray-500 hover:text-accent-violet-500 focus:text-accent-violet-700 hover:dark:accent-violet-500"
                                >Forgot password?
                            </a>
                        </div>

                        {/* <!--Sign in button--> */}
                        <button
                        type="submit"
                        className="dark:active:shadow inline-block w-full rounded px-6 pb-2 pt-2.5 font-semibold 
                        text-md uppercase leading-normal transition duration-200 ease-in-out
                        bg-button-light-blue text-teal-800 hover:bg-violet-300 hover:text-violet-800"
                        >
                        Log in
                        </button>
                    </form>

                    {/* <!--Register link--> */}
                    <div className="mb-5 flex items-center justify-center">
                        <div>
                            <p className="mt-4 text-center text-gray-500 dark:text-gray-500
                            text-sm font-medium">
                                Not a member?
                            </p>
                        </div>
                            
                        <div>
                            <button
                                className="mt-4 ml-5 mr-1 mx-auto px-6 py-2 rounded-lg uppercase font-semibold font-sans 
                                text-sm focus:outline-none ease-in-out transition-all duration-200
                                bg-button-light-blue text-teal-800 hover:bg-violet-300 hover:text-violet-800"
                                type="button"
                                onClick={handleSignupClick}
                                >
                                Sign Up
                            </button>
                        </div>
                            
                        
                    </div>

                    {/* <!--Register link--> */}
                    {/* <button
                        className="mr-1 mb-1 mx-auto px-6 py-2 rounded-lg uppercase font-semibold font-sans 
                        text-sm focus:outline-none ease-in-out transition-all duration-200
                        hover:bg-button-light-blue hover:text-teal-800 bg-violet-300 text-violet-800"
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

// const handleLoginSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
//     const formData = new FormData(event.currentTarget);
//     event.preventDefault();
//     const data = {
//         email: formData.get("email"),
//         password: formData.get("password")
//     }
//     console.log(postReq('/login', data));
//     // for (const [key, value] of formData.entries()) {
//     //   console.log(key, value);
//     // }
//   };

// const postReq = (path: string, data={}) => {

//     const requestHeaders: HeadersInit = new Headers();
//     // requestHeaders.set('accept', 'application/json; charset=utf-8');
//     requestHeaders.set('content-type', 'application/json; charset=utf-8');
//     requestHeaders.set('cache', 'no-cache');
//     // requestHeaders.set('x-requested-with', 'xmlhttprequest');

//     const csrfToken: string = document.getElementById("csrf-token")!.getAttribute("content") || "";
//     requestHeaders.set('x-csrftoken', csrfToken);

//     for (const [key, value] of Object.entries(data)) {
//         console.log(key, value);
//         requestHeaders.set(key, value as string);
//     }

//     const options: RequestInit = {
//         method: 'post', 
//         headers: requestHeaders,
//         body: data as BodyInit,
//     };
    
//     return fetch(path, options);
// }
    