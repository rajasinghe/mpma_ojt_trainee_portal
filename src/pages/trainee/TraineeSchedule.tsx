import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Download, CalendarDays, Building2, Clock, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { useAuth } from "../../contexts/AuthContext";

type ScheduleSummary = {
  traineeId: number;
  nic: string;
  overall: { startDate: string; endDate: string } | null;
  departmentDurations: Array<{
    scheduleId: number;
    departmentId: number;
    departmentName: string | null;
    startDate: string;
    endDate: string;
  }>;
} | null;

interface SchedulePeriod {
  id: string;
  period: string;
  startDate: string;
  endDate: string;
  department: string;
  supervisor: string;
  supervisorEmail: string;
  supervisorPhone: string;
  location: string;
  objectives: string[];
  status: "upcoming" | "current" | "completed";
  completionPercentage?: number;
}

export default function TraineeSchedule() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const data = useLoaderData() as ScheduleSummary | [];

  const isEmpty = Array.isArray(data);
  const summary = (!isEmpty ? (data as ScheduleSummary) : null) as ScheduleSummary;
  const scheduleItems = summary?.departmentDurations ?? [];
  const overall = summary?.overall ?? null;

  const today = new Date();
  const getStatus = (start: string, end: string): "upcoming" | "current" | "completed" => {
    const s = new Date(start);
    const e = new Date(end);
    if (today < s) return "upcoming";
    if (today > e) return "completed";
    return "current";
  };

  const scheduleData: SchedulePeriod[] = scheduleItems.map((s, idx) => ({
    id: String(s.scheduleId),
    period: `Schedule ${idx + 1}`,
    startDate: s.startDate,
    endDate: s.endDate,
    department: s.departmentName || `Department ${s.departmentId}`,
    supervisor: "",
    supervisorEmail: "",
    supervisorPhone: "",
    location: s.departmentName || "",
    objectives: [],
    status: getStatus(s.startDate, s.endDate),
  }));

  const trainingInfo = {
    program: "OJT Program",
    duration:
      overall
        ? `${new Date(overall.startDate).toLocaleDateString()} - ${new Date(
            overall.endDate
          ).toLocaleDateString()}`
        : "",
    startDate: overall?.startDate ?? "",
    endDate: overall?.endDate ?? "",
    totalDepartments: scheduleItems.length,
    currentDepartment:
      scheduleData.find((p) => p.status === "current")?.department || "",
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "current":
        return <Badge variant="info">Current</Badge>;
      case "upcoming":
        return <Badge variant="warning">Upcoming</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-l-green-500 bg-green-50";
      case "current":
        return "border-l-blue-500 bg-blue-50";
      case "upcoming":
        return "border-l-yellow-500 bg-yellow-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  const downloadSchedule = () => {
    // Create Word document content
    const docContent = `
TRAINING SCHEDULE
${trainingInfo.program}

Trainee: ${user?.username ?? ""}
Training Period: ${trainingInfo.duration}

DEPARTMENT ASSIGNMENTS:

${scheduleData
  .map(
    (period) => `
${period.period}: ${period.department}
Period: ${new Date(period.startDate).toLocaleDateString()} - ${new Date(
      period.endDate
    ).toLocaleDateString()}
Department: ${period.location}
Status: ${period.status.toUpperCase()}
`
  )
  .join("\n")}

Generated on: ${new Date().toLocaleDateString()}
OJT Portal - Training Management System
    `.trim();

    // Create and download the file
    const blob = new Blob([docContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(user?.username ?? "trainee").replace(/\s+/g, "_")}_Training_Schedule.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Training Schedule
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View your department assignments and training timeline
          </p>
        </div>
        <Button icon={Download} onClick={downloadSchedule}>
          Download Schedule
        </Button>
      </div>

      {/* Training Overview */}
      <Card color="blue">
        <CardHeader color="blue">
          <CardTitle color="blue" size="lg">
            Training Program Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-2">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Program</p>
              <p className="font-semibold text-blue-900">
                {trainingInfo.program}
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-2">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold text-purple-900">
                {trainingInfo.duration}
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-2">
                <CalendarDays className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Departments</p>
              <p className="font-semibold text-green-900">
                {trainingInfo.totalDepartments}
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-orange-100 rounded-lg w-fit mx-auto mb-2">
                <User className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-sm text-gray-600">Current</p>
              <p className="font-semibold text-orange-900">
                {trainingInfo.currentDepartment}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Department Assignment Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduleData.map((period, index) => (
              <div
                key={period.id}
                className={`border-l-4 p-6 rounded-r-lg cursor-pointer transition-all duration-200 hover:shadow-md ${getStatusColor(
                  period.status
                )} ${
                  selectedPeriod === period.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() =>
                  setSelectedPeriod(
                    selectedPeriod === period.id ? null : period.id
                  )
                }
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {period.period}: {period.department}
                      </h3>
                      {getStatusBadge(period.status)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        {new Date(period.startDate).toLocaleDateString()} - {" "}
                        {new Date(period.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {period.status === "current" &&
                    period.completionPercentage && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {period.completionPercentage}%
                        </div>
                        <div className="text-sm text-gray-600">Complete</div>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${period.completionPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      {/*<Card color="yellow">
        <CardContent className="p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CalendarDays className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-900">
                  Schedule Information
                </h4>
                <div className="text-sm text-yellow-800 mt-1 space-y-1">
                  <p>
                    • This schedule is managed by your training coordinator and
                    cannot be modified.
                  </p>
                  <p>
                    • Contact your current supervisor for any questions about
                    your department assignment.
                  </p>
                  <p>
                    • Download your schedule for offline reference and planning.
                  </p>
                  <p>
                    • Department transitions will be communicated 1 week in
                    advance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>*/}
    </div>
  );
}
