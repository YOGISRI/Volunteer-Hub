import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import Loader from "../components/Loader";

export default function Profile() {
    const { user } = useAuth();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name,
                email: user.email,
                skills: user.skills?.join(", ") || "",
                availability: user.availability || ""
            });
            setLoading(false);
        }
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put("/auth/update-profile", {
                name: form.name,
                skills: form.skills.split(",").map(s => s.trim()),
                availability: form.availability
            });
            setMessage("Profile updated successfully!");
        } catch (err) {
            setMessage("Update failed.");
        }
    };

    if (loading || !form) return <Loader fullScreen />;

    return (
        <div className="form">
            <h2>Profile</h2>

            {message && <p>{message}</p>}

            <form onSubmit={handleUpdate}>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    value={form.email}
                    disabled
                />

                <input
                    name="skills"
                    placeholder="Skills (comma separated)"
                    value={form.skills}
                    onChange={handleChange}
                />

                <input
                    name="availability"
                    placeholder="Availability"
                    value={form.availability}
                    onChange={handleChange}
                />

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}