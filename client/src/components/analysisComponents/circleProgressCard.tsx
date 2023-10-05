// A simple graph card element that will contain a line graph of the data
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import Card from "../horizonComponents/card";

export default function CircleProgressCard({title, data}: {title:string, data:any}) {
    return (
        <Card extra="container-md flex-auto items-center rounded-md shadow-none p-5 text-center">
            <h1 className="text-lg font-semibold mb-4 mt-5">{title}</h1>
            <CircularProgress value={data} color="#B794F4" size='120px'>
                <CircularProgressLabel>{data}%</CircularProgressLabel>
            </CircularProgress>
        </Card>
    )
}