import { ChartAreaInteractive } from "../_components/ChartAreaInteractive";
import { ChartBarDefault } from "../_components/ChartBarDefault";
import { ChartLineDotsColors } from "../_components/ChartLineDotsColors";
import { ChartRadialSimple } from "../_components/ChartRadialSimple";

export default function DashBoardPage() {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <ChartBarDefault />
                    <ChartLineDotsColors />
                    <ChartRadialSimple />
                </div>
                <ChartAreaInteractive />
            </div>
        </>
    )
}