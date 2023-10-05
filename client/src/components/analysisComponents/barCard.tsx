// A simple graph card element that will contain a line graph of the data
import BarChart from "../horizonComponents/charts/BarChart"; 
import Card from "../horizonComponents/card";
// export default function BarChartCard({title, data, optionsCategories}: {title:string, data:any, optionsCategories:[]}) {
export default function BarChartCard({title, data}: {title:string, data:any}) {
    const barChartOptions = {
        chart: {
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          style: {
            fontSize: "12px",
            fontFamily: undefined,
            backgroundColor: "#000000"
          },
          onDatasetHover: {
            style: {
              fontSize: "12px",
              fontFamily: undefined,
            },
          },
          theme: "dark",
        },
        xaxis: {
          categories: ["1", "2", "3", "4", "5", "6"],//{optionsCategories},
          show: false,
          labels: {
            show: true,
            style: {
              colors: "#A3AED0",
              fontSize: "14px",
              fontWeight: "500",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
          color: "black",
          labels: {
            show: true,
            style: {
              colors: "#CBD5E0",
              fontSize: "14px",
            },
          },
        },
        grid: {
          show: false,
          strokeDashArray: 5,
          yaxis: {
            lines: {
              show: true,
            },
          },
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            type: "vertical",
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [
              [
                {
                  offset: 0,
                  color: "#4318FF",
                  opacity: 1,
                },
                {
                  offset: 100,
                  color: "rgba(67, 24, 255, 1)",
                  opacity: 0.28,
                },
              ],
            ],
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            columnWidth: "20px",
          },
        },
      };
    
    return (
        <Card extra="container-lg flex-auto items-center rounded-md shadow-none p-5 text-center">
            <h1 className="text-lg font-semibold mb-4 mt-5">{title}</h1>
            {/* <p>{optionsCategories}</p> */}
            <BarChart
            chartData={data}
            chartOptions={barChartOptions}
            />
        </Card>
    )
}

// Example data and options:
// export const barChartDataDailyTraffic = [
//     {
//       name: "Daily Traffic",
//       data: [20, 30, 40, 20, 45, 50, 30],
//     },
//   ];

  