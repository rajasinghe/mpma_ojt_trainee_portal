import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  CreditCard,
  DollarSign,
  Calendar,
  TrendingUp,
  Download,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import type { LoaderData } from "../../loaders";

interface PaymentData {
  totalEarned: number;
  pendingAmount: number;
  totalDays: number;
  totalWorkingDays: number;
  dailyPayment: number;
  payments: Array<{
    id: number;
    month: number;
    year: number;
    amount: number;
    status: 0 | 1;
    attendanceCount: number;
  }>;
}

export default function TraineePayments() {
  const { data: paymentData } = useLoaderData() as LoaderData<PaymentData>;
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const {
    totalEarned,
    pendingAmount,
    totalDays,
    totalWorkingDays,
    dailyPayment,
    payments,
  } = paymentData;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="success">Paid</Badge>;
      case "processing":
        return <Badge variant="warning">Processing</Badge>;
      case "pending":
        return <Badge variant="error">Pending</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Payment History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your daily training payments and earnings
          </p>
        </div>
        <Button icon={Download}>Export Report</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover color="green">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 icon-bg-green rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-900">
                  Rs. {totalEarned.toLocaleString()}
                </p>
                <p className="text-green-700">Total Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover color="yellow">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 icon-bg-yellow rounded-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-yellow-900">
                  Rs. {pendingAmount.toLocaleString()}
                </p>
                <p className="text-yellow-700">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover color="blue">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 icon-bg-blue rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-blue-900">
                  {totalWorkingDays} days
                </p>
                <p className="text-blue-700">Total Working Days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover color="purple">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 icon-bg-purple rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-purple-900">
                  {totalDays} days
                </p>
                <p className="text-purple-700">Total Work Days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Info Card */}
      <Card color="cyan">
        <CardContent className="p-4">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-cyan-900 mb-2">
              How Payments Work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-cyan-800">
              <div>
                <p>
                  <strong>Daily Payment:</strong> Rs. {dailyPayment} per day
                </p>
                <p>
                  <strong>Payment Schedule:</strong> Month after attendance
                  confirmation
                </p>
              </div>
              <div>
                <p>
                  <strong>Method:</strong> Direct BOC bank transfer
                </p>
                <p>
                  <strong>Is BOC Account Added:</strong> Yes
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card color="orange">
        <CardContent className="pr-10 pl-10">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-orange-900">
              Payment History
            </h2>
            <div className="flex space-x-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="table-header-green">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Attendence Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {payments.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={`table-row-hover-${
                      index % 2 === 0 ? "green" : "blue"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {payment.month}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {payment.attendanceCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Rs. {payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(payment.status ? "paid" : "pending")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="ghost" size="sm" icon={Eye}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
