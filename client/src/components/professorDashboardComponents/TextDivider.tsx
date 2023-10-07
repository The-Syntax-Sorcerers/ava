// Creates a horizontal page divider centered around some given text
export default function TextDivider({text}: {text: string}) {
    return (
        <div className="relative flex items-center w-5/6 m-4">
                <div className="flex-grow h-0 border-t border-black"></div>
                <div className="flex justify-center items-center">
                    <h1 className="px-2 text-xs font-semibold">
                        { text }
                    </h1>
                </div>
                <div className="flex-grow h-0 border-t border-black"></div>
            </div>
    )
}