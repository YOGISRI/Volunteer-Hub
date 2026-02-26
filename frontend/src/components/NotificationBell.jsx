import { useEffect, useState } from "react";
import api from "../api/axios";
import { Bell } from "lucide-react";

export default function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [open, setOpen] = useState(false);

    // Load notifications on mount
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

    const markAllAsRead = async () => {
        try {
            const unread = notifications.filter(n => !n.is_read);

            await Promise.all(
                unread.map(n =>
                    api.patch(`/opportunities/notifications/${n.id}/read`)
                )
            );

            // Update local state instantly
            setNotifications(prev =>
                prev.map(n => ({ ...n, is_read: true }))
            );

            setUnreadCount(0); // 🔥 instantly remove badge
        } catch (err) {
            console.error("Error marking all as read", err);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={async () => {
                    const nextOpen = !open;
                    setOpen(nextOpen);

                    if (nextOpen && unreadCount > 0) {
                        await markAllAsRead();
                    }
                }}
                className="relative"
            >
                <Bell className="w-6 h-6" />

                {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-0.5 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-72 bg-gray-800 shadow-lg rounded-xl p-4 z-50">
                    <h3 className="font-semibold mb-3">Notifications</h3>

                    {notifications.length === 0 && (
                        <p className="text-sm text-gray-400">
                            No notifications
                        </p>
                    )}

                    {notifications.map(n => (
                        <div
                            key={n.id}
                            className={`p-2 rounded-lg mb-2 ${n.is_read ? "bg-gray-700" : "bg-gray-600"
                                }`}
                        >
                            <p className="text-sm">{n.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}