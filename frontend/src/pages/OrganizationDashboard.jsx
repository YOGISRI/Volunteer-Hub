import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OrganizationDashboard() {
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        api.get("/opportunities/my")
            .then(res => setOpportunities(res.data));
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Your Posted Opportunities</h2>

            <div className="grid md:grid-cols-3 gap-6">
                {opportunities.map(op => (
                    <div key={op.id} className="bg-white shadow-lg rounded-xl p-6">
                        <h3 className="font-semibold text-lg">{op.title}</h3>
                        <p className="text-gray-600">{op.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}