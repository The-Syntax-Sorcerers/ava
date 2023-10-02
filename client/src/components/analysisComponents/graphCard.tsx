// A simple graph card element that will contain a line graph of the data
import LineChart from "../horizonComponents/charts/LineAreaChart"; 
import Card from "../horizonComponents/card";
import {lineChartDataTotalSpent, lineChartOptionsTotalSpent} from "./variables"

export default function GraphCard() {
    return (
        <Card extra="items-center rounded-md shadow-none p-5">
            <LineChart
            chartData={lineChartDataTotalSpent}
            chartOptions={lineChartOptionsTotalSpent}
            />
        </Card>
    )
}