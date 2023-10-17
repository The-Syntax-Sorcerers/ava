// A simple graph card element that will contain a line graph of the data
import LineChart from "../horizonComponents/charts/LineAreaChart"; 
import Card from "../horizonComponents/card";


export default function GraphCard({title, data, optionsCategories}: {title:string, data:any, optionsCategories:any}) {
    // define the options
    const lineChartOptions = {
        legend: {
            show: false,
        },
    
        theme: {
            mode: "light",
        },
        chart: {
            type: "line",
            width: "100%",
            toolbar: {
            show: true,
            },
        },
    
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
    
        tooltip: {
            style: {
            fontSize: "12px",
            fontFamily: undefined,
            backgroundColor: "#000000"
            },
            theme: 'dark',
            x: {
            format: "dd/MM/yy HH:mm",
            },
        },
        grid: {
            show: false,
        },
        xaxis: {
            axisBorder: {
            show: false,
            },
            axisTicks: {
            show: false,
            },
            labels: {
                style: {
                        colors: "#A3AED0",
                        fontSize: "12px",
                        fontWeight: "500",
                    },
            },
            type: "text",
            range: undefined,
            categories: {optionsCategories},
        },
    
        yaxis: {
            show: true,
        },
    };

    return (
        <Card extra="items-center rounded-md shadow-none p-2 text-center">
            <h1 className="text-lg font-semibold mb-4 mt-5">{title}</h1>
            <LineChart
            chartData={data}
            chartOptions={lineChartOptions}
            />
        </Card>
    )
}

// example data:
// export const lineChartDataTotalSpent = [
//     {
//       name: "Revenue",
//       data: [50, 64, 48, 66, 49, 68],
//       color: "#4318FF",
//     },
//     {
//       name: "Profit",
//       data: [30, 40, 24, 46, 20, 46],
//       color: "#6AD2FF",
//     },
//   ];
