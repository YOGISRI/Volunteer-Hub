import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function GroupEventDetails() {
    const { id } = useParams();
    const { user } = useAuth();

    const [stats, setStats] = useState({
        totalMembers: 0,
        totalHours: 0
    });

    const [group, setGroup] = useState(null);
    const [alreadyJoined, setAlreadyJoined] = useState(false);

    useEffect(() => {
        if (!id) return;
        if (!user) return; // wait until auth loads

        fetchGroup();
        fetchStats();
        checkJoined();
    }, [id, user]);

    const fetchGroup = async () => {
        try {
            const res = await api.get(`/group-events/${id}`);
            setGroup(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load group event");
        }
    };

    const fetchStats = async () => {
        try {
            const res = await api.get(`/group-events/${id}/stats`);
            setStats(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const joinGroup = async () => {
        try {
            await api.post(`/group-events/${id}/join`);
            toast.success("Joined Group Event!");
            fetchStats();
        } catch (err) {
            toast.error("Failed to join group");
        }
    };
    const checkJoined = async () => {
        const res = await api.get(`/group-events/${id}/check`);
        setAlreadyJoined(res.data.joined);
    };

    if (!group) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                Loading group event...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-3xl mx-auto">

                <h1 className="text-3xl font-bold mb-4">
                    {group.name}
                </h1>

                <p className="text-gray-400 mb-6">
                    {group.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-6">

                    <div className="bg-gray-800 p-6 rounded-xl text-center">
                        <p className="text-green-400 text-3xl font-bold">
                            {stats.totalMembers}
                        </p>
                        <p className="text-sm text-gray-400">
                            Members
                        </p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl text-center">
                        <p className="text-blue-400 text-3xl font-bold">
                            {stats.totalHours}
                        </p>
                        <p className="text-sm text-gray-400">
                            Total Hours
                        </p>
                    </div>

                </div>

                {user?.role === "volunteer" && !alreadyJoined && (
                    <button onClick={joinGroup}
                        className="px-4 py-2 bg-purple-600 rounded-lg">
                        Join Group Event
                    </button>
                )}

                {alreadyJoined && (
                    <p className="text-green-400 font-semibold">
                        ✅ You already joined this group
                    </p>
                )}
            </div>
        </div>
    );
}