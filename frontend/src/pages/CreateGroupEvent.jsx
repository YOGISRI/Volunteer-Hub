import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function CreateGroupEvent() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [opportunities, setOpportunities] = useState([]);
    const [form, setForm] = useState({
        opportunity_id: "",
        name: "",
        description: ""
    });

    useEffect(() => {
        fetchOpportunities();
    }, []);

    const fetchOpportunities = async () => {
        const res = await api.get("/opportunities/org");
        setOpportunities(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/group-events", form);
            toast.success("Group Event Created!");
            navigate(`/group-events/${res.data.id}`);
        } catch (err) {
            toast.error("Failed to create group event");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl">

                <h2 className="text-2xl font-bold mb-6">
                    Create Group Event
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <select
                        value={form.opportunity_id}
                        onChange={(e) =>
                            setForm({ ...form, opportunity_id: e.target.value })
                        }
                        className="w-full p-2 bg-gray-700 rounded"
                        required
                    >
                        <option value="">Select Opportunity</option>
                        {opportunities.map((opp) => (
                            <option key={opp.id} value={opp.id}>
                                {opp.title}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Group Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        className="w-full p-2 bg-gray-700 rounded"
                        required
                    />

                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        className="w-full p-2 bg-gray-700 rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 py-2 rounded"
                    >
                        Create
                    </button>

                </form>
            </div>
        </div>
    );
}