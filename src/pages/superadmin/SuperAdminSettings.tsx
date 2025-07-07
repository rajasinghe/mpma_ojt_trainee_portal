import { useState } from 'react';
import { Save, Shield, Database, Mail, Bell, Globe, Users, Key } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToastHelpers } from '../../hooks/useToast';

export default function SuperAdminSettings() {
  const [activeTab, setActiveTab] = useState('system');
  const { success, warning } = useToastHelpers();

  const tabs = [
    { id: 'system', name: 'System Settings', icon: Database },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'email', name: 'Email Configuration', icon: Mail },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'permissions', name: 'Permissions', icon: Key }
  ];

  const handleSave = () => {
    success('Settings saved successfully!');
  };

  const handleCriticalChange = (setting: string, enabled: boolean) => {
    if (!enabled) {
      warning(`${setting} has been disabled. This may affect system security or functionality.`);
    } else {
      success(`${setting} has been enabled.`);
    }
  };

  const testEmailConnection = () => {
    // Simulate email test
    setTimeout(() => {
      success('Email connection test successful!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure system-wide settings and preferences
          </p>
        </div>
        <Button icon={Save} onClick={handleSave}>
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              {activeTab === 'system' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    System Configuration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="System Name" defaultValue="OJT Portal" />
                    <Input label="System Version" defaultValue="1.0.0" disabled />
                    <Input label="Max Trainees" type="number" defaultValue="100" />
                    <Input label="Max Admins" type="number" defaultValue="10" />
                    <Input label="Session Timeout (minutes)" type="number" defaultValue="30" />
                    <Input label="Backup Frequency" defaultValue="Daily" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      System Description
                    </label>
                    <textarea
                      rows={3}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      defaultValue="On-the-Job Training Management Portal for managing trainees, admins, and training programs."
                    />
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Security Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Require 2FA for all admin accounts
                        </p>
                      </div>
                      <button 
                        onClick={() => handleCriticalChange('Two-Factor Authentication', false)}
                        className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
                      >
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input label="Password Min Length" type="number" defaultValue="8" />
                      <Input label="Max Login Attempts" type="number" defaultValue="3" />
                      <Input label="Account Lockout Duration (minutes)" type="number" defaultValue="15" />
                      <Input label="Password Expiry (days)" type="number" defaultValue="90" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'email' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Email Configuration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="SMTP Server" defaultValue="smtp.gmail.com" />
                    <Input label="SMTP Port" type="number" defaultValue="587" />
                    <Input label="SMTP Username" defaultValue="noreply@ojtportal.com" />
                    <Input label="SMTP Password" type="password" placeholder="Enter SMTP password" />
                    <Input label="From Email" defaultValue="noreply@ojtportal.com" />
                    <Input label="From Name" defaultValue="OJT Portal" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex-1 mr-4">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Note:</strong> Email configuration is required for sending credentials, notifications, and system alerts.
                      </p>
                    </div>
                    <Button onClick={testEmailConnection} variant="outline">
                      Test Connection
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Notification Settings
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: 'newTraineeNotification', label: 'New Trainee Applications', description: 'Notify when new trainees apply' },
                      { key: 'adminCreatedNotification', label: 'Admin Account Created', description: 'Notify when new admin accounts are created' },
                      { key: 'systemAlertsNotification', label: 'System Alerts', description: 'Critical system notifications' },
                      { key: 'weeklyReportsNotification', label: 'Weekly Reports', description: 'Send weekly system reports' },
                      { key: 'paymentAlertsNotification', label: 'Payment Alerts', description: 'Notify about payment issues' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.label}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'permissions' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Permission Management
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Warning:</strong> Only Super Admins can modify permission settings. Changes affect all admin accounts.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'manage_trainees', name: 'Manage Trainees', description: 'Add, edit, and manage trainee accounts' },
                        { id: 'manage_attendance', name: 'Manage Attendance', description: 'View and edit attendance records' },
                        { id: 'manage_payments', name: 'Manage Payments', description: 'Process and manage payments' },
                        { id: 'view_reports', name: 'View Reports', description: 'Access system reports and analytics' },
                        { id: 'send_notifications', name: 'Send Notifications', description: 'Send messages and notifications' },
                        { id: 'manage_calendar', name: 'Manage Calendar', description: 'Create and manage events' }
                      ].map((permission) => (
                        <div key={permission.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {permission.name}
                            </h4>
                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {permission.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}