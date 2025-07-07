import { useState } from 'react';
import { Bell, BellOff, Trash2, BookMarked as MarkAsRead, Filter } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export default function TraineeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Payment Reminder',
      message: 'Your monthly training fee is due on January 31st. Please make the payment to avoid late fees.',
      type: 'warning',
      isRead: false,
      createdAt: '2024-01-25T10:00:00Z',
      priority: 'high'
    },
    {
      id: '2',
      title: 'New Training Material Available',
      message: 'React Advanced Concepts module has been uploaded to your learning portal.',
      type: 'info',
      isRead: false,
      createdAt: '2024-01-24T14:30:00Z',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Attendance Update',
      message: 'Your attendance for this week has been recorded. Current attendance rate: 95%',
      type: 'success',
      isRead: true,
      createdAt: '2024-01-23T16:45:00Z',
      priority: 'low'
    },
    {
      id: '4',
      title: 'Schedule Change',
      message: 'Tomorrow\'s training session has been moved from 9:00 AM to 10:00 AM.',
      type: 'info',
      isRead: false,
      createdAt: '2024-01-22T09:15:00Z',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'System Maintenance',
      message: 'The learning portal will be under maintenance this Saturday from 2:00 AM to 4:00 AM.',
      type: 'warning',
      isRead: true,
      createdAt: '2024-01-21T11:20:00Z',
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  const getNotificationColor = (type: string) => {
    const colors = {
      info: 'border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/20',
      warning: 'border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
      success: 'border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20',
      error: 'border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20'
    };
    return colors[type as keyof typeof colors] || colors.info;
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[priority as keyof typeof styles]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Bell className="h-6 w-6 mr-2" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Stay updated with your training progress and announcements
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={markAllAsRead}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MarkAsRead className="h-4 w-4 mr-2" />
              Mark All Read
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <div className="flex space-x-2">
            {['all', 'unread', 'read'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption as typeof filter)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filter === filterOption
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                {filterOption === 'unread' && unreadCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
            <BellOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No notifications found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filter === 'unread' 
                ? "You're all caught up! No unread notifications."
                : filter === 'read'
                ? "No read notifications to show."
                : "You don't have any notifications yet."}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow ${getNotificationColor(notification.type)} ${
                !notification.isRead ? 'border-2 border-blue-200 dark:border-blue-700' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                    <h3 className={`text-lg font-semibold ${
                      notification.isRead 
                        ? 'text-gray-700 dark:text-gray-300' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {notification.title}
                    </h3>
                    {getPriorityBadge(notification.priority)}
                    {!notification.isRead && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mb-3 ${
                    notification.isRead 
                      ? 'text-gray-600 dark:text-gray-400' 
                      : 'text-gray-800 dark:text-gray-200'
                  }`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <MarkAsRead className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete notification"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}