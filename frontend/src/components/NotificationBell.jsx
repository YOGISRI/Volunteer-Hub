import { useEffect, useState } from "react";
import api from "../api/axios";
import { Bell, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const res = await api.get("/opportunities/notifications");
                setNotifications(res.data);
                const unread = res.data.filter(n => !n.is_read).length;
                setUnreadCount(unread);
            } catch (err) {
                console.error("Error loading notifications", err);
            }
        };
        load();
    }, []);

    const markAsRead = async (id) => {
        try {
            await api.patch(`/opportunities/notifications/${id}/read`);
            setNotifications(prev =>
                prev.map(n =>
                    n.id === id ? { ...n, is_read: true } : n
                )
            );
            setUnreadCount(prev => Math.max(prev - 1, 0));
        } catch (err) {
            console.error("Error marking read", err);
        }
    };

    return (
        <>
            {/* Bell Button */}
            <button
                onClick={() => setOpen(true)}
                className="relative"
            >
                <Bell className="w-6 h-6 text-gray-300 hover:text-white transition" />
                {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-0.5 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40"
                />
            )}

            {/* Slide Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <button onClick={() => setOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto h-[calc(100%-60px)] p-4 space-y-3">
                    {notifications.length === 0 && (
                        <p className="text-gray-400 text-sm">
                            No notifications
                        </p>
                    )}

                    {notifications.map(n => (
                        <div
                            key={n.id}
                            onClick={() => {
                                markAsRead(n.id);
                                if (n.link) navigate(n.link);
                                setOpen(false);
                            }}
                            className={`p-3 rounded-lg cursor-pointer transition ${n.is_read
                                    ? "bg-gray-800 text-gray-400"
                                    : "bg-gray-700 text-white"
                                }`}
                        >
                            {n.message}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}