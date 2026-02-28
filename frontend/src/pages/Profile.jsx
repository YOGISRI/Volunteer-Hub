import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Profile() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        skills: "",
        availability: "",
    });

    const [rating, setRating] = useState({
        average: 0,
        total: 0
    });

    const [orgStats, setOrgStats] = useState({
        rating: 0,
        totalOpportunities: 0
    });

    const [hoursData, setHoursData] = useState({
        totalHours: 0,
        history: []
    });

    useEffect(() => {
        if (!user) return;

        fetchProfile();

        if (user.role === "organization") {
            fetchOrgStats();
        } else {
            fetchRating();
            fetchHours();
        }
    }, [user]);

    const fetchProfile = async () => {
        const res = await api.get("/users/me");
        setProfile(res.data);
    };

    const fetchRating = async () => {
        const res = await api.get(`/users/${user.id}/rating`);
        setRating(res.data);
    };

    const fetchOrgStats = async () => {
        const res = await api.get(
            `/opportunities/organization/${user.id}/stats`
        );
        setOrgStats(res.data);
    };

    const fetchHours = async () => {
        try {
            const res = await api.get(`/users/${user.id}/hours`);
            setHoursData(res.data);
        } catch (err) {
            console.error("Failed to fetch hours");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put("/users/me", profile);
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err.response?.data?.error || "Update failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 w-full">

                    {/* Avatar */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-600 flex items-center justify-center text-3xl sm:text-4xl font-bold">
                        {profile.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="text-center md:text-left w-full">

                        <h2 className="text-2xl sm:text-3xl font-bold">
                            {profile.name}
                        </h2>

                        <p className="text-gray-400">{profile.email}</p>

                        {/* ORG VIEW */}
                        {user?.role === "organization" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">

                                <div>
                                    <p className="text-yellow-400 text-2xl font-bold">
                                        ⭐ {orgStats.rating}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Completed Events
                                    </p>
                                </div>

                                <div>
                                    <p className="text-blue-400 text-2xl font-bold">
                                        📌 {orgStats.totalOpportunities}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Opportunities Created
                                    </p>
                                </div>

                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-6">

                                {/* Rating */}
                                <div>
                                    <p className="text-yellow-400 text-2xl font-bold">
                                        ⭐ {rating.score}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {rating.total} ratings
                                    </p>
                                </div>

                                {/* Hours */}
                                <div>
                                    <p className="text-green-400 text-2xl font-bold">
                                        ⏱ {hoursData.totalHours}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Total Volunteer Hours
                                    </p>
                                </div>

                                {/* Impact Button */}
                                <div className="sm:ml-auto w-full sm:w-auto">
                                    <button
                                        onClick={() => navigate("/impact-report")}
                                        className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                                    >
                                        View Impact Report
                                    </button>
                                </div>

                            </div>
                        )}
                    </div>
                </div>

                {/* PROFILE SECTION */}
                <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl mt-10">

                    <h3 className="text-xl font-semibold mb-6">
                        {user?.role === "organization"
                            ? "Organization Actions"
                            : "Update Profile"}
                    </h3>

                    {user?.role === "organization" ? (
                        <button
                            type="button"
                            onClick={() => navigate("/create-opportunity")}
                            className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 transition"
                        >
                            Add New Opportunity
                        </button>
                    ) : (
                        <form onSubmit={handleUpdate} className="space-y-6">

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                    Skills (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={profile.skills || ""}
                                    onChange={(e) =>
                                        setProfile({ ...profile, skills: e.target.value })
                                    }
                                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                    Availability
                                </label>
                                <input
                                    type="text"
                                    value={profile.availability || ""}
                                    onChange={(e) =>
                                        setProfile({ ...profile, availability: e.target.value })
                                    }
                                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                            >
                                Save Changes
                            </button>

                        </form>
                    )}
                </div>

                {/* HISTORY */}
                {user?.role !== "organization" && hoursData.history.length > 0 && (
                    <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl mt-10">
                        <h3 className="text-xl font-semibold mb-6">
                            Volunteer History
                        </h3>

                        <div className="space-y-4">
                            {hoursData.history.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-gray-700 p-4 rounded-lg"
                                >
                                    <p className="font-semibold">
                                        {item.opportunities?.title}
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        Hours: {item.hours}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Completed: {new Date(item.completed_at).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}