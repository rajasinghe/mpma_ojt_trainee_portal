import { createLoader, simulateApiDelay } from './index';

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
      status: 1
    },
    {
      id: 15,
      traineeId: 1122,
      month: 7,
      year: 2024,
      attendanceCount: 17,
      amount: 5500,
      status: 0
    },
    {
      id: 16,
      traineeId: 1122,
      month: 8,
      year: 2024,
      attendanceCount: 17,
      amount: 9000,
      status: 0
    },
  ];

  const totalEarned = payments
    .filter(payment => payment.status === 1)
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingAmount = payments
    .filter(payment => payment.status === 0)
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
    payments
  };
};

const loadTraineeAttendance = async (): Promise<AttendanceData> => {
  await simulateApiDelay(800);
  
  const records = [
    {
      id: '1',
      date: '2024-01-15',
      onTime: '08:00',
      offTime: '17:00',
      status: 1,
    },
    {
      id: '2',
      date: '2024-01-16',
      onTime: '08:15',
      offTime: '17:00',
      status: 0
    },
    {
      id: '3',
      date: '2024-01-17',
      onTime: '08:00',
      offTime: '16:30',
      status: 0
    },
    {
      id: '4',
      date: '2024-01-18',
      onTime: '',
      offTime: '',
      status: 0
    },
    {
      id: '5',
      date: '2024-01-19',
      onTime: '08:00',
      offTime: '17:00',
      status: 1
    }
  ];

  const presentDays = records.filter(record => record.status === 1).length;
  const attendanceRate = (presentDays / records.length) * 100;
  const totalWorkingDays = records.length;

  return {
    totalWorkingDays,
    presentDays,
    attendanceRate,
    records
  };
};

export const traineePaymentsLoader = createLoader(loadTraineePayments, 600);
export const traineeAttendanceLoader = createLoader(loadTraineeAttendance, 600);