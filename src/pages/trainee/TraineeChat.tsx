import React, { useState } from "react";
import { Send, Paperclip, Smile, Search, MoreVertical } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: "text" | "file" | "image";
}

interface Contact {
  id: string;
  name: string;
  role: "admin" | "trainee";
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export default function TraineeChat() {
  const [selectedContact, setSelectedContact] = useState<string | null>("1");
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const contacts: Contact[] = [
    {
      id: "1",
      name: "Admin Team",
      role: "admin",
      lastMessage: "Your payment has been confirmed.",
      lastMessageTime: "10:30 AM",
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      role: "trainee",
      lastMessage: "Thanks for sharing the notes!",
      lastMessageTime: "Yesterday",
      unreadCount: 2,
      isOnline: false,
    },
    {
      id: "3",
      name: "Training Coordinator",
      role: "admin",
      lastMessage: "Please submit your assignment by Friday.",
      lastMessageTime: "2 days ago",
      unreadCount: 0,
      isOnline: true,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      senderId: "1",
      senderName: "Admin Team",
      content: "Hello! Welcome to the OJT program. How can we help you today?",
      timestamp: "2024-01-25T09:00:00Z",
      type: "text",
    },
    {
      id: "2",
      senderId: "current",
      senderName: "You",
      content: "Hi! I have a question about my payment status.",
      timestamp: "2024-01-25T09:05:00Z",
      type: "text",
    },
    {
      id: "3",
      senderId: "1",
      senderName: "Admin Team",
      content:
        "Let me check that for you. Your January payment has been received and processed.",
      timestamp: "2024-01-25T09:10:00Z",
      type: "text",
    },
    {
      id: "4",
      senderId: "1",
      senderName: "Admin Team",
      content: "Your payment has been confirmed.",
      timestamp: "2024-01-25T10:30:00Z",
      type: "text",
    },
  ];

  const currentContact = contacts.find((c) => c.id === selectedContact);
  const currentMessages = selectedContact ? messages : [];

  const sendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* Contacts Sidebar */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-blue-100 ${
                selectedContact === contact.id
                  ? "bg-blue-50 dark:bg-blue-900/20"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      contact.role === "admin" ? "bg-green-600" : "bg-blue-600"
                    }`}
                  >
                    <span className="text-white font-medium">
                      {contact.name.charAt(0)}
                    </span>
                  </div>
                  {contact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {contact.lastMessageTime}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {contact.lastMessage}
                    </p>
                    {contact.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentContact?.role === "admin"
                          ? "bg-green-600"
                          : "bg-blue-600"
                      }`}
                    >
                      <span className="text-white text-sm font-medium">
                        {currentContact?.name.charAt(0)}
                      </span>
                    </div>
                    {currentContact?.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-white dark:border-gray-700 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {currentContact?.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {currentContact?.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === "current"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === "current"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.senderId === "current"
                          ? "text-blue-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Paperclip className="h-5 w-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Smile className="h-5 w-5" />
                </button>
                <button
                  onClick={sendMessage}
                  disabled={!messageInput.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a contact from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
