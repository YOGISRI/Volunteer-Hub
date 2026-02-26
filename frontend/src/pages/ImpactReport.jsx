import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function ImpactReport() {

    const data = [
        { month: "Jan", hours: 10 },
        { month: "Feb", hours: 20 },
        { month: "Mar", hours: 15 }
    ];

    return (
        <div>
            <h2>Impact Report</h2>
            <BarChart width={500} height={300} data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" />
            </BarChart>
        </div>
    );
}