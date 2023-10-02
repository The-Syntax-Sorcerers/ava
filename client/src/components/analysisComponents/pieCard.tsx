// A simple graph card element that will contain a line graph of the data
import PieChart from "../horizonComponents/charts/PieChart"; 
import Card from "../horizonComponents/card";
import {pieChartData, pieChartOptions} from "./variables"

export default function PieChartCard() {
    return (
        <Card extra="items-center rounded-md shadow-none p-5">
            <PieChart
            chartData={pieChartData}
            chartOptions={pieChartOptions}
            />
        </Card>
    )
}