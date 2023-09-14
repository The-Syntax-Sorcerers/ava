// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import failPic from '../assets/fail.png';
import successPic from '../assets/success.png';

export default function VerificationSuccess({ setShowModal, result }: {setShowModal: any, result: any}) {
    return (
        <div onClick={() => setShowModal(false)} className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-shadow bg-opacity-25">
            <div onClick={e => e.stopPropagation()} className="relative w-1/3 p-6 container bg-main rounded-lg shadow-2xl">
                <div className="relative w-auto my-6 mx-auto max-w-sm text-center">
                    {result ? (
                        <div className="grid grid-cols-1 flow-col-autotext-center">
                            <h1 className="text-xl font-semibold mb-4">Verification Success</h1>
                            <h2 className="text-md font-semibold mb-4">Keep up the good work!</h2>
                            <img className="object-contain h-30 w-auto mx-auto" src={successPic} alt="success"/>
                        </div>
                    ):(
                        <div className="grid grid-cols-1 flow-col-auto text-center">
                            <div>
                                <h1 className="text-xl font-semibold mb-4">Verification Failed</h1>
                                <h2 className="text-md font-semibold mb-4">Please try again</h2>
                            </div>
                            <img className="object-contain h-30 w-auto mx-auto" src={successPic} alt="success"/>
                        </div>
                    )}
                    <button
                        className="bg-button-yellow rounded-lg px-3 py-2 text-slate-900 font-medium hover:bg-button-yellow-darker"
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
