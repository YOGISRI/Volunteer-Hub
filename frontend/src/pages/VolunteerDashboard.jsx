import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function VolunteerDashboard() {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        const res = await api.get("/opportunities/my/applications");
        setApplications(res.data);
    };

    const total = applications.length;
    const approved = applications.filter(a => a.status === "approved").length;
    const pending = applications.filter(a => a.status === "pending").length;
    const rejected = applications.filter(a => a.status === "rejected").length;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Welcome, {user?.name}
            </h1>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
                <StatCard title="Total Applications" value={total} color="bg-blue-600" />
                <StatCard title="Approved" value={approved} color="bg-green-600" />
                <StatCard title="Pending" value={pending} color="bg-yellow-500" />
                <StatCard title="Rejected" value={rejected} color="bg-red-600" />
            </div>

            {/* Recent Applications */}
            <h2 className="text-xl font-semibold mt-10 mb-4">
                Recent Applications
            </h2>

            <div className="space-y-4">
                {applications.slice(0, 5).map(app => (
                    <div
                        key={app.id}
                        className="bg-gray-800 p-4 rounded-xl"
                    >
                        <p className="font-semibold">
                            {app.opportunities?.title}
                        </p>

                        <p
                            className={`mt-1 ${app.status === "approved"
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