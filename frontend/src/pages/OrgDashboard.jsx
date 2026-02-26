import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function OrgDashboard() {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [opportunitiesCount, setOpportunitiesCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const appsRes = await api.get("/opportunities/org/applications");
        setApplications(appsRes.data);

        const statsRes = await api.get("/opportunities/stats");
        setOpportunitiesCount(statsRes.data.opportunities);
    };

    const totalApplicants = applications.length;
    const approved = applications.filter(a => a.status === "approved").length;
    const pending = applications.filter(a => a.status === "pending").length;
    const rejected = applications.filter(a => a.status === "rejected").length;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Welcome, {user?.name}
            </h1>

            {/* Stat Cards */}
            <div className="grid md:grid-cols-5 gap-6">
                <StatCard title="Opportunities" value={opportunitiesCount} color="text-blue-400" />
                <StatCard title="Applicants" value={totalApplicants} color="text-purple-400" />
                <StatCard title="Approved" value={approved} color="text-green-400" />
                <StatCard title="Pending" value={pending} color="text-yellow-400" />
                <StatCard title="Rejected" value={rejected} color="text-red-400" />
            </div>

            {/* Recent Applications */}
            <h2 className="text-xl font-semibold mt-10 mb-4">
                Recent Applications
            </h2>

            <div className="space-y-4">
                {applications.slice(0, 5).map(app => (
                    <div
                        key={app.id}
                        className="bg-gray-800 p-5 rounded-xl hover:scale-[1.02] transition"
                    >
                        <p className="font-semibold">
                            {app.users?.name}
                        </p>

                        <p className="text-sm text-gray-400">
                            {app.users?.email}
                        </p>

                        <p className="mt-1 text-sm">
                            Opportunity: {app.opportunities?.title}
                        </p>

                        <p
                            className={`mt-2 font-medium ${app.status === "approved"
                                    ? "text-green-400"
                                    : app.status === "rejected"
                                        ? "text-red-400"
                                        : "text-yellow-400"
                                }`}
                        >
                            {app.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StatCard({ title, value, color }) {
    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition">
            <p className="text-sm text-gray-400">{title}</p>
            <p className={`text-3xl font-bold mt-2 ${color}`}>
                {value}
            </p>
        </div>
    );
}