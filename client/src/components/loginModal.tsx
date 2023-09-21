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
        <div onClick={() => setShowModal(false)} className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-shadow bg-opacity-25 backdrop-blur-sm">
            <div onClick={e => e.stopPropagation()} className="relative w-1/3 p-6 container bg-main rounded-lg shadow-2xl text-center border-2 border-button">
                <div className="relative w-auto my-6 mx-auto max-w-sm text-center">
                    <h1 className="text-xl font-semibold"> Log In </h1>
                </div>
                <div className="relative w-auto mt-6 mx-auto max-w-sm flex flex-col justify-center">

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
                            className={`mt-1 px-3 py-2 bg-white shadow-sm placeholder-neutral-400 focus:outline-none focus:border-button-pink focus:ring-button-pink block w-full rounded-md sm:text-sm focus:ring-1 border-2
                                       ${receivedError ? 'border-error-red' : 'border-neutral-300'}`} 
                            placeholder="Email" 
                            defaultValue={filledEmail} 
                            required />
                        </div>

                        {/* <!--Password input--> */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input type="password" name="password" id="password" 
                            className={`mt-1 px-3 py-2 bg-white shadow-sm placeholder-neutral-400 focus:outline-none focus:border-button-pink focus:ring-button-pink block w-full rounded-md sm:text-sm focus:ring-1 border-2
                            ${receivedError ? 'border-error-red' : 'border-neutral-300'}`}  
                            placeholder="Password" 
                            required />
                        </div>

                        <div className="mb-6 flex items-center justify-between">
                            {/* <!--Remember me checkbox--> */}
                            <div className="flex items-center">
                                <input id="link-checkbox" type="checkbox"
                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded 
                                focus:ring-none dark:bg-gray-700" />

                                <label htmlFor="link-checkbox" 
                                    className="ml-1 text-sm font-medium text-lighter
                                    hover:cursor-pointer"
                                    > Remember Me 
                                </label>
                            </div>

                            {/* <!--Forgot password link--> */}
                            <a
                                href="#!"
                                className="text-sm transition duration-150 text-lighter ease-in-out hover:text-button-pink focus:text-button-pink-darker dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                >Forgot password?
                            </a>
                        </div>

                        {/* <!--Sign in button--> */}
                        <button
                        type="submit"
                        className="dark:active:shadow inline-block w-full rounded bg-button-blue px-6 pb-2 pt-2.5 font-semibold text-lg uppercase leading-normal text-slate-900 transition duration-150 ease-in-out hover:bg-button-blue-darker"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        // onClick={() => HANDLE FORM SUBMISSION}
                        >
                        Log in
                        </button>
                    </form>

                    {/* <!--Register link--> */}
                    <div className="mb-5 flex items-center justify-center">
                        <div>
                            <p className="mt-4 text-center text-lighter dark:text-neutral-200 font-size: .875rem line-height: 1.25rem">
                                Not a member?&nbsp;
                                <button
                                    className="rounded-lg text-slate-900 hover:text-button-pink focus:text-button-pink-darker font-bold py-2 text-sm mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleSignupClick}
                                    >
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    </div>
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
    