interface AttendanceRecord {
  date: string;
  on_time: string | null;
  off_time: string | null;
  status: number;
}

interface AttendanceData {
  ATT_NO: number;
  REG_NO: string;
  name: string;
  trainee_id: number;
  end_date: string;
  attendences: AttendanceRecord[];
}

const attendanceData: AttendanceData = {
  ATT_NO: 8240153,
  REG_NO: "UG/2024/69",
  name: "H.S.Senaratne",
  trainee_id: 156,
  end_date: "2024-02-08T18:30:00.000Z",
  attendences: [
    { date: "2024-08-01", on_time: "09:08:43", off_time: "16:30:24", status: 0 },
    { date: "2024-08-02", on_time: "08:27:04", off_time: "13:14:28", status: 0 },
    { date: "2024-08-05", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-06", on_time: "08:56:43", off_time: "16:30:35", status: 0 },
    { date: "2024-08-07", on_time: "08:42:55", off_time: "16:30:31", status: 0 },
    { date: "2024-08-08", on_time: "08:58:46", off_time: "16:30:35", status: 0 },
    { date: "2024-08-09", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-12", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-13", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-14", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-15", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-16", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-20", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-21", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-22", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-23", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-26", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-27", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-28", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-29", on_time: null, off_time: null, status: 0 },
    { date: "2024-08-30", on_time: null, off_time: null, status: 0 }
  ]
};

export const AttendancePageLoader = () =>{

    console.log('Trainee name:', (attendanceData.name));

    return attendanceData
};
