import FileComponent from "../assignmentComponents/FileComponent";
import BarChartCard, { puncLabels, sentLabels, wordLabels } from "../analysisComponents/barCard";

// Creates the subsection of the analysis section that shows the results and analytics of the current assignment upload
export default function AnalyticsResults({ass}: {ass: any}) {
    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-semibold mb-4 mt-4 text-center">
                { ass.name }
            </h1>
            <p className="text-base font-semibold mb-2 pl-2 flex flex-col">
                Description:
                <p className="pl-4 font-normal">
                    { ass.description }
                </p>
            </p>

            <div className="flex justify-center">
                <h1 className="flex justify-center items-center h-12 border-gray-100 border-2 border-solid rounded-full w-3/4 mt-1">
                    Similarity Score:&#160;
                    { ass.similarity_score }
                </h1>
            </div>
            <div className="flex justify-center">
                <h1 className="flex justify-center items-center h-12 border-gray-100 border-2 border-solid rounded-full w-3/4 mt-1">
                    Word Count:&#160;
                    { ass.word_count }
                </h1>
            </div>

            <div className="flex justify-center items-center flex-wrap">
                <BarChartCard data={ass.punc_vec as any} optionsCategories={puncLabels}title="Punctuation Counts" />
                <BarChartCard data={ass.sent_vec as any} optionsCategories={sentLabels}title="Sentence Analysis" />
                <BarChartCard data={ass.word_vec as any} optionsCategories={wordLabels}title="Word Analysis" />
            </div>

            <div className="flex justify-center">
                <button className="custom-form-button w-1/2 my-4">
                    Re-Analyse on current body-of-work
                </button>
            </div>
            
            <div className="justify-center items-center">
                <FileComponent subject_id={ass.subject_id} assignment_id={ass.assignment_id} user_id={ass.user_id} />
            </div>
        </div>
    )
}