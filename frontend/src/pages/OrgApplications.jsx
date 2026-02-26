import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OrgApplications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        const res = await api.get("/opportunities/org/applications");
        setApplications(res.data);
    };

    const updateStatus = async (id, status) => {
        try {
            await api.patch(`/opportunities/applications/${id}/status`, {
                status,
            });
            fetchApplications();
        } catch (err) {
            alert("Error updating status");
        }
    };

    const getStatusColor = (status) => {
        if (status === "approved") return "text-green-400";
        if (status === "rejected") return "text-red-400";
        return "text-yellow-400";
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Organization Dashboard
            </h1>

            {applications.map((app) => (
                <div
                    key={app.id}
                    className="bg-gray-800 p-6 rounded-xl mb-4"
                >
                    <p><strong>Applicant:</strong> {app.users?.name}</p>
                    <p><strong>Email:</strong> {app.users?.email}</p>

                    <p className="mt-2">
                        <strong>Status:</strong>{" "}
                        <span className={getStatusColor(app.status)}>
                            {app.status}
                        </span>
                    </p>

                    {app.status === "pending" && (
                        <div className="mt-4 space-x-3">
                            <button
                                onClick={() => updateStatus(app.id, "approved")}
                                className="bg-green-600 px-3 py-1 rounded"
                            >
                                Approve
                            </button>

                            <button
                                onClick={() => updateStatus(app.id, "rejected")}
                                className="bg-red-600 px-3 py-1 rounded"
                            >
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}