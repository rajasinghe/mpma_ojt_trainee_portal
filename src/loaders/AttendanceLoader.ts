interface AttendanceRecord {
  id: number;
  date: string;
  on_time: string | null;
  off_time: string | null;
  status: number;
}

interface AttendanceData {
  id: number;
  ATT_NO: number;
  REG_NO: string;
  name: string;
  trainee_id: number;
  month: number;
  year: number;
  attendences: AttendanceRecord[];
}

const attendanceData: AttendanceData = {
  id: 1,
  ATT_NO: 8240153,
  REG_NO: "UG/2024/69",
  name: "H.S.Senaratne",
  trainee_id: 156,
  month: 8,
  year: 2024,
  attendences: [
    {id:10, date: "2024-08-01", on_time: "08:08:43", off_time: "16:30:24", status: 1 },
    {id:11, date: "2024-08-02", on_time: "08:27:04", off_time: "13:14:28", status: 0 },
    {id:12, date: "2024-08-05", on_time: null, off_time: null, status: 0 },
    {id:13, date: "2024-08-06", on_time: "08:56:43", off_time: "16:30:35", status: 0 },
    {id:14, date: "2024-08-07", on_time: "08:42:55", off_time: "16:30:31", status: 0 },
    {id:15, date: "2024-08-08", on_time: "08:58:46", off_time: "16:30:35", status: 0 },
    {id:16, date: "2024-08-09", on_time: null, off_time: null, status: 0 },
    {id:17, date: "2024-08-12", on_time: null, off_time: null, status: 0 },
    {id:18, date: "2024-08-13", on_time: null, off_time: null, status: 0 },
    {id:19, date: "2024-08-14", on_time: null, off_time: null, status: 0 },
    {id:20, date: "2024-08-15", on_time: null, off_time: null, status: 0 },
    {id:21, date: "2024-08-16", on_time: null, off_time: null, status: 0 },
    {id:22, date: "2024-08-20", on_time: null, off_time: null, status: 0 },
    {id:23, date: "2024-08-21", on_time: null, off_time: null, status: 0 },
    {id:24, date: "2024-08-22", on_time: null, off_time: null, status: 0 },
    {id:25, date: "2024-08-23", on_time: null, off_time: null, status: 0 },
    {id:26, date: "2024-08-26", on_time: null, off_time: null, status: 0 },
    {id:27, date: "2024-08-27", on_time: null, off_time: null, status: 0 },
    {id:28, date: "2024-08-28", on_time: null, off_time: null, status: 0 },
    {id:29, date: "2024-08-29", on_time: null, off_time: null, status: 0 },
    {id:30, date: "2024-08-30", on_time: null, off_time: null, status: 0 }
  ]
    
};

export const AttendanceLoader = () =>{

   // console.log('Trainee name:', (attendanceData.name));

    return attendanceData
};
