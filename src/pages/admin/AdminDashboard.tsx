import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Users, DollarSign, Calendar, TrendingUp, Clock, CheckCircle, AlertTriangle, UserCheck, Award, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import type { LoaderData } from '../../loaders';

interface AdminDashboardData {
  stats: {
    totalTrainees: number;
    activeTrainees: number;
    totalRevenue: number;
    monthlyRevenue: number;
    attendanceRate: number;
    completionRate: number;
  };
  recentActivities: Array<{
    id: string;
    type: string;
    message: string;
    time: string;
    icon: string;
    color: string;
  }>;
  upcomingEvents: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    attendees: number;
    type: string;
  }>;
}

export default function AdminDashboard() {
  const { data: dashboardData } = useLoaderData() as LoaderData<AdminDashboardData>;

  const { stats, recentActivities, upcomingEvents } = dashboardData;

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'training':
        return <Badge variant="info" gradient>Training</Badge>;
      case 'assessment':
        return <Badge variant="warning" gradient>Assessment</Badge>;
      case 'reminder':
        return <Badge variant="error" gradient>Reminder</Badge>;
      default:
        return <Badge variant="default">Event</Badge>;
    }
  };

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'DollarSign':
        return DollarSign;
      case 'UserCheck':
        return UserCheck;
      case 'AlertTriangle':
        return AlertTriangle;
      case 'CheckCircle':
        return CheckCircle;
      default:
        return CheckCircle;
    }
  };

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-blue-100 text-lg">Here's what's happening with your training program today.</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <Award className="h-12 w-12 text-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card hover color="blue" className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-blue-900 mb-1">{stats.totalTrainees}</p>
                <p className="text-blue-700 font-medium">Total Trainees</p>
                <div className="mt-3">
                  <Badge variant="success" gradient>
                    {stats.activeTrainees} active
                  </Badge>
                </div>
              </div>
              <div className="p-4 icon-bg-blue rounded-xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover color="green" className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-green-900 mb-1">
                  Rs. {stats.totalRevenue.toLocaleString()}
                </p>
                <p className="text-green-700 font-medium">Total Revenue</p>
                <div className="mt-3">
                  <Badge variant="success" gradient>
                    +Rs. {stats.monthlyRevenue.toLocaleString()} this month
                  </Badge>
                </div>
              </div>
              <div className="p-4 icon-bg-green rounded-xl shadow-lg">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover color="purple" className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-purple-900 mb-1">{stats.attendanceRate}%</p>
                <p className="text-purple-700 font-medium">Attendance Rate</p>
                <div className="mt-3">
                  <Badge variant="success" gradient>
                    +2.1% from last month
                  </Badge>
                </div>
              </div>
              <div className="p-4 icon-bg-purple rounded-xl shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover color="orange" className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-orange-900 mb-1">{stats.completionRate}%</p>
                <p className="text-orange-700 font-medium">Completion Rate</p>
                <div className="mt-3">
                  <Badge variant="success" gradient>
                    +5.2% from last month
                  </Badge>
                </div>
              </div>
              <div className="p-4 icon-bg-orange rounded-xl shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover color="indigo" className="border-l-4 border-l-indigo-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-indigo-900 mb-1">98.5%</p>
                <p className="text-indigo-700 font-medium">Success Rate</p>
                <div className="mt-3">
                  <Badge variant="success" gradient>
                    Excellent performance
                  </Badge>
                </div>
              </div>
              <div className="p-4 icon-bg-indigo rounded-xl shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover color="pink" className="border-l-4 border-l-pink-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-pink-900 mb-1">24/7</p>
                <p className="text-pink-700 font-medium">System Uptime</p>
                <div className="mt-3">
                  <Badge variant="success" gradient pulse>
                    All systems operational
                  </Badge>
                </div>
              </div>
              <div className="p-4 icon-bg-pink rounded-xl shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card hover color="cyan">
          <CardHeader color="cyan">
            <CardTitle color="cyan" size="lg">
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.icon);
                return (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl bg-cyan-50 hover:bg-cyan-100 transition-colors">
                    <div className={`p-3 rounded-xl bg-gray-100 shadow-md`}>
                      <Icon className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-cyan-900">
                        {activity.message}
                      </p>
                      <p className="text-xs text-cyan-600 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card hover color="purple">
          <CardHeader color="purple">
            <CardTitle color="purple" size="lg">
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border-l-4 border-l-purple-500 pl-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-r-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-purple-900">
                      {event.title}
                    </h4>
                    {getEventBadge(event.type)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-purple-700">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {event.time}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {event.attendees} attendees
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card color="yellow">
        <CardHeader color="orange">
          <CardTitle color="orange" size="lg">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group p-6 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="p-3 icon-bg-blue rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-blue-900 mb-2">Add New Trainee</h4>
              <p className="text-sm text-blue-700">Register a new trainee to the program</p>
            </div>
            
            <div className="group p-6 border-2 border-green-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-green-50 to-green-100">
              <div className="p-3 icon-bg-green rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-green-900 mb-2">Schedule Event</h4>
              <p className="text-sm text-green-700">Create a new training session or meeting</p>
            </div>
            
            <div className="group p-6 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="p-3 icon-bg-purple rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-purple-900 mb-2">Send Payment Reminder</h4>
              <p className="text-sm text-purple-700">Notify trainees about due payments</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}