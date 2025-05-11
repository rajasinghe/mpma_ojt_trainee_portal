import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../components/ui/table";
import Badge from "../components/ui/badge/Badge";
import Select from "../components/form/Select";
import ComponentCard from "../components/common/ComponentCard";

interface AttendanceData {
  id: number;
  ATT_NO: number;
  REG_NO: string;
  name: string;
  trainee_id: number;
  month: number;
  year: number;
  attendences: Record[];
}

interface Record {
  id: number;
  date: string;
  on_time: string | null;
  off_time: string | null;
  status: number;
}

export default function ViewAttendancePage() {
    const loaderData = useLoaderData() as AttendanceData;
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [filteredAttendance, setFilteredAttendance] = useState<Record[]>([]);

    const yearOptions = [...Array(5)].map((_, i) => ({
        value: (new Date().getFullYear() - 2 + i).toString(),
        label: (new Date().getFullYear() - 2 + i).toString()
    }));

    const monthOptions = [...Array(12)].map((_, i) => ({
        value: (i + 1).toString(),
        label: new Date(2000, i).toLocaleString('default', { month: 'long' })
    }));

    useEffect(() => {
        // Filter attendance records based on selected month and year
        const filtered = loaderData.attendences.filter(record => {
            const recordDate = new Date(record.date);
            return recordDate.getMonth() + 1 === selectedMonth && 
                   recordDate.getFullYear() === selectedYear;
        });
        setFilteredAttendance(filtered);
    }, [selectedMonth, selectedYear, loaderData.attendences]);

    const getAttendanceStatus = (status: number) => {
        switch(status) {
            case 1:
                return { text: "Present", color: "success" as const };
            case 0:
                return { text: "Absent", color: "error" as const };
            default:
                return { text: "Partial", color: "warning" as const };
        }
    };

    return (
        <div className="space-y-6">
            <PageMeta title="View Attendance" description="" />
            <PageBreadcrumb pageTitle="View Attendance" />
            
            {/* Trainee Info Card */}
            <ComponentCard title="Attendance Info">
                <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                                Trainer Attendance Record
                            </h2>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                                <div>
                                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                        Name
                                    </p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                        {loaderData.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                        Trainee ID
                                    </p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                        {loaderData.REG_NO}
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                        Trainer Attendance No
                                    </p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                        {loaderData.ATT_NO}
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                        Bio
                                    </p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                        
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ComponentCard>

            {/* Attendance Table */}

                <ComponentCard title="Attendance Table">
                    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                        <div className="container p-4 mx-auto">
                            <div className="p-6 bg-white rounded-lg shadow-md">
                                {/* Month and Year Selection */}
                                <div className="mb-4">
                                    <div className="flex gap-4 mb-2">
                                        <div className="w-40">
                                            <Select
                                                options={yearOptions}
                                                defaultValue={selectedYear.toString()}
                                                onChange={(value) => setSelectedYear(Number(value))}
                                                placeholder="Select Year"
                                            />
                                        </div>
                                        <div className="w-40">
                                            <Select
                                                options={monthOptions}
                                                defaultValue={selectedMonth.toString()}
                                                onChange={(value) => setSelectedMonth(Number(value))}
                                                placeholder="Select Month"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Attendance Table */}
                                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                                    <div className="max-w-full overflow-x-auto">
                                        <Table>
                                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                                <TableRow>
                                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
                                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">On Time</TableCell>
                                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Off Time</TableCell>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                                {filteredAttendance.map((record) => (
                                                    <TableRow key={record.id}>
                                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                                            {new Date(record.date).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                            <Badge 
                                                                color={getAttendanceStatus(record.status).color}
                                                                size="sm"
                                                            >
                                                                {getAttendanceStatus(record.status).text}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                            {record.on_time || '-'}
                                                        </TableCell>
                                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                            {record.off_time || '-'}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ComponentCard>
            </div>
    );
}