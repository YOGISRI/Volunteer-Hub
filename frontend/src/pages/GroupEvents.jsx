import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function GroupEvents() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await api.get("/group-events");
            setEvents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-5xl mx-auto">

                <h1 className="text-2xl font-bold mb-6">
                    👥 Group Volunteering Events
                </h1>

                {events.length === 0 && (
                    <p className="text-gray-400">
                        No group events available right now.
                    </p>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-gray-800 p-6 rounded-xl hover:scale-[1.02] transition"
                        >
                            <h2 className="text-xl font-semibold">
                                {event.name}
                            </h2>

                            <p className="text-sm text-gray-400 mt-1">
                                Opportunity: {event.opportunities?.title}
                            </p>

                            <p className="text-sm text-gray-400">
                                Organized by: {event.users?.name}
                            </p>

                            <p className="mt-3 text-gray-300">
                                {event.description}
                            </p>

                            <button
                                onClick={() => navigate(`/group-events/${event.id}`)}
                                className="mt-4 bg-purple-600 px-4 py-2 rounded-lg"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}