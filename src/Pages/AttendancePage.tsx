import { useState } from "react";
import {useLoaderData} from "react-router-dom";

interface AttendanceData {
  ATT_NO: number;
  REG_NO: string;
  name: string;
  trainee_id: number;
  end_date: string;
  attendences: AttendanceRecord[];
}

export default function AttendancePage() {

  const loaderData = useLoaderData() as AttendanceData;
  const [selectedYear] = useState(new Date().getFullYear());
  const [selectedMonth] = useState(new Date().getMonth() + 1);

  // Calculate the number of days in the selected month
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  console.log("hsgsgs", (loaderData.name));

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Trainer Attendance Record</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{loaderData.name}</h3>
            <p className="text-gray-600">Trainer ID:{loaderData.REG_NO}</p>
            <p className="text-gray-600">Trainer Attendence No:{loaderData.ATT_NO}</p>
            <div className="flex gap-4 mb-2">
              <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="border rounded p-1"
              >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={new Date().getFullYear() - 5 + i}>
                {new Date().getFullYear() - 5 + i}
                </option>
              ))}
              </select>
              <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="border rounded p-1"
              >
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                {new Date(2000, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
              </select>
            </div>
            <p className="text-gray-600">
              {new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'long' })} {selectedYear}
            </p>
          </div>
          
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">On Time</th>
                <th className="border p-2">Off Time</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(daysInMonth)].map((_, index) => {
                const currentDate = new Date(selectedYear, selectedMonth - 1, index + 1);
                const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

                return (
                  <tr key={index} className={isWeekend ? 'bg-gray-50' : ''}>
                    <td className="border p-2">
                      {currentDate.toLocaleDateString()}
                    </td>
                    <td className="border p-2">
                      {isWeekend ? 'Weekend' : '-'}
                    </td>
                    <td className="border p-2">-</td>
                    <td className="border p-2">-</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
