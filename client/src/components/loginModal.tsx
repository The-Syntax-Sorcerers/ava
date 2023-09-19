// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function LoginForm({ setShowModal }) {
    return (
        <div onClick={() => setShowModal(false)} className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-shadow bg-opacity-25 backdrop-blur-sm">
            <div onClick={e => e.stopPropagation()} className="relative w-1/3 p-6 container bg-main rounded-lg shadow-2xl text-center">
                <div className="relative w-auto my-6 mx-auto max-w-sm text-center">
                    <h1 className="text-xl font-semibold"> Log In </h1>
                </div>
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                    <form method="post" action="/login">
                        <input id="csrf_token" name="csrf_token" type="hidden" value={document.getElementById("csrf-token")!.getAttribute("content") || ""}></input>
                        {/* <!--E-mail input--> */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input type="email" name="email" 
                            className="mt-1 px-3 py-2 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                            placeholder="Email" />
                        </div>

                        {/* <!--Password input--> */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input type="password" name="password" id="password" 
                            className="mt-1 px-3 py-2 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                            placeholder="Password" />
                        </div>

                        {/* <!--Remember me checkbox--> */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="block min-h-[1.5rem] pl-[1.5rem]">
                                <input
                                className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="checkbox"
                                value=""
                                id="exampleCheck2" />
                                <label className="inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="exampleCheck2">
                                    Remember me
                                </label>
                            </div>

                            {/* <!--Forgot password link--> */}
                            <a
                                href="#!"
                                className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
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

                        {/* <!--Register link--> */}
                        <div className="mb-6 flex items-center justify-center">
                        <p className="mt-6 text-center text-lighter dark:text-neutral-200 font-size: .875rem line-height: 1.25rem">
                            Not a member?<a className="text-blue-700 transition duration-150 ease-in-out hover:text-blue-800 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            href="/signup"> Sign Up </a>
                        </p>
                        
                        </div>
                    </form>
                    <button
                        className="rounded-lg text-slate-900 mt-4 mx-auto bg-button-yellow hover:bg-button-yellow-darker font-bold uppercase px-6 py-2 text-sm focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
    