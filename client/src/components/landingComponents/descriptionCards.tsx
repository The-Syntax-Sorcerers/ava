import hourglass from '../../assets/hourglass.png'
import chart from '../../assets/chart.png'
import graph from '../../assets/graph.png'

const cards = [
    [hourglass,"Real-Time Verification", "AVA provides lightning-fast results, allowing users to verify authorship in real-time, making it ideal for time-sensitive situations where authenticity matters."],
    [graph, "Advanced Linguistic Analysis", "AVA employs state-of-the-art linguistic analysis to examine the intricacies of writing styles, vocabulary usage, and grammatical patterns, ensuring accurate authorship verification."],
    [chart, "Detailed Verification Reports", "Receive comprehensive reports outlining the analysis process and verification results, offering transparency and insights into the authenticity assessment."]
]

function DescCard ({card}: {card: string[]}) {
    const pic = card[0];
    const title = card[1];
    const desc = card[2];

    return (
        <div className="container mx-auto flex flex-row gap-4 px-5 py-5 mb-10 text-center custom-descriptioncards">
            <div className="basis-1/4 place-content-center">
                <img className="object-contain h-25 w-auto mx-auto" src={pic} alt="pic"/>
            </div>
            <div className="basis-3/4 flex flex-col gap-4 text-center px-5">
                <h1 className="text-lg font-bold my-4">{title}</h1>
                <p className="text-md mb-4">{desc}</p>
            </div>
        </div>
    )
}

export default function DescriptionCards () {
    return (
            <div className="container flex flex-col gap-4">
                {cards.map((card: any) => (
                    <DescCard card={card} />
                ))}
            </div>
    )
    
}