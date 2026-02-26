import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";
export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold tracking-wide">
                VolunteerHub
            </h1>

            <div className="space-x-6 flex items-center">
                {user ? (
                    <>
                        <Link to="/dashboard" className="hover:text-blue-400 transition">
                            Dashboard
                        </Link>
                        <Link to="/opportunities" className="hover:text-blue-400 transition">
                            Opportunities
                        </Link>
                        <Link to="/profile" className="hover:text-blue-400 transition">
                            Profile
                        </Link>
                        <div className="flex items-center gap-6">
                            <NotificationBell />
                            <button onClick={logout}>Logout</button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/my-applications">My Applications</Link>
                    </>
                )}
            </div>
        </nav>
    );
}