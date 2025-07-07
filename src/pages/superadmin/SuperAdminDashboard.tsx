import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Users, UserCheck, Shield, TrendingUp, Clock, AlertTriangle, Plus, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import type { LoaderData } from '../../loaders';

interface SuperAdminDashboardData {
  stats: {
    totalAdmins: number;
    activeAdmins: number;
    totalTrainees: number;
    activeTrainees: number;
    newTrainees: number;
    inactiveTrainees: number;
  };
  recentActivities: Array<{
    id: string;
    type: string;
    message: string;
    time: string;
    icon: string;
    color: string;
  }>;
  pendingActions: Array<{
    id: string;
    title: string;
    count: number;
    description: string;
    action: string;
    priority: string;
  }>;
}

export default function SuperAdminDashboard() {
  const { data: dashboardData } = useLoaderData() as LoaderData<SuperAdminDashboardData>;

  const { stats, recentActivities, pendingActions } = dashboardData;

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return Shield;
      case 'UserCheck':
        return UserCheck;
      case 'Users':
        return Users;
      default:
        return Shield;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Super Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage the entire OJT portal system
          </p>
        </div>
        <div className="flex space-x-3">
          <Button icon={Plus} variant="secondary">
            Create Admin
          </Button>
          <Button icon={Mail}>
            Send Notifications
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAdmins}</p>
                <p className="text-gray-600 dark:text-gray-400">Total Admins</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">
                {stats.activeAdmins} active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTrainees}</p>
                <p className="text-gray-600 dark:text-gray-400">Total Trainees</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">
                {stats.activeTrainees} active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.newTrainees}</p>
                <p className="text-gray-600 dark:text-gray-400">New Applications</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-orange-600 text-sm font-medium">
                Awaiting approval
              </span>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inactiveTrainees}</p>
                <p className="text-gray-600 dark:text-gray-400">Inactive Trainees</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-red-600 text-sm font-medium">
                Require attention
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.icon);
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingActions.map((action) => (
                <div key={action.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </h4>
                    <Badge variant={action.priority === 'high' ? 'error' : action.priority === 'medium' ? 'warning' : 'default'}>
                      {action.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {action.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {action.count}
                    </span>
                    <Button size="sm" variant="outline">
                      {action.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
              <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Create New Admin</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Add a new administrator with custom permissions</p>
            </button>
            <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
              <UserCheck className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Approve Trainees</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Review and approve pending trainee applications</p>
            </button>
            <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">System Reports</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">View comprehensive system analytics and reports</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}