// A simple graph card element that will contain a line graph of the data
import PieChart from "../horizonComponents/charts/PieChart"; 
import Card from "../horizonComponents/card";
// import randomColor from "randomcolor";


export default function PieChartCard({title, data}: {title:string, data:any}) {
    // const numCategories = optionsCategories.length
    // const randomColors = [];
    // // generate random colors for the number of categories available
    // for (let i = 0; i < numCategories; i++) {
    //     randomColors.push(randomColor() as string);
    // }
    const pieChartOptions = {
        labels: ["Success", "Failed", "Not Yet Submitted"],
        colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
        chart: {
          width: "30%",
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: true,
        },
        hover: { mode: null },
        plotOptions: {
          donut: {
            expandOnClick: false,
            donut: {
              labels: {
                show: false,
              },
            },
          },
        },
        fill: {
          colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
        },
        tooltip: {
          enabled: true,
          theme: "dark",
          style: {
            fontSize: "12px",
            fontFamily: undefined,
            backgroundColor: "#000000"
          },
        },
    };

    return (
        <Card extra="container-md flex-auto items-center rounded-md shadow-none p-5 text-center">
            <h1 className="text-lg font-semibold mb-4 mt-5">{title}</h1>
            <PieChart
            chartData={data}
            chartOptions={pieChartOptions}
            />
        </Card>
    )
}


// example data
// export const pieChartData = [63, 25, 12];