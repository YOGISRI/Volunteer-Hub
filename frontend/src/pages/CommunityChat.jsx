import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function CommunityChat() {
    const { user } = useAuth();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [replyTo, setReplyTo] = useState(null);

    useEffect(() => {
        markAsRead();
        fetchMessages();
    }, []);
    const markAsRead = async () => {
        try {
            await api.patch("/messages/mark-read");
        } catch (err) {
            console.error("Mark read failed", err);
        }
    };
    const fetchMessages = async () => {
        const res = await api.get("/messages");
        setMessages(res.data);
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        await api.post("/messages", {
            content: newMessage,
            parent_id: replyTo
        });

        setNewMessage("");
        setReplyTo(null);
        fetchMessages();
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-3xl mx-auto">

                <h1 className="text-2xl font-bold mb-6">
                    🌍 Community Chat
                </h1>

                <div className="bg-gray-800 rounded-xl p-4 h-[500px] overflow-y-auto space-y-4">

                    {messages.map((msg) => (
                        <div key={msg.id} className="bg-gray-700 p-3 rounded-lg">

                            <p className="text-sm text-blue-400 font-semibold">
                                {msg.users?.name}
                            </p>

                            {msg.parent_id && (
                                <p className="text-xs text-gray-400">
                                    ↪ Replying to another message
                                </p>
                            )}

                            <p>{msg.content}</p>

                            <button
                                onClick={() => setReplyTo(msg.id)}
                                className="text-xs text-purple-400 mt-2"
                            >
                                Reply
                            </button>

                        </div>
                    ))}

                </div>

                {replyTo && (
                    <p className="text-sm text-yellow-400 mt-2">
                        Replying...
                        <button
                            onClick={() => setReplyTo(null)}
                            className="ml-2 text-red-400"
                        >
                            Cancel
                        </button>
                    </p>
                )}

                <div className="flex gap-2 mt-4">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 p-2 rounded bg-gray-700"
                    />

                    <button
                        onClick={sendMessage}
                        className="px-4 bg-green-600 rounded-lg"
                    >
                        Send
                    </button>
                </div>

            </div>
        </div>
    );
}