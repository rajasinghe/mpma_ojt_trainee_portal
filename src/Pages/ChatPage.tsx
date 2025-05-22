import { useState } from "react";
import { FiSend, FiPaperclip } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

interface Message {
  id: number;
  sender: "me" | "other";
  text?: string;
  image?: string;
  time: string;
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "me",
      text: "They got there early, and got really good seats.",
      time: "2 hours ago",
    },
    {
      id: 2,
      sender: "other",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      text: "Please preview the image",
      time: "2 hours ago",
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), sender: "me", text: input, time: "just now" },
    ]);
    setInput("");
  };

  return (
    <div>
    <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Chat" />
    <div className="flex h-screen text-gray-800">
      {/* Sidebar */}
      <aside className="min-h-screen rounded-2xl border border-gray-200 bg-white px-1 py-2 dark:border-gray-800 dark:bg-white/[0.03] xl:px-2 xl:py-4">
        <h2 className="mb-4 text-xl font-semibold">Chats</h2>
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring"
        />
        <ul className="space-y-4">
          {["Kaiya George", "Lindsey Curtis", "Zain Geidt", "Carla George"].map(
            (name, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={`https://i.pravatar.cc/150?img=${index + 1}`}
                  alt={name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="font-medium">{name}</div>
                  <div className="text-sm text-gray-500">Last seen 15 mins</div>
                </div>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </li>
            )
          )}
        </ul>
      </aside>

      {/* Chat Content */}
      <div className="ml-5 rounded-2xl border border-gray-200 bg-white px-1 py-2 dark:border-gray-800 dark:bg-white/[0.03] flex-1 xl:px-2 xl:py-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?img=2"
              className="w-10 h-10 rounded-full"
              alt="Chat user"
            />
            <div>
              <div className="font-semibold">Lindsey Curtis</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <HiOutlineDotsVertical />
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto h-[calc(100vh-200px)]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-xs space-y-1">
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="message"
                    className="w-64 rounded-lg"
                  />
                )}
                {msg.text && (
                  <div
                    className={`px-4 py-2 rounded-lg text-sm ${
                      msg.sender === "me"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
                <div className="text-xs text-gray-400">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-white/[0.03] rounded-b-2xl mt-auto"
        >
          <button 
            type="button" 
            className="text-gray-500 transition-colors hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FiPaperclip size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="p-2.5 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={!input.trim()}
          >
            <FiSend size={20} />
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
