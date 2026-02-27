import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(form);
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.error || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Login</h2>

            <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full mb-3"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full mb-3"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full flex justify-center items-center"
            >
                {loading ? (
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                    "Login"
                )}
            </button>
        </form>
    );
}