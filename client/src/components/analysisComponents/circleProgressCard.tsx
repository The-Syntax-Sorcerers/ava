// A simple graph card element that will contain a line graph of the data
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import Card from "../horizonComponents/card";

export default function CircleProgressCard() {
    return (
        <Card extra="items-center rounded-md shadow-none p-5">
            <CircularProgress value={40} color="#B794F4" size='120px'>
                <CircularProgressLabel>40%</CircularProgressLabel>
            </CircularProgress>
        </Card>
    )
}