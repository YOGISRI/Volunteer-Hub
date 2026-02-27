import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Profile() {
    const { user } = useAuth();

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

    const [streak, setStreak] = useState(0);

    useEffect(() => {
        fetchProfile();
        fetchRating();
        fetchStreak();
    }, []);

    const fetchProfile = async () => {
        const res = await api.get("/users/me");
        setProfile(res.data);
    };

    const fetchRating = async () => {
        const res = await api.get(`/users/${user.id}/rating`);
        setRating(res.data);
    };

    const fetchStreak = async () => {
        const res = await api.get(`/users/${user.id}/streak`);
        setStreak(res.data.streak);
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
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-5xl mx-auto">

                {/* HEADER SECTION */}
                <div className="bg-gray-800 rounded-2xl p-8 shadow-xl flex flex-col md:flex-row items-center gap-8">

                    {/* Avatar */}
                    <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold">
                        {profile.name?.charAt(0).toUpperCase()}
                    </div>

                    {/* Basic Info */}
                    <div>
                        <h2 className="text-3xl font-bold">{profile.name}</h2>
                        <p className="text-gray-400">{profile.email}</p>

                        <div className="flex gap-6 mt-4">
                            <div>
                                <p className="text-yellow-400 text-2xl font-bold">
                                    ⭐ {rating.average}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {rating.total} ratings
                                </p>
                            </div>

                            <div>
                                <p className="text-orange-400 text-2xl font-bold">
                                    🔥 {streak}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Monthly Streak
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PROFILE EDIT SECTION */}
                <div className="bg-gray-800 rounded-2xl p-8 shadow-xl mt-10">
                    <h3 className="text-xl font-semibold mb-6">
                        Update Profile
                    </h3>

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
                </div>
            </div>
        </div>
    );
}