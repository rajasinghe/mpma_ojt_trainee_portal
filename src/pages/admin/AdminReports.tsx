import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, Users, DollarSign, Clock, FileText, Filter } from 'lucide-react';

export default function AdminReports() {
  const [selectedReport, setSelectedReport] = useState('attendance');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });

  const reportTypes = [
    {
      id: 'attendance',
      name: 'Attendance Report',
      description: 'Detailed attendance records and statistics',
      icon: Clock,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'payment',
      name: 'Payment Report',
      description: 'Payment status and revenue analysis',
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      id: 'trainee',
      name: 'Trainee Report',
      description: 'Trainee progress and performance metrics',
      icon: Users,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'performance',
      name: 'Performance Report',
      description: 'Overall training program performance',
      icon: TrendingUp,
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  // Mock data for reports
  const attendanceData = {
    totalDays: 31,
    presentDays: 28,
    lateDays: 3,
    absentDays: 0,
    attendanceRate: 95.2,
    trainees: [
      { name: 'John Doe', present: 29, late: 2, absent: 0, rate: 96.8 },
      { name: 'Jane Smith', present: 27, late: 1, absent: 3, rate: 90.3 },
      { name: 'Mike Johnson', present: 25, late: 0, absent: 6, rate: 80.6 },
      { name: 'Sarah Wilson', present: 30, late: 1, absent: 0, rate: 100 }
    ]
  };

  const paymentData = {
    totalRevenue: 675000,
    paidAmount: 600000,
    pendingAmount: 45000,
    overdueAmount: 30000,
    collectionRate: 88.9,
    payments: [
      { trainee: 'John Doe', amount: 15000, status: 'Paid', date: '2024-01-28' },
      { trainee: 'Jane Smith', amount: 15000, status: 'Pending', date: '2024-01-31' },
      { trainee: 'Mike Johnson', amount: 15000, status: 'Overdue', date: '2023-12-31' },
      { trainee: 'Sarah Wilson', amount: 15000, status: 'Paid', date: '2024-01-25' }
    ]
  };

  const traineeData = {
    totalTrainees: 45,
    activeTrainees: 42,
    completedTrainees: 3,
    averageProgress: 78.5,
    topPerformers: [
      { name: 'Sarah Wilson', progress: 95, attendance: 100, grade: 'A+' },
      { name: 'John Doe', progress: 92, attendance: 96.8, grade: 'A' },
      { name: 'Jane Smith', progress: 85, attendance: 90.3, grade: 'B+' },
      { name: 'Mike Johnson', progress: 72, attendance: 80.6, grade: 'B' }
    ]
  };

  const handleGenerateReport = () => {
    // In real app, this would generate and download the report
    alert(`Generating ${reportTypes.find(r => r.id === selectedReport)?.name} for ${dateRange.startDate} to ${dateRange.endDate}`);
  };

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'attendance':
        return (
          <div className="space-y-6">
            {/* Attendance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {attendanceData.attendanceRate}%
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Overall Rate</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {attendanceData.presentDays}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">Present Days</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                      {attendanceData.lateDays}
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">Late Days</p>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-red-600 dark:text-red-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                      {attendanceData.absentDays}
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300">Absent Days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trainee Attendance Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Individual Attendance Records
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Trainee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Present
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Late
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Absent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {attendanceData.trainees.map((trainee, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {trainee.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {trainee.present}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {trainee.late}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {trainee.absent}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {trainee.rate}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            {/* Payment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      Rs. {paymentData.totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">Total Revenue</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      Rs. {paymentData.paidAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Paid Amount</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                      Rs. {paymentData.pendingAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">Pending</p>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-red-600 dark:text-red-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                      Rs. {paymentData.overdueAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300">Overdue</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Payment Details
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Trainee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {paymentData.payments.map((payment, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {payment.trainee}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          Rs. {payment.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            payment.status === 'Paid' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : payment.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'trainee':
        return (
          <div className="space-y-6">
            {/* Trainee Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {traineeData.totalTrainees}
                    </p>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Total Trainees</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {traineeData.activeTrainees}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">Active</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {traineeData.averageProgress}%
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Avg Progress</p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-orange-600 dark:text-orange-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                      {traineeData.completedTrainees}
                    </p>
                    <p className="text-sm text-orange-700 dark:text-orange-300">Completed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performers Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Top Performers
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Trainee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Attendance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {traineeData.topPerformers.map((performer, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {performer.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {performer.progress}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {performer.attendance}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            performer.grade.startsWith('A') 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          }`}>
                            {performer.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Select a Report Type
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose a report type from the sidebar to view detailed analytics
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate comprehensive reports and analyze training data
          </p>
        </div>
        <button
          onClick={handleGenerateReport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {/* Report Types */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Report Types</h3>
              <nav className="space-y-2">
                {reportTypes.map((report) => {
                  const Icon = report.icon;
                  return (
                    <button
                      key={report.id}
                      onClick={() => setSelectedReport(report.id)}
                      className={`w-full flex items-start p-3 text-sm rounded-lg transition-colors ${
                        selectedReport === report.id
                          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className={`h-5 w-5 mr-3 mt-0.5 ${report.color}`} />
                      <div className="text-left">
                        <div className="font-medium">{report.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {report.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Date Range */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Date Range</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Filters</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  This Month
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  Last Month
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  Last 3 Months
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  This Year
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {reportTypes.find(r => r.id === selectedReport)?.name || 'Select Report'}
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </button>
                  <button className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              {renderReportContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}