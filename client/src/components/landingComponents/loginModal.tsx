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
                            <p className="custom-error-text">{receivedError}</p>
                        </div>
                    ) : null}

                    {/* Login form */}
                    <form method="post" action="/login">
                        <input id="csrf_token" name="csrf_token" type="hidden" value={document.getElementById("csrf-token")!.getAttribute("content") || ""}></input>
                        {/* <!--E-mail input--> */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input type="email" name="email" 
                            className={`custom-form-field
                            ${receivedError ? 'custom-form-field-error' : null}`} /* Highlights the input field on errors */
                            placeholder="Email" 
                            defaultValue={filledEmail} 
                            required />
                        </div>

                        {/* <!--Password input--> */}
                        <div className="relative mb-6">
                            <input type="password" name="password" id="password" 
                            className={`custom-form-field
                            ${receivedError ? 'custom-form-field-error' : null}`} /* Highlights the input field on errors */
                            placeholder="Password" 
                            required />
                        </div>

                        {/* <!--Remember me checkbox--> */}
                        <div className="mb-6 flex items-center justify-between">

                        <div className="flex items-center custom-form-text-elements custom-form-text-element-clickable">
                            <input id="link-checkbox" type="checkbox"
                            className="w-4 h-4 rounded" />
                            <label htmlFor="link-checkbox" 
                                className="ml-1"> 
                                Remember Me 
                            </label>
                        </div>

                            {/* <!--Forgot password link--> */}
                            <a
                                href="#!"
                                className="custom-form-text-elements custom-form-text-element-clickable
                                hover:dark:accent-secondary-500"
                                >Forgot password?
                            </a>
                        </div>

                        {/* <!--Sign in button--> */}
                        <button
                        type="submit"
                        className="custom-form-main-button">
                        Log in
                        </button>
                    </form>

                    {/* <!--Register link--> */}
                    <div className="mb-5 flex items-center justify-center">
                        <div>
                            <p className="mt-4 text-center custom-form-text-elements">
                                Not a member?
                            </p>
                        </div>
                            
                        <div>
                            <button
                                className="custom-form-secondary-button"
                                type="button"
                                onClick={handleSignupClick}>
                                Sign Up
                            </button>
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
    