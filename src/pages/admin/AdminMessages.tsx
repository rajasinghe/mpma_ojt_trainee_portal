import { useState } from 'react';
import { Send, Search, Plus, Users, User, Trash2, Archive, Star } from 'lucide-react';
import { useToastHelpers } from '../../hooks/useToast';

interface Message {
  id: string;
  subject: string;
  content: string;
  sender: string;
  recipient: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  type: 'inbox' | 'sent' | 'draft';
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export default function AdminMessages() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'compose'>('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [composeData, setComposeData] = useState({
    recipient: '',
    subject: '',
    content: ''
  });

  const { success, error, info } = useToastHelpers();

  // Mock data
  const messages: Message[] = [
    {
      id: '1',
      subject: 'Payment Confirmation Request',
      content: 'Hi Admin, I have made my payment for January. Could you please confirm receipt?',
      sender: 'John Doe',
      recipient: 'Admin',
      timestamp: '2024-01-25T10:30:00Z',
      isRead: false,
      isStarred: true,
      type: 'inbox'
    },
    {
      id: '2',
      subject: 'Attendance Query',
      content: 'I was marked absent yesterday but I was present. Can you please check?',
      sender: 'Jane Smith',
      recipient: 'Admin',
      timestamp: '2024-01-24T14:15:00Z',
      isRead: true,
      isStarred: false,
      type: 'inbox'
    },
    {
      id: '3',
      subject: 'Training Material Request',
      content: 'Could you please share the React advanced concepts material?',
      sender: 'Mike Johnson',
      recipient: 'Admin',
      timestamp: '2024-01-23T09:45:00Z',
      isRead: true,
      isStarred: false,
      type: 'inbox'
    },
    {
      id: '4',
      subject: 'Payment Reminder',
      content: 'This is a reminder that your January payment is due on 31st.',
      sender: 'Admin',
      recipient: 'All Trainees',
      timestamp: '2024-01-22T16:00:00Z',
      isRead: true,
      isStarred: false,
      type: 'sent'
    }
  ];

  const conversations: Conversation[] = [
    {
      id: '1',
      participants: ['Admin', 'John Doe'],
      lastMessage: 'Thank you for confirming my payment.',
      lastMessageTime: '2 hours ago',
      unreadCount: 0
    },
    {
      id: '2',
      participants: ['Admin', 'Jane Smith'],
      lastMessage: 'I was marked absent yesterday but I was present.',
      lastMessageTime: '1 day ago',
      unreadCount: 1
    },
    {
      id: '3',
      participants: ['Admin', 'All Trainees'],
      lastMessage: 'Payment reminder sent to all trainees.',
      lastMessageTime: '3 days ago',
      unreadCount: 0
    }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'inbox' ? message.type === 'inbox' : 
                      activeTab === 'sent' ? message.type === 'sent' : false;
    return matchesSearch && matchesTab;
  });

  const handleSendMessage = () => {
    if (composeData.recipient && composeData.subject && composeData.content) {
      // In real app, this would send the message via API
      console.log('Sending message:', composeData);
      setComposeData({ recipient: '', subject: '', content: '' });
      setActiveTab('sent');
      success('Message sent successfully!');
    } else {
      error('Please fill in all required fields');
    }
  };

  const toggleStar = (messageId: string) => {
    // In real app, this would update the message via API
    console.log('Toggle star for message:', messageId);
    info('Message starred');
  };

  const markAsRead = (messageId: string) => {
    // In real app, this would update the message via API
    console.log('Mark as read:', messageId);
    success('Message marked as read');
  };

  const unreadCount = messages.filter(m => !m.isRead && m.type === 'inbox').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Communicate with trainees and manage announcements
          </p>
        </div>
        <button
          onClick={() => setActiveTab('compose')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Compose
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {/* Tabs */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('inbox')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg ${
                    activeTab === 'inbox'
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>Inbox</span>
                  {unreadCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('sent')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                    activeTab === 'sent'
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  Sent
                </button>
                <button
                  onClick={() => setActiveTab('compose')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                    activeTab === 'compose'
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  Compose
                </button>
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <Users className="h-4 w-4 mr-2" />
                  Broadcast to All
                </button>
                <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <User className="h-4 w-4 mr-2" />
                  Send to Individual
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {activeTab === 'compose' ? (
              /* Compose Message */
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Compose Message
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Recipient
                    </label>
                    <select
                      value={composeData.recipient}
                      onChange={(e) => setComposeData(prev => ({ ...prev, recipient: e.target.value }))}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select recipient...</option>
                      <option value="all">All Trainees</option>
                      <option value="john">John Doe</option>
                      <option value="jane">Jane Smith</option>
                      <option value="mike">Mike Johnson</option>
                      <option value="sarah">Sarah Wilson</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={composeData.subject}
                      onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter subject..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      rows={8}
                      value={composeData.content}
                      onChange={(e) => setComposeData(prev => ({ ...prev, content: e.target.value }))}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Type your message..."
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setActiveTab('inbox')}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendMessage}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Message List */
              <>
                {/* Search */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Messages */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredMessages.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="text-gray-400 mb-4">
                        <Send className="h-12 w-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No messages found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {activeTab === 'inbox' 
                          ? "You don't have any messages in your inbox."
                          : "You haven't sent any messages yet."}
                      </p>
                    </div>
                  ) : (
                    filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => setSelectedMessage(message)}
                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                          !message.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                  {message.sender.charAt(0)}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className={`text-sm font-medium truncate ${
                                    !message.isRead 
                                      ? 'text-gray-900 dark:text-white' 
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`}>
                                    {activeTab === 'inbox' ? message.sender : message.recipient}
                                  </p>
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleStar(message.id);
                                      }}
                                      className={`p-1 rounded ${
                                        message.isStarred 
                                          ? 'text-yellow-500' 
                                          : 'text-gray-400 hover:text-yellow-500'
                                      }`}
                                    >
                                      <Star className="h-4 w-4" />
                                    </button>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {new Date(message.timestamp).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <p className={`text-sm truncate ${
                                  !message.isRead 
                                    ? 'text-gray-900 dark:text-white font-medium' 
                                    : 'text-gray-600 dark:text-gray-400'
                                }`}>
                                  {message.subject}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                                  {message.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {selectedMessage.subject}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  From: {selectedMessage.sender} • {new Date(selectedMessage.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleStar(selectedMessage.id)}
                  className={`p-2 rounded-lg ${
                    selectedMessage.isStarred 
                      ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20' 
                      : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Star className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Archive className="h-4 w-4" />
                </button>
                <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                {selectedMessage.content}
              </p>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}