// A simple graph card element that will contain a line graph of the data
import BarChart from "../horizonComponents/charts/BarChart"; 
import Card from "../horizonComponents/card";
import {barChartDataDailyTraffic, barChartOptionsDailyTraffic} from "./variables"

export default function BarChartCard() {
    return (
        <Card extra="items-center rounded-md shadow-none p-5">
            <BarChart
            chartData={barChartDataDailyTraffic}
            chartOptions={barChartOptionsDailyTraffic}
            />
        </Card>
    )
}