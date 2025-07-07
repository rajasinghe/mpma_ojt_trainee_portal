import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, Shield, Mail, Key, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { useToastHelpers } from '../../hooks/useToast';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import type { LoaderData } from '../../loaders';

interface AdminData {
  id: string;
  name: string;
  email: string;
  username: string;
  status: 'active' | 'inactive';
  permissions: string[];
  createdDate: string;
  lastLogin?: string;
}

export default function SuperAdminAdmins() {
  const { data: admins } = useLoaderData() as LoaderData<AdminData[]>;
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { success, error, info } = useToastHelpers();

  const availablePermissions = [
    { id: 'manage_trainees', name: 'Manage Trainees', description: 'Add, edit, and manage trainee accounts' },
    { id: 'manage_attendance', name: 'Manage Attendance', description: 'View and edit attendance records' },
    { id: 'manage_payments', name: 'Manage Payments', description: 'Process and manage payments' },
    { id: 'view_reports', name: 'View Reports', description: 'Access system reports and analytics' },
    { id: 'send_notifications', name: 'Send Notifications', description: 'Send messages and notifications' },
    { id: 'manage_calendar', name: 'Manage Calendar', description: 'Create and manage events' }
  ];

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendCredentials = async (admin: AdminData) => {
    const confirmed = await ConfirmationModal.show({
      title: 'Send Credentials',
      message: `Are you sure you want to send login credentials to ${admin.name} at ${admin.email}?`,
      confirmText: 'Send Credentials',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      // Simulate sending credentials
      success(`Credentials sent to ${admin.email}`);
    }
  };

  const createAdmin = async () => {
    const confirmed = await ConfirmationModal.show({
      title: 'Create Administrator',
      message: 'Are you sure you want to create this new administrator account? Credentials will be sent via email.',
      confirmText: 'Create Admin',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      success('Admin created successfully! Credentials have been sent via email.');
      setShowCreateModal(false);
    }
  };

  const deleteAdmin = async (admin: AdminData) => {
    const confirmed = await ConfirmationModal.showDestructive({
      title: 'Delete Administrator',
      message: `Are you sure you want to delete admin "${admin.name}"? This action cannot be undone and will immediately revoke all access.`,
      confirmText: 'Delete Admin',
      cancelText: 'Keep Admin'
    });

    if (confirmed) {
      success(`Admin "${admin.name}" has been deleted successfully.`);
    }
  };

  const toggleAdminStatus = async (admin: AdminData) => {
    const newStatus = admin.status === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'active' ? 'activate' : 'deactivate';
    
    const confirmed = await ConfirmationModal.showWarning({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Administrator`,
      message: `Are you sure you want to ${action} admin "${admin.name}"? This will ${newStatus === 'active' ? 'restore' : 'revoke'} their access to the system.`,
      confirmText: action.charAt(0).toUpperCase() + action.slice(1),
      cancelText: 'Cancel'
    });

    if (confirmed) {
      info(`Admin "${admin.name}" has been ${action}d successfully.`);
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? 
      <Badge variant="success">Active</Badge> : 
      <Badge variant="error">Inactive</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage administrator accounts with custom permissions
          </p>
        </div>
        <Button icon={Plus} onClick={() => setShowCreateModal(true)}>
          Create Admin
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <Input
            icon={Search}
            placeholder="Search admins by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Admins Table */}
      <Card>
        <CardHeader>
          <CardTitle>Administrator Accounts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Admin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
                          <Shield className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {admin.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {admin.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => toggleAdminStatus(admin)}>
                        {getStatusBadge(admin.status)}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {admin.permissions.slice(0, 2).map(permission => (
                          <Badge key={permission} variant="info" size="sm">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                        {admin.permissions.length > 2 && (
                          <Badge variant="default" size="sm">
                            +{admin.permissions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" icon={Edit}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" icon={Mail} onClick={() => sendCredentials(admin)}>
                          Send Credentials
                        </Button>
                        <Button variant="ghost" size="sm" icon={Trash2} onClick={() => deleteAdmin(admin)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create Admin Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              Create New Administrator
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name *" placeholder="Enter full name" />
                <Input label="Email Address *" type="email" placeholder="admin@ojtportal.com" />
                <Input label="Username *" placeholder="Enter username" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status *
                  </label>
                  <select className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Permissions *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availablePermissions.map(permission => (
                    <label key={permission.id} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {permission.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {permission.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Key className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Temporary credentials will be generated and sent to the admin's email
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={createAdmin}>
                Create Admin
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}