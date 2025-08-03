import api from "../api";
import { createLoader, simulateApiDelay } from "./index";

// Helper function to get current user from localStorage
const getCurrentUser = () => {
  const storedUser = localStorage.getItem("ojt_user");
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  throw new Error("No authenticated user found");
};

// Trainee Payment Data
interface PaymentData {
  totalEarned: number;
  pendingAmount: number;
  totalDays: number;
  totalWorkingDays: number;
  dailyPayment: number;
  payments: any[];
}

interface AttendanceData {
  totalWorkingDays: number;
  presentDays: number;
  attendanceRate: number;
  records: any[];
}

interface CalenderData {
  id: number;
  start_date: string;
  end_date: string;
  description: string;
}

const loadTraineePayments = async (): Promise<PaymentData> => {
  await simulateApiDelay(1000);

  const payments = [
    /*
    id: 1,
    traineeId: 1122,
    month: 2,
    year: 2024,
    attendanceCount: 17,
    amount: 1500,
    status: 1,
    */
    {
      id: 1,
      traineeId: 1122,
      month: 1,
      year: 2024,
      attendanceCount: 17,
      amount: 1500,
      status: 1,
    },
    {
      id: 10,
      traineeId: 1122,
      month: 2,
      year: 2024,
      attendanceCount: 17,
      amount: 1500,
      status: 1,
    },
    {
      id: 11,
      traineeId: 1122,
      month: 3,
      year: 2024,
      attendanceCount: 17,
      amount: 2500,
      status: 1,
    },
    {
      id: 12,
      traineeId: 1122,
      month: 4,
      year: 2024,
      attendanceCount: 17,
      amount: 1500,
      status: 1,
    },
    {
      id: 13,
      traineeId: 1122,
      month: 5,
      year: 2024,
      attendanceCount: 2,
      amount: 1000,
      status: 1,
    },
    {
      id: 14,
      traineeId: 1122,
      month: 6,
      year: 2024,
      attendanceCount: 3,
      amount: 1500,
      status: 1,
    },
    {
      id: 15,
      traineeId: 1122,
      month: 7,
      year: 2024,
      attendanceCount: 17,
      amount: 5500,
      status: 0,
    },
    {
      id: 16,
      traineeId: 1122,
      month: 8,
      year: 2024,
      attendanceCount: 17,
      amount: 9000,
      status: 0,
    },
  ];

  const totalEarned = payments
    .filter((payment) => payment.status === 1)
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingAmount = payments
    .filter((payment) => payment.status === 0)
    .reduce((sum, payment) => sum + payment.amount, 0);

  const dailyPayment = 500;
  const totalDays = 36;
  const totalWorkingDays = 28;

  return {
    totalEarned,
    pendingAmount,
    totalDays,
    totalWorkingDays,
    dailyPayment,
    payments,
  };
};

const loadTraineeAttendance = async (): Promise<AttendanceData> => {
  await simulateApiDelay(800);

  const records = [
    {
      id: "1",
      date: "2024-01-15",
      onTime: "08:00",
      offTime: "17:00",
      status: 1,
    },
    {
      id: "2",
      date: "2024-01-16",
      onTime: "08:15",
      offTime: "17:00",
      status: 0,
    },
    {
      id: "3",
      date: "2024-01-17",
      onTime: "08:00",
      offTime: "16:30",
      status: 0,
    },
    {
      id: "4",
      date: "2024-01-18",
      onTime: "",
      offTime: "",
      status: 0,
    },
    {
      id: "5",
      date: "2024-01-19",
      onTime: "08:00",
      offTime: "17:00",
      status: 1,
    },
  ];

  const presentDays = records.filter((record) => record.status === 1).length;
  const attendanceRate = (presentDays / records.length) * 100;
  const totalWorkingDays = records.length;

  return {
    totalWorkingDays,
    presentDays,
    attendanceRate,
    records,
  };
};

const traineeEventLoader = async (): Promise<CalenderData[]> => {
  try {
    const response = await api.get("api/trainee/holidays");

    if (response.status === 200) {
      return response.data;
    }

    return []; // Return empty array if no data
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    return []; // Return empty array on error
  }
};

const fetchTraineeDetails = async (id: number) => {
  try {
    const response = await api.get(`api/trainee/trainee_details/${id}`);

    if (response.status === 200) {
      console.log("trainee data", response.data);
      return response.data;
    }

    return {}; // Return empty object if no data
  } catch (error) {
    console.error("Error fetching trainee data:", error);
    return {}; // Return empty object on error
  }
};

const getTraineeDocuments = async (id: number) => {
  try {
    const response = await api.get(`api/trainee/document/${id}`);

    if (response.status === 200) {
      return response.data;
    }

    return {}; // Return empty object if no data
  } catch (error) {
    console.error("Error fetching trainee documents:", error);
    return {}; // Return empty object on error
  }
};

// Export the loader
export const traineeDetailsLoader = async () => {
  // Get user from auth context or session
  const user = getCurrentUser();
  const traineeData = await fetchTraineeDetails(user.id);
  const documents = await getTraineeDocuments(user.id);
  return { ...traineeData, Documents: documents };
};

console.log("trainee data loader", traineeDetailsLoader());
export const traineeCalendarLoader = createLoader(traineeEventLoader, 600);

export const traineePaymentsLoader = createLoader(loadTraineePayments, 600);
export const traineeAttendanceLoader = createLoader(loadTraineeAttendance, 600);
